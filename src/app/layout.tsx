import type { Metadata } from "next";
import "./globals.css";
import MaintenancePage from "./maintenance/page";
import { inputMono, n27 } from "@/config/fonts/fonts";
import { Providers } from "@/components";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  title: {
    template: "%s | RubenGonz",
    default: "RubenGonz — Frontend Developer",
  },
  description: "Frontend developer with production experience in React and Angular. Building full-stack with Next.js and Node.js. Based in Elche, Spain. Open to new roles.",
  keywords: [
    "Rubén González Rodríguez",
    "Ruben Gonzalez Rodriguez",
    "Rubén González",
    "Ruben Gonzalez",
    "RubenGonz",
    "frontend developer",
    "React developer",
    "Angular developer",
    "Next.js developer",
    "portfolio",
    "Elche Spain",
  ],
  authors: [{ name: "Rubén González Rodríguez", url: "https://www.rubengonz.com" }],
  creator: "Rubén González Rodríguez",
  publisher: "Rubén González Rodríguez",
  verification: {
    google: "5dfqJgL0R0E6VdVducpvSpNHpCAlbDJFMlgNj4NL36g",
  },
  openGraph: {
    title: "RubenGonz — Frontend Developer",
    description: "Frontend developer with production experience in React and Angular. Building full-stack with Next.js and Node.js. Based in Elche, Spain.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "RubenGonz",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RubenGonz — Frontend Developer",
    description: "Frontend developer with production experience in React and Angular. Building full-stack with Next.js and Node.js.",
    images: ["/opengraph-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteConfig.url,
  sameAs: [
    siteConfig.social.github.url,
    siteConfig.social.linkedin.url,
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Elche",
    addressCountry: "ES",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const maintenance = process.env.MAINTENANCE_MODE === "true";

  return <html lang="en" suppressHydrationWarning>
    <head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </head>
    <body className={`${inputMono.variable} ${n27.variable} font-inputmono`}>
      <Providers>
        {maintenance ? <MaintenancePage /> : children}
      </Providers>
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
}