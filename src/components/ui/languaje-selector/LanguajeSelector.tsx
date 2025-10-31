"use client";

import { useState } from "react";

export const LanguajeSelector = () => {

  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("es");

  const selectLang = (lang: string) => {
    setSelectedLang(lang);
    setOpen(false);
  };

  const languages = [
    { code: "es", label: "Español" },
    { code: "en", label: "English" },
  ]

  return <div className="relative">
    <button
      className="flex items-center gap-2 px-2 text-sm text-gray-800 dark:text-gray-200 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <span className="uppercase">{selectedLang}</span>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"
        className={`w-4 h-4 mb-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
        <path stroke="currentColor" strokeWidth="1" d="m1 1 4 4 4-4" />
      </svg>
    </button>

    {/* Dropdown */}
    {open && <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-700 rounded-lg shadow-md ring-1 ring-black ring-opacity-5 z-10">
      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
        {languages.map((lng) => <li key={lng.code}>
          <button
            onClick={() => selectLang(lng.code)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            {lng.label}
          </button>
        </li>)}
      </ul>
    </div>}
  </div>
};