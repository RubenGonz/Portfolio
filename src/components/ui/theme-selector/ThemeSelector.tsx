"use client";

import { useState } from "react";

export const ThemeSelector = () => {
  const [theme, setTheme] = useState("light");

  return <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    />
    {/* Fondo del toggle */}
    <div className="w-16 h-8 border border-primary rounded-full transition-colors duration-300"></div>

    <div className="absolute top-1 left-1 w-6 h-6 rounded-full transition-all duration-500 peer-checked:translate-x-8">
      {/* Sol */}
      <div className={`absolute inset-0 bg-yellow-400 rounded-full transition-opacity duration-500
          ${theme === "light" ? "opacity-100" : "opacity-0"}`}
      />

      {/* Luna */}
      <div className={`absolute inset-0 transition-opacity duration-500
          ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
      >
        <svg className="fill-gray-200 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="2 2 17 17">
          <path d="m7.5.5c1.3280962 0 2.5698071.36985953 3.6277499 1.01219586-3.14075981.19184303-5.6277499 2.79938976-5.6277499 5.98780414 0 3.1884144 2.48699009 5.7959611 5.6269199 5.9885898-1.0571128.6415507-2.2988237 1.0114102-3.6269199 1.0114102-3.86599325 0-7-3.1340068-7-7 0-3.86599325 3.13400675-7 7-7z" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 3)" />
        </svg>
      </div>
    </div>
  </label>
};