import { getHomeForEdit } from "@/data/settings/edit";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AvailableEditForm } from "./AvailableEditForm";

export default async function AvailableAdminPage() {
  const home = await getHomeForEdit();
  return (
    <div>
      <AdminPageHeader title="Available badge" />
      <AvailableEditForm home={home} />
    </div>
  );
}
