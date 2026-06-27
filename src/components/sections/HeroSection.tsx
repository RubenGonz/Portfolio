import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 max-w-5xl mx-auto">
      {/* Label */}
      <p className="font-inputmono text-brand text-sm tracking-widest uppercase mb-6">
        Available for new opportunities
      </p>

      {/* Headline */}
      <h1 className="font-n27 font-bold italic text-light leading-tight mb-6
        text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        Frontend<br />Developer
      </h1>

      {/* Stack line */}
      <p className="font-inputmono text-brand/80 text-sm md:text-base tracking-wide mb-8">
        React · Angular · TypeScript · Next.js · Node.js
      </p>

      {/* Description */}
      <p className="font-inputmono text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mb-10">
        Professional experience building web applications for the banking sector
        and enterprise systems. Now going full-stack with Next.js and Node.js.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="#projects"
          className="font-inputmono text-sm px-6 py-3 bg-brand text-soft-black font-semibold
            hover:bg-brand/90 transition-colors"
        >
          See projects
        </Link>
        <a
          href="https://github.com/RubenGonz"
          target="_blank"
          rel="noopener noreferrer"
          className="font-inputmono text-sm px-6 py-3 border border-gray-700 text-gray-300
            hover:border-brand hover:text-brand transition-colors"
        >
          GitHub ↗
        </a>
        <a
          href="https://linkedin.com/in/ruben-gonz"
          target="_blank"
          rel="noopener noreferrer"
          className="font-inputmono text-sm px-6 py-3 border border-gray-700 text-gray-300
            hover:border-brand hover:text-brand transition-colors"
        >
          LinkedIn ↗
        </a>
      </div>
    </section>
  );
};
