"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseForm(fd: FormData) {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  const arr = (k: string) =>
    get(k).split("\n").map((s) => s.trim()).filter(Boolean);

  const names = fd.getAll("images_name") as string[];
  const srcs  = fd.getAll("images_src")  as string[];
  const alts  = fd.getAll("images_alt")  as string[];
  const images = srcs
    .map((src, i) => ({ name: (names[i] ?? "").trim(), src: src.trim(), alt: (alts[i] ?? "").trim() }))
    .filter((img) => img.src);

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
    images,
  };
}

function revalidate(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/projects");
  if (slug) revalidatePath(`/projects/${slug}`);
}

export async function createProject(_: unknown, fd: FormData): Promise<string | undefined> {
  const { images, ...data } = parseForm(fd);
  if (!data.slug || !data.title) return "Slug and title are required.";
  try {
    await prisma.project.create({
      data: {
        ...data,
        featured: false,
        images: { create: images.map((img, i) => ({ ...img, order: i })) },
      },
    });
  } catch {
    return "Slug already exists or DB error.";
  }
  revalidate();
  redirect("/admin");
}

export async function updateProject(slug: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const { images, ...data } = parseForm(fd);
  if (!data.title) return "Title is required.";
  try {
    const project = await prisma.project.findUnique({ where: { slug }, select: { id: true } });
    if (!project) return "Project not found.";
    await prisma.$transaction([
      prisma.projectImage.deleteMany({ where: { projectId: project.id } }),
      prisma.project.update({
        where: { slug },
        data: {
          ...data,
          images: { create: images.map((img, i) => ({ ...img, order: i })) },
        },
      }),
    ]);
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
