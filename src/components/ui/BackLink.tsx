"use client";

import { useRouter } from "next/navigation";

export const BackLink = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/#projects");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="font-inputmono text-[11px] text-gray-600 hover:text-gray-300
        transition-colors mb-10 inline-flex items-center gap-2 tracking-widest uppercase"
    >
      <span className="text-brand">←</span> All projects
    </button>
  );
};
