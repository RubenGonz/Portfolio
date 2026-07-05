import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { EditProjectForm } from "./EditProjectForm";
import Link from "next/link";

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="font-inputmono text-[11px] text-subtle hover:text-fg transition-colors">
          ← Projects
        </Link>
        <h1 className="font-n27 font-bold italic text-2xl text-fg">Edit Project</h1>
      </div>
      <EditProjectForm project={project} />
    </div>
  );
}
