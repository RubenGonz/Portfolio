"use client"
import Link from "next/link";
import { LanguajeSelector } from "../languaje-selector/LanguajeSelector";
import { ThemeSelector } from "../theme-selector/ThemeSelector";
import { LoginButton } from "../login-button/LoginButton";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  navLinks: { label: string; href: string }[];
}

export const Sidebar = ({ open, setOpen, navLinks }: Props) => {

  return <>
    {/* Blur background */}
    {open && <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />}
    {open && <div onClick={() => setOpen(!open)} className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-xs" />}

    {/* SideMenu */}
    <nav className={`fixed p-5 right-0 top-0 w-[400px] h-screen bg-soft-black z-20 shadow-2xl transform transition-all duration-300 ${!open ? "translate-x-full" : ""}`}>
      <div className="flex flex-col items-end gap-5">
        <div onClick={() => setOpen(!open)}>X</div>

        <LoginButton />

        <ThemeSelector />

        <LanguajeSelector />
      </div>

      <hr className="my-10" />

      <div className="flex flex-col items-end gap-7">
        {/* Menu */}
        {navLinks.map(({ label, href }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}
            className="flex items-center hover:bg-gray-800 rounded transition-all">
            {label}
          </Link>
        ))}
      </div>
    </nav>
  </>
};