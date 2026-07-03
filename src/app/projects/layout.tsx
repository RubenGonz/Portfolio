import { Footer, Header } from "@/components";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
