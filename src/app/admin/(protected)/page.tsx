import Link from "next/link";
import { getProjects } from "@/data/projects";
import { getCourses } from "@/data/courses";
import { getTimeline } from "@/data/timeline";
import { getStack } from "@/data/stack";
import { deleteProject, toggleProjectFeatured } from "@/actions/projects";
import { deleteCourse, toggleCourseFeatured } from "@/actions/courses";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { FeaturedToggle } from "@/components/admin/FeaturedToggle";
import { TimelineList } from "@/components/admin/TimelineList";
import { StackAdmin } from "@/components/admin/StackAdmin";

function SectionHeader({ title, count, newHref }: { title: string; count: number; newHref: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-n27 font-bold italic text-xl text-fg">
        {title}
        <span className="font-inputmono text-sm font-normal not-italic text-subtle ml-3">{count}</span>
      </h2>
      <Link
        href={newHref}
        className="font-inputmono text-[11px] tracking-widest uppercase border border-brand/30 text-brand px-4 py-2 hover:bg-brand/5 transition-colors"
      >
        + New
      </Link>
    </div>
  );
}

export default async function AdminDashboard() {
  const [projects, timeline, courses, stack] = await Promise.all([
    getProjects(),
    getTimeline(),
    getCourses(),
    getStack(),
  ]);

  return (
    <div className="flex flex-col gap-12">

      {/* Projects */}
      <section>
        <SectionHeader title="Projects" count={projects.length} newHref="/admin/projects/new" />
        <p className="font-inputmono text-[10px] text-subtle mb-3">★ marks featured — max 2, appear first on home</p>
        <div className="flex flex-col gap-1.5">
          {projects.map((p) => (
            <div key={p.slug} className="flex items-center justify-between border border-line/10 bg-surface px-5 py-3">
              <div className="flex items-center gap-3">
                <FeaturedToggle id={p.slug} featured={p.featured} action={toggleProjectFeatured} />
                <div>
                  <p className="font-inputmono text-sm text-fg">{p.title}</p>
                  <p className="font-inputmono text-[10px] text-subtle">{p.year} · {p.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/projects/${p.slug}/edit`} className="font-inputmono text-[11px] tracking-widest uppercase text-subtle hover:text-fg transition-colors">Edit</Link>
                <DeleteButton action={deleteProject.bind(null, p.slug)} label="Delete" />
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="font-inputmono text-sm text-subtle">No projects yet.</p>}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <SectionHeader title="Timeline" count={timeline.length} newHref="/admin/timeline/new" />
        <p className="font-inputmono text-[10px] text-subtle mb-3">Drag to reorder · "now" marks current entries</p>
        <TimelineList entries={timeline} />
      </section>

      {/* Courses */}
      <section>
        <SectionHeader title="Courses" count={courses.length} newHref="/admin/courses/new" />
        <p className="font-inputmono text-[10px] text-subtle mb-3">★ marks featured — max 2, appear first</p>
        <div className="flex flex-col gap-1.5">
          {courses.map((c) => (
            <div key={c.slug} className="flex items-center justify-between border border-line/10 bg-surface px-5 py-3">
              <div className="flex items-center gap-3">
                <FeaturedToggle id={c.slug} featured={c.featured} action={toggleCourseFeatured} />
                <div>
                  <p className="font-inputmono text-sm text-fg">{c.title}</p>
                  <p className="font-inputmono text-[10px] text-subtle">{c.platform} · {c.year} · {c.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/courses/${c.slug}/edit`} className="font-inputmono text-[11px] tracking-widest uppercase text-subtle hover:text-fg transition-colors">Edit</Link>
                <DeleteButton action={deleteCourse.bind(null, c.slug)} label="Delete" />
              </div>
            </div>
          ))}
          {courses.length === 0 && <p className="font-inputmono text-sm text-subtle">No courses yet.</p>}
        </div>
      </section>

      {/* Stack */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-n27 font-bold italic text-xl text-fg">
            Stack
            <span className="font-inputmono text-sm font-normal not-italic text-subtle ml-3">
              {stack.reduce((n, cat) => n + cat.items.length, 0)}
            </span>
          </h2>
        </div>
        <StackAdmin categories={stack} />
      </section>

    </div>
  );
}
