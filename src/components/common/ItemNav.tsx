import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

interface NavItem {
  href: string;
  /** Short identifier shown on mobile (platform, year, etc.) */
  shortLabel: string;
  /** Full title shown on desktop */
  title: string;
}

interface Props {
  prev: NavItem | null;
  next: NavItem | null;
  allHref: string;
  allLabel: string;
}

const navCard = `group flex flex-col gap-0.5 border border-line/5 bg-line/1
  px-5 py-4 hover:border-brand/30 transition-colors duration-150 cursor-pointer`;

export const ItemNav = async ({ prev, next, allHref, allLabel }: Props) => {
  const t = await getTranslations("itemNav");
  return (
  <div className="border-t border-line/5 mt-16 md:mt-24 px-6 md:px-16 py-10 max-w-5xl mx-auto">

    <div className="grid grid-cols-2 gap-4 mb-6">
      {prev ? (
        <Link href={prev.href} className={navCard}>
          <span className="font-inputmono text-[11px] text-faint tracking-widest">{t("prev")}</span>
          {/* Mobile: short label */}
          <span className="font-inputmono text-subtle text-xs group-hover:text-fg transition-colors md:hidden">
            {prev.shortLabel}
          </span>
          {/* Desktop: full title */}
          <span className="font-n27 font-bold italic text-muted text-base group-hover:text-fg transition-colors hidden md:block">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link href={next.href} className={`${navCard} text-right`}>
          <span className="font-inputmono text-[11px] text-faint tracking-widest">{t("next")}</span>
          {/* Mobile: short label */}
          <span className="font-inputmono text-subtle text-xs group-hover:text-fg transition-colors md:hidden">
            {next.shortLabel}
          </span>
          {/* Desktop: full title */}
          <span className="font-n27 font-bold italic text-muted text-base group-hover:text-fg transition-colors hidden md:block">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>

    <div className="text-center">
      <Link
        href={allHref}
        className="font-inputmono text-[11px] tracking-widest uppercase text-subtle
          hover:text-brand transition-colors duration-150 cursor-pointer"
      >
        {allLabel}
      </Link>
    </div>
  </div>
  );
};
