import { getHeroContent } from "@/data/settings";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { HeroForm } from "./HeroForm";

export default async function HeroAdminPage() {
  const hero = await getHeroContent();
  return (
    <div>
      <AdminPageHeader title="Hero — rubengonz.com" />
      <HeroForm hero={hero} />
    </div>
  );
}
