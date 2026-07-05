import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/data/projects";
import { ProjectGallery } from "@/components/ui/project-gallery/ProjectGallery";
import { BackLink } from "@/components/ui/BackLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { siteConfig } from "@/config/site";

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
  const base = siteConfig.url;
  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `${base}/projects/${slug}` },
    openGraph: {
      title: `${project.title} — RubenGonz`,
      description: project.shortDescription,
      url: `${base}/projects/${slug}`,
      type: "article",
      images: [{ url: `${base}/opengraph-image`, width: 1200, height: 630, alt: "RubenGonz — Frontend Developer" }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = projects[currentIndex - 1] ?? null;
  const next = projects[currentIndex + 1] ?? null;

  return (
    <main className="min-h-screen">

      {/* ── Hero block ─────────────────────────────────────────── */}
      <div className="relative border-b border-line/5 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 50%, var(--glow-soft) 0%, transparent 70%)",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(var(--grid-dot) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative px-6 md:px-16 pt-28 pb-16 max-w-5xl mx-auto">
          {/* Back */}
          <BackLink />

          {/* Two-column layout: left = content, right = gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Left: meta + title + description + tags + buttons */}
            <div>
              {/* Year + status + role */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="font-inputmono text-[11px] text-faint tracking-widest">
                  {project.year}
                </span>
                <StatusBadge status={project.status} />
                {project.role && (
                  <>
                    <span className="text-faint text-[9px]">·</span>
                    <span className="font-inputmono text-[11px] text-faint">{project.role}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="font-n27 font-bold italic text-fg text-[clamp(2.2rem,6vw,4rem)] leading-[0.92] tracking-tight mb-6">
                {project.title}
              </h1>

              {/* Description */}
              <p className="font-inputmono text-muted text-sm leading-relaxed mb-6">
                {project.shortDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                {project.url && (
                  <Button href={project.url} external variant="primary">View live ↗</Button>
                )}
                {project.repoUrl && (
                  <Button href={project.repoUrl} external variant="outline">GitHub ↗</Button>
                )}
              </div>
            </div>

            {/* Right: image gallery — full width on mobile, right column on desktop */}
            {project.images?.length && (
              <ProjectGallery images={project.images} />
            )}
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto flex flex-col gap-16 md:gap-24">

        {/* About the project */}
        <section>
          <SectionHeader label="About" />
          <div className="flex flex-col gap-4 max-w-3xl">
            {project.fullDescription.split("\n\n").map((para, i) => (
              <p key={i} className="font-inputmono text-muted text-sm leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Technical highlights */}
        {project.highlights.length > 0 && (
          <section>
            <SectionHeader label="Technical highlights" />
            <div className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-3">
              {project.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="flex gap-3 border border-line/5 bg-line/[0.01] px-4 py-3"
                >
                  <span className="text-brand font-inputmono text-xs shrink-0 mt-0.5">→</span>
                  <p className="font-inputmono text-muted text-xs leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Project navigation */}
        {(prev || next) && (
          <section>
            <SectionHeader label="More projects" />
            <div className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-4">
              {prev && (
                <Link
                  href={`/projects/${prev.slug}`}
                  className="group flex flex-col gap-1 border border-line/5 bg-line/[0.01]
                    px-5 py-4 hover:border-brand/30 transition-colors"
                >
                  <span className="font-inputmono text-[11px] text-faint tracking-widest">← Previous</span>
                  <span className="font-n27 font-bold italic text-muted text-lg group-hover:text-fg transition-colors">
                    {prev.title}
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  href={`/projects/${next.slug}`}
                  className="group flex flex-col gap-1 border border-line/5 bg-line/[0.01]
                    px-5 py-4 hover:border-brand/30 transition-colors min-[640px]:text-right
                    min-[640px]:col-start-2"
                >
                  <span className="font-inputmono text-[11px] text-faint tracking-widest">Next →</span>
                  <span className="font-n27 font-bold italic text-muted text-lg group-hover:text-fg transition-colors">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
