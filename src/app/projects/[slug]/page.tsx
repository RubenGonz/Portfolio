import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen px-6 md:px-16 py-24 max-w-4xl mx-auto">
      {/* Back */}
      <Link
        href="/#projects"
        className="font-inputmono text-xs text-gray-600 hover:text-brand transition-colors mb-12 inline-block"
      >
        ← Back
      </Link>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <p className="font-inputmono text-gray-600 text-xs">{project.year}</p>
          {project.status === "in-progress" && (
            <span className="font-inputmono text-brand text-xs border border-brand/30 px-2 py-0.5">
              In progress
            </span>
          )}
        </div>
        <h1 className="font-n27 font-bold italic text-light text-4xl md:text-6xl mb-4">
          {project.title}
        </h1>
        <p className="font-inputmono text-gray-400 text-base leading-relaxed max-w-2xl">
          {project.shortDescription}
        </p>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4 mb-16">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inputmono text-xs font-bold px-5 py-3 tracking-wide
              bg-gradient-to-r from-brand-sec to-brand text-deep-black
              hover:opacity-90 transition-opacity"
          >
            View live ↗
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inputmono text-xs px-5 py-3 border border-white/8 text-gray-500
              hover:border-brand/40 hover:text-gray-300 transition-colors tracking-wide"
          >
            GitHub ↗
          </a>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-16">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-inputmono text-[9px] text-gray-600 border border-white/5 bg-white/[0.02] px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Full description */}
      <div className="mb-16">
        <p className="font-inputmono text-xs text-gray-600 uppercase tracking-widest mb-6">
          About the project
        </p>
        {project.fullDescription.split("\n\n").map((para, i) => (
          <p key={i} className="font-inputmono text-gray-300 text-sm leading-relaxed mb-4">
            {para}
          </p>
        ))}
      </div>

      {/* Technical highlights */}
      {project.highlights.length > 0 && (
        <div>
          <p className="font-inputmono text-xs text-gray-600 uppercase tracking-widest mb-6">
            Technical highlights
          </p>
          <ul className="flex flex-col gap-3">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="font-inputmono text-gray-400 text-sm flex gap-3">
                <span className="text-brand shrink-0">→</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
