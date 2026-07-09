"use client";

import { useState, type ReactNode } from "react";

interface Props {
  locales: string[];
  /** Renders the fields for one locale. Both locales are kept mounted so the
   *  inactive one still submits with the form — only visibility is toggled. */
  render: (locale: string) => ReactNode;
}

const tabBase = "font-inputmono text-[11px] tracking-widest uppercase px-3 py-1.5 border transition-colors duration-150 cursor-pointer";
const tabActive = "border-brand/50 text-brand bg-brand/8";
const tabIdle = "border-line/10 text-subtle hover:border-brand/30 hover:text-fg";

/** Per-locale field tabs for admin forms. The default locale is required;
 *  other locales are optional and fall back to it on the public site. */
export function LocaleTabs({ locales, render }: Props) {
  const [active, setActive] = useState(locales[0]);

  return (
    <div className="flex flex-col gap-4 border border-line/10 p-4">
      <div className="flex gap-1">
        {locales.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setActive(l)}
            className={`${tabBase} ${l === active ? tabActive : tabIdle}`}
          >
            {l}
          </button>
        ))}
      </div>

      {locales.map((l) => (
        <div key={l} hidden={l !== active} className="flex flex-col gap-5">
          {render(l)}
        </div>
      ))}
    </div>
  );
}
