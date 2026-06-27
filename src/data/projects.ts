import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "Personal Portfolio",
    shortDescription:
      "Personal portfolio built as a real project, not a template. Designed and architected from scratch with a focus on clean code, performance and honest technical decisions.",
    fullDescription:
      "This portfolio is the project itself — built with Next.js 15 App Router, TypeScript and Tailwind CSS 4. Every architectural decision here was made deliberately: the route group structure, the component organization, the custom typography system with two local font families, the dark mode implementation with next-themes, and the static data layer that keeps the stack simple without sacrificing scalability.\n\nThe goal was to build something that reflects how I actually write code: readable, maintainable, and without unnecessary complexity.",
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
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
