import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const setting = await prisma.setting.findUnique({ where: { key: "cv_url" } });
  if (!setting?.value) notFound();

  const res = await fetch(setting.value);
  if (!res.ok) notFound();

  return new Response(res.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
