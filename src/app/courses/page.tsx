import type { Metadata } from "next";
import { courses } from "@/data/courses";
import { BackLink } from "@/components/ui/BackLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CoursesListing } from "@/components/courses/CoursesListing";

export const metadata: Metadata = {
  title: "Courses",
  description: "Certifications and courses completed by Rubén González Rodríguez — Node.js, Next.js and full-stack development.",
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen px-6 md:px-16 pt-28 pb-16 max-w-5xl mx-auto">
      <BackLink label="Back" fallbackHref="/#courses" />

      <SectionHeader label="Courses" srTitle="Courses & Certifications" />

      <CoursesListing courses={courses} />
    </main>
  );
}
