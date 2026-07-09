import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";

const locales = ["en", "es"] as const;
const base = siteConfig.url;

function alternate(path: string) {
  return {
    languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, courses] = await Promise.all([
    prisma.project.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.course.findMany({ select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${base}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: alternate(""),
    },
    {
      url: `${base}/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: alternate("/projects"),
    },
    {
      url: `${base}/${locale}/courses`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: alternate("/courses"),
    },
    {
      url: `${base}/${locale}/cv`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: alternate("/cv"),
    },
  ]);

  const projectRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projects.map((p) => ({
      url: `${base}/${locale}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: alternate(`/projects/${p.slug}`),
    }))
  );

  const courseRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    courses.map((c) => ({
      url: `${base}/${locale}/courses/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: alternate(`/courses/${c.slug}`),
    }))
  );

  return [...staticRoutes, ...projectRoutes, ...courseRoutes];
}
