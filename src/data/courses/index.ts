import { prisma } from "@/lib/prisma";
import type { Course } from "@/types";
import type { Course as PrismaCourse, CourseTranslation } from "@prisma/client";
import { DEFAULT_LOCALE, pickTranslation } from "../locale";

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
