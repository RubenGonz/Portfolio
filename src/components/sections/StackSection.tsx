import type { StackItem } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GhostNumber } from "@/components/ui/GhostNumber";

type Category = {
  label: string;
  description: string;
  items: StackItem[];
};

const categories: Category[] = [
  {
    label: "Frontend",
    description: "UI & client-side",
    items: [
      { name: "React",          tier: "professional" },
      { name: "Angular",        tier: "professional" },
      { name: "TypeScript",     tier: "professional" },
      { name: "Next.js",        tier: "active" },
      { name: "Tailwind CSS",   tier: "active" },
      { name: "Redux / Zustand",tier: "active" },
      { name: "React Query",    tier: "active" },
      { name: "React Router",   tier: "active" },
      { name: "NextAuth",       tier: "familiar" },
      { name: "SASS",           tier: "familiar" },
    ],
  },
  {
    label: "Backend",
    description: "Server & APIs",
    items: [
      { name: "Node.js",       tier: "active" },
      { name: "Express",       tier: "active" },
      { name: "REST APIs",     tier: "professional" },
      { name: "JWT / OAuth",   tier: "active" },
      { name: "GraphQL",       tier: "familiar" },
      { name: "WebSockets",    tier: "familiar" },
      { name: "Serverless",    tier: "familiar" },
      { name: "i18n",          tier: "active" },
    ],
  },
  {
    label: "Database",
    description: "Storage & ORM",
    items: [
      { name: "PostgreSQL", tier: "active" },
      { name: "Prisma",     tier: "active" },
      { name: "MongoDB",    tier: "active" },
      { name: "MySQL",      tier: "active" },
      { name: "Firebase",   tier: "familiar" },
      { name: "SQLite",     tier: "familiar" },
    ],
  },
  {
    label: "Tooling",
    description: "Workflow & DevOps",
    items: [
      { name: "Git",                    tier: "professional" },
      { name: "Jest",                   tier: "professional" },
      { name: "Scrum / Agile",          tier: "professional" },
      { name: "React Testing Library",  tier: "active" },
      { name: "Vercel",                 tier: "active" },
      { name: "Docker",                 tier: "active" },
      { name: "CI/CD",                  tier: "familiar" },
      { name: "GitHub Actions",         tier: "familiar" },
    ],
  },
];

const tierClass: Record<StackItem["tier"], string> = {
  professional: "text-fg border-line/12 bg-line/[0.04] text-xs px-3 py-1.5",
  active:       "text-muted border-line/6  bg-line/[0.02] text-xs px-3 py-1.5",
  familiar:     "text-muted border-line/[0.04]             text-[11px] px-2.5 py-1",
};

const tierDot: Record<StackItem["tier"], string> = {
  professional: "bg-brand",
  active:       "bg-subtle",
  familiar:     "bg-faint",
};

export const StackSection = () => {
  return (
    <section id="stack" className="px-6 md:px-16 py-16 md:py-28 max-w-5xl mx-auto">
      <SectionHeader label="Stack" srTitle="Stack" />

      <div className="relative">
        <GhostNumber>04</GhostNumber>

        <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-10 min-[768px]:gap-x-16 min-[768px]:gap-y-12">
          {categories.map(({ label, description, items }) => (
            <div key={label}>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-3 h-px bg-gradient-to-r from-brand-sec to-brand" />
                  <span className="font-n27 font-bold italic text-fg text-sm tracking-wide">
                    {label}
                  </span>
                </div>
                <p className="font-inputmono text-[11px] text-muted pl-5">{description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {items.map(({ name, tier }) => (
                  <span
                    key={name}
                    className={`font-inputmono border flex items-center gap-1.5 ${tierClass[tier]}`}
                  >
                    <span className={`w-1 h-1 rounded-full shrink-0 ${tierDot[tier]}`} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
