import Link from "next/link";
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GhostNumber } from "@/components/ui/GhostNumber";
import { Section } from "@/components/ui/Section";

export const ProjectsSection = () => {
  return (
    <Section id="projects">
      <SectionHeader label="Projects" srTitle="Projects" />

      <div className="flex flex-col gap-4 md:gap-6 relative">
        <GhostNumber>01</GhostNumber>

        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block border border-line/7 bg-surface overflow-hidden
              hover:border-brand/30 transition-colors duration-300"
          >
            <div className="h-[2px] bg-gradient-to-r from-brand-sec via-brand to-transparent" />

            <div className="p-5 md:p-7">
              <div className="flex items-start justify-between gap-4 mb-3 md:mb-4">
                <div>
                  <h3 className="font-n27 font-bold italic text-fg text-lg md:text-2xl
                    group-hover:text-brand transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span aria-hidden="true" className="font-inputmono text-subtle text-[11px]">{project.year}</span>
                    {project.status === "in-progress" && (
                      <span className="font-inputmono text-[11px] text-brand border border-brand/20
                        bg-brand/8 px-2 py-0.5 tracking-widest uppercase">
                        In progress
                      </span>
                    )}
                    {project.status === "live" && (
                      <span className="font-inputmono text-[11px] text-success border border-success/20
                        bg-success/8 px-2 py-0.5 tracking-widest uppercase">
                        Live
                      </span>
                    )}
                  </div>
                </div>
                <span aria-hidden="true" className="font-inputmono text-subtle text-sm group-hover:text-brand
                  transition-colors shrink-0 mt-1">
                  ↗
                </span>
              </div>

              <p className="font-inputmono text-muted text-xs leading-relaxed mb-4 md:mb-5">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-inputmono text-[11px] text-muted border border-line/5
                      bg-line/[0.02] px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
};
