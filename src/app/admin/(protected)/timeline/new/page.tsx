"use client";

import { useActionState } from "react";
import { createTimelineEntry } from "@/actions/timeline";
import { FormField, TextareaField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import Link from "next/link";

export default function NewTimelineEntryPage() {
  const [error, action] = useActionState(createTimelineEntry, undefined);

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="font-inputmono text-[11px] text-subtle hover:text-fg transition-colors">
          ← Admin
        </Link>
        <h1 className="font-n27 font-bold italic text-2xl text-fg">New Timeline Entry</h1>
      </div>

      <form action={action} className="flex flex-col gap-5 max-w-2xl">
        <FormField label="Year / Label" name="year" required hint='e.g. "2024" or "About me"' />
        <FormField label="Title" name="title" required />
        <FormField label="Subtitle" name="subtitle" hint="Optional — role or tech stack line" />
        <FormField label="Order" name="order" type="number" defaultValue="0" hint="Lower = first" />
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
