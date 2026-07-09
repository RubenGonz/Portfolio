import { prisma } from "@/lib/prisma";
import type { Project } from "@/types";
import type {
  Project as PrismaProject,
  ProjectImage,
  ProjectTranslation,
} from "@prisma/client";
import { DEFAULT_LOCALE, LOCALES, pickTranslation } from "./locale";

type ProjectRow = PrismaProject & {
  images: ProjectImage[];
  translations: ProjectTranslation[];
};

/** Map a Prisma row (persistence model) to the app's domain Project type. */
function toProject(row: ProjectRow, locale: string): Project {
  const t = pickTranslation(row.translations, locale);
  return {
    slug: row.slug,
    title: t?.title ?? "",
    shortDescription: t?.shortDescription ?? "",
    fullDescription: t?.fullDescription ?? "",
    tags: row.tags,
    highlights: t?.highlights ?? [],
    role: t?.role ?? undefined,
    url: row.url ?? undefined,
    repoUrl: row.repoUrl ?? undefined,
    featured: row.featured,
    year: row.year,
    status: row.status as Project["status"],
    images: row.images
      .sort((a, b) => a.order - b.order)
      .map((img) => ({ name: img.name, src: img.src, alt: img.alt })),
  };
}

export async function getProjects(locale: string = DEFAULT_LOCALE): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    include: { images: true, translations: true },
    orderBy: [{ featured: "desc" }, { year: "desc" }],
  });
  return rows.map((row) => toProject(row, locale));
}

export async function getProjectBySlug(
  slug: string,
  locale: string = DEFAULT_LOCALE,
): Promise<Project | undefined> {
  const row = await prisma.project.findUnique({
    where: { slug },
    include: { images: true, translations: true },
  });
  return row ? toProject(row, locale) : undefined;
}

// ─── Admin editing ──────────────────────────────────────────────────────────

export interface ProjectTranslationInput {
  title: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  role: string;
}

export interface ProjectEdit {
  slug: string;
  year: number;
  status: string;
  url: string;
  repoUrl: string;
  tags: string[];
  images: { name: string; src: string; alt: string }[];
  /** Translatable fields per locale — empty strings where a locale is missing. */
  translations: Record<string, ProjectTranslationInput>;
}

const emptyProjectTranslation = (): ProjectTranslationInput => ({
  title: "",
  shortDescription: "",
  fullDescription: "",
  highlights: [],
  role: "",
});

/** Full record with every locale's translation, for the admin edit form. */
export async function getProjectForEdit(slug: string): Promise<ProjectEdit | undefined> {
  const row = await prisma.project.findUnique({
    where: { slug },
    include: { images: true, translations: true },
  });
  if (!row) return undefined;

  const translations: Record<string, ProjectTranslationInput> = {};
  for (const locale of LOCALES) {
    const t = row.translations.find((tr) => tr.locale === locale);
    translations[locale] = t
      ? {
          title: t.title,
          shortDescription: t.shortDescription,
          fullDescription: t.fullDescription,
          highlights: t.highlights,
          role: t.role ?? "",
        }
      : emptyProjectTranslation();
  }

  return {
    slug: row.slug,
    year: row.year,
    status: row.status,
    url: row.url ?? "",
    repoUrl: row.repoUrl ?? "",
    tags: row.tags,
    images: row.images
      .sort((a, b) => a.order - b.order)
      .map((img) => ({ name: img.name, src: img.src, alt: img.alt })),
    translations,
  };
}
