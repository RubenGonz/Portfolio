"use client";

import { useActionState } from "react";
import { updateTimelineEntry } from "@/actions/timeline";
import { FormField, TextareaField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { TimelineEntry } from "@/data/timeline";

export function EditTimelineForm({ entry }: { entry: TimelineEntry }) {
  const updateWithId = updateTimelineEntry.bind(null, entry.id);
  const [error, action] = useActionState(updateWithId, undefined);

  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <FormField label="Year / Label" name="year" defaultValue={entry.year} required />
      <FormField label="Title" name="title" defaultValue={entry.title} required />
      <FormField label="Subtitle" name="subtitle" defaultValue={entry.subtitle ?? ""} />
      <TextareaField
        label="Paragraphs"
        name="paragraphs"
        defaultValue={entry.paragraphs.join("\n\n")}
        required
        rows={8}
        hint="Separate paragraphs with a blank line"
      />

      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
