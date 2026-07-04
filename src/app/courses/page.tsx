import type { Metadata } from "next";
import Link from "next/link";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "Certifications and courses completed by Rubén González Rodríguez — Node.js, Next.js and full-stack development.",
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen px-6 md:px-16 pt-28 pb-16 max-w-5xl mx-auto">
      <Link
        href="/#courses"
        className="font-inputmono text-[11px] text-gray-600 hover:text-gray-300 transition-colors mb-10 inline-flex items-center gap-2 tracking-widest uppercase"
      >
        <span className="text-brand">←</span> Back
      </Link>

      <p className="font-inputmono text-gray-400 text-[11px] tracking-[0.2em] uppercase mb-1" aria-hidden="true">
        {"// Courses"}
      </p>
      <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand mb-10" />

      <h1 className="sr-only">Courses & Certifications</h1>

      <div className="flex flex-col gap-4 max-w-4xl">
        {courses.map((course) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            className="group grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 md:gap-8 items-center
              border border-white/5 bg-white/[0.01] px-6 py-5
              hover:border-brand/30 hover:bg-white/[0.02] transition-all duration-200"
          >
            <div className="flex md:flex-col gap-3 md:gap-1">
              <span className="font-inputmono text-[11px] text-brand tracking-widest uppercase">
                {course.platform}
              </span>
              <span className="font-inputmono text-[11px] text-gray-500 tracking-widest">
                {course.year}
              </span>
            </div>

            <div>
              <h2 className="font-n27 font-bold italic text-light text-lg md:text-xl leading-tight mb-2
                group-hover:text-brand transition-colors duration-200">
                {course.title}
              </h2>
              <p className="font-inputmono text-gray-400 text-xs leading-relaxed line-clamp-2">
                {course.shortDescription}
              </p>
            </div>

            <span className="hidden md:block font-inputmono text-gray-600 group-hover:text-brand transition-colors duration-200 text-sm">
              →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
