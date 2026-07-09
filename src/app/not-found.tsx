import Link from "next/link";

// Used for routes outside of [locale] and as fallback for unmatched paths.
// Renders inside root layout — no html/body needed; uses a centering wrapper instead.
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span className="font-n27 font-bold italic text-[clamp(6rem,20vw,12rem)] leading-none bg-linear-to-br from-brand-sec to-brand bg-clip-text text-transparent select-none">
        404
      </span>
      <h1 className="font-inputmono text-lg text-fg mt-4 mb-2">Page not found</h1>
      <p className="font-inputmono text-sm text-muted max-w-sm mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/en"
        className="font-inputmono text-sm text-muted hover:text-fg transition-colors border border-line/10 hover:border-line/20 px-5 py-2.5"
      >
        ← Back to home
      </Link>
    </div>
  );
}
