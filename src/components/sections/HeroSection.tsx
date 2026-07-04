import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Dot grid — full viewport width */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--grid-dot) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Radial glow top-right */}
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

      <section className="relative flex flex-col justify-center min-h-screen px-6 md:px-16 max-w-5xl mx-auto">
        {/* Ghost bracket — desktop only */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-n27 font-bold italic select-none pointer-events-none hidden md:block"
          style={{
            fontSize: "320px",
            lineHeight: 1,
            background: "linear-gradient(180deg, var(--ghost-from), var(--ghost-to))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {"{ }"}
        </div>

        {/* Content — offset for fixed header */}
        <div className="relative z-10 max-w-2xl pt-14">
          {/* Terminal path line */}
          <div className="flex items-center gap-2 mb-4 md:mb-5 font-inputmono overflow-hidden" aria-hidden="true">
            <span className="text-subtle text-xs shrink-0">~/portfolio</span>
            <span className="text-subtle text-xs shrink-0">$</span>
            <span className="text-fg text-xs italic truncate">Rubén González Rodríguez</span>
            <span className="text-brand text-xs shrink-0 animate-[blink_1.1s_step-end_infinite]">▌</span>
          </div>

          {/* Headline */}
          <h1 className="font-n27 font-bold italic text-fg leading-[0.92] tracking-tight mb-4 md:mb-5
            text-[clamp(2.75rem,10vw,5.5rem)]">
            Frontend<br />Developer
          </h1>

          {/* Accent line + tagline */}
          <div className="flex items-center gap-3 mb-4 md:mb-5">
            <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand shrink-0" />
            <p className="font-inputmono text-muted text-[11px] md:text-xs tracking-wider md:tracking-widest leading-relaxed">
              Banking sector · Enterprise systems · Going full-stack
            </p>

          </div>

          {/* Description */}
          <p className="font-inputmono text-muted text-xs md:text-sm leading-relaxed max-w-lg mb-8 md:mb-9">
            Spent a few years building production apps for banks and enterprise clients —
            the kind real people depend on. Now going full-stack, and this portfolio
            is the first thing I&apos;m shipping to prove it.
          </p>

          {/* CTAs */}
          <div className="flex flex-col xs:flex-row flex-wrap gap-3">
            <Link
              href="#projects"
              className="font-inputmono text-xs font-bold px-5 py-3 tracking-wide text-center
                bg-gradient-to-r from-brand-sec to-brand text-on-accent
                hover:opacity-90 transition-opacity"
            >
              See projects →
            </Link>
            <a
              href="/cv-ruben-gonzalez.pdf"
              download
              className="font-inputmono text-xs px-5 py-3 border border-line/30 text-muted text-center
                hover:border-brand/50 hover:text-fg transition-colors tracking-wide
                shadow-raised"
            >
              Download CV ↓
            </a>
            <a
              href="https://github.com/RubenGonz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-xs px-5 py-3 border border-line/16 text-subtle text-center
                hover:border-brand/40 hover:text-fg transition-colors tracking-wide"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
