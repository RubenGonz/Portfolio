import { PrismaClient } from "@prisma/client";
import { projects, projectTranslationsEs } from "./seed-data/projects";
import { courses, courseTranslationsEs } from "./seed-data/courses";
import { timelineEntries, timelineTranslationsEs } from "./seed-data/timeline";
import { stackItems } from "./seed-data/stack";
import { settings, settingsEs } from "./seed-data/settings";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database…");

  // ─── Projects ─────────────────────────────────────────────────────────────
  for (const p of projects) {
    const project = await prisma.project.upsert({
      where: { slug: p.slug },
      update: {}, // never overwrite neutral fields / admin edits
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
      },
    });

    // English (default) translation.
    await prisma.projectTranslation.upsert({
      where: { projectId_locale: { projectId: project.id, locale: "en" } },
      update: {},
      create: {
        projectId: project.id,
        locale: "en",
        title: p.title,
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        highlights: p.highlights,
        role: p.role,
      },
    });

    // Spanish translation.
    const es = projectTranslationsEs[p.slug];
    if (es) {
      await prisma.projectTranslation.upsert({
        where: { projectId_locale: { projectId: project.id, locale: "es" } },
        update: {},
        create: { projectId: project.id, locale: "es", ...es },
      });
    }
  }

  // ─── Courses ──────────────────────────────────────────────────────────────
  for (const c of courses) {
    const course = await prisma.course.upsert({
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
      },
    });

    await prisma.courseTranslation.upsert({
      where: { courseId_locale: { courseId: course.id, locale: "en" } },
      update: {},
      create: {
        courseId: course.id,
        locale: "en",
        title: c.title,
        shortDescription: c.shortDescription,
        fullDescription: c.fullDescription,
        topics: c.topics,
        tags: c.tags,
      },
    });

    const es = courseTranslationsEs[c.slug];
    if (es) {
      await prisma.courseTranslation.upsert({
        where: { courseId_locale: { courseId: course.id, locale: "es" } },
        update: {},
        create: { courseId: course.id, locale: "es", ...es },
      });
    }
  }

  // ─── Timeline ─────────────────────────────────────────────────────────────
  // No natural unique key beyond the year label — match on it for idempotency.
  for (const [i, e] of timelineEntries.entries()) {
    let entry = await prisma.timelineEntry.findFirst({ where: { year: e.year } });
    if (!entry) {
      entry = await prisma.timelineEntry.create({
        data: { year: e.year, current: e.current ?? false, order: e.order ?? i },
      });
    }

    await prisma.timelineEntryTranslation.upsert({
      where: { entryId_locale: { entryId: entry.id, locale: "en" } },
      update: {},
      create: {
        entryId: entry.id,
        locale: "en",
        title: e.title,
        subtitle: e.subtitle ?? null,
        paragraphs: e.paragraphs,
      },
    });

    const es = timelineTranslationsEs[e.year];
    if (es) {
      await prisma.timelineEntryTranslation.upsert({
        where: { entryId_locale: { entryId: entry.id, locale: "es" } },
        update: {},
        create: { entryId: entry.id, locale: "es", ...es },
      });
    }
  }

  // ─── Stack ────────────────────────────────────────────────────────────────
  const stackCount = await prisma.stackItem.count();
  if (stackCount === 0) {
    await prisma.stackItem.createMany({ data: stackItems });
  }

  // ─── Settings ─────────────────────────────────────────────────────────────
  // upsert so existing admin edits are preserved on re-seed.
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key_locale: { key: s.key, locale: "en" } },
      update: {},
      create: { key: s.key, locale: "en", value: s.value },
    });
  }
  for (const s of settingsEs) {
    await prisma.setting.upsert({
      where: { key_locale: { key: s.key, locale: "es" } },
      update: {},
      create: { key: s.key, locale: "es", value: s.value },
    });
  }

  console.log(
    `Seeded ${projects.length} project(s), ${courses.length} course(s), ` +
    `${timelineEntries.length} timeline entries, ${stackItems.length} stack items ` +
    `(English + Spanish).`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
