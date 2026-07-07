import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const setting = await prisma.setting.findUnique({ where: { key: "cv_url" } });
  if (!setting?.value) notFound();
  redirect(setting.value);
}
