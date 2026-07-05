"use client";

import { useActionState } from "react";
import { updateHomeContent } from "@/actions/home";
import { FormField, TextareaField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { HomeContent } from "@/data/settings";

export function HomeForm({ home }: { home: HomeContent }) {
  const [error, action] = useActionState(updateHomeContent, undefined);

  return (
    <form action={action} className="flex flex-col gap-10 max-w-2xl">

      {/* Hero */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-n27 font-bold italic text-lg text-fg mb-3">Hero</legend>
        <FormField
          label="Title"
          name="hero_title"
          defaultValue={home.hero.title}
          required
          hint="Use \n for line break (e.g. Frontend\nDeveloper)"
        />
        <FormField
          label="Tagline"
          name="hero_tagline"
          defaultValue={home.hero.tagline}
          hint="Short line below the title"
        />
        <TextareaField
          label="Description"
          name="hero_description"
          defaultValue={home.hero.description}
          required
          rows={4}
        />
      </fieldset>

      {/* Ticker */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-n27 font-bold italic text-lg text-fg mb-3">Ticker</legend>
        <FormField
          label="Text"
          name="ticker_text"
          defaultValue={home.tickerText}
          hint="Scrolling strip between hero and projects — use · as separator"
        />
      </fieldset>

      {/* Contact */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-n27 font-bold italic text-lg text-fg mb-3">Contact</legend>
        <FormField
          label="Headline"
          name="contact_headline"
          defaultValue={home.contact.headline}
          required
        />
        <TextareaField
          label="Subtext"
          name="contact_subtext"
          defaultValue={home.contact.subtext}
          rows={3}
          hint="Use \n for line break"
        />
      </fieldset>

      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
