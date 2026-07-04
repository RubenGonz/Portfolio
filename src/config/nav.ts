export interface NavLink {
  label: string;
  href: string;
}

/** Single source of truth for the site navigation — used by Header, Sidebar and Footer. */
export const navLinks: NavLink[] = [
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Courses", href: "/#courses" },
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
];
