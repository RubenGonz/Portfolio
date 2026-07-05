import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/data/courses";
import { EditCourseForm } from "./EditCourseForm";
import Link from "next/link";

export default async function EditCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/courses" className="font-inputmono text-[11px] text-subtle hover:text-fg transition-colors">
          ← Courses
        </Link>
        <h1 className="font-n27 font-bold italic text-2xl text-fg">Edit Course</h1>
      </div>
      <EditCourseForm course={course} />
    </div>
  );
}
