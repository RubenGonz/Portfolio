"use client";

import { useEffect } from "react";

// Catches errors that break the root layout itself
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="font-mono bg-[#0b0d0d] text-[#e8e8e2] min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <span className="text-[clamp(6rem,20vw,12rem)] leading-none font-bold italic text-transparent bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] bg-clip-text select-none">
          500
        </span>
        <h1 className="text-lg mt-4 mb-2">Something went wrong</h1>
        <p className="text-sm text-[#888] max-w-sm mb-8">
          An unexpected error occurred. Try refreshing the page.
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="text-sm text-[#888] hover:text-[#e8e8e2] transition-colors border border-white/10 hover:border-white/20 px-5 py-2.5"
          >
            Try again
          </button>
          <a
            href="/en"
            className="text-sm text-[#888] hover:text-[#e8e8e2] transition-colors border border-white/10 hover:border-white/20 px-5 py-2.5"
          >
            ← Back to home
          </a>
        </div>
      </body>
    </html>
  );
}
