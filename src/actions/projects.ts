"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOCALE } from "@/data/locale";

const BLOB_HOST = "blob.vercel-storage.com";

async function deleteBlobImages(projectId: string) {
  const images = await prisma.projectImage.findMany({ where: { projectId }, select: { src: true } });
  const blobUrls = images.map((i) => i.src).filter((s) => s.includes(BLOB_HOST));
  if (blobUrls.length) await del(blobUrls).catch(() => {});
}

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
    // Language-neutral fields (stored on Project).
    neutral: {
      slug: get("slug"),
      url: get("url") || null,
      repoUrl: get("repoUrl") || null,
      year: parseInt(get("year"), 10) || new Date().getFullYear(),
      status: get("status") || "in-progress",
      tags: arr("tags"),
    },
    // Translatable fields (stored on ProjectTranslation, currently English).
    translation: {
      title: get("title"),
      shortDescription: get("shortDescription"),
      fullDescription: get("fullDescription"),
      highlights: arr("highlights"),
      role: get("role") || null,
    },
    images,
  };
}

function revalidate(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/projects");
  if (slug) revalidatePath(`/projects/${slug}`);
}

export async function createProject(_: unknown, fd: FormData): Promise<string | undefined> {
  const { neutral, translation, images } = parseForm(fd);
  if (!neutral.slug || !translation.title) return "Slug and title are required.";
  try {
    await prisma.project.create({
      data: {
        ...neutral,
        featured: false,
        images: { create: images.map((img, i) => ({ ...img, order: i })) },
        translations: { create: { locale: DEFAULT_LOCALE, ...translation } },
      },
    });
  } catch {
    return "Slug already exists or DB error.";
  }
  revalidate();
  redirect("/admin");
}

export async function updateProject(slug: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const { neutral, translation, images } = parseForm(fd);
  if (!translation.title) return "Title is required.";
  try {
    const project = await prisma.project.findUnique({ where: { slug }, select: { id: true } });
    if (!project) return "Project not found.";
    await deleteBlobImages(project.id);
    await prisma.$transaction([
      prisma.projectImage.deleteMany({ where: { projectId: project.id } }),
      prisma.project.update({
        where: { slug },
        data: {
          ...neutral,
          images: { create: images.map((img, i) => ({ ...img, order: i })) },
        },
      }),
      prisma.projectTranslation.upsert({
        where: { projectId_locale: { projectId: project.id, locale: DEFAULT_LOCALE } },
        create: { projectId: project.id, locale: DEFAULT_LOCALE, ...translation },
        update: translation,
      }),
    ]);
  } catch {
    return "DB error.";
  }
  revalidate(slug);
  redirect("/admin");
}

export async function deleteProject(slug: string) {
  const project = await prisma.project.findUnique({ where: { slug }, select: { id: true } });
  if (project) await deleteBlobImages(project.id);
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
