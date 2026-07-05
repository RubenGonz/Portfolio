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

      <div className="flex flex-col gap-1.5">
        <span className="font-inputmono text-[11px] text-muted tracking-widest uppercase">Current</span>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="current" defaultChecked={entry.current} className="accent-brand" />
          <span className="font-inputmono text-xs text-muted">Mark as current entry</span>
        </label>
        <p className="font-inputmono text-[10px] text-faint">Managed from the dashboard — toggle here only if needed</p>
      </div>

      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
