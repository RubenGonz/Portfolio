-- i18n: split translatable content into per-locale translation tables.
-- Existing content is English → copied into *Translation rows with locale = 'en'
-- BEFORE the old columns are dropped, so no data is lost (prod-safe).

-- ─── Project ────────────────────────────────────────────────────────────────
CREATE TABLE "ProjectTranslation" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "highlights" TEXT[],
    "role" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectTranslation_pkey" PRIMARY KEY ("id")
);

INSERT INTO "ProjectTranslation" ("id", "locale", "title", "shortDescription", "fullDescription", "highlights", "role", "projectId")
SELECT gen_random_uuid()::text, 'en', "title", "shortDescription", "fullDescription", "highlights", "role", "id"
FROM "Project";

ALTER TABLE "Project"
    DROP COLUMN "title",
    DROP COLUMN "shortDescription",
    DROP COLUMN "fullDescription",
    DROP COLUMN "highlights",
    DROP COLUMN "role";

CREATE UNIQUE INDEX "ProjectTranslation_projectId_locale_key" ON "ProjectTranslation"("projectId", "locale");

ALTER TABLE "ProjectTranslation"
    ADD CONSTRAINT "ProjectTranslation_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── Course ─────────────────────────────────────────────────────────────────
CREATE TABLE "CourseTranslation" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "topics" JSONB NOT NULL,
    "tags" TEXT[],
    "courseId" TEXT NOT NULL,

    CONSTRAINT "CourseTranslation_pkey" PRIMARY KEY ("id")
);

INSERT INTO "CourseTranslation" ("id", "locale", "title", "shortDescription", "fullDescription", "topics", "tags", "courseId")
SELECT gen_random_uuid()::text, 'en', "title", "shortDescription", "fullDescription", "topics", "tags", "id"
FROM "Course";

ALTER TABLE "Course"
    DROP COLUMN "title",
    DROP COLUMN "shortDescription",
    DROP COLUMN "fullDescription",
    DROP COLUMN "topics",
    DROP COLUMN "tags";

CREATE UNIQUE INDEX "CourseTranslation_courseId_locale_key" ON "CourseTranslation"("courseId", "locale");

ALTER TABLE "CourseTranslation"
    ADD CONSTRAINT "CourseTranslation_courseId_fkey"
    FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── TimelineEntry ──────────────────────────────────────────────────────────
CREATE TABLE "TimelineEntryTranslation" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "paragraphs" TEXT[],
    "entryId" TEXT NOT NULL,

    CONSTRAINT "TimelineEntryTranslation_pkey" PRIMARY KEY ("id")
);

INSERT INTO "TimelineEntryTranslation" ("id", "locale", "title", "subtitle", "paragraphs", "entryId")
SELECT gen_random_uuid()::text, 'en', "title", "subtitle", "paragraphs", "id"
FROM "TimelineEntry";

ALTER TABLE "TimelineEntry"
    DROP COLUMN "title",
    DROP COLUMN "subtitle",
    DROP COLUMN "paragraphs";

CREATE UNIQUE INDEX "TimelineEntryTranslation_entryId_locale_key" ON "TimelineEntryTranslation"("entryId", "locale");

ALTER TABLE "TimelineEntryTranslation"
    ADD CONSTRAINT "TimelineEntryTranslation_entryId_fkey"
    FOREIGN KEY ("entryId") REFERENCES "TimelineEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── Setting: single PK (key) → composite PK (key, locale) ──────────────────
-- Existing rows are English content, so tag them with locale = 'en'.
ALTER TABLE "Setting" ADD COLUMN "locale" TEXT NOT NULL DEFAULT 'en';
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_pkey";
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_pkey" PRIMARY KEY ("key", "locale");
-- Drop the default now that existing rows are backfilled; app writes locale explicitly.
ALTER TABLE "Setting" ALTER COLUMN "locale" DROP DEFAULT;
