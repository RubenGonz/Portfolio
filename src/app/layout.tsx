import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import { inputMono, n27 } from "@/config/fonts/fonts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get("X-NEXT-INTL-LOCALE") ?? "en";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inputMono.variable} ${n27.variable} font-inputmono`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
