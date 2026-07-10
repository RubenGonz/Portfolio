import { Link } from "@/navigation";
import type { Project } from "@/types";
import { StatusBadge, Tag } from "@/components/ui";

interface Props {
  project: Project;
  headingLevel?: 2 | 3;
}

export const ProjectCard = ({ project, headingLevel = 3 }: Props) => {
  const Title = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border border-line/7 bg-surface overflow-hidden cursor-pointer
        hover:border-brand/30 transition-colors duration-300"
    >
      <div className="h-0.5 bg-linear-to-r from-brand-sec via-brand to-transparent" />

      <div className="p-5 md:p-7">
        <div className="flex items-start justify-between gap-4 mb-3 md:mb-4">
          <div>
            <Title className="font-n27 font-bold italic text-fg text-lg md:text-2xl
              group-hover:text-brand transition-colors">
              {project.title}
            </Title>
            <div className="flex items-center gap-3 mt-1">
              <span aria-hidden="true" className="font-inputmono text-subtle text-[11px]">{project.year}</span>
              <StatusBadge status={project.status} />
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
  );
};
