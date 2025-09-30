import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/config/fonts";

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
    "RubenGonz",
    "portfolio desarrollador web",
    "desarrollador web",
    "React",
    "Next.js",
    "frontend developer",
    "React developer"
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </body>
  </html>
}