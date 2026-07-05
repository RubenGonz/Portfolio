import Link from "next/link";
import { getProjects } from "@/data/projects";
import { getCourses } from "@/data/courses";
import { getTimeline } from "@/data/timeline";
import { getStack } from "@/data/stack";
import { deleteProject } from "@/actions/projects";
import { deleteCourse } from "@/actions/courses";
import { deleteTimelineEntry } from "@/actions/timeline";
import { deleteStackItem } from "@/actions/stack";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminDashboard() {
  const [projects, courses, timeline, stack] = await Promise.all([
    getProjects(),
    getCourses(),
    getTimeline(),
    getStack(),
  ]);

  return (
    <div className="flex flex-col gap-12">
      {/* Projects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-n27 font-bold italic text-xl text-fg">
            Projects
            <span className="font-inputmono text-sm font-normal not-italic text-subtle ml-3">
              {projects.length}
            </span>
          </h2>
          <Link
            href="/admin/projects/new"
            className="font-inputmono text-[11px] tracking-widest uppercase
              border border-brand/30 text-brand px-4 py-2 hover:bg-brand/5 transition-colors"
          >
            + New
          </Link>
        </div>

        <div className="flex flex-col gap-1.5">
          {projects.map((p) => (
            <div
              key={p.slug}
              className="flex items-center justify-between border border-line/10 bg-surface px-5 py-3"
            >
              <div>
                <p className="font-inputmono text-sm text-fg">{p.title}</p>
                <p className="font-inputmono text-[10px] text-subtle">
                  {p.slug} · {p.year} · {p.status}
                  {p.featured && " · featured"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/projects/${p.slug}/edit`}
                  className="font-inputmono text-[11px] tracking-widest uppercase text-subtle hover:text-fg transition-colors"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={async () => {
                    "use server";
                    await deleteProject(p.slug);
                  }}
                  label="Delete"
                />
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="font-inputmono text-sm text-subtle">No projects yet.</p>
          )}
        </div>
      </section>

      {/* Courses */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-n27 font-bold italic text-xl text-fg">
            Courses
            <span className="font-inputmono text-sm font-normal not-italic text-subtle ml-3">
              {courses.length}
            </span>
          </h2>
          <Link
            href="/admin/courses/new"
            className="font-inputmono text-[11px] tracking-widest uppercase
              border border-brand/30 text-brand px-4 py-2 hover:bg-brand/5 transition-colors"
          >
            + New
          </Link>
        </div>

        <div className="flex flex-col gap-1.5">
          {courses.map((c) => (
            <div
              key={c.slug}
              className="flex items-center justify-between border border-line/10 bg-surface px-5 py-3"
            >
              <div>
                <p className="font-inputmono text-sm text-fg">{c.title}</p>
                <p className="font-inputmono text-[10px] text-subtle">
                  {c.slug} · {c.platform} · {c.year} · {c.status}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/courses/${c.slug}/edit`}
                  className="font-inputmono text-[11px] tracking-widest uppercase text-subtle hover:text-fg transition-colors"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={async () => {
                    "use server";
                    await deleteCourse(c.slug);
                  }}
                  label="Delete"
                />
              </div>
            </div>
          ))}
          {courses.length === 0 && (
            <p className="font-inputmono text-sm text-subtle">No courses yet.</p>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-n27 font-bold italic text-xl text-fg">
            Timeline
            <span className="font-inputmono text-sm font-normal not-italic text-subtle ml-3">
              {timeline.length}
            </span>
          </h2>
          <Link
            href="/admin/timeline/new"
            className="font-inputmono text-[11px] tracking-widest uppercase
              border border-brand/30 text-brand px-4 py-2 hover:bg-brand/5 transition-colors"
          >
            + New
          </Link>
        </div>

        <div className="flex flex-col gap-1.5">
          {timeline.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between border border-line/10 bg-surface px-5 py-3"
            >
              <div>
                <p className="font-inputmono text-sm text-fg">{entry.title}</p>
                <p className="font-inputmono text-[10px] text-subtle">
                  {entry.year} · order {entry.order}
                  {entry.current && " · current"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/timeline/${entry.id}/edit`}
                  className="font-inputmono text-[11px] tracking-widest uppercase text-subtle hover:text-fg transition-colors"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={async () => {
                    "use server";
                    await deleteTimelineEntry(entry.id);
                  }}
                  label="Delete"
                />
              </div>
            </div>
          ))}
          {timeline.length === 0 && (
            <p className="font-inputmono text-sm text-subtle">No entries yet.</p>
          )}
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
          <Link
            href="/admin/stack/new"
            className="font-inputmono text-[11px] tracking-widest uppercase
              border border-brand/30 text-brand px-4 py-2 hover:bg-brand/5 transition-colors"
          >
            + New
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {stack.map((cat) => (
            <div key={cat.label}>
              <p className="font-inputmono text-[11px] tracking-widest uppercase text-subtle mb-2">
                {cat.label}
              </p>
              <div className="flex flex-col gap-1.5">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border border-line/10 bg-surface px-5 py-3"
                  >
                    <div>
                      <p className="font-inputmono text-sm text-fg">{item.name}</p>
                      <p className="font-inputmono text-[10px] text-subtle">{item.tier} · order {item.order}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/stack/${item.id}/edit`}
                        className="font-inputmono text-[11px] tracking-widest uppercase text-subtle hover:text-fg transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        action={async () => {
                          "use server";
                          await deleteStackItem(item.id);
                        }}
                        label="Delete"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
