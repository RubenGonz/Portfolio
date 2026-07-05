import { PrismaClient } from "@prisma/client";
import { projects } from "./seed-data/projects";
import { courses } from "./seed-data/courses";
import { timelineEntries } from "./seed-data/timeline";
import { stackItems } from "./seed-data/stack";
import { settings } from "./seed-data/settings";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database…");

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

  // Timeline — skip if any entries already exist
  const timelineCount = await prisma.timelineEntry.count();
  if (timelineCount === 0) {
    await prisma.timelineEntry.createMany({ data: timelineEntries });
  }

  // Stack — skip if any items already exist
  const stackCount = await prisma.stackItem.count();
  if (stackCount === 0) {
    await prisma.stackItem.createMany({ data: stackItems });
  }

  // Settings — upsert so existing edits are preserved on re-seed
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  console.log(
    `Seeded ${projects.length} project(s), ${courses.length} course(s), ` +
    `${timelineEntries.length} timeline entries, ${stackItems.length} stack items.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
