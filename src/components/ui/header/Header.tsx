"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { LanguajeSelector } from "../languaje-selector/LanguajeSelector";
import { ThemeSelector } from "../theme-selector/ThemeSelector";

export const Header = () => {

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Effect that detects scroll to change header style
  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 1) };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "SOBRE MÍ", href: "/#sobre-mi" },
    { label: "PROYECTOS", href: "/#proyectos" },
    { label: "HABILIDADES", href: "/#habilidades" },
    { label: "CONTACTO", href: "/contact" },
  ]

  return <header className={`fixed h-20 w-full flex justify-between items-center py-2 px-5 z-50 text-light transition-all duration-100 
    ${scrolled ? "bg-soft-black shadow" : "bg-transparent shadow-none"}`
  }>
    {/* Logo */}
    <Link href={"/"} className="h-full flex items-center">
      <Image
        src={"/logos/logo-blanco.png"}
        alt={"RubenGonz logo"}
        width={1920}
        height={1080}
        className="h-full w-auto object-contain"
      />
    </Link>

    {/* Nav centrado (solo desktop) */}
    <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10">
      {navLinks.map(({ label, href }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </nav>

    <div className="flex items-center gap-3">
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-3">
        <LanguajeSelector />
        <ThemeSelector />
        <button
          onClick={() => setOpen(!open)}
          className="hover:text-brand transition-colors"
        >
          Login
        </button>
      </div>

      {/* Botón hamburguesa móvil */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden z-20 p-2 rounded hover:bg-light/10 transition-colors"
        aria-label="Abrir menú"
      >
        Menu
      </button>

      {/* Sidebar móvil */}
      <Sidebar open={open} setOpen={setOpen} navLinks={navLinks} />
    </div>
  </header>
}