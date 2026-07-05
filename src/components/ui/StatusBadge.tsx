import type { Project, Course } from "@/types";

type Status = Project["status"] | Course["status"];

const styles: Record<Status, { className: string; label: string }> = {
  live:          { className: "text-success border-success/20 bg-success/8", label: "Live" },
  completed:     { className: "text-success border-success/20 bg-success/8", label: "Completed" },
  "in-progress": { className: "text-brand border-brand/20 bg-brand/8",       label: "In progress" },
  archived:      { className: "text-subtle border-line/10",                  label: "Archived" },
  "not-started": { className: "text-subtle border-line/10",                  label: "Not started" },
};

/** Status pill for projects and courses — keyed directly off each item's `status`. */
export const StatusBadge = ({ status }: { status: Status }) => {
  const { className, label } = styles[status];
  return (
    <span className={`font-inputmono text-[11px] px-2 py-0.5 tracking-widest uppercase border ${className}`}>
      {label}
    </span>
  );
};
