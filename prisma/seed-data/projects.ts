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
