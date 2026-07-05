"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function updateHomeContent(_: unknown, fd: FormData): Promise<string | undefined> {
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";

  const title       = get("hero_title");
  const tagline     = get("hero_tagline");
  const description = get("hero_description");
  const tickerText  = get("ticker_text");
  const headline    = get("contact_headline");
  const subtext     = get("contact_subtext");

  if (!title || !description) return "Hero title and description are required.";
  if (!headline) return "Contact headline is required.";

  const upsert = (key: string, value: string) =>
    prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });

  await prisma.$transaction([
    upsert("hero_title",       title),
    upsert("hero_tagline",     tagline),
    upsert("hero_description", description),
    upsert("ticker_text",      tickerText),
    upsert("contact_headline", headline),
    upsert("contact_subtext",  subtext),
  ]);

  revalidatePath("/");
  revalidatePath("/admin/home");
  redirect("/admin");
}
