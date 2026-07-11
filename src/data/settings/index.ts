import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOCALE } from "../locale";
import { DEFAULTS, KEYS } from "./defaults";
import type { HeroContent, HomeContent } from "@/types";

// Wrapped in cache() so the layout (available badge) and the page (hero,
// ticker, contact) share a single query per request instead of two.
export const getHomeContent = cache(async (locale: string = DEFAULT_LOCALE): Promise<HomeContent> => {
  // Fetch the requested locale plus the default, then prefer the requested
  // one per key — language-neutral keys (cv_url, available) only exist under
  // the default locale and resolve through this same fallback.
  const rows = await prisma.setting.findMany({
    where: { key: { in: KEYS }, locale: { in: [locale, DEFAULT_LOCALE] } },
  });
  const m: Record<string, string> = {};
  for (const r of rows) {
    if (r.locale === locale || m[r.key] === undefined) m[r.key] = r.value;
  }
  return {
    hero: {
      title:       m["hero_title"]       ?? DEFAULTS.hero.title,
      tagline:     m["hero_tagline"]     ?? DEFAULTS.hero.tagline,
      description: m["hero_description"] ?? DEFAULTS.hero.description,
    },
    tickerText: m["ticker_text"] ?? DEFAULTS.tickerText,
    contact: {
      headline: m["contact_headline"] ?? DEFAULTS.contact.headline,
      subtext:  m["contact_subtext"]  ?? DEFAULTS.contact.subtext,
    },
    available: {
      available: m["available"] !== "false",
      label:     m["available_label"] ?? "Available",
    },
    cvUrl: m["cv_url"] ?? "",
  };
});

export async function getHeroContent(locale: string = DEFAULT_LOCALE): Promise<HeroContent> {
  const home = await getHomeContent(locale);
  return home.hero;
}
