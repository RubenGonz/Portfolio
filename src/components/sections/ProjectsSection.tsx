import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/navigation";
import { getProjects } from "@/data/projects";
import { SectionHeader, GhostNumber, Section, AnimateIn } from "@/components/ui";
import { ProjectCard } from "@/components/projects";

const PREVIEW_COUNT = 2;

export const ProjectsSection = async () => {
  const t = await getTranslations("projects");
  const locale = await getLocale();
  const projects = await getProjects(locale);
  const preview = projects.slice(0, PREVIEW_COUNT);
  const remaining = projects.length - PREVIEW_COUNT;

  return (
    <Section id="projects">
      <SectionHeader label={t("sectionLabel")} srTitle={t("sectionLabel")} />

      <div className="flex flex-col gap-4 md:gap-6 relative">
        <GhostNumber>01</GhostNumber>

        {preview.map((project, i) => (
          <AnimateIn key={project.slug} delay={((i + 1) as 1 | 2)} animateOut>
            <ProjectCard project={project} />
          </AnimateIn>
        ))}

        {projects.length > PREVIEW_COUNT && (
          <Link
            href="/projects"
            className="font-inputmono text-[11px] tracking-widest uppercase text-subtle
              hover:text-brand transition-colors duration-150 inline-flex items-center gap-2 mt-2"
          >
            {t("viewMore", { count: remaining })}
          </Link>
        )}
      </div>
    </Section>
  );
};
