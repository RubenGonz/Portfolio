import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import type { HeroContent } from "@/data/settings";

export const HeroSection = ({ hero, cvUrl }: { hero: HeroContent; cvUrl?: string }) => {
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
            {hero.title.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>

          {/* Accent line + tagline */}
          {hero.tagline && (
            <div className="flex items-center gap-3 mb-4 md:mb-5">
              <div className="w-5 h-px bg-linear-to-r from-brand-sec to-brand shrink-0" />
              <p className="font-inputmono text-muted text-[11px] md:text-xs tracking-wider md:tracking-widest leading-relaxed">
                {hero.tagline}
              </p>
            </div>
          )}

          {/* Description */}
          <p className="font-inputmono text-muted text-xs md:text-sm leading-relaxed max-w-lg mb-8 md:mb-9">
            {hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col xs:flex-row flex-wrap gap-3">
            <Button href="#projects" variant="primary">See projects →</Button>
            {cvUrl && <Button href={cvUrl} download variant="outline">Download CV ↓</Button>}
            <Button href={siteConfig.social.github.url} external variant="ghost">GitHub ↗</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
