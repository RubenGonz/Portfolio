import { prisma } from "@/lib/prisma";
import { DEFAULT_LOCALE, LOCALES } from "../locale";
import { DEFAULTS, KEYS } from "./defaults";

// Admin edit DTOs for the home/settings content.

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
