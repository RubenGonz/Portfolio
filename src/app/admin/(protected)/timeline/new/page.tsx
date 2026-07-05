"use client";

import { useActionState } from "react";
import { createTimelineEntry } from "@/actions/timeline";
import { FormField, TextareaField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function NewTimelineEntryPage() {
  const [error, action] = useActionState(createTimelineEntry, undefined);

  return (
    <div>
      <AdminPageHeader title="New Timeline Entry" />

      <form action={action} className="flex flex-col gap-5 max-w-2xl">
        <FormField label="Year / Label" name="year" required hint='e.g. "2024" or "About me"' />
        <FormField label="Title" name="title" required />
        <FormField label="Subtitle" name="subtitle" hint="Optional — role or tech stack line" />
        <TextareaField
          label="Paragraphs"
          name="paragraphs"
          required
          rows={8}
          hint="Separate paragraphs with a blank line"
        />
        <label className="flex items-center gap-2 font-inputmono text-[11px] tracking-widest uppercase text-subtle">
          <input type="checkbox" name="current" className="accent-brand" />
          Current (renders with brand accent + blinking cursor)
        </label>

        {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
        <SubmitButton label="Create Entry" />
      </form>
    </div>
  );
}
