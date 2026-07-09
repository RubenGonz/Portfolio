import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = siteConfig.url;
  const isEs = locale === "es";

  return {
    title: {
      template: "%s | RubenGonz",
      default: "RubenGonz — Frontend & Full-Stack Developer",
    },
    description: isEs
      ? "Desarrollador frontend con experiencia en producción con React y Angular, ahora construyendo full-stack con Next.js, Node.js, PostgreSQL y Prisma. Basado en Elche, España."
      : "Frontend developer with production experience in React and Angular, now building full-stack with Next.js, Node.js, PostgreSQL and Prisma. Based in Elche, Spain. Open to new roles.",
    keywords: [
      "Rubén González Rodríguez", "Ruben Gonzalez Rodriguez",
      "Rubén González", "Ruben Gonzalez", "RubenGonz",
      "frontend developer", "full stack developer", "React developer",
      "Angular developer", "Next.js developer", "portfolio", "Elche Spain",
    ],
    authors: [{ name: siteConfig.fullName, url: base }],
    creator: siteConfig.fullName,
    publisher: siteConfig.fullName,
    verification: { google: "5dfqJgL0R0E6VdVducpvSpNHpCAlbDJFMlgNj4NL36g" },
    alternates: {
      canonical: `${base}/${locale}`,
      languages: { en: `${base}/en`, es: `${base}/es` },
    },
    openGraph: {
      title: "RubenGonz — Frontend & Full-Stack Developer",
      description: isEs
        ? "Desarrollador frontend con experiencia en producción con React y Angular, ahora construyendo full-stack con Next.js, Node.js, PostgreSQL y Prisma."
        : "Frontend developer with production experience in React and Angular, now building full-stack with Next.js, Node.js, PostgreSQL and Prisma. Based in Elche, Spain.",
      url: `${base}/${locale}`,
      siteName: siteConfig.name,
      locale: isEs ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "RubenGonz — Frontend & Full-Stack Developer",
      description: isEs
        ? "Desarrollador frontend con experiencia en React y Angular, ahora full-stack con Next.js, Node.js y PostgreSQL."
        : "Frontend developer with production experience in React and Angular, now building full-stack with Next.js, Node.js and PostgreSQL.",
      images: ["/opengraph-image"],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteConfig.url,
  sameAs: [siteConfig.social.github.url, siteConfig.social.linkedin.url],
  address: { "@type": "PostalAddress", addressLocality: "Elche", addressCountry: "ES" },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "es")) notFound();

  const messages = await getMessages();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
