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
import { getHomeContent } from "@/data/settings";

const Divider = () => (
  <div className="h-px bg-line/5 mx-6 md:mx-16" />
);

const TickerStrip = ({ text }: { text: string }) => (
  <div className="border-t border-b border-line/4 py-2.5 overflow-hidden">
    <div
      className="flex whitespace-nowrap w-max"
      style={{ animation: "ticker 60s linear infinite" }}
    >
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="font-inputmono text-[9px] text-muted tracking-[0.15em]">{text}       </span>
      ))}
    </div>
  </div>
);

export default async function Home() {
  const [timeline, stack, home] = await Promise.all([getTimeline(), getStack(), getHomeContent()]);

  return (
    <main>
      <HeroSection hero={home.hero} cvUrl={home.cvUrl} />
      <TickerStrip text={home.tickerText} />
      <Divider />
      <ProjectsSection />
      <Divider />
      <AboutSection items={timeline} />
      <Divider />
      <CoursesSection />
      <Divider />
      <StackSection categories={stack} />
      <Divider />
      <ContactSection contact={home.contact} />
    </main>
  );
}
