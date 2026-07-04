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
  images?: { src: string; alt: string }[];
}

export interface StackItem {
  name: string;
  tier: "professional" | "active" | "familiar";
}

export interface ContactMessage {
  email: string;
  message: string;
}
