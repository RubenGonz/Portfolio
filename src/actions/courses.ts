"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseForm(fd: FormData) {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  const arr = (k: string) =>
    get(k).split("\n").map((s) => s.trim()).filter(Boolean);

  const topicsRaw = get("topics");
  let topics: { label: string; items: string[] }[] = [];
  try { topics = JSON.parse(topicsRaw); } catch { topics = []; }

  return {
    slug: get("slug"),
    title: get("title"),
    platform: get("platform"),
    shortDescription: get("shortDescription"),
    fullDescription: get("fullDescription"),
    year: parseInt(get("year"), 10) || new Date().getFullYear(),
    status: get("status") || "not-started",
    tags: arr("tags"),
    certificateUrl: get("certificateUrl") || null,
    repoUrl: get("repoUrl") || null,
    demoUrl: get("demoUrl") || null,
    topics,
  };
}

function revalidate(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/courses");
  if (slug) revalidatePath(`/courses/${slug}`);
}

export async function createCourse(_: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.slug || !data.title) return "Slug and title are required.";
  try {
    await prisma.course.create({ data: { ...data, featured: false } });
  } catch {
    return "Slug already exists or DB error.";
  }
  revalidate();
  redirect("/admin");
}

export async function updateCourse(slug: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.title) return "Title is required.";
  try {
    await prisma.course.update({ where: { slug }, data });
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
