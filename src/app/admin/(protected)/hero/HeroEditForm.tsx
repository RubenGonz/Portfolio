"use client";

import { useActionState } from "react";
import { updateHero } from "@/actions/home";
import { FormField, TextareaField } from "@/components/admin/FormField";
import { LocaleTabs } from "@/components/admin/LocaleTabs";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { LOCALES } from "@/data/locale";
import type { HomeEdit } from "@/data/settings";

export function HeroEditForm({ home }: { home: HomeEdit }) {
  const [error, action] = useActionState(updateHero, undefined);
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <LocaleTabs
        locales={LOCALES}
        render={(locale) => {
          const tr = home.translations[locale];
          const L = locale.toUpperCase();
          return (
            <>
              <FormField label={`Title (${L})`} name={`hero_title_${locale}`} defaultValue={tr.heroTitle} hint='Use \n for line break (e.g. Frontend\nDeveloper)' />
              <FormField label={`Tagline (${L})`} name={`hero_tagline_${locale}`} defaultValue={tr.heroTagline} hint="Short line below the title" />
              <TextareaField label={`Description (${L})`} name={`hero_description_${locale}`} defaultValue={tr.heroDescription} rows={4} />
            </>
          );
        }}
      />
      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
