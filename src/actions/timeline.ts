"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseForm(fd: FormData) {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  return {
    year: get("year"),
    title: get("title"),
    subtitle: get("subtitle") || null,
    paragraphs: get("paragraphs").split("\n\n").map((s) => s.trim()).filter(Boolean),
  };
}

function revalidate() {
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createTimelineEntry(_: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.title || !data.year) return "Year and title are required.";
  const count = await prisma.timelineEntry.count();
  await prisma.timelineEntry.create({ data: { ...data, order: count, current: false } });
  revalidate();
  redirect("/admin");
}

export async function updateTimelineEntry(id: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.title || !data.year) return "Year and title are required.";
  const current = fd.get("current") === "on";
  await prisma.timelineEntry.update({ where: { id }, data: { ...data, current } });
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
