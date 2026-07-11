import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { ErrorScreen, errorActionClass } from "@/components/common";

export default async function UnauthorizedPage() {
  const t = await getTranslations("errors");

  return (
    <ErrorScreen code={t("401title")} heading={t("401heading")} body={t("401body")}>
      <Link href="/" className={errorActionClass}>
        {t("401cta")}
      </Link>
    </ErrorScreen>
  );
}
