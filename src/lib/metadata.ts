import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LOCALES } from "@/data/locale";

/**
 * Canonical + hreflang + OpenGraph metadata for a localized detail page
 * (`/[locale]/<section>/<slug>`). Shared by the project and course pages.
 */
export function buildDetailMetadata({
  section,
  slug,
  locale,
  title,
  description,
}: {
  section: "projects" | "courses";
  slug: string;
  locale: string;
  title: string;
  description: string;
}): Metadata {
  const base = siteConfig.url;
  const path = `/${section}/${slug}`;
  const url = `${base}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${base}/${l}${path}`])),
    },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description,
      url,
      type: "article",
      images: [{ url: `${base}/opengraph-image`, width: 1200, height: 630, alt: siteConfig.name }],
    },
  };
}
