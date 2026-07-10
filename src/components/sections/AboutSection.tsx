"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader, GhostNumber, Section, AnimateIn } from "@/components/ui";
import type { TimelineEntry } from "@/types";

const ROTATE_MS = 5000;
const FADE_MS = 250;

const entryClasses = (isSelected: boolean, isCurrent: boolean) => ({
  dot: isSelected
    ? isCurrent
      ? "w-[9px] h-[9px] bg-linear-to-br from-brand-sec to-brand border-transparent shadow-[0_0_10px_rgba(183,153,255,0.5)]"
      : "w-[9px] h-[9px] bg-surface border-brand shadow-[0_0_8px_rgba(183,153,255,0.3)]"
    : "w-[7px] h-[7px] bg-surface border-line/10 group-hover:border-line/30",
  year: isSelected
    ? isCurrent ? "text-brand" : "text-muted"
    : "text-subtle group-hover:text-fg",
  title: isSelected
    ? isCurrent ? "text-brand" : "text-fg"
    : "text-muted group-hover:text-fg",
});

export const AboutSection = ({ items }: { items: TimelineEntry[] }) => {
  const t = useTranslations("about");
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [fading, setFading] = useState(false);
  const userInteracted = useRef(false);

  const transitionTo = (id: string) => {
    setFading(true);
    setTimeout(() => {
      setActiveId(id);
      setFading(false);
    }, FADE_MS);
  };

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
    let index = 1;
    const interval = setInterval(() => {
      if (userInteracted.current) { clearInterval(interval); return; }
      transitionTo(items[index % items.length].id);
      index++;
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (id: string) => {
    userInteracted.current = true;
    transitionTo(id);
  };

  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <Section id="about">
      <SectionHeader label={t("sectionLabel")} srTitle={t("sectionLabel")} />

      <AnimateIn animateOut className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl relative">
        <GhostNumber>02</GhostNumber>

        <div
          className="flex flex-col gap-4 transition-opacity duration-250 ease-in-out order-2 md:order-1"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {activeItem.paragraphs.map((para, i) => (
            <p key={i} className="font-inputmono text-muted text-xs md:text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <div className="order-1 md:order-2">
          <p className="font-inputmono text-[11px] text-subtle mb-4 md:hidden">
            {t("tapToExplore")}
          </p>

          <div className="relative pl-7 flex flex-col gap-5 md:gap-6">
            <div className="absolute left-0 top-1 bottom-1 w-px bg-line/6" />

            {items.map((item) => {
              const isSelected = activeId === item.id;
              const isCurrent = item.current === true;
              const c = entryClasses(isSelected, isCurrent);

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className="relative text-left group"
                >
                  <div className={`absolute -left-7 top-[5px] -translate-x-1/2 rounded-full border transition-all duration-200 ${c.dot}`} />
                  <p className={`font-inputmono text-[11px] tracking-widest mb-0.5 transition-colors duration-150 ${c.year}`}>
                    {item.year}
                  </p>
                  <p className={`font-inputmono text-xs transition-colors duration-150 ${c.title}`}>
                    {item.title}
                    {isSelected && isCurrent && (
                      <span className="text-brand animate-[blink_1.1s_step-end_infinite]"> ▌</span>
                    )}
                  </p>
                  {item.subtitle && (
                    <p className="font-inputmono text-[11px] mt-0.5 text-subtle">{item.subtitle}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </AnimateIn>
    </Section>
  );
};
