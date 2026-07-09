"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOCALE, LOCALES } from "@/data/locale";

// Settings are localized per (key, locale). Neutral keys (cv_url, available)
// always write under the default locale.
const upsert = (key: string, value: string, locale: string = DEFAULT_LOCALE) =>
  prisma.setting.upsert({
    where: { key_locale: { key, locale } },
    update: { value },
    create: { key, locale, value },
  });

/** Write a localized setting: store it for the default locale (even when
 *  empty), but drop empty non-default locales so the site falls back. */
const writeLocalized = (key: string, locale: string, value: string) =>
  locale === DEFAULT_LOCALE || value.trim()
    ? upsert(key, value, locale)
    : prisma.setting.deleteMany({ where: { key, locale } });

export async function updateHero(_: unknown, fd: FormData): Promise<string | undefined> {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  if (!get("hero_title_en") || !get("hero_description_en")) {
    return "Title and description are required.";
  }
  await prisma.$transaction(
    LOCALES.flatMap((l) => [
      writeLocalized("hero_title", l, get(`hero_title_${l}`)),
      writeLocalized("hero_tagline", l, get(`hero_tagline_${l}`)),
      writeLocalized("hero_description", l, get(`hero_description_${l}`)),
    ]),
  );
  revalidatePath("/");
  redirect("/admin");
}

export async function updateTicker(_: unknown, fd: FormData): Promise<string | undefined> {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  await prisma.$transaction(
    LOCALES.map((l) => writeLocalized("ticker_text", l, get(`ticker_text_${l}`))),
  );
  revalidatePath("/");
  redirect("/admin");
}

export async function updateAvailable(_: unknown, fd: FormData): Promise<string | undefined> {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  const available = fd.get("available") === "on" ? "true" : "false";
  await prisma.$transaction([
    upsert("available", available), // neutral flag
    ...LOCALES.map((l) =>
      writeLocalized("available_label", l, get(`available_label_${l}`) || (l === DEFAULT_LOCALE ? "Available" : "")),
    ),
  ]);
  revalidatePath("/");
  revalidatePath("/admin/available");
  redirect("/admin");
}

export async function updateContact(_: unknown, fd: FormData): Promise<string | undefined> {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  if (!get("contact_headline_en")) return "Headline is required.";
  await prisma.$transaction(
    LOCALES.flatMap((l) => [
      writeLocalized("contact_headline", l, get(`contact_headline_${l}`)),
      writeLocalized("contact_subtext", l, get(`contact_subtext_${l}`)),
    ]),
  );
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

