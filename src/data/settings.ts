import { prisma } from "@/lib/prisma";
import { DEFAULT_LOCALE, LOCALES } from "./locale";

export interface HeroContent {
  title: string;
  tagline: string;
  description: string;
}

export interface ContactContent {
  headline: string;
  subtext: string;
}

export interface AvailableContent {
  available: boolean;
  label: string;
}

export interface HomeContent {
  hero: HeroContent;
  tickerText: string;
  contact: ContactContent;
  available: AvailableContent;
  cvUrl: string;
}

const DEFAULTS = {
  hero: {
    title: "Frontend\nDeveloper",
    tagline: "Banking sector · Enterprise systems · Now full-stack",
    description: "Spent a few years building production apps for banks and enterprise clients — the kind real people depend on. Now going full-stack, and this portfolio is the first thing I'm shipping to prove it.",
  },
  tickerText: "React · Angular · TypeScript · Next.js · Node.js · PostgreSQL · Tailwind CSS · Git · Jest · Express · Prisma · Docker · GraphQL · Redux · MongoDB",
  contact: {
    headline: "Let's talk.",
    subtext: "Open to full-time roles, freelance and collaborations.\nBased in Elche, Spain. I usually reply within 24 hours.",
  },
};

const KEYS = ["hero_title", "hero_tagline", "hero_description", "ticker_text", "contact_headline", "contact_subtext", "available", "available_label", "cv_url"];

export async function getHomeContent(locale: string = DEFAULT_LOCALE): Promise<HomeContent> {
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
}

export async function getHeroContent(locale: string = DEFAULT_LOCALE): Promise<HeroContent> {
  const home = await getHomeContent(locale);
  return home.hero;
}

// ─── Admin editing ──────────────────────────────────────────────────────────

export interface HomeLocalizedEdit {
  heroTitle: string;
  heroTagline: string;
  heroDescription: string;
  tickerText: string;
  contactHeadline: string;
  contactSubtext: string;
  availableLabel: string;
}

export interface HomeEdit {
  available: boolean; // neutral
  cvUrl: string; // neutral
  /** Raw per-locale values (no fallback) so empty locales show as empty. */
  translations: Record<string, HomeLocalizedEdit>;
}

/** Every localized setting, per locale, for the admin edit forms.
 *  English falls back to the built-in defaults; other locales stay empty. */
export async function getHomeForEdit(): Promise<HomeEdit> {
  const rows = await prisma.setting.findMany({ where: { key: { in: KEYS } } });
  const map = new Map<string, string>();
  for (const r of rows) map.set(`${r.locale}:${r.key}`, r.value);

  const val = (locale: string, key: string, fallback = "") => {
    const stored = map.get(`${locale}:${key}`);
    if (stored !== undefined) return stored;
    return locale === DEFAULT_LOCALE ? fallback : "";
  };

  const translations: Record<string, HomeLocalizedEdit> = {};
  for (const locale of LOCALES) {
    translations[locale] = {
      heroTitle: val(locale, "hero_title", DEFAULTS.hero.title),
      heroTagline: val(locale, "hero_tagline", DEFAULTS.hero.tagline),
      heroDescription: val(locale, "hero_description", DEFAULTS.hero.description),
      tickerText: val(locale, "ticker_text", DEFAULTS.tickerText),
      contactHeadline: val(locale, "contact_headline", DEFAULTS.contact.headline),
      contactSubtext: val(locale, "contact_subtext", DEFAULTS.contact.subtext),
      availableLabel: val(locale, "available_label", "Available"),
    };
  }

  return {
    available: map.get(`${DEFAULT_LOCALE}:available`) !== "false",
    cvUrl: map.get(`${DEFAULT_LOCALE}:cv_url`) ?? "",
    translations,
  };
}
