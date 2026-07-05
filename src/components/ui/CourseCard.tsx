import Link from "next/link";
import type { Course } from "@/types";
import { StatusBadge } from "./StatusBadge";

interface Props {
  course: Course;
  /** Heading level for the title — keeps the document outline correct per page. */
  headingLevel?: 2 | 3;
}

/** Horizontal course card — shared by the home Courses section and the /courses listing. */
export const CourseCard = ({ course, headingLevel = 3 }: Props) => {
  const Title = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 md:gap-8 items-center
        border border-line/5 bg-line/1 px-6 py-5
        hover:border-brand/30 hover:bg-line/2 transition-all duration-200"
    >
      {/* Left: platform + year + status */}
      <div className="flex md:flex-col gap-3 md:gap-2 items-start">
        <span className="font-inputmono text-[11px] text-brand tracking-widest uppercase">
          {course.platform}
        </span>
        <span className="font-inputmono text-[11px] text-subtle tracking-widest">
          {course.year}
        </span>
        <StatusBadge status={course.status} />
      </div>

      {/* Center: title + description */}
      <div>
        <Title className="font-n27 font-bold italic text-fg text-lg md:text-xl leading-tight mb-2
          group-hover:text-brand transition-colors duration-200">
          {course.title}
        </Title>
        <p className="font-inputmono text-muted text-xs leading-relaxed line-clamp-2">
          {course.shortDescription}
        </p>
      </div>

      {/* Right: arrow */}
      <span className="hidden md:block font-inputmono text-faint group-hover:text-brand transition-colors duration-200 text-sm">
        →
      </span>
    </Link>
  );
};
