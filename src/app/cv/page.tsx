import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function CvPage() {
  const setting = await prisma.setting.findUnique({ where: { key: "cv_url" } });
  if (!setting?.value) notFound();

  return (
    <iframe
      src={setting.value}
      className="fixed inset-0 w-full h-full border-0"
      title="Rubén González Rodríguez — CV"
    />
  );
}
