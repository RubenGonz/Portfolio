"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseForm(fd: FormData) {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  const arr = (k: string) =>
    get(k)
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  const topicsRaw = get("topics");
  let topics: { label: string; items: string[] }[] = [];
  try {
    topics = JSON.parse(topicsRaw);
  } catch {
    topics = [];
  }

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

export async function createCourse(_: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.slug || !data.title) return "Slug and title are required.";

  try {
    await prisma.course.create({ data });
  } catch {
    return "Slug already exists or DB error.";
  }

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  redirect("/admin/courses");
}

export async function updateCourse(slug: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.title) return "Title is required.";

  try {
    await prisma.course.update({ where: { slug }, data });
  } catch {
    return "DB error.";
  }

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath(`/courses/${slug}`);
  redirect("/admin/courses");
}

export async function deleteCourse(slug: string) {
  await prisma.course.delete({ where: { slug } });
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}
