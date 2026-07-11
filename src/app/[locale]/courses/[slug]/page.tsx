import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getCourseBySlug, getCourses } from "@/data/courses";
import { BackLink, StatusBadge, SectionHeader, Button, Tag } from "@/components/ui";
import { ItemNav, DotGrid } from "@/components/common";
import { buildDetailMetadata } from "@/lib/metadata";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const all = await getCourses();
  return all.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const course = await getCourseBySlug(slug, locale);
  if (!course) return {};
  return buildDetailMetadata({
    section: "courses",
    slug,
    locale,
    title: course.title,
    description: course.shortDescription,
  });
}

export default async function CoursePage({ params }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations("courses");
  const course = await getCourseBySlug(slug, locale);
  if (!course) redirect(`/${locale}/courses`);

  const all = await getCourses(locale);
  const currentIndex = all.findIndex((c) => c.slug === slug);
  const prev = all[currentIndex - 1] ?? null;
  const next = all[currentIndex + 1] ?? null;

  return (
    <main className="min-h-screen">
      <div className="relative border-b border-line/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 70% 50%, var(--glow-soft) 0%, transparent 70%)" }} />
        <DotGrid />

        <div className="relative px-6 md:px-16 pt-28 pb-16 max-w-5xl mx-auto">
          <BackLink label={t("back")} fallbackHref="/courses" />

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-inputmono text-[11px] text-brand tracking-widest uppercase">{course.platform}</span>
            <span className="text-faint text-[9px]">·</span>
            <span className="font-inputmono text-[11px] text-subtle tracking-widest">{course.year}</span>
            <span className="text-faint text-[9px]">·</span>
            <StatusBadge status={course.status} />
          </div>

          <h1 className="font-n27 font-bold italic text-fg text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-tight mb-6 max-w-3xl">
            {course.title}
          </h1>

          <p className="font-inputmono text-muted text-sm leading-relaxed max-w-2xl mb-8">
            {course.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {course.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>

          <div className="flex flex-wrap gap-3">
            {course.certificateUrl && <Button href={course.certificateUrl} external variant="primary">{t("viewCertificate")}</Button>}
            {course.repoUrl && <Button href={course.repoUrl} external variant="outline">{t("github")}</Button>}
            {course.demoUrl && <Button href={course.demoUrl} external variant="ghost">{t("liveDemo")}</Button>}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto flex flex-col gap-16 md:gap-20">
        <section>
          <SectionHeader label={t("aboutCourse")} />
          <div className="flex flex-col gap-4 max-w-3xl">
            {course.fullDescription.split("\n\n").map((para, i) => (
              <p key={i} className="font-inputmono text-muted text-sm leading-relaxed">{para}</p>
            ))}
          </div>
        </section>

        {course.topics.length > 0 && (
          <section>
            <SectionHeader label={t("whatILearned")} />
            <div className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-4">
              {course.topics.map((topic) => (
                <div key={topic.label} className="border border-line/5 bg-line/1 px-5 py-4">
                  <p className="font-inputmono text-[11px] text-brand tracking-widest uppercase mb-3">{topic.label}</p>
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

      <ItemNav
        prev={prev ? { href: `/courses/${prev.slug}`, shortLabel: prev.tags[0], title: prev.title } : null}
        next={next ? { href: `/courses/${next.slug}`, shortLabel: next.tags[0], title: next.title } : null}
        allHref="/courses"
        allLabel={t("allCourses")}
      />
    </main>
  );
}
