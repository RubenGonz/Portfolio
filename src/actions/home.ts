"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

const upsert = (key: string, value: string) =>
  prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });

export async function updateHero(_: unknown, fd: FormData): Promise<string | undefined> {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  const title = get("hero_title");
  const description = get("hero_description");
  if (!title || !description) return "Title and description are required.";
  await prisma.$transaction([
    upsert("hero_title",       title),
    upsert("hero_tagline",     get("hero_tagline")),
    upsert("hero_description", description),
  ]);
  revalidatePath("/");
  redirect("/admin");
}

export async function updateTicker(_: unknown, fd: FormData): Promise<string | undefined> {
  const text = (fd.get("ticker_text") as string | null)?.trim() ?? "";
  await upsert("ticker_text", text);
  revalidatePath("/");
  redirect("/admin");
}

export async function updateAvailable(_: unknown, fd: FormData): Promise<string | undefined> {
  const available = fd.get("available") === "on" ? "true" : "false";
  const label = (fd.get("available_label") as string | null)?.trim() || "Available";
  await prisma.$transaction([
    upsert("available",       available),
    upsert("available_label", label),
  ]);
  revalidatePath("/");
  revalidatePath("/admin/available");
  redirect("/admin");
}

export async function updateContact(_: unknown, fd: FormData): Promise<string | undefined> {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  const headline = get("contact_headline");
  if (!headline) return "Headline is required.";
  await prisma.$transaction([
    upsert("contact_headline", headline),
    upsert("contact_subtext",  get("contact_subtext")),
  ]);
  revalidatePath("/");
  redirect("/admin");
}

export async function updateCvUrl(url: string): Promise<void> {
  const prev = await prisma.setting.findUnique({ where: { key: "cv_url" } });
  if (prev?.value && prev.value.includes("vercel-storage.com")) {
    await del(prev.value).catch(() => {});
  }
  await upsert("cv_url", url);
  revalidatePath("/");
  revalidatePath("/admin/files");
}

