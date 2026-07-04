"use client";

import Link from "next/link";

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
          className="fixed inset-0 z-10 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Side panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed right-0 top-0 h-screen w-72 bg-elevated z-20 border-l border-line/5
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line/5">
          <span className="font-n27 font-bold italic text-base flex items-center gap-1">
            <span className="bg-gradient-to-br from-brand-sec to-brand bg-clip-text text-transparent">{"{"}</span>
            <span className="text-fg">rubengonz</span>
            <span className="bg-gradient-to-br from-brand-sec to-brand bg-clip-text text-transparent">{"}"}</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="font-inputmono text-faint hover:text-fg transition-colors text-xs p-1"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-1 p-4 flex-1">
          {navLinks.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-inputmono text-sm text-muted hover:text-fg transition-colors
                px-4 py-3 border border-transparent hover:border-line/5 hover:bg-line/[0.02]"
            >
              <span className="text-subtle mr-3 text-xs" aria-hidden="true">0{i + 1}</span>
              {label}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-line/5">
          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="font-inputmono text-[11px] text-brand tracking-widest uppercase">Available for work</span>
          </div>
          <a
            href="mailto:ruben.gonzalez.rodriguez00@gmail.com"
            className="font-inputmono text-[11px] text-muted hover:text-fg transition-colors break-all"
          >
            ruben.gonzalez.rodriguez00@gmail.com
          </a>
        </div>
      </div>
    </>
  );
};
