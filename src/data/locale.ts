/** Locale constants live in the i18n layer (single source of truth); the data
 *  layer re-exports them so content code can import everything locale-related
 *  from one place, alongside the translation-picking helper below. */
export { LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/locales";
import { DEFAULT_LOCALE } from "@/i18n/locales";

/**
 * Pick the translation row matching `locale`, falling back to the default
 * locale (and finally any available row) so the UI never renders blank.
 */
export function pickTranslation<T extends { locale: string }>(
  translations: T[],
  locale: string,
): T | undefined {
  return (
    translations.find((t) => t.locale === locale) ??
    translations.find((t) => t.locale === DEFAULT_LOCALE) ??
    translations[0]
  );
}
