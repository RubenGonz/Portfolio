import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { navLinks } from "@/config/nav";
import { siteConfig } from "@/config/site";

export const Footer = async () => {
  const t = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-16 pt-6 pb-10 border-t border-line/15">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="font-n27 font-bold italic text-base flex items-center gap-1">
            <span className="bg-linear-to-br from-brand-sec to-brand bg-clip-text text-transparent">{"{"}</span>
            <span className="text-fg">rubengonz</span>
            <span className="bg-linear-to-br from-brand-sec to-brand bg-clip-text text-transparent">{"}"}</span>
          </span>
          <div className="flex items-center gap-5">
            <a href={siteConfig.social.github.url} target="_blank" rel="noopener noreferrer" className="font-inputmono text-[11px] text-muted hover:text-fg transition-colors cursor-pointer">
              GitHub ↗
            </a>
            <a href={siteConfig.social.linkedin.url} target="_blank" rel="noopener noreferrer" className="font-inputmono text-[11px] text-muted hover:text-fg transition-colors cursor-pointer">
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-line/10 pt-5">
          <p className="font-inputmono text-[11px] text-muted">
            © {year} {siteConfig.fullName} · {siteConfig.location}
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-start">
            {navLinks.map(({ key, href }) => (
              <Link key={href} href={href} className="font-inputmono text-[11px] text-muted hover:text-fg transition-colors tracking-widest uppercase">
                {t(key)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
