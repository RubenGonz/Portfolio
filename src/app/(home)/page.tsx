import {
  HeroSection,
  ProjectsSection,
  AboutSection,
  CoursesSection,
  StackSection,
  ContactSection,
} from "@/components";
import { getTimeline } from "@/data/timeline";
import { getStack } from "@/data/stack";

const Divider = () => (
  <div className="h-px bg-line/5 mx-6 md:mx-16" />
);

const TICKER_TEXT =
  "React · Angular · TypeScript · Next.js · Node.js · PostgreSQL · Tailwind CSS · Git · Jest · Express · Prisma · Docker · GraphQL · Redux · MongoDB       ";

const TickerStrip = () => (
  <div className="border-t border-b border-line/4 py-2.5 overflow-hidden">
    <div
      className="flex whitespace-nowrap w-max"
      style={{ animation: "ticker 60s linear infinite" }}
    >
      {/* Duplicate so the loop is seamless — translate to -50% = one full copy */}
      <span className="font-inputmono text-[9px] text-muted tracking-[0.15em]">{TICKER_TEXT}</span>
      <span className="font-inputmono text-[9px] text-muted tracking-[0.15em]">{TICKER_TEXT}</span>
      <span className="font-inputmono text-[9px] text-muted tracking-[0.15em]">{TICKER_TEXT}</span>
      <span className="font-inputmono text-[9px] text-muted tracking-[0.15em]">{TICKER_TEXT}</span>
    </div>
  </div>
);

export default async function Home() {
  const [timeline, stack] = await Promise.all([getTimeline(), getStack()]);

  return (
    <main>
      <HeroSection />
      <TickerStrip />
      <Divider />
      <ProjectsSection />
      <Divider />
      <AboutSection items={timeline} />
      <Divider />
      <CoursesSection />
      <Divider />
      <StackSection categories={stack} />
      <Divider />
      <ContactSection />
    </main>
  );
}
