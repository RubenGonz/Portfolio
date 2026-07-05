"use client";

import { useActionState } from "react";
import { updateProject } from "@/actions/projects";
import { FormField, TextareaField, SelectField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { Project } from "@/types";

const statusOptions = [
  { value: "in-progress", label: "In Progress" },
  { value: "live", label: "Live" },
  { value: "archived", label: "Archived" },
];

export function EditProjectForm({ project }: { project: Project }) {
  const updateWithSlug = updateProject.bind(null, project.slug);
  const [error, action] = useActionState(updateWithSlug, undefined);

  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <FormField label="Slug" name="slug" defaultValue={project.slug} required />
      <FormField label="Title" name="title" defaultValue={project.title} required />
      <FormField label="Year" name="year" type="number" defaultValue={String(project.year)} required />
      <SelectField label="Status" name="status" options={statusOptions} defaultValue={project.status} />
      <FormField label="Role" name="role" defaultValue={project.role} />
      <FormField label="Live URL" name="url" type="url" defaultValue={project.url} />
      <FormField label="Repo URL" name="repoUrl" type="url" defaultValue={project.repoUrl} />
      <TextareaField label="Short Description" name="shortDescription" defaultValue={project.shortDescription} required rows={2} />
      <TextareaField label="Full Description" name="fullDescription" defaultValue={project.fullDescription} required rows={6} />
      <TextareaField label="Tags" name="tags" defaultValue={project.tags.join("\n")} hint="One per line" rows={3} />
      <TextareaField label="Highlights" name="highlights" defaultValue={project.highlights.join("\n")} hint="One per line" rows={4} />
      <label className="flex items-center gap-2 font-inputmono text-[11px] tracking-widest uppercase text-subtle">
        <input type="checkbox" name="featured" defaultChecked={project.featured} className="accent-brand" />
        Featured
      </label>

      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
