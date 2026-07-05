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

  return {
    slug: get("slug"),
    title: get("title"),
    shortDescription: get("shortDescription"),
    fullDescription: get("fullDescription"),
    role: get("role") || null,
    url: get("url") || null,
    repoUrl: get("repoUrl") || null,
    featured: fd.get("featured") === "on",
    year: parseInt(get("year"), 10) || new Date().getFullYear(),
    status: get("status") || "in-progress",
    tags: arr("tags"),
    highlights: arr("highlights"),
  };
}

export async function createProject(_: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.slug || !data.title) return "Slug and title are required.";

  try {
    await prisma.project.create({ data });
  } catch {
    return "Slug already exists or DB error.";
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProject(slug: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.title) return "Title is required.";

  try {
    await prisma.project.update({ where: { slug }, data });
  } catch {
    return "DB error.";
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  redirect("/admin/projects");
}

export async function deleteProject(slug: string) {
  await prisma.project.delete({ where: { slug } });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
