"use client";

import { useActionState } from "react";
import { updateHero } from "@/actions/home";
import { FormField, TextareaField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { HeroContent } from "@/data/settings";

export function HeroEditForm({ hero }: { hero: HeroContent }) {
  const [error, action] = useActionState(updateHero, undefined);
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <FormField label="Title" name="hero_title" defaultValue={hero.title} required hint='Use \n for line break (e.g. Frontend\nDeveloper)' />
      <FormField label="Tagline" name="hero_tagline" defaultValue={hero.tagline} hint="Short line below the title" />
      <TextareaField label="Description" name="hero_description" defaultValue={hero.description} required rows={4} />
      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
