import { getHomeForEdit } from "@/data/settings/edit";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { HeroEditForm } from "./HeroEditForm";

export default async function HeroAdminPage() {
  const home = await getHomeForEdit();
  return (
    <div>
      <AdminPageHeader title="Hero" />
      <HeroEditForm home={home} />
    </div>
  );
}
