import type { Project, StatusMeta } from "@/types";

/** Maps a project's status to the shared StatusBadge tone + label. */
export const projectStatusMeta: Record<Project["status"], StatusMeta> = {
  live: { tone: "success", label: "Live" },
  "in-progress": { tone: "brand", label: "In progress" },
  archived: { tone: "neutral", label: "Archived" },
};

export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "rubengonz.com",
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
      "Route groups to isolate home layout from project pages — no layout hacks, clean separation",
      "Dark-only theme — chose to commit to one aesthetic instead of doing both poorly",
      "Two local fonts (InputMono + N27) via next/font — zero layout shift, full weight ranges",
      "Tailwind CSS v4: first project on the CSS-native config, no tailwind.config.js needed",
      "Static data layer built to swap in a real database without touching a single component",
      "TypeScript strict mode throughout — no any shortcuts, no escape hatches",
    ],
    role: "Solo project — design, architecture & full-stack",
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
