"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label = "Save" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="font-inputmono text-[11px] tracking-widest uppercase font-bold
        bg-linear-to-r from-brand-sec to-brand text-on-accent px-5 py-2.5
        hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer self-start"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}
