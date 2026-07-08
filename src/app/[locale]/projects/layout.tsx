import { getLocale } from "next-intl/server";
import { Footer, Header } from "@/components";
import { getHomeContent } from "@/data/settings";

export default async function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const { available } = await getHomeContent(await getLocale());
  return (
    <>
      <Header available={available} />
      {children}
      <Footer />
    </>
  );
}
