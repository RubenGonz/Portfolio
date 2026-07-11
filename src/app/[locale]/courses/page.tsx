import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getCourses } from "@/data/courses";
import { BackLink, SectionHeader } from "@/components/ui";
import { CoursesListing } from "@/components/courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "Certifications and courses completed by Rubén González Rodríguez — Node.js, Next.js and full-stack development.",
};

export default async function CoursesPage() {
  const t = await getTranslations("courses");
  const courses = await getCourses(await getLocale());

  return (
    <main className="min-h-screen px-6 md:px-16 pt-28 pb-16 max-w-5xl mx-auto">
      <BackLink label={t("back")} fallbackHref="/#courses" />
      <SectionHeader label={t("sectionLabel")} srTitle={t("sectionLabel")} />
      <CoursesListing courses={courses} />
    </main>
  );
}
