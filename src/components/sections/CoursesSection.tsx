import Link from "next/link";
import { getCourses } from "@/data/courses";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GhostNumber } from "@/components/ui/GhostNumber";
import { CourseCard } from "@/components/ui/CourseCard";
import { Section } from "@/components/ui/Section";

const PREVIEW_COUNT = 2;

export const CoursesSection = async () => {
  const courses = await getCourses();
  const preview = courses.slice(0, PREVIEW_COUNT);
  const remaining = courses.length - PREVIEW_COUNT;

  return (
    <Section id="courses">
      <SectionHeader label="Courses" srTitle="Courses" />

      <div className="relative max-w-4xl">
        <GhostNumber>03</GhostNumber>

        <div className="flex flex-col gap-4">
          {preview.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>

        {courses.length > PREVIEW_COUNT && (
          <div className="mt-6">
            <Link
              href="/courses"
              className="font-inputmono text-[11px] tracking-widest uppercase text-subtle
                hover:text-brand transition-colors duration-150 inline-flex items-center gap-2"
            >
              View {remaining} more →
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
};
