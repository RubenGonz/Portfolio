import Link from "next/link";
import { courses } from "@/data/courses";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const CoursesSection = () => {
  return (
    <section id="courses" className="px-6 md:px-16 py-16 md:py-28 max-w-5xl mx-auto">
      <h2 className="sr-only">Courses</h2>
      <p className="font-inputmono text-gray-400 text-[11px] tracking-[0.2em] uppercase mb-1" aria-hidden="true">
        {"// Courses"}
      </p>
      <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand mb-8 md:mb-10" />

      <div className="relative max-w-4xl">
        {/* Decorative number */}
        <span aria-hidden="true" className="absolute -top-2 right-0 font-n27 font-bold italic text-[60px] md:text-[80px] leading-none text-white/[0.02] select-none pointer-events-none">
          03
        </span>

        <div className="flex flex-col gap-4">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 md:gap-8 items-center
                border border-white/5 bg-white/[0.01] px-6 py-5
                hover:border-brand/30 hover:bg-white/[0.02] transition-all duration-200"
            >
              {/* Left: platform + year + status */}
              <div className="flex md:flex-col gap-3 md:gap-2 items-start">
                <span className="font-inputmono text-[11px] text-brand tracking-widest uppercase">
                  {course.platform}
                </span>
                <span className="font-inputmono text-[11px] text-gray-500 tracking-widest">
                  {course.year}
                </span>
                <StatusBadge status={course.status} />
              </div>

              {/* Center: title + description */}
              <div>
                <h3 className="font-n27 font-bold italic text-light text-lg md:text-xl leading-tight mb-2
                  group-hover:text-brand transition-colors duration-200">
                  {course.title}
                </h3>
                <p className="font-inputmono text-gray-400 text-xs leading-relaxed line-clamp-2">
                  {course.shortDescription}
                </p>
              </div>

              {/* Right: arrow */}
              <span className="hidden md:block font-inputmono text-gray-600 group-hover:text-brand transition-colors duration-200 text-sm">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
