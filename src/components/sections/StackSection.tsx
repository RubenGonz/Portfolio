import { getTranslations } from "next-intl/server";
import type { StackItem } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GhostNumber } from "@/components/ui/GhostNumber";
import { Section } from "@/components/ui/Section";
import { AnimateIn } from "@/components/ui/AnimateIn";
import type { StackCategory } from "@/data/stack";

const tierClass: Record<StackItem["tier"], string> = {
  professional: "text-fg border-line/12 bg-line/4 text-xs px-3 py-1.5",
  active:       "text-muted border-line/6  bg-line/2 text-xs px-3 py-1.5",
  familiar:     "text-muted border-line/4             text-[11px] px-2.5 py-1",
};

const tierDot: Record<StackItem["tier"], string> = {
  professional: "bg-brand",
  active:       "bg-subtle",
  familiar:     "bg-faint",
};

export const StackSection = async ({ categories }: { categories: StackCategory[] }) => {
  const t = await getTranslations("stack");

  return (
    <Section id="stack">
      <SectionHeader label={t("sectionLabel")} srTitle={t("sectionLabel")} />

      <div className="relative">
        <GhostNumber>04</GhostNumber>

        <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-10 min-[768px]:gap-x-16 min-[768px]:gap-y-12">
          {categories.map(({ label, items }, i) => (
            <AnimateIn key={label} delay={((i % 6) + 1) as 1|2|3|4|5|6} animateOut>
            <div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-3 h-px bg-linear-to-r from-brand-sec to-brand" />
                  <span className="font-n27 font-bold italic text-fg text-sm tracking-wide">{label}</span>
                </div>
                <p className="font-inputmono text-[11px] text-muted pl-5">
                  {t(`categories.${label}`)}
                </p>
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
            </AnimateIn>
          ))}
        </div>
      </div>
    </Section>
  );
};
