interface Props {
  label: string;
  /** Wraps the badge in a rounded outline pill (header desktop). */
  bordered?: boolean;
  className?: string;
}

/** Pulsing "available" status badge — used in the header and the mobile sidebar. */
export const AvailableBadge = ({ label, bordered = false, className = "" }: Props) => (
  <div
    className={`flex items-center gap-1.5 ${bordered ? "border border-brand/30 px-3 py-1 rounded-full" : ""} ${className}`.trim()}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
    <span className="font-inputmono text-[11px] text-brand tracking-widest uppercase">{label}</span>
  </div>
);
