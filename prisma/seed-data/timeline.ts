export const timelineEntries = [
  {
    year: "About me",
    title: "Who I am",
    subtitle: null,
    paragraphs: [
      "I build interfaces — have been doing it professionally since 2022, mostly in the banking and enterprise world. The kind of apps that run on production servers and have actual users depending on them.",
      "Lately I've been building the backend side too — not through courses, but by shipping real things and figuring out what breaks. This portfolio runs on a Postgres database, Prisma and its own auth-protected admin panel. I built all of it.",
      "Open to roles where I can keep growing on both sides of the stack. Remote or on-site. Based in Elche, Spain.",
    ],
    current: false,
    order: 0,
  },
  {
    year: "2020",
    title: "DAW — Desarrollo de Aplicaciones Web",
    subtitle: null,
    paragraphs: [
      "Two years of application development — HTML, CSS, JavaScript, Java, databases. The kind of curriculum that teaches you the fundamentals whether you want to or not.",
      "Somewhere in there I got genuinely hooked on frontend. Probably the first time I wrote something and could see it immediately in a browser. Decided that's what I wanted to do and stopped second-guessing it.",
    ],
    current: false,
    order: 1,
  },
  {
    year: "2022 — 2023",
    title: "Frontend Consultant · Bosonit",
    subtitle: "React, Angular · Banking sector · Enterprise apps",
    paragraphs: [
      "First real job. Frontend consultant at Bosonit, building production applications for banking and financial clients. React, Angular, real codebases, real deadlines.",
      "That's where I learned that clean code isn't optional when five other people have to maintain what you wrote. Complex state, REST APIs, Jest, Scrum — the whole thing. The fastest I've ever grown as a developer.",
      "Also where I developed strong opinions about component architecture. Some good, some I've since changed my mind about.",
    ],
    current: false,
    order: 2,
  },
  {
    year: "2025",
    title: "Expanding into full-stack",
    subtitle: "Next.js, Node.js, PostgreSQL",
    paragraphs: [
      "After Bosonit I took time to figure out what I actually wanted to build next — and realized I didn't want to stay only on the frontend side forever.",
      "So I started going full-stack. Next.js 15, Node.js, PostgreSQL, Prisma. Not following a roadmap, just picking a project and building it until it works. Made a lot of mistakes. Still am.",
    ],
    current: false,
    order: 3,
  },
  {
    year: "2026",
    title: "Building this portfolio — now",
    subtitle: null,
    paragraphs: [
      "This portfolio is the first thing I'm shipping as a full-stack developer. It started as a frontend piece and I built the whole backend behind it — PostgreSQL, Prisma, Auth.js, an admin panel — so I could manage every section without redeploying.",
      "Every decision — the route structure, the font system, the Postgres + Prisma data layer, the auth, the dark-only theme — has a reason I could explain in a code review.",
      "The goal is simple: find a role where I keep growing on both sides of the stack.",
    ],
    current: true,
    order: 4,
  },
];

/** Spanish translations, keyed by the entry's `year` label. */
export interface TimelineTranslationSeed {
  title: string;
  subtitle: string | null;
  paragraphs: string[];
}

export const timelineTranslationsEs: Record<string, TimelineTranslationSeed> = {
  "About me": {
    title: "Quién soy",
    subtitle: null,
    paragraphs: [
      "Construyo interfaces, y lo hago profesionalmente desde 2022, sobre todo en el mundo de la banca y la empresa. El tipo de aplicaciones que corren en servidores de producción y de las que dependen usuarios reales.",
      "Últimamente también construyo la parte de backend, no a base de cursos, sino enviando cosas reales y descubriendo qué se rompe. Este portfolio funciona sobre una base de datos Postgres, Prisma y su propio panel de administración protegido por auth. Lo construí todo yo.",
      "Abierto a puestos donde pueda seguir creciendo en ambos lados del stack. En remoto o presencial. Con base en Elche, España.",
    ],
  },
  "2020": {
    title: "DAW — Desarrollo de Aplicaciones Web",
    subtitle: null,
    paragraphs: [
      "Dos años de desarrollo de aplicaciones: HTML, CSS, JavaScript, Java, bases de datos. El tipo de temario que te enseña los fundamentos quieras o no.",
      "En algún momento me enganché de verdad al frontend. Probablemente la primera vez que escribí algo y pude verlo al instante en el navegador. Decidí que era a lo que quería dedicarme y dejé de darle vueltas.",
    ],
  },
  "2022 — 2023": {
    title: "Consultor Frontend · Bosonit",
    subtitle: "React, Angular · Sector bancario · Aplicaciones empresariales",
    paragraphs: [
      "Primer trabajo de verdad. Consultor frontend en Bosonit, construyendo aplicaciones de producción para clientes de banca y finanzas. React, Angular, código real, plazos reales.",
      "Ahí aprendí que el código limpio no es opcional cuando otras cinco personas tienen que mantener lo que escribes. Estado complejo, APIs REST, Jest, Scrum… todo. La época en la que más rápido he crecido como desarrollador.",
      "También donde desarrollé opiniones firmes sobre la arquitectura de componentes. Algunas buenas y otras sobre las que he cambiado de opinión desde entonces.",
    ],
  },
  "2025": {
    title: "Ampliando hacia full-stack",
    subtitle: "Next.js, Node.js, PostgreSQL",
    paragraphs: [
      "Después de Bosonit me tomé tiempo para averiguar qué quería construir a continuación, y me di cuenta de que no quería quedarme solo en el frontend para siempre.",
      "Así que empecé a ir a full-stack. Next.js 15, Node.js, PostgreSQL, Prisma. Sin seguir un roadmap, simplemente eligiendo un proyecto y construyéndolo hasta que funciona. Cometí muchos errores. Y sigo cometiéndolos.",
    ],
  },
  "2026": {
    title: "Construyendo este portfolio — ahora",
    subtitle: null,
    paragraphs: [
      "Este portfolio es lo primero que lanzo como desarrollador full-stack. Empezó como una pieza de frontend y construí todo el backend que hay detrás (PostgreSQL, Prisma, Auth.js, un panel de administración) para poder gestionar cada sección sin volver a desplegar.",
      "Cada decisión —la estructura de rutas, el sistema tipográfico, la capa de datos con Postgres + Prisma, la autenticación, el tema— tiene una razón que podría explicar en una code review.",
      "El objetivo es simple: encontrar un puesto donde siga creciendo en ambos lados del stack.",
    ],
  },
};
