import { prisma } from "@/lib/prisma";
import { LOCALES } from "../locale";

// Admin edit DTOs for projects: raw per-locale values (no fallback) so the
// edit forms can show empty locales as empty.

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
