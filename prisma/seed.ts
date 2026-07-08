import { PrismaClient } from "@prisma/client";
import { projects } from "./seed-data/projects";
import { courses } from "./seed-data/courses";
import { timelineEntries } from "./seed-data/timeline";
import { stackItems } from "./seed-data/stack";
import { settings } from "./seed-data/settings";

const prisma = new PrismaClient();

// Seed fixtures are authored in English → the default content locale.
const LOCALE = "en";

async function main() {
  console.log("Seeding database…");

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        tags: p.tags,
        url: p.url,
        repoUrl: p.repoUrl,
        featured: p.featured,
        year: p.year,
        status: p.status,
        images: {
          create: (p.images ?? []).map((img, i) => ({
            name: img.name,
            src: img.src,
            alt: img.alt,
            order: i,
          })),
        },
        translations: {
          create: {
            locale: LOCALE,
            title: p.title,
            shortDescription: p.shortDescription,
            fullDescription: p.fullDescription,
            highlights: p.highlights,
            role: p.role,
          },
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
        platform: c.platform,
        year: c.year,
        status: c.status,
        certificateUrl: c.certificateUrl,
        repoUrl: c.repoUrl,
        demoUrl: c.demoUrl,
        translations: {
          create: {
            locale: LOCALE,
            title: c.title,
            shortDescription: c.shortDescription,
            fullDescription: c.fullDescription,
            topics: c.topics,
            tags: c.tags,
          },
        },
      },
    });
  }

  // Timeline — skip if any entries already exist
  const timelineCount = await prisma.timelineEntry.count();
  if (timelineCount === 0) {
    for (const [i, e] of timelineEntries.entries()) {
      await prisma.timelineEntry.create({
        data: {
          year: e.year,
          current: e.current ?? false,
          order: e.order ?? i,
          translations: {
            create: {
              locale: LOCALE,
              title: e.title,
              subtitle: e.subtitle ?? null,
              paragraphs: e.paragraphs,
            },
          },
        },
      });
    }
  }

  // Stack — skip if any items already exist
  const stackCount = await prisma.stackItem.count();
  if (stackCount === 0) {
    await prisma.stackItem.createMany({ data: stackItems });
  }

  // Settings — upsert so existing edits are preserved on re-seed.
  // Seed content is English → stored under the default locale.
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key_locale: { key: s.key, locale: LOCALE } },
      update: {},
      create: { key: s.key, locale: LOCALE, value: s.value },
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
