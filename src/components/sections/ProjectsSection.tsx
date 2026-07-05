import Link from "next/link";
import { projects, projectStatusMeta } from "@/data/projects";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GhostNumber } from "@/components/ui/GhostNumber";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";

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
                    <StatusBadge {...projectStatusMeta[project.status]} />
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
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
};
