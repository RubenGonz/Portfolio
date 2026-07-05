"use client";

import { useActionState } from "react";
import { createCourse } from "@/actions/courses";
import { FormField, TextareaField, SelectField } from "@/components/admin/FormField";
import { ChipEditor } from "@/components/admin/ChipEditor";
import { TopicsEditor } from "@/components/admin/TopicsEditor";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const statusOptions = [
  { value: "not-started", label: "Not Started" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function NewCoursePage() {
  const [error, action] = useActionState(createCourse, undefined);

  return (
    <div>
      <AdminPageHeader title="New Course" />

      <form action={action} className="flex flex-col gap-5 max-w-2xl">
        <FormField label="Slug" name="slug" required hint="URL-safe, unique" />
        <FormField label="Title" name="title" required />
        <FormField label="Platform" name="platform" required hint="e.g. Udemy, Coursera" />
        <FormField label="Year" name="year" type="number" defaultValue={String(new Date().getFullYear())} required />
        <SelectField label="Status" name="status" options={statusOptions} defaultValue="not-started" />
        <FormField label="Certificate URL" name="certificateUrl" type="url" />
        <FormField label="Repo URL" name="repoUrl" type="url" />
        <FormField label="Demo URL" name="demoUrl" type="url" />
        <TextareaField label="Short Description" name="shortDescription" required rows={3} />
        <TextareaField label="Full Description" name="fullDescription" required rows={10} />
        <ChipEditor label="Tags" name="tags" />
        <TopicsEditor name="topics" />

        {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
        <SubmitButton label="Create Course" />
      </form>
    </div>
  );
}
