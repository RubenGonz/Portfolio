import Link from "next/link";
import { getProjects } from "@/data/projects";
import { getCourses } from "@/data/courses";
import { getTimeline } from "@/data/timeline";
import { deleteProject, toggleProjectFeatured } from "@/actions/projects";
import { deleteCourse, toggleCourseFeatured } from "@/actions/courses";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { FeaturedToggle } from "@/components/admin/FeaturedToggle";
import { TimelineList } from "@/components/admin/TimelineList";

/** Section heading with optional item count and a single action button (Edit or + New). */
function SectionTitle({
  title,
  count,
  actionHref,
  actionLabel,
}: {
  title: string;
  count?: number;
  actionHref?: string;
  actionLabel?: string;
}) {
  const isNew = actionLabel?.startsWith("+");
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-n27 font-bold italic text-xl text-fg">
        {title}
        {count !== undefined && (
          <span className="font-inputmono text-sm font-normal not-italic text-subtle ml-3">{count}</span>
        )}
      </h2>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className={`font-inputmono text-[11px] tracking-widest uppercase transition-colors ${
            isNew
              ? "border border-brand/30 text-brand px-4 py-2 hover:bg-brand/5"
              : "text-subtle hover:text-fg"
          }`}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

/** Single bordered row — used for both collection items and singleton sections. */
function Row({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border border-line/10 bg-surface px-5 py-3">
      <div>{left}</div>
      <div className="flex items-center gap-4 shrink-0">{right}</div>
    </div>
  );
}

function RowTitle({ main, sub }: { main: string; sub?: string }) {
  return (
    <>
      <p className="font-inputmono text-sm text-fg">{main}</p>
      {sub && <p className="font-inputmono text-[10px] text-subtle">{sub}</p>}
    </>
  );
}

function EditLink({ href }: { href: string }) {
  return (
    <Link href={href} className="font-inputmono text-[11px] tracking-widest uppercase text-subtle hover:text-fg transition-colors">
      Edit
    </Link>
  );
}

export default async function AdminDashboard() {
  const [projects, timeline, courses] = await Promise.all([
    getProjects(),
    getTimeline(),
    getCourses(),
  ]);

  return (
    <div className="flex flex-col gap-12">

      {/* Available badge */}
      <section>
        <SectionTitle title="Available badge" />
        <Row
          left={<RowTitle main="Header badge visibility & label" sub="Shown in public header when enabled" />}
          right={<EditLink href="/admin/available" />}
        />
      </section>

      {/* Hero */}
      <section>
        <SectionTitle title="Hero" />
        <Row
          left={<RowTitle main="Title, tagline & description" sub="Home page header" />}
          right={<EditLink href="/admin/hero" />}
        />
      </section>

      {/* Ticker */}
      <section>
        <SectionTitle title="Ticker" />
        <Row
          left={<RowTitle main="Scrolling strip" sub="Between hero and projects" />}
          right={<EditLink href="/admin/ticker" />}
        />
      </section>

      {/* Projects */}
      <section>
        <SectionTitle title="Projects" count={projects.length} actionHref="/admin/projects/new" actionLabel="+ New" />
        <p className="font-inputmono text-[10px] text-subtle mb-3">★ marks featured — max 2, appear first on home</p>
        <div className="flex flex-col gap-1.5">
          {projects.map((p) => (
            <Row
              key={p.slug}
              left={
                <div className="flex items-center gap-3">
                  <FeaturedToggle id={p.slug} featured={p.featured} action={toggleProjectFeatured} />
                  <RowTitle main={p.title} sub={`${p.year} · ${p.status}`} />
                </div>
              }
              right={
                <>
                  <EditLink href={`/admin/projects/${p.slug}/edit`} />
                  <DeleteButton action={deleteProject.bind(null, p.slug)} label="Delete" />
                </>
              }
            />
          ))}
          {projects.length === 0 && <p className="font-inputmono text-sm text-subtle">No projects yet.</p>}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <SectionTitle title="Timeline" count={timeline.length} actionHref="/admin/timeline/new" actionLabel="+ New" />
        <p className="font-inputmono text-[10px] text-subtle mb-3">Drag to reorder · &quot;now&quot; marks current entries</p>
        <TimelineList entries={timeline} />
      </section>

      {/* Courses */}
      <section>
        <SectionTitle title="Courses" count={courses.length} actionHref="/admin/courses/new" actionLabel="+ New" />
        <p className="font-inputmono text-[10px] text-subtle mb-3">★ marks featured — max 2, appear first</p>
        <div className="flex flex-col gap-1.5">
          {courses.map((c) => (
            <Row
              key={c.slug}
              left={
                <div className="flex items-center gap-3">
                  <FeaturedToggle id={c.slug} featured={c.featured} action={toggleCourseFeatured} />
                  <RowTitle main={c.title} sub={`${c.platform} · ${c.year} · ${c.status}`} />
                </div>
              }
              right={
                <>
                  <EditLink href={`/admin/courses/${c.slug}/edit`} />
                  <DeleteButton action={deleteCourse.bind(null, c.slug)} label="Delete" />
                </>
              }
            />
          ))}
          {courses.length === 0 && <p className="font-inputmono text-sm text-subtle">No courses yet.</p>}
        </div>
      </section>

      {/* Stack */}
      <section>
        <SectionTitle title="Stack" />
        <Row
          left={<RowTitle main="Technologies by tier and category" sub="Professional · Active · Familiar" />}
          right={<EditLink href="/admin/stack" />}
        />
      </section>

      {/* Contact */}
      <section>
        <SectionTitle title="Contact" />
        <Row
          left={<RowTitle main="Headline & availability text" sub="Bottom of home page" />}
          right={<EditLink href="/admin/contact" />}
        />
      </section>


    </div>
  );
}
