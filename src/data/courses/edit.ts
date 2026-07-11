import { prisma } from "@/lib/prisma";
import { LOCALES } from "../locale";

// Admin edit DTOs for courses.

export interface CourseTranslationInput {
  title: string;
  shortDescription: string;
  fullDescription: string;
  topics: { label: string; items: string[] }[];
  tags: string[];
}

export interface CourseEdit {
  slug: string;
  platform: string;
  year: number;
  status: string;
  certificateUrl: string;
  repoUrl: string;
  demoUrl: string;
  translations: Record<string, CourseTranslationInput>;
}

const emptyCourseTranslation = (): CourseTranslationInput => ({
  title: "",
  shortDescription: "",
  fullDescription: "",
  topics: [],
  tags: [],
});

/** Full record with every locale's translation, for the admin edit form. */
export async function getCourseForEdit(slug: string): Promise<CourseEdit | undefined> {
  const row = await prisma.course.findUnique({
    where: { slug },
    include: { translations: true },
  });
  if (!row) return undefined;

  const translations: Record<string, CourseTranslationInput> = {};
  for (const locale of LOCALES) {
    const t = row.translations.find((tr) => tr.locale === locale);
    translations[locale] = t
      ? {
          title: t.title,
          shortDescription: t.shortDescription,
          fullDescription: t.fullDescription,
          topics: (t.topics ?? []) as CourseTranslationInput["topics"],
          tags: t.tags,
        }
      : emptyCourseTranslation();
  }

  return {
    slug: row.slug,
    platform: row.platform,
    year: row.year,
    status: row.status,
    certificateUrl: row.certificateUrl ?? "",
    repoUrl: row.repoUrl ?? "",
    demoUrl: row.demoUrl ?? "",
    translations,
  };
}
