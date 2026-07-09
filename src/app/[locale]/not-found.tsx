import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

export default async function NotFound() {
  const t = await getTranslations("errors");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span className="font-n27 font-bold italic text-[clamp(6rem,20vw,12rem)] leading-none bg-linear-to-br from-brand-sec to-brand bg-clip-text text-transparent select-none">
        {t("404title")}
      </span>
      <h1 className="font-inputmono text-lg text-fg mt-4 mb-2">{t("404heading")}</h1>
      <p className="font-inputmono text-sm text-muted max-w-sm mb-8">{t("404body")}</p>
      <Link
        href="/"
        className="font-inputmono text-sm text-muted hover:text-fg transition-colors border border-line/10 hover:border-line/20 px-5 py-2.5"
      >
        {t("404cta")}
      </Link>
    </div>
  );
}
