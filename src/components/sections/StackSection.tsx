import type { StackItem } from "@/types";

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
  professional: "text-gray-200 border-white/12 bg-white/[0.04] text-xs px-3 py-1.5",
  active:       "text-gray-400 border-white/6  bg-white/[0.02] text-xs px-3 py-1.5",
  familiar:     "text-gray-400 border-white/[0.04]             text-[11px] px-2.5 py-1",
};

const tierDot: Record<StackItem["tier"], string> = {
  professional: "bg-brand",
  active:       "bg-gray-500",
  familiar:     "bg-gray-600",
};

export const StackSection = () => {
  return (
    <section id="stack" className="px-6 md:px-16 py-16 md:py-28 max-w-5xl mx-auto">
      <h2 className="sr-only">Stack</h2>
      <p className="font-inputmono text-gray-400 text-[11px] tracking-[0.2em] uppercase mb-1" aria-hidden="true">
        {"// Stack"}
      </p>
      <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand mb-8 md:mb-10" />

      <div className="relative">
        <span aria-hidden="true" className="absolute -top-2 right-0 font-n27 font-bold italic text-[60px] md:text-[80px] leading-none text-white/[0.02] select-none pointer-events-none">
          04
        </span>

        <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-10 min-[768px]:gap-x-16 min-[768px]:gap-y-12">
          {categories.map(({ label, description, items }) => (
            <div key={label}>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-3 h-px bg-gradient-to-r from-brand-sec to-brand" />
                  <span className="font-n27 font-bold italic text-light text-sm tracking-wide">
                    {label}
                  </span>
                </div>
                <p className="font-inputmono text-[11px] text-gray-400 pl-5">{description}</p>
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
