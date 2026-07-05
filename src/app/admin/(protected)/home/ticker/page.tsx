import { getHomeContent } from "@/data/settings";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TickerEditForm } from "./TickerEditForm";

export default async function TickerAdminPage() {
  const { tickerText } = await getHomeContent();
  return (
    <div>
      <AdminPageHeader title="Ticker" />
      <TickerEditForm tickerText={tickerText} />
    </div>
  );
}
