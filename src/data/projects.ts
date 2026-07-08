import { prisma } from "@/lib/prisma";
import type { Project } from "@/types";
import type {
  Project as PrismaProject,
  ProjectImage,
  ProjectTranslation,
} from "@prisma/client";
import { DEFAULT_LOCALE, pickTranslation } from "./locale";

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
