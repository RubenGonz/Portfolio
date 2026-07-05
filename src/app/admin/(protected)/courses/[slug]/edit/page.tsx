import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/data/courses";
import { EditCourseForm } from "./EditCourseForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function EditCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit · ${course.title}`} />
      <EditCourseForm course={course} />
    </div>
  );
}
