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

export interface StackItem {
  name: string;
  tier: "professional" | "active" | "familiar";
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

export interface ContactMessage {
  email: string;
  message: string;
}
