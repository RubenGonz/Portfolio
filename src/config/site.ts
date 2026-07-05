/** Single source of truth for identity, contact and social data used across the site. */
export const siteConfig = {
  name: "RubenGonz",
  fullName: "Rubén González Rodríguez",
  role: "Frontend & Full-Stack Developer",
  location: "Elche, Spain",
  email: "ruben.gonzalez.rodriguez00@gmail.com",
  /** Base URL — Vercel dashboard is the source of truth in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rubengonz.com",
  social: {
    github: { url: "https://github.com/RubenGonz", handle: "github.com/RubenGonz" },
    linkedin: { url: "https://linkedin.com/in/ruben-gonz", handle: "linkedin.com/in/ruben-gonz" },
  },
} as const;
