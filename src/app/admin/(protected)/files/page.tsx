import { getHomeContent } from "@/data/settings";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FileUploader } from "./FileUploader";

export default async function FilesAdminPage() {
  const { cvUrl } = await getHomeContent();
  return (
    <div>
      <AdminPageHeader title="Files" />
      <FileUploader cvUrl={cvUrl} />
    </div>
  );
}
