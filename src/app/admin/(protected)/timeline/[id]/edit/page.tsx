import { notFound } from "next/navigation";
import { getTimelineEntry } from "@/data/timeline";
import { EditTimelineForm } from "./EditTimelineForm";
import Link from "next/link";

export default async function EditTimelineEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getTimelineEntry(id);
  if (!entry) notFound();

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="font-inputmono text-[11px] text-subtle hover:text-fg transition-colors">
          ← Admin
        </Link>
        <h1 className="font-n27 font-bold italic text-2xl text-fg">Edit Timeline Entry</h1>
      </div>
      <EditTimelineForm entry={entry} />
    </div>
  );
}
