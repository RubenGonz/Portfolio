"use client";

import { useActionState } from "react";
import { updateContact } from "@/actions/home";
import { FormField, TextareaField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ContactContent } from "@/data/settings";

export function ContactEditForm({ contact }: { contact: ContactContent }) {
  const [error, action] = useActionState(updateContact, undefined);
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <FormField label="Headline" name="contact_headline" defaultValue={contact.headline} required />
      <TextareaField label="Subtext" name="contact_subtext" defaultValue={contact.subtext} rows={3} hint='Use \n for line break' />
      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
