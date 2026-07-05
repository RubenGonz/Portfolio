import { PrismaClient } from "@prisma/client";
import { projects } from "./seed-data/projects";
import { courses } from "./seed-data/courses";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database…");

  // Projects (with nested images) — idempotent via upsert on slug
  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        tags: p.tags,
        highlights: p.highlights,
        role: p.role,
        url: p.url,
        repoUrl: p.repoUrl,
        featured: p.featured,
        year: p.year,
        status: p.status,
        images: {
          create: (p.images ?? []).map((img, i) => ({
            src: img.src,
            alt: img.alt,
            order: i,
          })),
        },
      },
    });
  }

  // Courses
  for (const c of courses) {
    await prisma.course.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        title: c.title,
        platform: c.platform,
        year: c.year,
        status: c.status,
        shortDescription: c.shortDescription,
        fullDescription: c.fullDescription,
        topics: c.topics,
        tags: c.tags,
        certificateUrl: c.certificateUrl,
        repoUrl: c.repoUrl,
        demoUrl: c.demoUrl,
      },
    });
  }

  console.log(`Seeded ${projects.length} project(s) and ${courses.length} course(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
