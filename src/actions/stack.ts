"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseForm(fd: FormData) {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  return {
    name: get("name"),
    tier: get("tier") || "familiar",
    category: get("category") || "Tooling",
    order: parseInt(get("order"), 10) || 0,
  };
}

function revalidate() {
  revalidatePath("/admin");
  revalidatePath("/");
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

export async function deleteStackItem(id: string) {
  await prisma.stackItem.delete({ where: { id } });
  revalidate();
}
