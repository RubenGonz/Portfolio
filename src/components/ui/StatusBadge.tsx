import type { BadgeTone } from "@/types";

const toneClass: Record<BadgeTone, string> = {
  brand: "text-brand border-brand/20 bg-brand/8",
  success: "text-success border-success/20 bg-success/8",
  neutral: "text-subtle border-line/10",
};

/** Presentational status pill. Domains map their own status → { tone, label }. */
export const StatusBadge = ({ tone, label }: { tone: BadgeTone; label: string }) => (
  <span className={`font-inputmono text-[11px] px-2 py-0.5 tracking-widest uppercase border ${toneClass[tone]}`}>
    {label}
  </span>
);
