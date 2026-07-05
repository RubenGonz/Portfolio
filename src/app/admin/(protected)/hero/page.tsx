import { getHomeContent } from "@/data/settings";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { HeroEditForm } from "./HeroEditForm";

export default async function HeroAdminPage() {
  const { hero } = await getHomeContent();
  return (
    <div>
      <AdminPageHeader title="Hero" />
      <HeroEditForm hero={hero} />
    </div>
  );
}
