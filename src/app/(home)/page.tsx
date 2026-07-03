import {
  HeroSection,
  ProjectsSection,
  AboutSection,
  StackSection,
  ContactSection,
  Footer,
} from "@/components";

const Divider = () => (
  <div className="h-px bg-white/[0.05] mx-6 md:mx-16" />
);

const TickerStrip = () => (
  <div className="border-t border-b border-white/[0.04] py-2.5 overflow-hidden">
    <div className="flex gap-0 whitespace-nowrap">
      {[0, 1].map((i) => (
        <span
          key={i}
          className="font-inputmono text-[9px] text-gray-800 tracking-[0.15em] px-8"
        >
          React · Angular · TypeScript · Next.js · Node.js · PostgreSQL · Tailwind CSS · Git · Jest · Express · Prisma · Docker · GraphQL · Redux · MongoDB
        </span>
      ))}
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <TickerStrip />
      <Divider />
      <ProjectsSection />
      <Divider />
      <AboutSection />
      <Divider />
      <StackSection />
      <Divider />
      <ContactSection />
      <Footer />
    </>
  );
}
