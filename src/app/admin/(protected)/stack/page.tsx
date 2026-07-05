import { getStack } from "@/data/stack";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StackAdmin } from "@/components/admin/StackAdmin";

export default async function StackAdminPage() {
  const stack = await getStack();
  return (
    <div>
      <AdminPageHeader title="Stack" />
      <StackAdmin categories={stack} />
    </div>
  );
}
