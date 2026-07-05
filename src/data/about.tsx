import type { ReactNode } from "react";

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string | null;
  paragraphs: ReactNode[];
  /** The single "now" entry — renders with the brand accent and blinking cursor. */
  current?: boolean;
}

export const timelineItems: TimelineItem[] = [
  {
    id: "intro",
    year: "About me",
    title: "Who I am",
    subtitle: null,
    paragraphs: [
      <>I build interfaces — have been doing it professionally since 2022, mostly in the banking and enterprise world. The kind of apps that run on production servers and have actual users depending on them.</>,
      <>Right now I&apos;m expanding into the backend side. Not through courses, but by building real things and figuring out what breaks. This portfolio is one of those things.</>,
      <>Open to roles where I can keep growing on both sides of the stack. Remote or on-site. Based in <span className="text-fg">Elche, Spain</span>.</>,
    ],
  },
  {
    id: "daw",
    year: "2020",
    title: "DAW — Desarrollo de Aplicaciones Web",
    subtitle: null,
    paragraphs: [
      <>Two years of application development — HTML, CSS, JavaScript, Java, databases. The kind of curriculum that teaches you the fundamentals whether you want to or not.</>,
      <>Somewhere in there I got genuinely hooked on frontend. Probably the first time I wrote something and could see it immediately in a browser. Decided that&apos;s what I wanted to do and stopped second-guessing it.</>,
    ],
  },
  {
    id: "bosonit",
    year: "2022 — 2023",
    title: "Frontend Consultant · Bosonit",
    subtitle: "React, Angular · Banking sector · Enterprise apps",
    paragraphs: [
      <>First real job. Frontend consultant at <span className="text-fg">Bosonit</span>, building production applications for banking and financial clients. React, Angular, real codebases, real deadlines.</>,
      <>That&apos;s where I learned that clean code isn&apos;t optional when five other people have to maintain what you wrote. Complex state, REST APIs, Jest, Scrum — the whole thing. The fastest I&apos;ve ever grown as a developer.</>,
      <>Also where I developed strong opinions about component architecture. Some good, some I&apos;ve since changed my mind about.</>,
    ],
  },
  {
    id: "fullstack",
    year: "2025",
    title: "Expanding into full-stack",
    subtitle: "Next.js, Node.js, PostgreSQL",
    paragraphs: [
      <>After Bosonit I took time to figure out what I actually wanted to build next — and realized I didn&apos;t want to stay only on the frontend side forever.</>,
      <>So I started going full-stack. <span className="text-fg">Next.js 15</span>, <span className="text-fg">Node.js</span>, <span className="text-fg">PostgreSQL</span>, <span className="text-fg">Prisma</span>. Not following a roadmap, just picking a project and building it until it works. Made a lot of mistakes. Still am.</>,
    ],
  },
  {
    id: "now",
    year: "2026",
    title: "Building this portfolio — now",
    subtitle: null,
    current: true,
    paragraphs: [
      <>This portfolio is the first thing I&apos;m shipping as a full-stack developer. Every decision — the route structure, the font system, the static data layer, the dark-only theme — has a reason I could explain in a code review.</>,
      <>The goal is simple: find a role where I keep growing on both sides of the stack.</>,
    ],
  },
];
