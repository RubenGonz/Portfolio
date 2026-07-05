import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { EditProjectForm } from "./EditProjectForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit · ${project.title}`} />
      <EditProjectForm project={project} />
    </div>
  );
}
