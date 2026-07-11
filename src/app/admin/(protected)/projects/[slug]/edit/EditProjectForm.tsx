"use client";

import { useActionState } from "react";
import { updateProject } from "@/actions/projects";
import { FormField, TextareaField, SelectField } from "@/components/admin/FormField";
import { ChipEditor } from "@/components/admin/ChipEditor";
import { ImagesEditor } from "@/components/admin/ImagesEditor";
import { LocaleTabs } from "@/components/admin/LocaleTabs";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { LOCALES } from "@/data/locale";
import type { ProjectEdit } from "@/data/projects/edit";

const statusOptions = [
  { value: "in-progress", label: "In Progress" },
  { value: "live", label: "Live" },
  { value: "archived", label: "Archived" },
];

export function EditProjectForm({ project }: { project: ProjectEdit }) {
  const updateWithSlug = updateProject.bind(null, project.slug);
  const [error, action] = useActionState(updateWithSlug, undefined);

  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <FormField label="Slug" name="slug" defaultValue={project.slug} required />
      <FormField label="Year" name="year" type="number" defaultValue={String(project.year)} required />
      <SelectField label="Status" name="status" options={statusOptions} defaultValue={project.status} />
      <FormField label="Live URL" name="url" type="url" defaultValue={project.url} />
      <FormField label="Repo URL" name="repoUrl" type="url" defaultValue={project.repoUrl} />
      <ChipEditor label="Tags" name="tags" defaultValue={project.tags} />

      <LocaleTabs
        locales={LOCALES}
        render={(locale) => {
          const tr = project.translations[locale];
          const L = locale.toUpperCase();
          return (
            <>
              <FormField label={`Title (${L})`} name={`title_${locale}`} defaultValue={tr.title} />
              <FormField label={`Role (${L})`} name={`role_${locale}`} defaultValue={tr.role} />
              <TextareaField label={`Short Description (${L})`} name={`shortDescription_${locale}`} defaultValue={tr.shortDescription} rows={3} />
              <TextareaField label={`Full Description (${L})`} name={`fullDescription_${locale}`} defaultValue={tr.fullDescription} rows={10} />
              <ChipEditor label={`Highlights (${L})`} name={`highlights_${locale}`} defaultValue={tr.highlights} />
            </>
          );
        }}
      />

      <ImagesEditor defaultValue={project.images} />

      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
