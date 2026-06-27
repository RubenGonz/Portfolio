import Link from "next/link";
import { projects } from "@/data/projects";

export const ProjectsSection = () => {
  return (
    <section id="projects" className="px-6 md:px-16 py-32 max-w-5xl mx-auto">
      {/* Section label */}
      <p className="font-inputmono text-gray-600 text-xs tracking-widest uppercase mb-12">
        01 — Projects
      </p>

      {/* Project cards */}
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block border border-gray-800 bg-soft-black p-8
              hover:border-brand/40 transition-colors duration-300"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-n27 font-bold text-light text-xl md:text-2xl
                  group-hover:text-brand transition-colors">
                  {project.title}
                </h3>
                <p className="font-inputmono text-gray-600 text-xs mt-1">
                  {project.year}
                  {project.status === "in-progress" && (
                    <span className="ml-3 text-brand">· In progress</span>
                  )}
                </p>
              </div>
              <span className="font-inputmono text-gray-600 text-sm group-hover:text-brand
                transition-colors mt-1 shrink-0">
                ↗
              </span>
            </div>

            <p className="font-inputmono text-gray-400 text-sm leading-relaxed mb-6 max-w-2xl">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-inputmono text-xs text-gray-500 border border-gray-800 px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Honest footer */}
      <p className="font-inputmono text-gray-700 text-xs mt-8">
        More projects coming soon.
      </p>
    </section>
  );
};
