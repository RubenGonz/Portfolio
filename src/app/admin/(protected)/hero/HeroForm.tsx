"use client";

import { useActionState } from "react";
import { updateHeroContent } from "@/actions/hero";
import { TextareaField, FormField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { HeroContent } from "@/data/settings";

export function HeroForm({ hero }: { hero: HeroContent }) {
  const [error, action] = useActionState(updateHeroContent, undefined);

  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <FormField
        label="Title"
        name="hero_title"
        defaultValue={hero.title}
        required
        hint="Use \\n for line break (e.g. Frontend\\nDeveloper)"
      />
      <FormField
        label="Tagline"
        name="hero_tagline"
        defaultValue={hero.tagline}
        hint="Short line below the title (e.g. Banking sector · ... · Now full-stack)"
      />
      <TextareaField
        label="Description"
        name="hero_description"
        defaultValue={hero.description}
        required
        rows={4}
      />

      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
