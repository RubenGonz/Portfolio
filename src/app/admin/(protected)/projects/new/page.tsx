"use client";

import { useActionState } from "react";
import { createProject } from "@/actions/projects";
import { FormField, TextareaField, SelectField } from "@/components/admin/FormField";
import { ChipEditor } from "@/components/admin/ChipEditor";
import { ImagesEditor } from "@/components/admin/ImagesEditor";
import { LocaleTabs } from "@/components/admin/LocaleTabs";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { LOCALES, DEFAULT_LOCALE } from "@/data/locale";

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
        <FormField label="Year" name="year" type="number" defaultValue={String(new Date().getFullYear())} required />
        <SelectField label="Status" name="status" options={statusOptions} defaultValue="in-progress" />
        <FormField label="Live URL" name="url" type="url" />
        <FormField label="Repo URL" name="repoUrl" type="url" />
        <ChipEditor label="Tags" name="tags" hint="Type and press Enter to add" />

        <LocaleTabs
          locales={LOCALES}
          render={(locale) => {
            const L = locale.toUpperCase();
            const hint = locale === DEFAULT_LOCALE ? "Required" : "Optional — falls back to English";
            return (
              <>
                <FormField label={`Title (${L})`} name={`title_${locale}`} hint={hint} />
                <FormField label={`Role (${L})`} name={`role_${locale}`} />
                <TextareaField label={`Short Description (${L})`} name={`shortDescription_${locale}`} rows={3} />
                <TextareaField label={`Full Description (${L})`} name={`fullDescription_${locale}`} rows={10} />
                <ChipEditor label={`Highlights (${L})`} name={`highlights_${locale}`} hint="Type and press Enter to add" />
              </>
            );
          }}
        />

        <ImagesEditor />

        {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
        <SubmitButton label="Create Project" />
      </form>
    </div>
  );
}
