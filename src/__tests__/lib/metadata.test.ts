import { buildDetailMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

const base = siteConfig.url;

describe("buildDetailMetadata", () => {
  const meta = buildDetailMetadata({
    section: "projects",
    slug: "my-app",
    locale: "es",
    title: "My App",
    description: "Desc",
  });

  it("sets title and description", () => {
    expect(meta.title).toBe("My App");
    expect(meta.description).toBe("Desc");
  });

  it("builds the canonical URL for the given locale", () => {
    expect(meta.alternates?.canonical).toBe(`${base}/es/projects/my-app`);
  });

  it("includes hreflang alternates for every locale", () => {
    expect(meta.alternates?.languages).toEqual({
      en: `${base}/en/projects/my-app`,
      es: `${base}/es/projects/my-app`,
    });
  });

  it("builds OpenGraph with url, article type, suffixed title and OG image", () => {
    expect(meta.openGraph).toMatchObject({
      url: `${base}/es/projects/my-app`,
      type: "article",
      title: `My App — ${siteConfig.name}`,
      images: [{ url: `${base}/opengraph-image`, width: 1200, height: 630, alt: siteConfig.name }],
    });
  });

  it("respects the section segment", () => {
    const courses = buildDetailMetadata({
      section: "courses",
      slug: "node",
      locale: "en",
      title: "Node",
      description: "d",
    });
    expect(courses.alternates?.canonical).toBe(`${base}/en/courses/node`);
  });
});
