import { defineRouting } from "next-intl/routing";
import { LOCALES, DEFAULT_LOCALE } from "./locales";

export { LOCALES, DEFAULT_LOCALE, type Locale } from "./locales";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});
