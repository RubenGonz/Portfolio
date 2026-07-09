export interface NavLink {
  label: string;
  href: string;
  /** Key used to look up the translated label in messages/nav */
  key: "projects" | "about" | "courses" | "stack" | "contact";
}

/** Hrefs are locale-agnostic — the locale-aware Link from @/navigation adds the prefix automatically. */
export const navLinks: NavLink[] = [
  { key: "projects", label: "Projects", href: "/projects" },
  { key: "about",    label: "About",    href: "/#about" },
  { key: "courses",  label: "Courses",  href: "/courses" },
  { key: "stack",    label: "Stack",    href: "/#stack" },
  { key: "contact",  label: "Contact",  href: "/#contact" },
];
