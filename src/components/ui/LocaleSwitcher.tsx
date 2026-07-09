"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { routing } from "@/i18n/routing";

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === "en" ? "es" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="flex items-center gap-0.5 font-inputmono text-[11px] tracking-widest">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-0.5">
          {i > 0 && <span className="text-subtle/40">/</span>}
          <button
            onClick={toggle}
            className={`uppercase transition-colors ${
              l === locale ? "text-fg" : "text-subtle hover:text-muted"
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
};
