"use client";

import { useRouter } from "next/navigation";

interface Props {
  label?: string;
  fallbackHref?: string;
}

export const BackLink = ({ label = "All projects", fallbackHref = "/#projects" }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="font-inputmono text-[11px] text-faint hover:text-fg
        transition-colors mb-10 inline-flex items-center gap-2 tracking-widest uppercase"
    >
      <span className="text-brand">←</span> {label}
    </button>
  );
};
