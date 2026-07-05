import { getHomeContent } from "@/data/settings";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AvailableEditForm } from "./AvailableEditForm";

export default async function AvailableAdminPage() {
  const { available } = await getHomeContent();
  return (
    <div>
      <AdminPageHeader title="Available badge" />
      <AvailableEditForm available={available} />
    </div>
  );
}
