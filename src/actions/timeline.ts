"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOCALE } from "@/data/locale";

function parseForm(fd: FormData) {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  return {
    // Language-neutral field (stored on TimelineEntry).
    year: get("year"),
    // Translatable fields (stored on TimelineEntryTranslation, currently English).
    translation: {
      title: get("title"),
      subtitle: get("subtitle") || null,
      paragraphs: get("paragraphs").split("\n\n").map((s) => s.trim()).filter(Boolean),
    },
  };
}

function revalidate() {
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createTimelineEntry(_: unknown, fd: FormData): Promise<string | undefined> {
  const { year, translation } = parseForm(fd);
  if (!translation.title || !year) return "Year and title are required.";
  const count = await prisma.timelineEntry.count();
  await prisma.timelineEntry.create({
    data: {
      year,
      order: count,
      current: false,
      translations: { create: { locale: DEFAULT_LOCALE, ...translation } },
    },
  });
  revalidate();
  redirect("/admin");
}

export async function updateTimelineEntry(id: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const { year, translation } = parseForm(fd);
  if (!translation.title || !year) return "Year and title are required.";
  const current = fd.get("current") === "on";
  await prisma.$transaction([
    prisma.timelineEntry.update({ where: { id }, data: { year, current } }),
    prisma.timelineEntryTranslation.upsert({
      where: { entryId_locale: { entryId: id, locale: DEFAULT_LOCALE } },
      create: { entryId: id, locale: DEFAULT_LOCALE, ...translation },
      update: translation,
    }),
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
