import Link from "next/link";
import { projects } from "@/data/projects";

export const ProjectsSection = () => {
  return (
    <section id="projects" className="px-6 md:px-16 py-28 max-w-5xl mx-auto">
      {/* Section label */}
      <p className="font-inputmono text-gray-700 text-[9px] tracking-[0.2em] uppercase mb-1">
        {"// Projects"}
      </p>
      <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand mb-10" />

      {/* Project cards */}
      <div className="flex flex-col gap-6 relative">
        {/* Decorative section number */}
        <span className="absolute -top-2 right-0 font-n27 font-bold italic text-[80px] leading-none text-white/[0.02] select-none pointer-events-none">
          01
        </span>

        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block border border-white/7 bg-surface overflow-hidden
              hover:border-brand/30 transition-colors duration-300"
          >
            {/* Gradient accent top border */}
            <div className="h-[2px] bg-gradient-to-r from-brand-sec via-brand to-transparent" />

            <div className="p-7">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-n27 font-bold italic text-light text-xl md:text-2xl
                    group-hover:text-brand transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-inputmono text-gray-700 text-[9px]">{project.year}</span>
                    {project.status === "in-progress" && (
                      <span className="font-inputmono text-[8px] text-brand border border-brand/20
                        bg-brand/8 px-2 py-0.5 tracking-widest uppercase">
                        In progress
                      </span>
                    )}
                    {project.status === "live" && (
                      <span className="font-inputmono text-[8px] text-green-500 border border-green-500/20
                        bg-green-500/8 px-2 py-0.5 tracking-widest uppercase">
                        Live
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-inputmono text-gray-700 text-sm group-hover:text-brand
                  transition-colors shrink-0 mt-1">
                  ↗
                </span>
              </div>

              <p className="font-inputmono text-gray-500 text-xs leading-relaxed mb-5 max-w-2xl">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-inputmono text-[9px] text-gray-600 border border-white/5
                      bg-white/[0.02] px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
