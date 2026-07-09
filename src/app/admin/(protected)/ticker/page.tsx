import { getHomeForEdit } from "@/data/settings";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TickerEditForm } from "./TickerEditForm";

export default async function TickerAdminPage() {
  const home = await getHomeForEdit();
  return (
    <div>
      <AdminPageHeader title="Ticker" />
      <TickerEditForm home={home} />
    </div>
  );
}
