"use client";

import { useActionState } from "react";
import { updateCourse } from "@/actions/courses";
import { FormField, TextareaField, SelectField } from "@/components/admin/FormField";
import { ChipEditor } from "@/components/admin/ChipEditor";
import { TopicsEditor } from "@/components/admin/TopicsEditor";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { Course } from "@/types";

const statusOptions = [
  { value: "not-started", label: "Not Started" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export function EditCourseForm({ course }: { course: Course }) {
  const updateWithSlug = updateCourse.bind(null, course.slug);
  const [error, action] = useActionState(updateWithSlug, undefined);

  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <FormField label="Slug" name="slug" defaultValue={course.slug} required />
      <FormField label="Title" name="title" defaultValue={course.title} required />
      <FormField label="Platform" name="platform" defaultValue={course.platform} required />
      <FormField label="Year" name="year" type="number" defaultValue={String(course.year)} required />
      <SelectField label="Status" name="status" options={statusOptions} defaultValue={course.status} />
      <FormField label="Certificate URL" name="certificateUrl" type="url" defaultValue={course.certificateUrl} />
      <FormField label="Repo URL" name="repoUrl" type="url" defaultValue={course.repoUrl} />
      <FormField label="Demo URL" name="demoUrl" type="url" defaultValue={course.demoUrl} />
      <TextareaField label="Short Description" name="shortDescription" defaultValue={course.shortDescription} required rows={3} />
      <TextareaField label="Full Description" name="fullDescription" defaultValue={course.fullDescription} required rows={10} />
      <ChipEditor label="Tags" name="tags" defaultValue={course.tags} />
      <TopicsEditor name="topics" defaultValue={course.topics as { label: string; items: string[] }[]} />

      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
