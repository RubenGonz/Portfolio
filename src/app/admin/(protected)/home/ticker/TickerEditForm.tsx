"use client";

import { useActionState } from "react";
import { updateTicker } from "@/actions/home";
import { FormField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

export function TickerEditForm({ tickerText }: { tickerText: string }) {
  const [error, action] = useActionState(updateTicker, undefined);
  return (
    <form action={action} className="flex flex-col gap-5 max-w-2xl">
      <FormField label="Text" name="ticker_text" defaultValue={tickerText} hint="Use · as separator between items" />
      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}
