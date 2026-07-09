"use client";

import { useTranslations } from "next-intl";
import type { Project, Course } from "@/types";

type Status = Project["status"] | Course["status"];

const styles: Record<Status, string> = {
  live:          "text-success border-success/20 bg-success/8",
  completed:     "text-success border-success/20 bg-success/8",
  "in-progress": "text-brand border-brand/20 bg-brand/8",
  archived:      "text-subtle border-line/10",
  "not-started": "text-subtle border-line/10",
};

export const StatusBadge = ({ status }: { status: Status }) => {
  const t = useTranslations("status");
  return (
    <span className={`font-inputmono text-[11px] px-2 py-0.5 tracking-widest uppercase border ${styles[status]}`}>
      {t(status)}
    </span>
  );
};
