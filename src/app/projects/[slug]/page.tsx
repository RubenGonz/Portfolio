import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/data/projects";
import { ProjectGallery } from "@/components/ui/project-gallery/ProjectGallery";
import { BackLink } from "@/components/ui/BackLink";

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
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rubengonz.com";
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
              "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(201,101,234,0.06) 0%, transparent 70%)",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(183,153,255,0.06) 1px, transparent 1px)",
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
                {project.status === "in-progress" && (
                  <span className="font-inputmono text-[11px] text-brand border border-brand/20 bg-brand/8 px-2 py-0.5 tracking-widest uppercase">
                    In progress
                  </span>
                )}
                {project.status === "live" && (
                  <span className="font-inputmono text-[11px] text-success border border-success/20 bg-success/8 px-2 py-0.5 tracking-widest uppercase">
                    Live
                  </span>
                )}
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
                  <span
                    key={tag}
                    className="font-inputmono text-[11px] text-faint border border-line/5 bg-line/[0.02] px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inputmono text-xs font-bold px-5 py-3 tracking-wide
                      bg-gradient-to-r from-brand-sec to-brand text-on-accent
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
                    className="font-inputmono text-xs px-5 py-3 border border-line/20 text-muted
                      hover:border-brand/50 hover:text-fg transition-colors tracking-wide
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  >
                    GitHub ↗
                  </a>
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
          <p className="font-inputmono text-faint text-[11px] tracking-[0.2em] uppercase mb-1">
            {"// About"}
          </p>
          <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand mb-8" />
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
            <p className="font-inputmono text-faint text-[11px] tracking-[0.2em] uppercase mb-1">
              {"// Technical highlights"}
            </p>
            <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand mb-8" />
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
            <p className="font-inputmono text-faint text-[11px] tracking-[0.2em] uppercase mb-1">
              {"// More projects"}
            </p>
            <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand mb-8" />
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
