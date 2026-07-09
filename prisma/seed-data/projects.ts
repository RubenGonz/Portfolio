import type { Project } from "../../src/types";

/** Seed fixtures — the initial content loaded into the database.
 *  After seeding, the app reads from the DB via src/data/projects.ts. */
export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "rubengonz.com",
    shortDescription:
      "Not a template. Built from scratch because I wanted something that shows how I think about code — the architecture, the design decisions, the things that don't show up in a GitHub readme.",
    fullDescription:
      "I started this portfolio because I didn't want to just list skills on a page — I wanted something that reflected how I actually build software. So I treated it as a real project, with real constraints and real decisions to defend.\n\nIt began as a frontend piece: Next.js 15 App Router with route groups and nested layouts, two local font families (InputMono + N27) because typography matters and system fonts were the lazy option, and a dark/light theme with proper CSS variable theming throughout.\n\nThen I built the backend behind it. PostgreSQL on Neon with Prisma as the ORM, Auth.js v5 for a proper login, middleware-guarded admin routes, and a full CRUD panel to manage every project, course and section — all through Server Actions, no separate API layer. The static data layer I designed up front swapped to a real database without touching a single component. That was the whole point.\n\nEvery part of this codebase is something I'd stand behind in a code review.",
    tags: ["Next.js 15", "TypeScript", "React 19", "PostgreSQL", "Prisma", "Auth.js", "Tailwind CSS 4", "Vercel"],
    url: "https://rubengonz.com",
    repoUrl: "https://github.com/RubenGonz",
    featured: true,
    year: 2026,
    status: "in-progress",
    highlights: [
      "Full backend: PostgreSQL (Neon) + Prisma ORM, migrations run at build time on Vercel",
      "Auth.js v5 with Credentials + JWT, split edge/node config so middleware stays edge-safe",
      "Admin panel: CRUD for projects, courses, timeline and stack, with drag-and-drop reordering",
      "Server Actions for every mutation — no separate REST layer, end-to-end type safety",
      "Middleware-guarded /admin on the edge runtime, with a second auth check in the layout",
      "generateStaticParams reads slugs from the database at build → SSG pages from live data",
      "Route groups isolate the home layout from detail pages — clean separation, no layout hacks",
      "Dark and light theme, two local fonts via next/font (zero layout shift), Tailwind CSS v4, TS strict",
      "i18n-ready architecture — multi-language support planned",
      "Full Jest + React Testing Library test suite covering components and server actions",
    ],
    role: "Solo project — design, architecture & full-stack",
    images: [
      { name: "hero",    src: "/images/projects/portfolio/portfolio-1.webp", alt: "Portfolio — Hero section" },
      { name: "about",   src: "/images/projects/portfolio/about.webp",       alt: "Portfolio — About section" },
      { name: "stack",   src: "/images/projects/portfolio/stack.webp",       alt: "Portfolio — Stack section" },
      { name: "contact", src: "/images/projects/portfolio/contact.webp",     alt: "Portfolio — Contact section" },
    ],
  },
];

/** Spanish translations, keyed by project slug. */
export interface ProjectTranslationSeed {
  title: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  role: string;
}

export const projectTranslationsEs: Record<string, ProjectTranslationSeed> = {
  portfolio: {
    title: "rubengonz.com",
    shortDescription:
      "No es una plantilla. Construido desde cero porque quería algo que mostrara cómo pienso el código: la arquitectura, las decisiones de diseño, las cosas que no se ven en un readme de GitHub.",
    fullDescription:
      "Empecé este portfolio porque no quería limitarme a listar habilidades en una página: quería algo que reflejara cómo construyo software de verdad. Así que lo traté como un proyecto real, con restricciones reales y decisiones que defender.\n\nEmpezó como una pieza de frontend: Next.js 15 con App Router, route groups y layouts anidados, dos familias tipográficas locales (InputMono + N27) porque la tipografía importa y las fuentes del sistema eran la opción fácil, y un tema claro/oscuro con theming basado en variables CSS en todo el proyecto.\n\nDespués construí el backend que hay detrás. PostgreSQL en Neon con Prisma como ORM, Auth.js v5 para un login en condiciones, rutas de administración protegidas por middleware y un panel CRUD completo para gestionar cada proyecto, curso y sección, todo mediante Server Actions, sin una capa de API aparte. La capa de datos estática que diseñé al principio pasó a una base de datos real sin tocar un solo componente. Ese era justo el objetivo.\n\nCada parte de este código es algo que defendería en una code review.",
    highlights: [
      "Backend completo: PostgreSQL (Neon) + Prisma ORM, con migraciones que se ejecutan en el build en Vercel",
      "Auth.js v5 con Credentials + JWT y configuración edge/node separada para que el middleware sea edge-safe",
      "Panel de administración: CRUD de proyectos, cursos, timeline y stack, con reordenación drag-and-drop",
      "Server Actions para cada mutación: sin capa REST aparte y con tipado seguro de extremo a extremo",
      "/admin protegido por middleware en el runtime edge, con una segunda comprobación de auth en el layout",
      "generateStaticParams lee los slugs de la base de datos en el build → páginas SSG a partir de datos reales",
      "Los route groups aíslan el layout del home de las páginas de detalle: separación limpia, sin hacks de layout",
      "Tema claro y oscuro, dos fuentes locales con next/font (sin layout shift), Tailwind CSS v4 y TS strict",
      "Arquitectura internacionalizada (i18n) con soporte para inglés y español",
      "Suite de tests completa con Jest + React Testing Library que cubre componentes y server actions",
    ],
    role: "Proyecto individual — diseño, arquitectura y full-stack",
  },
};
