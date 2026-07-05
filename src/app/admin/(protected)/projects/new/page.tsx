"use client";

import { useActionState } from "react";
import { createProject } from "@/actions/projects";
import { FormField, TextareaField, SelectField } from "@/components/admin/FormField";
import { ChipEditor } from "@/components/admin/ChipEditor";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const statusOptions = [
  { value: "in-progress", label: "In Progress" },
  { value: "live", label: "Live" },
  { value: "archived", label: "Archived" },
];

export default function NewProjectPage() {
  const [error, action] = useActionState(createProject, undefined);

  return (
    <div>
      <AdminPageHeader title="New Project" />

      <form action={action} className="flex flex-col gap-5 max-w-2xl">
        <FormField label="Slug" name="slug" required hint="URL-safe, unique (e.g. my-project)" />
        <FormField label="Title" name="title" required />
        <FormField label="Year" name="year" type="number" defaultValue={String(new Date().getFullYear())} required />
        <SelectField label="Status" name="status" options={statusOptions} defaultValue="in-progress" />
        <FormField label="Role" name="role" />
        <FormField label="Live URL" name="url" type="url" />
        <FormField label="Repo URL" name="repoUrl" type="url" />
        <TextareaField label="Short Description" name="shortDescription" required rows={3} />
        <TextareaField label="Full Description" name="fullDescription" required rows={10} />
        <ChipEditor label="Tags" name="tags" hint="Type and press Enter to add" />
        <ChipEditor label="Highlights" name="highlights" hint="Type and press Enter to add" />

        {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
        <SubmitButton label="Create Project" />
      </form>
    </div>
  );
}
