"use client";

import { useEffect, useRef, useState } from "react";

const timelineItems = [
  {
    id: "intro",
    year: "About me",
    title: "Who I am",
    subtitle: null,
    content: {
      paragraphs: [
        <>Front-end developer with professional experience at <span className="text-light">Bosonit</span>, building production applications for the <span className="text-light">banking sector</span> and enterprise asset management using React and Angular.</>,
        <>Currently expanding into full-stack with Next.js and Node.js — building real projects, not just following tutorials.</>,
        <>Open to new opportunities, remote or on-site. Based in <span className="text-gray-300">Elche, Spain</span>.</>,
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
        <>Studied application development with a focus on web technologies. Learned the fundamentals of HTML, CSS, JavaScript, Java and databases.</>,
        <>This is where I discovered frontend development and decided to specialize in it. First contact with version control, MVC patterns and building real projects from scratch.</>,
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
        <>Worked as a frontend consultant at <span className="text-light">Bosonit</span>, building and maintaining production applications for clients in the <span className="text-light">banking and financial sector</span>.</>,
        <>Daily work with React and Angular in enterprise environments: complex state management, integration with REST APIs, unit testing with Jest and agile workflows in cross-functional teams.</>,
        <>First real experience with the scale and constraints of production software — performance, accessibility, code reviews and tight deadlines.</>,
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
        <>After stepping back to rethink my direction, I decided to go deeper on the full-stack side — not as a course-follower, but by building real things.</>,
        <>Working with <span className="text-light">Next.js 15</span>, <span className="text-light">Node.js</span>, <span className="text-light">PostgreSQL</span> and <span className="text-light">Prisma</span>. Learning by shipping, not by watching.</>,
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
        <>This portfolio is the first project I&apos;m shipping as a full-stack developer. Built with Next.js 15 App Router, TypeScript, Tailwind CSS v4 and deployed on Vercel.</>,
        <>Every design and architecture decision in here is intentional. The goal: land a role where I can keep growing in both frontend and backend.</>,
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
      <p className="font-inputmono text-gray-700 text-[9px] tracking-[0.2em] uppercase mb-1">
        {"// About"}
      </p>
      <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand mb-8 md:mb-10" />

      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl relative">
        {/* Decorative number */}
        <span className="absolute -top-2 right-0 font-n27 font-bold italic text-[60px] md:text-[80px] leading-none text-white/[0.02] select-none pointer-events-none">
          02
        </span>

        {/* Left: dynamic text — second on mobile, first on desktop */}
        <div
          className="flex flex-col gap-4 transition-opacity duration-250 ease-in-out order-2 md:order-1"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {activeItem.content.paragraphs.map((para, i) => (
            <p key={i} className="font-inputmono text-gray-400 text-xs md:text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Right: interactive timeline — first on mobile, second on desktop */}
        <div className="order-1 md:order-2">
          <p className="font-inputmono text-[9px] text-gray-700 mb-4 md:hidden">
            tap to explore timeline →
          </p>
          <div className="relative pl-7 flex flex-col gap-5 md:gap-6">
          {/* Vertical line — dedicated element so dots can center on it precisely */}
          <div className="absolute left-0 top-1 bottom-1 w-px bg-white/6" />

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
                      : "w-[7px] h-[7px] bg-surface border-white/10 group-hover:border-white/30"
                    }`}
                />

                <p className={`font-inputmono text-[9px] tracking-widest mb-0.5 transition-colors duration-150
                  ${isSelected
                    ? active === "current" ? "text-brand" : "text-gray-400"
                    : "text-gray-700 group-hover:text-gray-500"
                  }`}>
                  {year}
                </p>
                <p className={`font-inputmono text-xs transition-colors duration-150
                  ${isSelected
                    ? active === "current" ? "text-brand" : "text-gray-200"
                    : "text-gray-600 group-hover:text-gray-400"
                  }`}>
                  {title}
                  {isSelected && active === "current" && (
                    <span className="text-brand animate-[blink_1.1s_step-end_infinite]"> ▌</span>
                  )}
                </p>
                {subtitle && (
                  <p className={`font-inputmono text-[10px] mt-0.5 transition-colors duration-150
                    ${isSelected ? "text-gray-600" : "text-gray-800"}`}>
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
