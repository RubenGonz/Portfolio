import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { getHomeContent } from "@/data/settings";
import { DEFAULT_LOCALE } from "@/data/locale";
import { Header } from "@/components";

export default async function CvPage() {
  const locale = await getLocale();
  const [setting, { available }] = await Promise.all([
    // cv_url is language-neutral — stored under the default locale.
    prisma.setting.findUnique({
      where: { key_locale: { key: "cv_url", locale: DEFAULT_LOCALE } },
    }),
    getHomeContent(locale),
  ]);

  if (!setting?.value) notFound();

  return (
    <div className="flex flex-col h-screen">
      <Header available={available} />
      <iframe
        src={setting.value}
        className="flex-1 w-full border-0 mt-14"
        title="Rubén González Rodríguez — CV"
      />
    </div>
  );
}
