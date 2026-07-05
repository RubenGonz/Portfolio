import { prisma } from "@/lib/prisma";
import type { Project } from "@/types";
import type { Project as PrismaProject, ProjectImage } from "@prisma/client";

/** Map a Prisma row (persistence model) to the app's domain Project type. */
function toProject(row: PrismaProject & { images: ProjectImage[] }): Project {
  return {
    slug: row.slug,
    title: row.title,
    shortDescription: row.shortDescription,
    fullDescription: row.fullDescription,
    tags: row.tags,
    highlights: row.highlights,
    role: row.role ?? undefined,
    url: row.url ?? undefined,
    repoUrl: row.repoUrl ?? undefined,
    featured: row.featured,
    year: row.year,
    status: row.status as Project["status"],
    images: row.images
      .sort((a, b) => a.order - b.order)
      .map((img) => ({ src: img.src, alt: img.alt })),
  };
}

export async function getProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    include: { images: true },
    orderBy: [{ featured: "desc" }, { year: "desc" }],
  });
  return rows.map(toProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const row = await prisma.project.findUnique({
    where: { slug },
    include: { images: true },
  });
  return row ? toProject(row) : undefined;
}
