"use client";

import Link from "next/link";
import { ThemeSelector } from "../theme-selector/ThemeSelector";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  navLinks: { label: string; href: string }[];
}

export const Sidebar = ({ open, setOpen, navLinks }: Props) => {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Side panel */}
      <nav
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed right-0 top-0 h-screen w-full max-w-sm bg-soft-black z-20 shadow-2xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <ThemeSelector />
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="text-light hover:text-brand transition-colors p-2 rounded"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col p-5 gap-2">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-light text-lg py-3 px-4 hover:bg-gray-800 rounded transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
