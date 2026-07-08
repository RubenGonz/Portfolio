import { prisma } from "@/lib/prisma";
import type {
  TimelineEntry as PrismaTimelineEntry,
  TimelineEntryTranslation,
} from "@prisma/client";
import { DEFAULT_LOCALE, pickTranslation } from "./locale";

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  subtitle: string | null;
  paragraphs: string[];
  current: boolean;
  order: number;
}

type TimelineRow = PrismaTimelineEntry & { translations: TimelineEntryTranslation[] };

function toEntry(row: TimelineRow, locale: string): TimelineEntry {
  const t = pickTranslation(row.translations, locale);
  return {
    id: row.id,
    year: row.year,
    title: t?.title ?? "",
    subtitle: t?.subtitle ?? null,
    paragraphs: t?.paragraphs ?? [],
    current: row.current,
    order: row.order,
  };
}

export async function getTimeline(locale: string = DEFAULT_LOCALE): Promise<TimelineEntry[]> {
  const rows = await prisma.timelineEntry.findMany({
    include: { translations: true },
    orderBy: { order: "asc" },
  });
  return rows.map((row) => toEntry(row, locale));
}

export async function getTimelineEntry(
  id: string,
  locale: string = DEFAULT_LOCALE,
): Promise<TimelineEntry | undefined> {
  const row = await prisma.timelineEntry.findUnique({
    where: { id },
    include: { translations: true },
  });
  return row ? toEntry(row, locale) : undefined;
}
