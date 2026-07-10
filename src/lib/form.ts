import { LOCALES } from "@/data/locale";

/**
 * Trimmed field readers over a submitted admin FormData.
 * - `get`   — trimmed string (empty string when absent)
 * - `lines` — newline-separated list, trimmed and de-blanked
 * - `json`  — parsed JSON, or `fallback` when the field is empty/invalid
 */
export function formReader(fd: FormData) {
  const get = (key: string) => (fd.get(key) as string | null)?.trim() ?? "";
  const lines = (key: string) =>
    get(key).split("\n").map((s) => s.trim()).filter(Boolean);
  const json = <T>(key: string, fallback: T): T => {
    try {
      return JSON.parse(get(key)) as T;
    } catch {
      return fallback;
    }
  };
  return { get, lines, json };
}

/**
 * Locales whose translation carries real content (a non-empty title). The rest
 * are dropped on write so the public site falls back to the default locale.
 */
export const filledLocales = <T extends { title: string }>(
  translations: Record<string, T>,
) => LOCALES.filter((l) => translations[l]?.title.trim());
