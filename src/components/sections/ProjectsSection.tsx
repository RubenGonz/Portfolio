import Link from "next/link";
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GhostNumber } from "@/components/ui/GhostNumber";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Section } from "@/components/ui/Section";

const PREVIEW_COUNT = 2;

export const ProjectsSection = () => {
  const preview = projects.slice(0, PREVIEW_COUNT);
  const remaining = projects.length - PREVIEW_COUNT;

  return (
    <Section id="projects">
      <SectionHeader label="Projects" srTitle="Projects" />

      <div className="flex flex-col gap-4 md:gap-6 relative">
        <GhostNumber>01</GhostNumber>

        {preview.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}

        {projects.length > PREVIEW_COUNT && (
          <Link
            href="/projects"
            className="font-inputmono text-[11px] tracking-widest uppercase text-subtle
              hover:text-brand transition-colors duration-150 inline-flex items-center gap-2 mt-2"
          >
            {remaining > 0 ? `View ${remaining} more →` : "View all projects →"}
          </Link>
        )}
      </div>
    </Section>
  );
};
