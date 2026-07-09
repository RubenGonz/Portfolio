import { prisma } from "@/lib/prisma";
import type { Course } from "@/types";
import type { Course as PrismaCourse, CourseTranslation } from "@prisma/client";
import { DEFAULT_LOCALE, LOCALES, pickTranslation } from "./locale";

type CourseRow = PrismaCourse & { translations: CourseTranslation[] };

function toCourse(row: CourseRow, locale: string): Course {
  const t = pickTranslation(row.translations, locale);
  return {
    slug: row.slug,
    title: t?.title ?? "",
    platform: row.platform,
    year: row.year,
    status: row.status as Course["status"],
    shortDescription: t?.shortDescription ?? "",
    fullDescription: t?.fullDescription ?? "",
    topics: (t?.topics ?? []) as Course["topics"],
    tags: t?.tags ?? [],
    featured: row.featured,
    certificateUrl: row.certificateUrl ?? undefined,
    repoUrl: row.repoUrl ?? undefined,
    demoUrl: row.demoUrl ?? undefined,
  };
}

export async function getCourses(locale: string = DEFAULT_LOCALE): Promise<Course[]> {
  const rows = await prisma.course.findMany({
    include: { translations: true },
    orderBy: [{ featured: "desc" }, { year: "desc" }],
  });
  return rows.map((row) => toCourse(row, locale));
}

export async function getCourseBySlug(
  slug: string,
  locale: string = DEFAULT_LOCALE,
): Promise<Course | undefined> {
  const row = await prisma.course.findUnique({
    where: { slug },
    include: { translations: true },
  });
  return row ? toCourse(row, locale) : undefined;
}

// ─── Admin editing ──────────────────────────────────────────────────────────

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
