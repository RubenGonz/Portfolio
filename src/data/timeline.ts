import { prisma } from "@/lib/prisma";

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  subtitle: string | null;
  paragraphs: string[];
  current: boolean;
  order: number;
}

export async function getTimeline(): Promise<TimelineEntry[]> {
  const rows = await prisma.timelineEntry.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    id: r.id,
    year: r.year,
    title: r.title,
    subtitle: r.subtitle,
    paragraphs: r.paragraphs,
    current: r.current,
    order: r.order,
  }));
}

export async function getTimelineEntry(id: string): Promise<TimelineEntry | undefined> {
  const row = await prisma.timelineEntry.findUnique({ where: { id } });
  if (!row) return undefined;
  return {
    id: row.id,
    year: row.year,
    title: row.title,
    subtitle: row.subtitle,
    paragraphs: row.paragraphs,
    current: row.current,
    order: row.order,
  };
}
