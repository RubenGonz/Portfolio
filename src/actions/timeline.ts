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
    current: fd.get("current") === "on",
    order: parseInt(get("order"), 10) || 0,
  };
}

function revalidate() {
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createTimelineEntry(_: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.title || !data.year) return "Year and title are required.";
  await prisma.timelineEntry.create({ data });
  revalidate();
  redirect("/admin");
}

export async function updateTimelineEntry(id: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.title || !data.year) return "Year and title are required.";
  await prisma.timelineEntry.update({ where: { id }, data });
  revalidate();
  redirect("/admin");
}

export async function deleteTimelineEntry(id: string) {
  await prisma.timelineEntry.delete({ where: { id } });
  revalidate();
}
