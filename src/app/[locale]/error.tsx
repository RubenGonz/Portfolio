"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { ErrorScreen, errorActionClass } from "@/components/common";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("errors");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorScreen code={t("500title")} heading={t("500heading")} body={t("500body")}>
      <div className="flex gap-4">
        <button onClick={reset} className={errorActionClass}>
          {t("500cta")}
        </button>
        <Link href="/" className={errorActionClass}>
          {t("500ctaHome")}
        </Link>
      </div>
    </ErrorScreen>
  );
}
