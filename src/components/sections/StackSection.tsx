import type { StackItem } from "@/types";

const stack: StackItem[] = [
  // Professional — production experience
  { name: "React", tier: "professional" },
  { name: "Angular", tier: "professional" },
  { name: "TypeScript", tier: "professional" },
  { name: "Jest", tier: "professional" },
  { name: "Git", tier: "professional" },
  { name: "Scrum / Agile", tier: "professional" },
  // Active — recent hands-on
  { name: "Next.js", tier: "active" },
  { name: "Node.js", tier: "active" },
  { name: "Express", tier: "active" },
  { name: "PostgreSQL", tier: "active" },
  { name: "Tailwind CSS", tier: "active" },
  { name: "Prisma", tier: "active" },
  // Familiar — worked with, not primary
  { name: "Docker", tier: "familiar" },
  { name: "GraphQL", tier: "familiar" },
  { name: "Redux / Zustand", tier: "familiar" },
  { name: "MongoDB", tier: "familiar" },
];

const tiers = [
  {
    key: "professional" as const,
    label: "Professional",
    sublabel: "Production experience",
    textClass: "text-light",
  },
  {
    key: "active" as const,
    label: "Active",
    sublabel: "Recent hands-on",
    textClass: "text-gray-400",
  },
  {
    key: "familiar" as const,
    label: "Familiar",
    sublabel: "Worked with",
    textClass: "text-gray-600",
  },
];

export const StackSection = () => {
  return (
    <section id="stack" className="px-6 md:px-16 py-32 max-w-5xl mx-auto">
      {/* Section label */}
      <p className="font-inputmono text-gray-600 text-xs tracking-widest uppercase mb-12">
        03 — Stack
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
        {tiers.map(({ key, label, sublabel, textClass }) => (
          <div key={key}>
            <p className="font-inputmono text-gray-600 text-xs uppercase tracking-widest mb-1">
              {label}
            </p>
            <p className="font-inputmono text-gray-700 text-xs mb-5">
              {sublabel}
            </p>
            <ul className="flex flex-col gap-3">
              {stack
                .filter((item) => item.tier === key)
                .map((item) => (
                  <li
                    key={item.name}
                    className={`font-inputmono text-sm ${textClass}`}
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
