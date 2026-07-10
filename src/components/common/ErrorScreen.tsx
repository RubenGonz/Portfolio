import type { ReactNode } from "react";

/** Shared action (link/button) styling for error pages. */
export const errorActionClass =
  "font-inputmono text-sm text-muted hover:text-fg transition-colors border border-line/10 hover:border-line/20 px-5 py-2.5 cursor-pointer";

/**
 * Full-screen chrome shared by every status/error page (404, 500, 401…):
 * dot grid, corner glow and the oversized ghost braces behind the content.
 * Pass the status `code`, `heading` and `body`; render the CTA(s) as children.
 *
 * Not used by app/global-error.tsx — that one replaces a broken root layout,
 * so it can't rely on Tailwind/CSS vars and inlines its own styles instead.
 */
export function ErrorScreen({
  code,
  heading,
  body,
  children,
}: {
  code: ReactNode;
  heading: ReactNode;
  body: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6 text-center">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--grid-dot) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          right: 0,
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, var(--glow) 0%, transparent 65%)",
        }}
      />

      {/* Ghost braces */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-n27 font-bold italic"
          style={{
            fontSize: "clamp(280px, 50vw, 520px)",
            lineHeight: 1,
            background: "linear-gradient(180deg, var(--ghost-from), var(--ghost-to))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {"{ }"}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="font-n27 font-bold italic text-[clamp(5rem,18vw,10rem)] leading-none bg-linear-to-br from-brand-sec to-brand bg-clip-text text-transparent select-none">
          {code}
        </span>
        <h1 className="font-inputmono text-lg text-fg mt-3 mb-2">{heading}</h1>
        <p className="font-inputmono text-sm text-muted max-w-sm mb-8">{body}</p>
        {children}
      </div>
    </div>
  );
}
