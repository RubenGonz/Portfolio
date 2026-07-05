import { courses } from "@/data/courses";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GhostNumber } from "@/components/ui/GhostNumber";
import { CourseCard } from "@/components/ui/CourseCard";
import { Section } from "@/components/ui/Section";

export const CoursesSection = () => {
  return (
    <Section id="courses">
      <SectionHeader label="Courses" srTitle="Courses" />

      <div className="relative max-w-4xl">
        <GhostNumber>03</GhostNumber>

        <div className="flex flex-col gap-4">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </Section>
  );
};
