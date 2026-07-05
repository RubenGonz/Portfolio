import { prisma } from "@/lib/prisma";
import type { Course } from "@/types";
import type { Course as PrismaCourse } from "@prisma/client";

/** Map a Prisma row (persistence model) to the app's domain Course type. */
function toCourse(row: PrismaCourse): Course {
  return {
    slug: row.slug,
    title: row.title,
    platform: row.platform,
    year: row.year,
    status: row.status as Course["status"],
    shortDescription: row.shortDescription,
    fullDescription: row.fullDescription,
    topics: row.topics as Course["topics"],
    tags: row.tags,
    certificateUrl: row.certificateUrl ?? undefined,
    repoUrl: row.repoUrl ?? undefined,
    demoUrl: row.demoUrl ?? undefined,
  };
}

export async function getCourses(): Promise<Course[]> {
  const rows = await prisma.course.findMany({
    orderBy: { year: "desc" },
  });
  return rows.map(toCourse);
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const row = await prisma.course.findUnique({ where: { slug } });
  return row ? toCourse(row) : undefined;
}
