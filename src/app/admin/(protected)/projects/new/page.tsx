"use client";

import { useActionState } from "react";
import { createProject } from "@/actions/projects";
import { FormField, TextareaField, SelectField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import Link from "next/link";

const statusOptions = [
  { value: "in-progress", label: "In Progress" },
  { value: "live", label: "Live" },
  { value: "archived", label: "Archived" },
];

export default function NewProjectPage() {
  const [error, action] = useActionState(createProject, undefined);

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="font-inputmono text-[11px] text-subtle hover:text-fg transition-colors">
          ← Projects
        </Link>
        <h1 className="font-n27 font-bold italic text-2xl text-fg">New Project</h1>
      </div>

      <form action={action} className="flex flex-col gap-5 max-w-2xl">
        <FormField label="Slug" name="slug" required hint="URL-safe, unique (e.g. my-project)" />
        <FormField label="Title" name="title" required />
        <FormField label="Year" name="year" type="number" defaultValue={String(new Date().getFullYear())} required />
        <SelectField label="Status" name="status" options={statusOptions} defaultValue="in-progress" />
        <FormField label="Role" name="role" />
        <FormField label="Live URL" name="url" type="url" />
        <FormField label="Repo URL" name="repoUrl" type="url" />
        <TextareaField label="Short Description" name="shortDescription" required rows={2} />
        <TextareaField label="Full Description" name="fullDescription" required rows={6} />
        <TextareaField label="Tags" name="tags" hint="One per line" rows={3} />
        <TextareaField label="Highlights" name="highlights" hint="One per line" rows={4} />
        <label className="flex items-center gap-2 font-inputmono text-[11px] tracking-widest uppercase text-subtle">
          <input type="checkbox" name="featured" className="accent-brand" />
          Featured
        </label>

        {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
        <SubmitButton label="Create Project" />
      </form>
    </div>
  );
}
