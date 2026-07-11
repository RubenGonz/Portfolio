import { getHomeForEdit } from "@/data/settings/edit";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ContactEditForm } from "./ContactEditForm";

export default async function ContactAdminPage() {
  const home = await getHomeForEdit();
  return (
    <div>
      <AdminPageHeader title="Contact" />
      <ContactEditForm home={home} />
    </div>
  );
}
