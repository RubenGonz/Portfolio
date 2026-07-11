import { getLocale } from "next-intl/server";
import { Footer, Header } from "@/components/layout";
import { getHomeContent } from "@/data/settings";

export default async function CoursesLayout({ children }: { children: React.ReactNode }) {
  const { available } = await getHomeContent(await getLocale());
  return (
    <>
      <Header available={available} />
      {children}
      <Footer />
    </>
  );
}
