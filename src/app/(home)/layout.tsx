import { Footer, Header } from "@/components";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-surface">
    <Header />

    {children}

    <Footer />
  </div>
}