import { notFound } from "next/navigation";
import { getStackItem } from "@/data/stack";
import { EditStackForm } from "./EditStackForm";
import Link from "next/link";

export default async function EditStackItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getStackItem(id);
  if (!item) notFound();

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="font-inputmono text-[11px] text-subtle hover:text-fg transition-colors">
          ← Admin
        </Link>
        <h1 className="font-n27 font-bold italic text-2xl text-fg">Edit Stack Item</h1>
      </div>
      <EditStackForm item={item} />
    </div>
  );
}
