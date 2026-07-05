"use client";

import { useActionState } from "react";
import { createCourse } from "@/actions/courses";
import { FormField, TextareaField, SelectField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import Link from "next/link";

const statusOptions = [
  { value: "not-started", label: "Not Started" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function NewCoursePage() {
  const [error, action] = useActionState(createCourse, undefined);

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/courses" className="font-inputmono text-[11px] text-subtle hover:text-fg transition-colors">
          ← Courses
        </Link>
        <h1 className="font-n27 font-bold italic text-2xl text-fg">New Course</h1>
      </div>

      <form action={action} className="flex flex-col gap-5 max-w-2xl">
        <FormField label="Slug" name="slug" required hint="URL-safe, unique" />
        <FormField label="Title" name="title" required />
        <FormField label="Platform" name="platform" required hint="e.g. Udemy, Coursera" />
        <FormField label="Year" name="year" type="number" defaultValue={String(new Date().getFullYear())} required />
        <SelectField label="Status" name="status" options={statusOptions} defaultValue="not-started" />
        <FormField label="Certificate URL" name="certificateUrl" type="url" />
        <FormField label="Repo URL" name="repoUrl" type="url" />
        <FormField label="Demo URL" name="demoUrl" type="url" />
        <TextareaField label="Short Description" name="shortDescription" required rows={2} />
        <TextareaField label="Full Description" name="fullDescription" required rows={6} />
        <TextareaField label="Tags" name="tags" hint="One per line" rows={3} />
        <TextareaField
          label="Topics (JSON)"
          name="topics"
          hint='[{"label":"Section","items":["item1","item2"]}]'
          rows={4}
          defaultValue="[]"
        />

        {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
        <SubmitButton label="Create Course" />
      </form>
    </div>
  );
}
