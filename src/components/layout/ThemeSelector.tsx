"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const ThemeSelector = () => {

  const t = useTranslations("common");
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    // next-themes only knows the resolved theme after mount; render a skeleton
    // until then to avoid a hydration mismatch.
    setMounted(true);
    // Wait a moment so transitions can run smoothly after mount
    const timeout = setTimeout(() => setShowToggle(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Toggle skeleton
  if (!mounted) return <div className="w-16 h-8 border border-brand rounded-full transition-colors duration-300" />

  const isDark = resolvedTheme === "dark";

  return <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={isDark}
      onChange={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? t("switchToLight") : t("switchToDark")}
    />
    <div className="w-16 h-8 border border-brand rounded-full transition-colors duration-300" />

    <div className="absolute top-1 left-1 w-6 h-6 rounded-full transition-all duration-500 peer-checked:translate-x-8">
      {/* Sun */}
      <div className={`absolute inset-0 bg-yellow-400 rounded-full transition-opacity duration-500
        ${!isDark && showToggle ? "opacity-100" : "opacity-0"}`}
      />

      {/* Moon */}
      <div className={`absolute inset-0 transition-opacity duration-500
          ${isDark && showToggle ? "opacity-100" : "opacity-0"}`}
      >
        <svg className="fill-gray-200 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="2 2 17 17">
          <path d="m7.5.5c1.3280962 0 2.5698071.36985953 3.6277499 1.01219586-3.14075981.19184303-5.6277499 2.79938976-5.6277499 5.98780414 0 3.1884144 2.48699009 5.7959611 5.6269199 5.9885898-1.0571128.6415507-2.2988237 1.0114102-3.6269199 1.0114102-3.86599325 0-7-3.1340068-7-7 0-3.86599325 3.13400675-7 7-7z" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 3)" />
        </svg>
      </div>
    </div>
  </label>
};