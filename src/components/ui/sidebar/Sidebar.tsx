"use client"
import Link from "next/link";
import { LanguajeSelector } from "../languaje-selector/LanguajeSelector";
import { ThemeSelector } from "../theme-selector/ThemeSelector";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  navLinks: { label: string; href: string }[];
}

export const Sidebar = ({ open, setOpen, navLinks }: Props) => {

  return <>
    {/* Background black */}
    {open && <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />}

    {/* Blur */}
    {open && <div onClick={() => setOpen(false)} className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-xs" />}

    {/* SideMenu */}
    <nav className={`fixed p-5 right-0 top-0 w-[500px] h-screen bg-surface z-20 shadow-2xl transform transition-all duration-300 ${!open ? "translate-x-full" : ""}`}>

      <div onClick={() => setOpen(false)}>X</div>

      <div className="hidden md:flex items-center gap-3">
        <LanguajeSelector />
        <ThemeSelector />
        <button
          onClick={() => setOpen(true)}
          className="hover:text-primary transition-colors"
        >
          Login
        </button>
      </div>

      {/* Menu */}
      {navLinks.map(({ label, href }) => (
        <Link key={href} href={href} onClick={() => setOpen(false)}
          className="flex items-center mt-10 p-2 hover:bg-gray-800 rounded transition-all">
          {label}
        </Link>
      ))}
    </nav>
  </>
};