"use client";

import { useActionState } from "react";
import { updateContact } from "@/actions/home";
import { FormField, TextareaField } from "@/components/admin/FormField";
import { LocaleTabs } from "@/components/admin/LocaleTabs";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { LOCALES } from "@/data/locale";
import type { HomeEdit } from "@/data/settings/edit";

export function ContactEditForm({ home }: { home: HomeEdit }) {
  const [error, action] = useActionState(updateContact, undefined);
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <LocaleTabs
        locales={LOCALES}
        render={(locale) => {
          const tr = home.translations[locale];
          const L = locale.toUpperCase();
          return (
            <>
              <FormField label={`Headline (${L})`} name={`contact_headline_${locale}`} defaultValue={tr.contactHeadline} />
              <TextareaField label={`Subtext (${L})`} name={`contact_subtext_${locale}`} defaultValue={tr.contactSubtext} rows={3} hint='Use \n for line break' />
            </>
          );
        }}
      />
      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
