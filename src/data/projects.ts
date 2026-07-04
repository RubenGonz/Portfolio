import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "Personal Portfolio",
    shortDescription:
      "Not a template. Built from scratch because I wanted something that shows how I think about code — the architecture, the design decisions, the things that don't show up in a GitHub readme.",
    fullDescription:
      "I started this portfolio because I didn't want to just list skills on a page — I wanted something that reflected how I actually build software. So I treated it as a real project, with real constraints and real decisions to defend.\n\nNext.js 15 App Router with route groups and nested layouts. Two local font families (InputMono + N27) because typography matters and system fonts were the lazy option. A static data layer for projects that can scale to a database without touching the components. Dark-only theme because I wanted to commit to a design decision instead of supporting both and doing neither well.\n\nEvery part of this codebase is something I'd stand behind in a code review.",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS 4", "React 19", "Vercel"],
    url: "https://rubengonz.com",
    repoUrl: "https://github.com/RubenGonz",
    featured: true,
    year: 2026,
    status: "in-progress",
    highlights: [
      "Next.js 15 App Router with route groups and nested layouts",
      "Tailwind CSS v4 with custom design tokens and CSS variables",
      "Two local font families (InputMono + N27) with full weight ranges",
      "Dark mode via next-themes with system preference detection",
      "TypeScript throughout with strict mode enabled",
      "Static data layer — scalable to database without breaking the API surface",
    ],
    role: "Design, architecture & full-stack development",
    images: [
      { src: "/images/projects/portfolio/portfolio-1.webp", alt: "Portfolio — Hero section" },
      { src: "/images/projects/portfolio/about.webp", alt: "Portfolio — About section" },
      { src: "/images/projects/portfolio/stack.webp", alt: "Portfolio — Stack section" },
      { src: "/images/projects/portfolio/contact.webp", alt: "Portfolio — Contact section" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
