"use client";

import { useTranslations } from "next-intl";

interface FilterOption {
  value: string;
  label: string;
}

interface Props {
  statusOptions: FilterOption[];
  selectedStatus: string;
  selectedOrder: string;
  onStatusChange: (value: string) => void;
  onOrderChange: (value: string) => void;
}

const btnBase =
  "font-inputmono text-[11px] tracking-widest uppercase px-3 py-1.5 border transition-colors duration-150 cursor-pointer";
const btnActive = "border-brand/50 text-brand bg-brand/8";
const btnIdle = "border-line/10 text-subtle hover:border-brand/30 hover:text-fg";

export const ListingFilters = ({
  statusOptions,
  selectedStatus,
  selectedOrder,
  onStatusChange,
  onOrderChange,
}: Props) => {
  const t = useTranslations("listing");
  const orderOptions: FilterOption[] = [
    { value: "newest", label: t("newestFirst") },
    { value: "oldest", label: t("oldestFirst") },
  ];

  return (
  <div className="flex flex-wrap items-center gap-6 mb-8">
    <div className="flex flex-wrap gap-2">
      {statusOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onStatusChange(opt.value)}
          className={`${btnBase} ${selectedStatus === opt.value ? btnActive : btnIdle}`}
        >
          {opt.label}
        </button>
      ))}
    </div>

    <div className="flex gap-2 md:ml-auto">
      {orderOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onOrderChange(opt.value)}
          className={`${btnBase} ${selectedOrder === opt.value ? btnActive : btnIdle}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
  );
};
