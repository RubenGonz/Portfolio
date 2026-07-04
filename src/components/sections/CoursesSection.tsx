import { courses } from "@/data/courses";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GhostNumber } from "@/components/ui/GhostNumber";
import { CourseCard } from "@/components/ui/CourseCard";

export const CoursesSection = () => {
  return (
    <section id="courses" className="px-6 md:px-16 py-16 md:py-28 max-w-5xl mx-auto">
      <SectionHeader label="Courses" srTitle="Courses" />

      <div className="relative max-w-4xl">
        <GhostNumber>03</GhostNumber>

        <div className="flex flex-col gap-4">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};
