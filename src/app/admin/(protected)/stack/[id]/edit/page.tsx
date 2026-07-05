import { notFound } from "next/navigation";
import { getStackItem } from "@/data/stack";
import { EditStackForm } from "./EditStackForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function EditStackItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getStackItem(id);
  if (!item) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit · ${item.name}`} />
      <EditStackForm item={item} />
    </div>
  );
}
