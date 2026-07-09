"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOCALE, LOCALES } from "@/data/locale";

type TimelineTranslationData = {
  title: string;
  subtitle: string | null;
  paragraphs: string[];
};

function parseForm(fd: FormData) {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";

  // Translatable fields carry a `_<locale>` suffix (title_en, title_es…).
  const translations: Record<string, TimelineTranslationData> = {};
  for (const locale of LOCALES) {
    translations[locale] = {
      title: get(`title_${locale}`),
      subtitle: get(`subtitle_${locale}`) || null,
      paragraphs: get(`paragraphs_${locale}`).split("\n\n").map((s) => s.trim()).filter(Boolean),
    };
  }

  return {
    // Language-neutral field (stored on TimelineEntry).
    year: get("year"),
    translations,
  };
}

/** Locales whose translation has real content (a title). */
const filledLocales = (translations: Record<string, TimelineTranslationData>) =>
  LOCALES.filter((l) => translations[l].title.trim());

function revalidate() {
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createTimelineEntry(_: unknown, fd: FormData): Promise<string | undefined> {
  const { year, translations } = parseForm(fd);
  if (!translations[DEFAULT_LOCALE].title || !year) return "Year and title are required.";
  const count = await prisma.timelineEntry.count();
  await prisma.timelineEntry.create({
    data: {
      year,
      order: count,
      current: false,
      translations: {
        create: filledLocales(translations).map((locale) => ({ locale, ...translations[locale] })),
      },
    },
  });
  revalidate();
  redirect("/admin");
}

export async function updateTimelineEntry(id: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const { year, translations } = parseForm(fd);
  if (!translations[DEFAULT_LOCALE].title || !year) return "Year and title are required.";
  const current = fd.get("current") === "on";
  const filled = filledLocales(translations);
  await prisma.$transaction([
    prisma.timelineEntry.update({ where: { id }, data: { year, current } }),
    prisma.timelineEntryTranslation.deleteMany({
      where: { entryId: id, locale: { notIn: filled } },
    }),
    ...filled.map((locale) =>
      prisma.timelineEntryTranslation.upsert({
        where: { entryId_locale: { entryId: id, locale } },
        create: { entryId: id, locale, ...translations[locale] },
        update: translations[locale],
      }),
    ),
  ]);
  revalidate();
  redirect("/admin");
}

export async function deleteTimelineEntry(id: string) {
  await prisma.timelineEntry.delete({ where: { id } });
  revalidate();
}

export async function reorderTimeline(orderedIds: string[]) {
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.timelineEntry.update({ where: { id }, data: { order: index } })
    )
  );
  revalidate();
}

export async function toggleTimelineCurrent(id: string, current: boolean) {
  await prisma.timelineEntry.update({ where: { id }, data: { current } });
  revalidate();
}
