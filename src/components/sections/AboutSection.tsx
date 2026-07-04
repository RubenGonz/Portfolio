"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GhostNumber } from "@/components/ui/GhostNumber";

const timelineItems = [
  {
    id: "intro",
    year: "About me",
    title: "Who I am",
    subtitle: null,
    content: {
      paragraphs: [
        <>I build interfaces — have been doing it professionally since 2022, mostly in the banking and enterprise world. The kind of apps that run on production servers and have actual users depending on them.</>,
        <>Right now I&apos;m expanding into the backend side. Not through courses, but by building real things and figuring out what breaks. This portfolio is one of those things.</>,
        <>Open to roles where I can keep growing on both sides of the stack. Remote or on-site. Based in <span className="text-fg">Elche, Spain</span>.</>,
      ],
    },
    active: true,
  },
  {
    id: "daw",
    year: "2020",
    title: "DAW — Desarrollo de Aplicaciones Web",
    subtitle: null,
    content: {
      paragraphs: [
        <>Two years of application development — HTML, CSS, JavaScript, Java, databases. The kind of curriculum that teaches you the fundamentals whether you want to or not.</>,
        <>Somewhere in there I got genuinely hooked on frontend. Probably the first time I wrote something and could see it immediately in a browser. Decided that&apos;s what I wanted to do and stopped second-guessing it.</>,
      ],
    },
    active: false,
  },
  {
    id: "bosonit",
    year: "2022 — 2023",
    title: "Frontend Consultant · Bosonit",
    subtitle: "React, Angular · Banking sector · Enterprise apps",
    content: {
      paragraphs: [
        <>First real job. Frontend consultant at <span className="text-fg">Bosonit</span>, building production applications for banking and financial clients. React, Angular, real codebases, real deadlines.</>,
        <>That&apos;s where I learned that clean code isn&apos;t optional when five other people have to maintain what you wrote. Complex state, REST APIs, Jest, Scrum — the whole thing. The fastest I&apos;ve ever grown as a developer.</>,
        <>Also where I developed strong opinions about component architecture. Some good, some I&apos;ve since changed my mind about.</>,
      ],
    },
    active: true,
  },
  {
    id: "fullstack",
    year: "2025",
    title: "Expanding into full-stack",
    subtitle: "Next.js, Node.js, PostgreSQL",
    content: {
      paragraphs: [
        <>After Bosonit I took time to figure out what I actually wanted to build next — and realized I didn&apos;t want to stay only on the frontend side forever.</>,
        <>So I started going full-stack. <span className="text-fg">Next.js 15</span>, <span className="text-fg">Node.js</span>, <span className="text-fg">PostgreSQL</span>, <span className="text-fg">Prisma</span>. Not following a roadmap, just picking a project and building it until it works. Made a lot of mistakes. Still am.</>,
      ],
    },
    active: false,
  },
  {
    id: "now",
    year: "2026",
    title: "Building this portfolio — now",
    subtitle: null,
    content: {
      paragraphs: [
        <>This portfolio is the first thing I&apos;m shipping as a full-stack developer. Every decision — the route structure, the font system, the static data layer, the dark-only theme — has a reason I could explain in a code review.</>,
        <>The goal is simple: find a role where I keep growing on both sides of the stack.</>,
      ],
    },
    active: "current" as const,
  },
] as const;

export const AboutSection = () => {
  const [activeId, setActiveId] = useState<string>("intro");
  const [fading, setFading] = useState(false);
  const userInteracted = useRef(false);

  const transitionTo = (id: string) => {
    setFading(true);
    setTimeout(() => {
      setActiveId(id);
      setFading(false);
    }, 250);
  };

  // Auto-rotate on desktop only — on mobile the layout shifts when text length changes
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const ids = timelineItems.map((t) => t.id);
    let i = 1;
    const interval = setInterval(() => {
      if (userInteracted.current) {
        clearInterval(interval);
        return;
      }
      transitionTo(ids[i % ids.length]);
      i++;
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (id: string) => {
    userInteracted.current = true;
    transitionTo(id);
  };

  const activeItem = timelineItems.find((item) => item.id === activeId) ?? timelineItems[0];

  return (
    <section id="about" className="px-6 md:px-16 py-16 md:py-28 max-w-5xl mx-auto">
      <SectionHeader label="About" srTitle="About" />

      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl relative">
        <GhostNumber>02</GhostNumber>

        {/* Left: dynamic text — second on mobile, first on desktop */}
        <div
          className="flex flex-col gap-4 transition-opacity duration-250 ease-in-out order-2 md:order-1"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {activeItem.content.paragraphs.map((para, i) => (
            <p key={i} className="font-inputmono text-muted text-xs md:text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Right: interactive timeline — first on mobile, second on desktop */}
        <div className="order-1 md:order-2">
          <p className="font-inputmono text-[11px] text-subtle mb-4 md:hidden">
            tap to explore timeline →
          </p>
          <div className="relative pl-7 flex flex-col gap-5 md:gap-6">
          {/* Vertical line — dedicated element so dots can center on it precisely */}
          <div className="absolute left-0 top-1 bottom-1 w-px bg-line/6" />

          {timelineItems.map(({ id, year, title, subtitle, active }) => {
            const isSelected = activeId === id;
            return (
              <button
                key={id}
                onClick={() => handleSelect(id)}
                className="relative text-left group"
              >
                {/* Node — left-0 relative to button + -translate-x-1/2 centers dot on the line */}
                <div
                  className={`absolute left-[-1.75rem] top-[5px] -translate-x-1/2 rounded-full border transition-all duration-200
                    ${isSelected
                      ? active === "current"
                        ? "w-[9px] h-[9px] bg-gradient-to-br from-brand-sec to-brand border-transparent shadow-[0_0_10px_rgba(183,153,255,0.5)]"
                        : "w-[9px] h-[9px] bg-surface border-brand shadow-[0_0_8px_rgba(183,153,255,0.3)]"
                      : "w-[7px] h-[7px] bg-surface border-line/10 group-hover:border-line/30"
                    }`}
                />

                <p className={`font-inputmono text-[11px] tracking-widest mb-0.5 transition-colors duration-150
                  ${isSelected
                    ? active === "current" ? "text-brand" : "text-muted"
                    : "text-subtle group-hover:text-fg"
                  }`}>
                  {year}
                </p>
                <p className={`font-inputmono text-xs transition-colors duration-150
                  ${isSelected
                    ? active === "current" ? "text-brand" : "text-fg"
                    : "text-muted group-hover:text-fg"
                  }`}>
                  {title}
                  {isSelected && active === "current" && (
                    <span className="text-brand animate-[blink_1.1s_step-end_infinite]"> ▌</span>
                  )}
                </p>
                {subtitle && (
                  <p className={`font-inputmono text-[11px] mt-0.5 transition-colors duration-150
                    ${isSelected ? "text-subtle" : "text-subtle"}`}>
                    {subtitle}
                  </p>
                )}
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};
