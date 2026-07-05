import { getHomeContent } from "@/data/settings";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { HomeForm } from "./HomeForm";

export default async function HomeAdminPage() {
  const home = await getHomeContent();
  return (
    <div>
      <AdminPageHeader title="Home — rubengonz.com" />
      <HomeForm home={home} />
    </div>
  );
}
