import type { Metadata } from "next";
import "./globals.css";
import MaintenancePage from "./maintenance/page";
import { inputMono, n27 } from "@/config/fonts/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    template: "%s | RubenGonz",
    default: "RubenGonz",
  },
  description: "Portfolio personal de RubenGonz, desarrollador web especializado en React, Next.js y Angular.",
  keywords: [
    "Rubén González Rodríguez",
    "Ruben Gonzalez Rodriguez",
    "Rubén González",
    "Ruben Gonzalez",
    "RubenGonz",
    "portfolio desarrollador web",
    "desarrollador web",
    "React",
    "Next.js",
    "frontend developer",
    "React developer"
  ],
  authors: [{ name: "Rubén González Rodríguez", url: "https://www.rubengonz.com" }],
  creator: "Rubén González Rodríguez",
  publisher: "Rubén González Rodríguez",
  openGraph: {
    title: "RubenGonz",
    description: "Portfolio personal de RubenGonz, desarrollador web especializado en React, Next.js y Angular.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "RubenGonz",
    images: [
      {
        url: "/logos/logo-negro.png",
        width: 1920,
        height: 1080,
        alt: "RubenGonz",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RubenGonz",
    description: "Portfolio personal de RubenGonz, desarrollador web especializado en React, Next.js y Angular.",
    images: ["/logos/logo-negro.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const maintenance = process.env.MAINTENANCE_MODE === "true";

  return <html lang="en">
    <body className={`${inputMono.variable} ${n27.variable} font-inputmono`}>
      {maintenance ? <MaintenancePage /> : children}
    </body>
  </html>
}