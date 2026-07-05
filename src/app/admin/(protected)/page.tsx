import Link from "next/link";
import { getProjects } from "@/data/projects";
import { getCourses } from "@/data/courses";

export default async function AdminDashboard() {
  const [projects, courses] = await Promise.all([getProjects(), getCourses()]);

  const cards = [
    { href: "/admin/projects", label: "Projects", count: projects.length },
    { href: "/admin/courses", label: "Courses", count: courses.length },
  ];

  return (
    <div>
      <h1 className="font-n27 font-bold italic text-2xl text-fg mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group border border-line/10 bg-surface px-6 py-5
              hover:border-brand/30 transition-colors"
          >
            <p className="font-inputmono text-[11px] tracking-widest uppercase text-subtle mb-2">
              {c.label}
            </p>
            <p className="font-n27 font-bold italic text-3xl text-fg group-hover:text-brand transition-colors">
              {c.count}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
