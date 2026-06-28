"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { ThemeSelector } from "../theme-selector/ThemeSelector";

export const Header = () => {

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 1) };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Projects", href: "/#projects" },
    { label: "About", href: "/#about" },
    { label: "Stack", href: "/#stack" },
    { label: "Contact", href: "/#contact" },
  ]

  return (
    <header className={`fixed h-14 w-full flex justify-between items-center px-6 z-50 text-light transition-all duration-150 border-b
      ${scrolled ? "bg-deep-black/90 backdrop-blur-md border-white/5" : "bg-transparent border-transparent"}`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1.5 group">
        <span className="font-n27 font-bold italic text-xl leading-none bg-gradient-to-br from-brand-sec to-brand bg-clip-text text-transparent">{"{"}</span>
        <span className="font-n27 font-bold italic text-sm tracking-wide text-light">rubengonz</span>
        <span className="font-n27 font-bold italic text-xl leading-none bg-gradient-to-br from-brand-sec to-brand bg-clip-text text-transparent">{"}"}</span>
      </Link>

      {/* Nav centrado (solo desktop) */}
      <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10">
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="font-inputmono text-xs text-gray-500 hover:text-gray-200 tracking-widest uppercase transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        {/* Available badge + theme (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 border border-brand/30 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="font-inputmono text-[9px] text-brand tracking-widest uppercase">Available</span>
          </div>
          <ThemeSelector />
        </div>

        {/* Hamburguesa móvil */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden z-20 p-2 rounded hover:bg-light/10 transition-colors font-inputmono text-xs text-gray-400"
          aria-label="Open menu"
        >
          Menu
        </button>

        <Sidebar open={open} setOpen={setOpen} navLinks={navLinks} />
      </div>
    </header>
  )
}
