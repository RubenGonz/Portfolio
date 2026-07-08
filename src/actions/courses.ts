"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOCALE } from "@/data/locale";

function parseForm(fd: FormData) {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  const arr = (k: string) =>
    get(k).split("\n").map((s) => s.trim()).filter(Boolean);

  const topicsRaw = get("topics");
  let topics: { label: string; items: string[] }[] = [];
  try { topics = JSON.parse(topicsRaw); } catch { topics = []; }

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
    // Translatable fields (stored on CourseTranslation, currently English).
    translation: {
      title: get("title"),
      shortDescription: get("shortDescription"),
      fullDescription: get("fullDescription"),
      tags: arr("tags"),
      topics,
    },
  };
}

function revalidate(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/courses");
  if (slug) revalidatePath(`/courses/${slug}`);
}

export async function createCourse(_: unknown, fd: FormData): Promise<string | undefined> {
  const { neutral, translation } = parseForm(fd);
  if (!neutral.slug || !translation.title) return "Slug and title are required.";
  try {
    await prisma.course.create({
      data: {
        ...neutral,
        featured: false,
        translations: { create: { locale: DEFAULT_LOCALE, ...translation } },
      },
    });
  } catch {
    return "Slug already exists or DB error.";
  }
  revalidate();
  redirect("/admin");
}

export async function updateCourse(slug: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const { neutral, translation } = parseForm(fd);
  if (!translation.title) return "Title is required.";
  try {
    const course = await prisma.course.findUnique({ where: { slug }, select: { id: true } });
    if (!course) return "Course not found.";
    await prisma.$transaction([
      prisma.course.update({ where: { slug }, data: neutral }),
      prisma.courseTranslation.upsert({
        where: { courseId_locale: { courseId: course.id, locale: DEFAULT_LOCALE } },
        create: { courseId: course.id, locale: DEFAULT_LOCALE, ...translation },
        update: translation,
      }),
    ]);
  } catch {
    return "DB error.";
  }
  revalidate(slug);
  redirect("/admin");
}

export async function deleteCourse(slug: string) {
  await prisma.course.delete({ where: { slug } });
  revalidate();
}

export async function toggleCourseFeatured(slug: string, featured: boolean): Promise<string | undefined> {
  if (featured) {
    const count = await prisma.course.count({ where: { featured: true } });
    if (count >= 2) return "Max 2 featured courses. Unmark one first.";
  }
  await prisma.course.update({ where: { slug }, data: { featured } });
  revalidate();
}
