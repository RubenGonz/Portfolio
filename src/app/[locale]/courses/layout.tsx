import { Footer, Header } from "@/components";
import { getHomeContent } from "@/data/settings";

export default async function CoursesLayout({ children }: { children: React.ReactNode }) {
  const { available } = await getHomeContent();
  return (
    <>
      <Header available={available} />
      {children}
      <Footer />
    </>
  );
}
