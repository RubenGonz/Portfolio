"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseForm(fd: FormData) {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  const arr = (k: string) =>
    get(k).split("\n").map((s) => s.trim()).filter(Boolean);

  return {
    slug: get("slug"),
    title: get("title"),
    shortDescription: get("shortDescription"),
    fullDescription: get("fullDescription"),
    role: get("role") || null,
    url: get("url") || null,
    repoUrl: get("repoUrl") || null,
    year: parseInt(get("year"), 10) || new Date().getFullYear(),
    status: get("status") || "in-progress",
    tags: arr("tags"),
    highlights: arr("highlights"),
  };
}

function revalidate(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/projects");
  if (slug) revalidatePath(`/projects/${slug}`);
}

export async function createProject(_: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.slug || !data.title) return "Slug and title are required.";
  try {
    await prisma.project.create({ data: { ...data, featured: false } });
  } catch {
    return "Slug already exists or DB error.";
  }
  revalidate();
  redirect("/admin");
}

export async function updateProject(slug: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.title) return "Title is required.";
  try {
    await prisma.project.update({ where: { slug }, data });
  } catch {
    return "DB error.";
  }
  revalidate(slug);
  redirect("/admin");
}

export async function deleteProject(slug: string) {
  await prisma.project.delete({ where: { slug } });
  revalidate();
}

export async function toggleProjectFeatured(slug: string, featured: boolean): Promise<string | undefined> {
  if (featured) {
    const count = await prisma.project.count({ where: { featured: true } });
    if (count >= 2) return "Max 2 featured projects. Unmark one first.";
  }
  await prisma.project.update({ where: { slug }, data: { featured } });
  revalidate();
}
