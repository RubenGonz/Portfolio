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
      { name: "React",           tier: "professional" },
      { name: "Angular",         tier: "professional" },
      { name: "TypeScript",      tier: "professional" },
      { name: "Next.js",         tier: "active" },
      { name: "Tailwind CSS",    tier: "active" },
      { name: "Redux / Zustand", tier: "familiar" },
    ],
  },
  {
    label: "Backend",
    description: "Server & data",
    items: [
      { name: "Node.js",    tier: "active" },
      { name: "Express",    tier: "active" },
      { name: "PostgreSQL", tier: "active" },
      { name: "Prisma",     tier: "active" },
      { name: "GraphQL",    tier: "familiar" },
      { name: "MongoDB",    tier: "familiar" },
    ],
  },
  {
    label: "Tooling",
    description: "Workflow & ops",
    items: [
      { name: "Git",          tier: "professional" },
      { name: "Jest",         tier: "professional" },
      { name: "Scrum / Agile", tier: "professional" },
      { name: "Docker",       tier: "familiar" },
    ],
  },
];

const tierClass: Record<StackItem["tier"], string> = {
  professional: "text-gray-200 border-white/12 bg-white/[0.04] text-xs px-3 py-1.5",
  active:       "text-gray-500 border-white/6  bg-white/[0.02] text-xs px-3 py-1.5",
  familiar:     "text-gray-700 border-white/[0.04]             text-[10px] px-2.5 py-1",
};

const tierDot: Record<StackItem["tier"], string> = {
  professional: "bg-brand",
  active:       "bg-gray-600",
  familiar:     "bg-gray-800",
};

export const StackSection = () => {
  return (
    <section id="stack" className="px-6 md:px-16 py-16 md:py-28 max-w-5xl mx-auto">
      <p className="font-inputmono text-gray-700 text-[9px] tracking-[0.2em] uppercase mb-1">
        {"// Stack"}
      </p>
      <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand mb-8 md:mb-10" />

      <div className="relative">
        <span className="absolute -top-2 right-0 font-n27 font-bold italic text-[60px] md:text-[80px] leading-none text-white/[0.02] select-none pointer-events-none">
          03
        </span>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-4xl">
          {categories.map(({ label, description, items }) => (
            <div key={label}>
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-px bg-gradient-to-r from-brand-sec to-brand" />
                <span className="font-inputmono text-[9px] text-gray-400 uppercase tracking-widest">
                  {label}
                </span>
                <span className="font-inputmono text-[9px] text-gray-800">— {description}</span>
              </div>

              {/* Pills */}
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

        {/* Legend */}
        <div className="flex items-center gap-5 mt-10 md:mt-12">
          {(["professional", "active", "familiar"] as const).map((tier) => (
            <div key={tier} className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${tierDot[tier]}`} />
              <span className="font-inputmono text-[8px] text-gray-800 capitalize tracking-wider">
                {tier === "professional" ? "Production" : tier === "active" ? "Active" : "Exposure"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
