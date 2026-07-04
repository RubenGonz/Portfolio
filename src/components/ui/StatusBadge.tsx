"use client";

import type { Course } from "@/types";

export const StatusBadge = ({ status }: { status: Course["status"] }) => {
  if (status === "completed")
    return <span className="font-inputmono text-[11px] text-green-500 border border-green-500/20 bg-green-500/8 px-2 py-0.5 tracking-widest uppercase">Completed</span>;
  if (status === "in-progress")
    return <span className="font-inputmono text-[11px] text-brand border border-brand/20 bg-brand/8 px-2 py-0.5 tracking-widest uppercase">In progress</span>;
  return <span className="font-inputmono text-[11px] text-gray-500 border border-white/10 px-2 py-0.5 tracking-widest uppercase">Not started</span>;
};
