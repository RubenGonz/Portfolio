"use server";
import { requireAdmin } from "@/lib/auth-guard";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOCALE, LOCALES } from "@/data/locale";
import { formReader, filledLocales } from "@/lib/form";

type CourseTranslationData = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  topics: Prisma.InputJsonValue;
};

function parseForm(fd: FormData) {
  const { get, lines, json } = formReader(fd);

  // Translatable fields carry a `_<locale>` suffix (title_en, title_es…).
  const translations: Record<string, CourseTranslationData> = {};
  for (const locale of LOCALES) {
    translations[locale] = {
      title: get(`title_${locale}`),
      shortDescription: get(`shortDescription_${locale}`),
      fullDescription: get(`fullDescription_${locale}`),
      tags: lines(`tags_${locale}`),
      topics: json<Prisma.InputJsonValue>(`topics_${locale}`, []),
    };
  }

  return {
    // Language-neutral fields (stored on Course).
    neutral: {
      slug: get("slug"),
      platform: get("platform"),
      year: parseInt(get("year"), 10) || new Date().getFullYear(),
      status: get("status") || "not-started",
      certificateUrl: get("certificateUrl") || null,
      repoUrl: get("repoUrl") || null,
      demoUrl: get("demoUrl") || null,
    },
    translations,
  };
}

function revalidate(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/courses");
  if (slug) revalidatePath(`/courses/${slug}`);
}

export async function createCourse(_: unknown, fd: FormData): Promise<string | undefined> {
  await requireAdmin();
  const { neutral, translations } = parseForm(fd);
  if (!neutral.slug || !translations[DEFAULT_LOCALE].title) return "Slug and title are required.";
  try {
    await prisma.course.create({
      data: {
        ...neutral,
        featured: false,
        translations: {
          create: filledLocales(translations).map((locale) => ({ locale, ...translations[locale] })),
        },
      },
    });
  } catch {
    return "Slug already exists or DB error.";
  }
  revalidate();
  redirect("/admin");
}

export async function updateCourse(slug: string, _: unknown, fd: FormData): Promise<string | undefined> {
  await requireAdmin();
  const { neutral, translations } = parseForm(fd);
  if (!translations[DEFAULT_LOCALE].title) return "Title is required.";
  try {
    const course = await prisma.course.findUnique({ where: { slug }, select: { id: true } });
    if (!course) return "Course not found.";

    const filled = filledLocales(translations);
    await prisma.$transaction([
      prisma.course.update({ where: { slug }, data: neutral }),
      prisma.courseTranslation.deleteMany({
        where: { courseId: course.id, locale: { notIn: filled } },
      }),
      ...filled.map((locale) =>
        prisma.courseTranslation.upsert({
          where: { courseId_locale: { courseId: course.id, locale } },
          create: { courseId: course.id, locale, ...translations[locale] },
          update: translations[locale],
        }),
      ),
    ]);
  } catch {
    return "DB error.";
  }
  revalidate(slug);
  redirect("/admin");
}

export async function deleteCourse(slug: string) {
  await requireAdmin();
  await prisma.course.delete({ where: { slug } });
  revalidate();
}

export async function toggleCourseFeatured(slug: string, featured: boolean): Promise<string | undefined> {
  await requireAdmin();
  if (featured) {
    const count = await prisma.course.count({ where: { featured: true } });
    if (count >= 2) return "Max 2 featured courses. Unmark one first.";
  }
  await prisma.course.update({ where: { slug }, data: { featured } });
  revalidate();
}
