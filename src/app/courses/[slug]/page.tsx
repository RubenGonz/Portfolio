import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourseBySlug, courses } from "@/data/courses";
import { BackLink } from "@/components/ui/BackLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { siteConfig } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  const base = siteConfig.url;
  return {
    title: course.title,
    description: course.shortDescription,
    alternates: { canonical: `${base}/courses/${slug}` },
    openGraph: {
      title: `${course.title} — RubenGonz`,
      description: course.shortDescription,
      url: `${base}/courses/${slug}`,
      type: "article",
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <main className="min-h-screen">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="relative border-b border-line/5 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 70% 50%, var(--glow-soft) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--grid-dot) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative px-6 md:px-16 pt-28 pb-16 max-w-5xl mx-auto">
          <BackLink label="All courses" fallbackHref="/#courses" />

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-inputmono text-[11px] text-brand tracking-widest uppercase">
              {course.platform}
            </span>
            <span className="text-faint text-[9px]">·</span>
            <span className="font-inputmono text-[11px] text-subtle tracking-widest">
              {course.year}
            </span>
            <span className="text-faint text-[9px]">·</span>
            <StatusBadge status={course.status} />
          </div>

          <h1 className="font-n27 font-bold italic text-fg text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-tight mb-6 max-w-3xl">
            {course.title}
          </h1>

          <p className="font-inputmono text-muted text-sm leading-relaxed max-w-2xl mb-8">
            {course.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {course.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            {course.certificateUrl && (
              <Button href={course.certificateUrl} external variant="primary">View certificate ↗</Button>
            )}
            {course.repoUrl && (
              <Button href={course.repoUrl} external variant="outline">GitHub ↗</Button>
            )}
            {course.demoUrl && (
              <Button href={course.demoUrl} external variant="ghost">Live demo ↗</Button>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto flex flex-col gap-16 md:gap-20">

        {/* Full description */}
        <section>
          <SectionHeader label="About this course" />
          <div className="flex flex-col gap-4 max-w-3xl">
            {course.fullDescription.split("\n\n").map((para, i) => (
              <p key={i} className="font-inputmono text-muted text-sm leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Topics grid */}
        {course.topics.length > 0 && (
          <section>
            <SectionHeader label="What I learned" />
            <div className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-4">
              {course.topics.map((topic) => (
                <div
                  key={topic.label}
                  className="border border-line/5 bg-line/1 px-5 py-4"
                >
                  <p className="font-inputmono text-[11px] text-brand tracking-widest uppercase mb-3">
                    {topic.label}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {topic.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand font-inputmono text-xs shrink-0 mt-0.5">→</span>
                        <span className="font-inputmono text-muted text-xs leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
