"use client";

import { useActionState } from "react";
import { updateTicker } from "@/actions/home";
import { FormField } from "@/components/admin/FormField";
import { LocaleTabs } from "@/components/admin/LocaleTabs";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { LOCALES } from "@/data/locale";
import type { HomeEdit } from "@/data/settings/edit";

export function TickerEditForm({ home }: { home: HomeEdit }) {
  const [error, action] = useActionState(updateTicker, undefined);
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <LocaleTabs
        locales={LOCALES}
        render={(locale) => (
          <FormField
            label={`Text (${locale.toUpperCase()})`}
            name={`ticker_text_${locale}`}
            defaultValue={home.translations[locale].tickerText}
            hint="Use · as separator between items"
          />
        )}
      />
      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
