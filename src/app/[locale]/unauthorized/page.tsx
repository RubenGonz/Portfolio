import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

export default async function UnauthorizedPage() {
  const t = await getTranslations("errors");

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
          right: "0",
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
          {t("401title")}
        </span>
        <h1 className="font-inputmono text-lg text-fg mt-3 mb-2">{t("401heading")}</h1>
        <p className="font-inputmono text-sm text-muted max-w-sm mb-8">{t("401body")}</p>
        <Link
          href="/"
          className="font-inputmono text-sm text-muted hover:text-fg transition-colors border border-line/10 hover:border-line/20 px-5 py-2.5"
        >
          {t("401cta")}
        </Link>
      </div>
    </div>
  );
}
