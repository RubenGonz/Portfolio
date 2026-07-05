"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function updateHeroContent(_: unknown, fd: FormData): Promise<string | undefined> {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  const title = get("hero_title");
  const tagline = get("hero_tagline");
  const description = get("hero_description");

  if (!title || !description) return "Title and description are required.";

  await prisma.$transaction([
    prisma.setting.upsert({ where: { key: "hero_title" },       update: { value: title },       create: { key: "hero_title",       value: title } }),
    prisma.setting.upsert({ where: { key: "hero_tagline" },     update: { value: tagline },     create: { key: "hero_tagline",     value: tagline } }),
    prisma.setting.upsert({ where: { key: "hero_description" }, update: { value: description }, create: { key: "hero_description", value: description } }),
  ]);

  revalidatePath("/");
  revalidatePath("/admin/hero");
  redirect("/admin");
}
