import { notFound } from "next/navigation";
import { getTimelineEntry } from "@/data/timeline";
import { EditTimelineForm } from "./EditTimelineForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function EditTimelineEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getTimelineEntry(id);
  if (!entry) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit · ${entry.title}`} />
      <EditTimelineForm entry={entry} />
    </div>
  );
}
