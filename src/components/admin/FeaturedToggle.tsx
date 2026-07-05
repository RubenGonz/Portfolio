"use client";

import { useState } from "react";

interface FeaturedToggleProps {
  id: string;
  featured: boolean;
  action: (id: string, featured: boolean) => Promise<string | undefined>;
}

export function FeaturedToggle({ id, featured: initial, action }: FeaturedToggleProps) {
  const [featured, setFeatured] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  async function toggle() {
    const next = !featured;
    const err = await action(id, next);
    if (err) { setError(err); setTimeout(() => setError(null), 3000); return; }
    setFeatured(next);
    setError(null);
  }

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={toggle}
        title={featured ? "Unmark as featured" : "Mark as featured"}
        className={`font-inputmono text-[10px] tracking-widest uppercase border px-2 py-1 transition-colors ${
          featured
            ? "border-brand/40 text-brand bg-brand/5"
            : "border-line/10 text-faint hover:text-subtle hover:border-line/20"
        }`}
      >
        ★
      </button>
      {error && (
        <span className="absolute left-full ml-2 font-inputmono text-[10px] text-danger whitespace-nowrap">
          {error}
        </span>
      )}
    </div>
  );
}
