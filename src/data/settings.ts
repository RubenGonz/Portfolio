import { prisma } from "@/lib/prisma";

export interface HeroContent {
  title: string;
  tagline: string;
  description: string;
}

const DEFAULTS: HeroContent = {
  title: "Frontend\nDeveloper",
  tagline: "Banking sector · Enterprise systems · Now full-stack",
  description:
    "Spent a few years building production apps for banks and enterprise clients — the kind real people depend on. Now going full-stack, and this portfolio is the first thing I'm shipping to prove it.",
};

export async function getHeroContent(): Promise<HeroContent> {
  const rows = await prisma.setting.findMany({
    where: { key: { in: ["hero_title", "hero_tagline", "hero_description"] } },
  });
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return {
    title: map["hero_title"] ?? DEFAULTS.title,
    tagline: map["hero_tagline"] ?? DEFAULTS.tagline,
    description: map["hero_description"] ?? DEFAULTS.description,
  };
}
