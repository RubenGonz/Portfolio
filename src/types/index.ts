export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  repoUrl?: string;
  imageUrl?: string;
  featured: boolean;
  year: number;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "other";
  level?: "learning" | "comfortable" | "proficient";
}

export interface ContactMessage {
  email: string;
  message: string;
}
