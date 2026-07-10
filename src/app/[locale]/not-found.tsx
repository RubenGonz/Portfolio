import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { ErrorScreen, errorActionClass } from "@/components/common";

export default async function NotFound() {
  const t = await getTranslations("errors");

  return (
    <ErrorScreen code={t("404title")} heading={t("404heading")} body={t("404body")}>
      <Link href="/" className={errorActionClass}>
        {t("404cta")}
      </Link>
    </ErrorScreen>
  );
}
