import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rubengonz.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/maintenance", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
