"use client";

import { useActionState } from "react";
import { updateAvailable } from "@/actions/home";
import { FormField } from "@/components/admin/FormField";
import { LocaleTabs } from "@/components/admin/LocaleTabs";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { LOCALES } from "@/data/locale";
import type { HomeEdit } from "@/data/settings";

export function AvailableEditForm({ home }: { home: HomeEdit }) {
  const [error, action] = useActionState(updateAvailable, undefined);
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <div className="flex flex-col gap-1.5">
        <span className="font-inputmono text-[11px] text-muted tracking-widest uppercase">Status</span>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="available" defaultChecked={home.available} className="accent-brand" />
          <span className="font-inputmono text-xs text-muted">Show available badge in header</span>
        </label>
      </div>

      <LocaleTabs
        locales={LOCALES}
        render={(locale) => (
          <FormField
            label={`Label (${locale.toUpperCase()})`}
            name={`available_label_${locale}`}
            defaultValue={home.translations[locale].availableLabel}
            hint='Text shown in the badge (e.g. "Available", "Open to work")'
          />
        )}
      />

      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
