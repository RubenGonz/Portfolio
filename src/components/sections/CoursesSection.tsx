import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/navigation";
import { getCourses } from "@/data/courses";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GhostNumber } from "@/components/ui/GhostNumber";
import { CourseCard } from "@/components/ui/CourseCard";
import { Section } from "@/components/ui/Section";
import { AnimateIn } from "@/components/ui/AnimateIn";

const PREVIEW_COUNT = 2;

export const CoursesSection = async () => {
  const t = await getTranslations("courses");
  const locale = await getLocale();
  const courses = await getCourses(locale);
  const preview = courses.slice(0, PREVIEW_COUNT);
  const remaining = courses.length - PREVIEW_COUNT;

  return (
    <Section id="courses">
      <SectionHeader label={t("sectionLabel")} srTitle={t("sectionLabel")} />

      <div className="relative max-w-4xl">
        <GhostNumber>03</GhostNumber>

        <div className="flex flex-col gap-4">
          {preview.map((course, i) => (
            <AnimateIn key={course.slug} delay={((i + 1) as 1 | 2)} animateOut>
              <CourseCard course={course} />
            </AnimateIn>
          ))}
        </div>

        {courses.length > PREVIEW_COUNT && (
          <div className="mt-6">
            <Link
              href="/courses"
              className="font-inputmono text-[11px] tracking-widest uppercase text-subtle
                hover:text-brand transition-colors duration-150 inline-flex items-center gap-2"
            >
              {t("viewMore", { count: remaining })}
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
};
