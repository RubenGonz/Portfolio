"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOCALE, LOCALES } from "@/data/locale";

const BLOB_HOST = "blob.vercel-storage.com";

async function deleteBlobImages(projectId: string) {
  const images = await prisma.projectImage.findMany({ where: { projectId }, select: { src: true } });
  const blobUrls = images.map((i) => i.src).filter((s) => s.includes(BLOB_HOST));
  if (blobUrls.length) await del(blobUrls).catch(() => {});
}

type ProjectTranslationData = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  role: string | null;
};

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

  // Translatable fields carry a `_<locale>` suffix (title_en, title_es…).
  const translations: Record<string, ProjectTranslationData> = {};
  for (const locale of LOCALES) {
    translations[locale] = {
      title: get(`title_${locale}`),
      shortDescription: get(`shortDescription_${locale}`),
      fullDescription: get(`fullDescription_${locale}`),
      highlights: arr(`highlights_${locale}`),
      role: get(`role_${locale}`) || null,
    };
  }

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
    translations,
    images,
  };
}

/** Locales whose translation has real content (a title) — the rest are dropped
 *  so the public site falls back to the default locale. */
const filledLocales = (translations: Record<string, ProjectTranslationData>) =>
  LOCALES.filter((l) => translations[l].title.trim());

function revalidate(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/projects");
  if (slug) revalidatePath(`/projects/${slug}`);
}

export async function createProject(_: unknown, fd: FormData): Promise<string | undefined> {
  const { neutral, translations, images } = parseForm(fd);
  if (!neutral.slug || !translations[DEFAULT_LOCALE].title) return "Slug and title are required.";
  try {
    await prisma.project.create({
      data: {
        ...neutral,
        featured: false,
        images: { create: images.map((img, i) => ({ ...img, order: i })) },
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

export async function updateProject(slug: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const { neutral, translations, images } = parseForm(fd);
  if (!translations[DEFAULT_LOCALE].title) return "Title is required.";
  try {
    const project = await prisma.project.findUnique({ where: { slug }, select: { id: true } });
    if (!project) return "Project not found.";
    await deleteBlobImages(project.id);

    const filled = filledLocales(translations);
    await prisma.$transaction([
      prisma.projectImage.deleteMany({ where: { projectId: project.id } }),
      prisma.project.update({
        where: { slug },
        data: {
          ...neutral,
          images: { create: images.map((img, i) => ({ ...img, order: i })) },
        },
      }),
      // Drop translations that were cleared, so the public site falls back.
      prisma.projectTranslation.deleteMany({
        where: { projectId: project.id, locale: { notIn: filled } },
      }),
      // Upsert the ones with content.
      ...filled.map((locale) =>
        prisma.projectTranslation.upsert({
          where: { projectId_locale: { projectId: project.id, locale } },
          create: { projectId: project.id, locale, ...translations[locale] },
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
