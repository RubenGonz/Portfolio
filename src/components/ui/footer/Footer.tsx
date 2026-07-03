export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-16 py-10 md:py-14 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
        {/* Left: wordmark + tagline */}
        <div>
          <span className="font-n27 font-bold italic text-base bg-gradient-to-br from-brand-sec to-brand bg-clip-text text-transparent">
            {"{ rubengonz }"}
          </span>
          <p className="font-inputmono text-[10px] text-gray-700 mt-1.5">
            Frontend Developer · Elche, Spain
          </p>
        </div>

        {/* Center: links */}
        <nav className="flex items-center gap-6">
          {[
            { label: "Projects", href: "/#projects" },
            { label: "About", href: "/#about" },
            { label: "Contact", href: "/#contact" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-inputmono text-[10px] text-gray-700 hover:text-gray-400 transition-colors tracking-widest uppercase"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right: social + copyright */}
        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/RubenGonz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-[10px] text-gray-700 hover:text-gray-400 transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/ruben-gonz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-[10px] text-gray-700 hover:text-gray-400 transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
          <p className="font-inputmono text-[9px] text-gray-800">
            © {year} Rubén González Rodríguez
          </p>
        </div>
      </div>
    </footer>
  );
};
