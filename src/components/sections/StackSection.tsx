import type { StackItem } from "@/types";

const stack: StackItem[] = [
  { name: "React", tier: "professional" },
  { name: "Angular", tier: "professional" },
  { name: "TypeScript", tier: "professional" },
  { name: "Jest", tier: "professional" },
  { name: "Git", tier: "professional" },
  { name: "Scrum / Agile", tier: "professional" },
  { name: "Next.js", tier: "active" },
  { name: "Node.js", tier: "active" },
  { name: "Express", tier: "active" },
  { name: "PostgreSQL", tier: "active" },
  { name: "Tailwind CSS", tier: "active" },
  { name: "Prisma", tier: "active" },
  { name: "Docker", tier: "familiar" },
  { name: "GraphQL", tier: "familiar" },
  { name: "Redux / Zustand", tier: "familiar" },
  { name: "MongoDB", tier: "familiar" },
];

const tiers = [
  {
    key: "professional" as const,
    label: "Professional",
    description: "Production experience",
    pillClass: "text-gray-200 border-white/12 bg-white/[0.04] text-sm px-4 py-2",
    dotClass: "bg-brand",
  },
  {
    key: "active" as const,
    label: "Active",
    description: "Recent hands-on",
    pillClass: "text-gray-500 border-white/6 bg-white/[0.02] text-xs px-3 py-1.5",
    dotClass: "bg-gray-600",
  },
  {
    key: "familiar" as const,
    label: "Exposure",
    description: "Worked with",
    pillClass: "text-gray-700 border-white/[0.04] text-[10px] px-2.5 py-1",
    dotClass: "bg-gray-800",
  },
];

export const StackSection = () => {
  return (
    <section id="stack" className="px-6 md:px-16 py-28 max-w-5xl mx-auto">
      {/* Section label */}
      <p className="font-inputmono text-gray-700 text-[9px] tracking-[0.2em] uppercase mb-1">
        {"// Stack"}
      </p>
      <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand mb-10" />

      <div className="relative max-w-3xl">
        {/* Decorative number */}
        <span className="absolute -top-2 -right-4 font-n27 font-bold italic text-[80px] leading-none text-white/[0.02] select-none pointer-events-none">
          03
        </span>

        <div className="flex flex-col gap-10">
          {tiers.map(({ key, label, description, pillClass, dotClass }) => (
            <div key={key}>
              {/* Tier header */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`} />
                <span className="font-inputmono text-[9px] text-gray-600 uppercase tracking-widest">
                  {label}
                </span>
                <span className="font-inputmono text-[9px] text-gray-800">— {description}</span>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {stack
                  .filter((item) => item.tier === key)
                  .map((item) => (
                    <span
                      key={item.name}
                      className={`font-inputmono border ${pillClass}`}
                    >
                      {item.name}
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
