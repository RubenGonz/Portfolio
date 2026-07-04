export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-16 py-10 border-t border-line/15">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Row 1: wordmark left, social links right */}
        <div className="flex items-center justify-between">
          <span className="font-n27 font-bold italic text-base flex items-center gap-1">
            <span className="bg-gradient-to-br from-brand-sec to-brand bg-clip-text text-transparent">{"{"}</span>
            <span className="text-fg">rubengonz</span>
            <span className="bg-gradient-to-br from-brand-sec to-brand bg-clip-text text-transparent">{"}"}</span>
          </span>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/RubenGonz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-[11px] text-muted hover:text-fg transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/ruben-gonz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-[11px] text-muted hover:text-fg transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Row 2: copyright left, nav links right — stacks on mobile */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-line/10 pt-5">
          <p className="font-inputmono text-[11px] text-muted">
            © {year} Rubén González Rodríguez · Elche, Spain
          </p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {[
              { label: "Projects", href: "/#projects" },
              { label: "About", href: "/#about" },
              { label: "Courses", href: "/#courses" },
              { label: "Stack", href: "/#stack" },
              { label: "Contact", href: "/#contact" },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-inputmono text-[11px] text-muted hover:text-fg transition-colors tracking-widest uppercase"
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
