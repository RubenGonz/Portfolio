import { prisma } from "@/lib/prisma";
import { LOCALES } from "../locale";

// Admin edit DTOs for timeline entries.

export interface TimelineTranslationInput {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export interface TimelineEntryEdit {
  id: string;
  year: string;
  current: boolean;
  translations: Record<string, TimelineTranslationInput>;
}

const emptyTimelineTranslation = (): TimelineTranslationInput => ({
  title: "",
  subtitle: "",
  paragraphs: [],
});

/** Full record with every locale's translation, for the admin edit form. */
export async function getTimelineEntryForEdit(id: string): Promise<TimelineEntryEdit | undefined> {
  const row = await prisma.timelineEntry.findUnique({
    where: { id },
    include: { translations: true },
  });
  if (!row) return undefined;

  const translations: Record<string, TimelineTranslationInput> = {};
  for (const locale of LOCALES) {
    const t = row.translations.find((tr) => tr.locale === locale);
    translations[locale] = t
      ? { title: t.title, subtitle: t.subtitle ?? "", paragraphs: t.paragraphs }
      : emptyTimelineTranslation();
  }

  return { id: row.id, year: row.year, current: row.current, translations };
}
