import { notFound } from "next/navigation";
import { getProjectForEdit } from "@/data/projects";
import { DEFAULT_LOCALE } from "@/data/locale";
import { EditProjectForm } from "./EditProjectForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectForEdit(slug);
  if (!project) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit · ${project.translations[DEFAULT_LOCALE].title}`} />
      <EditProjectForm project={project} />
    </div>
  );
}
