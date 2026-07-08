/** Supported content locales. Mirrors src/i18n/routing.ts. */
export type Locale = "en" | "es";

/** The locale every piece of content is guaranteed to have. */
export const DEFAULT_LOCALE: Locale = "en";

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
