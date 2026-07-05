"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function revalidate() {
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function addStackItem(name: string, category: string, tier: string) {
  if (!name.trim()) return;
  const count = await prisma.stackItem.count({ where: { category } });
  await prisma.stackItem.create({ data: { name: name.trim(), category, tier, order: count } });
  revalidate();
}

export async function moveStackItem(id: string, tier: string) {
  await prisma.stackItem.update({ where: { id }, data: { tier } });
  revalidate();
}

export async function deleteStackItem(id: string) {
  await prisma.stackItem.delete({ where: { id } });
  revalidate();
}

// Keep for standalone pages
function parseForm(fd: FormData) {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  return {
    name: get("name"),
    tier: get("tier") || "familiar",
    category: get("category") || "Tooling",
    order: parseInt(get("order"), 10) || 0,
  };
}

export async function createStackItem(_: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.name) return "Name is required.";
  await prisma.stackItem.create({ data });
  revalidate();
  redirect("/admin");
}

export async function updateStackItem(id: string, _: unknown, fd: FormData): Promise<string | undefined> {
  const data = parseForm(fd);
  if (!data.name) return "Name is required.";
  await prisma.stackItem.update({ where: { id }, data });
  revalidate();
  redirect("/admin");
}
