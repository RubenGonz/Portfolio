// ─── Domain view-models ──────────────────────────────────────────────────────
// The shapes the public UI renders. The data layer (src/data/*) maps Prisma rows
// into these; admin edit/input DTOs stay colocated with their data module.

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  url?: string;
  repoUrl?: string;
  featured: boolean;
  year: number;
  status: "live" | "in-progress" | "archived";
  highlights: string[];
  role?: string;
  images?: { name: string; src: string; alt: string }[];
}

export interface Course {
  slug: string;
  title: string;
  platform: string;
  year: number;
  status: "completed" | "in-progress" | "not-started";
  shortDescription: string;
  fullDescription: string;
  topics: { label: string; items: string[] }[];
  tags: string[];
  featured: boolean;
  certificateUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
}

export interface StackItem {
  name: string;
  tier: "professional" | "active" | "familiar";
}

export interface StackItemWithId extends StackItem {
  id: string;
  category: string;
  order: number;
}

export interface StackCategory {
  label: string;
  items: StackItemWithId[];
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  subtitle: string | null;
  paragraphs: string[];
  current: boolean;
  order: number;
}

// ─── Home / settings content ─────────────────────────────────────────────────

export interface HeroContent {
  title: string;
  tagline: string;
  description: string;
}

export interface ContactContent {
  headline: string;
  subtext: string;
}

export interface AvailableContent {
  available: boolean;
  label: string;
}

export interface HomeContent {
  hero: HeroContent;
  tickerText: string;
  contact: ContactContent;
  available: AvailableContent;
  cvUrl: string;
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export interface ContactMessage {
  email: string;
  message: string;
}
