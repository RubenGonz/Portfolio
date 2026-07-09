import { notFound } from "next/navigation";
import { getTimelineEntryForEdit } from "@/data/timeline";
import { DEFAULT_LOCALE } from "@/data/locale";
import { EditTimelineForm } from "./EditTimelineForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function EditTimelineEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getTimelineEntryForEdit(id);
  if (!entry) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit · ${entry.translations[DEFAULT_LOCALE].title}`} />
      <EditTimelineForm entry={entry} />
    </div>
  );
}
