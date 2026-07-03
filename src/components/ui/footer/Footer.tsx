export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-16 py-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Row 1: wordmark left, social links right */}
        <div className="flex items-center justify-between">
          <span className="font-n27 font-bold italic text-base bg-gradient-to-br from-brand-sec to-brand bg-clip-text text-transparent">
            {"{ rubengonz }"}
          </span>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/RubenGonz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-[10px] text-gray-600 hover:text-gray-300 transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/ruben-gonz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-[10px] text-gray-600 hover:text-gray-300 transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Row 2: copyright left, nav links right */}
        <div className="flex items-center justify-between border-t border-white/[0.04] pt-5">
          <p className="font-inputmono text-[9px] text-gray-800">
            © {year} Rubén González Rodríguez · Elche, Spain
          </p>
          <nav className="flex items-center gap-5">
            {[
              { label: "Projects", href: "/#projects" },
              { label: "About", href: "/#about" },
              { label: "Contact", href: "/#contact" },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-inputmono text-[9px] text-gray-800 hover:text-gray-500 transition-colors tracking-widest uppercase"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
