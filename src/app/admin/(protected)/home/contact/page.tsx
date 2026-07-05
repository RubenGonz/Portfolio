import { getHomeContent } from "@/data/settings";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ContactEditForm } from "./ContactEditForm";

export default async function ContactAdminPage() {
  const { contact } = await getHomeContent();
  return (
    <div>
      <AdminPageHeader title="Contact" />
      <ContactEditForm contact={contact} />
    </div>
  );
}
