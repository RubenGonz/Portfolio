"use client";

import { useActionState } from "react";
import { updateCourse } from "@/actions/courses";
import { FormField, TextareaField, SelectField } from "@/components/admin/FormField";
import { ChipEditor } from "@/components/admin/ChipEditor";
import { TopicsEditor } from "@/components/admin/TopicsEditor";
import { LocaleTabs } from "@/components/admin/LocaleTabs";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { LOCALES } from "@/data/locale";
import type { CourseEdit } from "@/data/courses/edit";

const statusOptions = [
  { value: "not-started", label: "Not Started" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export function EditCourseForm({ course }: { course: CourseEdit }) {
  const updateWithSlug = updateCourse.bind(null, course.slug);
  const [error, action] = useActionState(updateWithSlug, undefined);

  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <FormField label="Slug" name="slug" defaultValue={course.slug} required />
      <FormField label="Platform" name="platform" defaultValue={course.platform} required />
      <FormField label="Year" name="year" type="number" defaultValue={String(course.year)} required />
      <SelectField label="Status" name="status" options={statusOptions} defaultValue={course.status} />
      <FormField label="Certificate URL" name="certificateUrl" type="url" defaultValue={course.certificateUrl} />
      <FormField label="Repo URL" name="repoUrl" type="url" defaultValue={course.repoUrl} />
      <FormField label="Demo URL" name="demoUrl" type="url" defaultValue={course.demoUrl} />

      <LocaleTabs
        locales={LOCALES}
        render={(locale) => {
          const tr = course.translations[locale];
          const L = locale.toUpperCase();
          return (
            <>
              <FormField label={`Title (${L})`} name={`title_${locale}`} defaultValue={tr.title} />
              <TextareaField label={`Short Description (${L})`} name={`shortDescription_${locale}`} defaultValue={tr.shortDescription} rows={3} />
              <TextareaField label={`Full Description (${L})`} name={`fullDescription_${locale}`} defaultValue={tr.fullDescription} rows={10} />
              <ChipEditor label={`Tags (${L})`} name={`tags_${locale}`} defaultValue={tr.tags} />
              <TopicsEditor name={`topics_${locale}`} defaultValue={tr.topics} />
            </>
          );
        }}
      />

      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
