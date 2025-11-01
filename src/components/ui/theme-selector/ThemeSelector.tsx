"use client";

import { MoonIcon } from "@/components/svg/moon-icon/MoonIcon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSelector = () => {

  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    // Ensure the component is mounted before rendering
    setMounted(true);
    // Wait a moment so transitions can run smoothly after mount
    const timeout = setTimeout(() => setShowToggle(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Skeleton
  if (!mounted) return <div className="w-16 h-8 border border-brand rounded-full transition-colors duration-300" />

  const isDark = resolvedTheme === "dark";

  return <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={isDark}
      onChange={() => setTheme(isDark ? "light" : "dark")}
    />
    {/* Toggle background */}
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
        <MoonIcon size={24} className="text-gray-200 rotate-180"/>
      </div>
    </div>
  </label>
};