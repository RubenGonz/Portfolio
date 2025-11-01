"use client";

import { ChevronIcon } from "@/components/svg/chevron-icon/ChevronIcon";
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
      className="flex items-center gap-2 px-2 text-sm  cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <span className="uppercase">{selectedLang}</span>

      <ChevronIcon size={16} className={`mb-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
    </button>

    {/* Dropdown */}
    {open && <div className="absolute right-0 mt-2 w-28 bg-light dark:bg-soft-black rounded-lg shadow-md ring-1 ring-brand ring-opacity-5 z-10">
      <ul className="py-1 text-sm">
        {languages.map((lng, i) => <li key={lng.code}>
          <hr className={`mx-4 h-[0.5px] bg-linear-to-r from-transparent via-soft-black dark:via-white to-transparent border-0 ${i === 0 ? "hidden" : ""}`} />
          
          <button onClick={() => selectLang(lng.code)}
            className={`w-full text-left px-4 py-2 cursor-pointer ${selectedLang === lng.code ? "text-brand" : ""}`}
          >
            {lng.label}
          </button>
          
          <hr className={`mx-4 h-[0.5px] bg-linear-to-r from-transparent via-soft-black dark:via-white to-transparent border-0 ${i === languages.length - 1 ? "hidden" : ""}`} />
        </li>)}
      </ul>
    </div>}
  </div>
};