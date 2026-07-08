"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOCALE } from "@/data/locale";

// Settings are localized per (key, locale). Until the admin exposes Spanish
// inputs, everything is written under the default locale and resolved via the
// read-time fallback in the data layer.
const upsert = (key: string, value: string, locale: string = DEFAULT_LOCALE) =>
  prisma.setting.upsert({
    where: { key_locale: { key, locale } },
    update: { value },
    create: { key, locale, value },
  });

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
  const prev = await prisma.setting.findUnique({
    where: { key_locale: { key: "cv_url", locale: DEFAULT_LOCALE } },
  });
  if (prev?.value && prev.value.includes("vercel-storage.com")) {
    await del(prev.value).catch(() => {});
  }
  await upsert("cv_url", url);
  revalidatePath("/");
  revalidatePath("/admin/files");
}

