"use client";

import { useActionState } from "react";
import { createCourse } from "@/actions/courses";
import { FormField, TextareaField, SelectField } from "@/components/admin/FormField";
import { ChipEditor } from "@/components/admin/ChipEditor";
import { TopicsEditor } from "@/components/admin/TopicsEditor";
import { LocaleTabs } from "@/components/admin/LocaleTabs";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { LOCALES, DEFAULT_LOCALE } from "@/data/locale";

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
        <FormField label="Platform" name="platform" required hint="e.g. Udemy, Coursera" />
        <FormField label="Year" name="year" type="number" defaultValue={String(new Date().getFullYear())} required />
        <SelectField label="Status" name="status" options={statusOptions} defaultValue="not-started" />
        <FormField label="Certificate URL" name="certificateUrl" type="url" />
        <FormField label="Repo URL" name="repoUrl" type="url" />
        <FormField label="Demo URL" name="demoUrl" type="url" />

        <LocaleTabs
          locales={LOCALES}
          render={(locale) => {
            const L = locale.toUpperCase();
            const hint = locale === DEFAULT_LOCALE ? "Required" : "Optional — falls back to English";
            return (
              <>
                <FormField label={`Title (${L})`} name={`title_${locale}`} hint={hint} />
                <TextareaField label={`Short Description (${L})`} name={`shortDescription_${locale}`} rows={3} />
                <TextareaField label={`Full Description (${L})`} name={`fullDescription_${locale}`} rows={10} />
                <ChipEditor label={`Tags (${L})`} name={`tags_${locale}`} />
                <TopicsEditor name={`topics_${locale}`} />
              </>
            );
          }}
        />

        {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
        <SubmitButton label="Create Course" />
      </form>
    </div>
  );
}
