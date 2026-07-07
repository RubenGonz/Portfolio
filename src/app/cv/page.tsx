import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getHomeContent } from "@/data/settings";
import { Header } from "@/components";

export default async function CvPage() {
  const [setting, { available }] = await Promise.all([
    prisma.setting.findUnique({ where: { key: "cv_url" } }),
    getHomeContent(),
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
