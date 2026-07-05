"use client";

import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  action: () => Promise<void>;
  label?: string;
}

export function DeleteButton({ action, label = "Delete" }: DeleteButtonProps) {
  const router = useRouter();

  async function handleClick() {
    if (!confirm(`Delete this ${label.toLowerCase()}? This cannot be undone.`)) return;
    await action();
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="font-inputmono text-[11px] tracking-widest uppercase text-subtle
        hover:text-danger transition-colors"
    >
      {label}
    </button>
  );
}
