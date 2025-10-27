import { Footer, Header } from "@/components";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <>
    <Header />

    {children}

    <Footer />
  </>
}