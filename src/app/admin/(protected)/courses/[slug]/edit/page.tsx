import { notFound } from "next/navigation";
import { getCourseForEdit } from "@/data/courses/edit";
import { DEFAULT_LOCALE } from "@/data/locale";
import { EditCourseForm } from "./EditCourseForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function EditCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseForEdit(slug);
  if (!course) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit · ${course.translations[DEFAULT_LOCALE].title}`} />
      <EditCourseForm course={course} />
    </div>
  );
}
