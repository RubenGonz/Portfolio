/** Framework-free single source of truth for the supported locales.
 *  Kept dependency-free (no next-intl import) so the data layer and tests can
 *  use it without pulling the i18n runtime into their module graph. */
export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
