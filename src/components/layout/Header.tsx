"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { Link } from "@/navigation";
import { Sidebar } from "./Sidebar";
import { ThemeSelector } from "./ThemeSelector";
import { AvailableBadge } from "@/components/ui";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { navLinks } from "@/config/nav";
import type { AvailableContent } from "@/types";

export const Header = ({ available }: { available: AvailableContent }) => {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 1); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed h-14 w-full flex justify-between items-center px-6 z-50 text-fg transition-all duration-150 border-b
      ${scrolled ? "bg-bg/90 backdrop-blur-md border-line/5" : "bg-transparent border-transparent"}`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1.5 group cursor-pointer">
        <span className="font-n27 font-bold italic text-xl leading-none bg-linear-to-br from-brand-sec to-brand bg-clip-text text-transparent">{"{"}</span>
        <span className="font-n27 font-bold italic text-sm tracking-wide text-fg">rubengonz</span>
        <span className="font-n27 font-bold italic text-xl leading-none bg-linear-to-br from-brand-sec to-brand bg-clip-text text-transparent">{"}"}</span>
      </Link>

      {/* Nav centrado (solo desktop) */}
      <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10">
        {navLinks.map(({ key, href }) => (
          <Link
            key={href}
            href={href}
            className="font-inputmono text-xs text-muted hover:text-fg tracking-widest uppercase transition-colors cursor-pointer"
          >
            {t(key)}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3">
          {available.available && <AvailableBadge label={available.label} bordered />}
          <LocaleSwitcher />
          <ThemeSelector />
          <NextLink
            href="/admin"
            className="font-inputmono text-xs tracking-widest uppercase text-muted hover:text-fg transition-colors cursor-pointer"
          >
            {t("admin")}
          </NextLink>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden z-20 p-2 rounded hover:bg-fg/10 transition-colors font-inputmono text-xs text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 cursor-pointer"
          aria-label={tc("openMenu")}
        >
          {tc("menu")}
        </button>

        <Sidebar open={open} setOpen={setOpen} navLinks={navLinks} available={available} />
      </div>
    </header>
  );
};
