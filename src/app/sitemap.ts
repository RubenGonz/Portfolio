import type { MetadataRoute } from "next";
import { getProjects } from "@/data/projects";
import { getCourses } from "@/data/courses";
import { siteConfig } from "@/config/site";

const locales = ["en", "es"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const [projects, courses] = await Promise.all([getProjects(), getCourses()]);

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    { url: `${base}/${locale}`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/${locale}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/${locale}/courses`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ]);

  const projectRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projects.map((p) => ({
      url: `${base}/${locale}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const courseRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    courses.map((c) => ({
      url: `${base}/${locale}/courses/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...projectRoutes, ...courseRoutes];
}
