import type { Course } from "../../src/types";

type CourseSeed = Omit<Course, "featured">;

/** Seed fixtures — the initial content loaded into the database.
 *  After seeding, the app reads from the DB via src/data/courses.ts. */
export const courses: CourseSeed[] = [
  {
    slug: "nextjs-framework-react",
    title: "Next.js: El framework de React para producción",
    platform: "Udemy",
    year: 2025,
    status: "completed",
    shortDescription:
      "Full Next.js course building production-ready applications including Teslo-Shop, an e-commerce platform with auth, payments and hybrid rendering.",
    fullDescription:
      "Learned Next.js through the development of several projects, including a full e-commerce application (Teslo-Shop). Covered hybrid rendering strategies (SSR, SSG, ISR, CSR), JWT-based authentication, and REST API implementation.\n\nWorked with dynamic and nested routing, responsive design using Material UI, Next UI, and Tailwind CSS, and integrated PostgreSQL. Managed cookies, built dynamic forms with React Hook Form, and implemented payments using PayPal and credit cards.\n\nAlso covered deployments across multiple platforms and best practices for version control using Git and GitHub.",
    topics: [
      {
        label: "React & Next.js",
        items: ["App Router", "SSR / SSG / ISR / CSR", "Dynamic routing", "Nested layouts"],
      },
      {
        label: "Backend & Data",
        items: ["REST API implementation", "PostgreSQL", "JWT authentication", "Cookies & sessions"],
      },
      {
        label: "UI & Forms",
        items: ["Tailwind CSS", "Material UI", "Next UI", "React Hook Form"],
      },
      {
        label: "Payments & Deploy",
        items: ["PayPal integration", "Credit card payments", "Multi-platform deployment"],
      },
    ],
    tags: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS", "REST API", "React Hook Form"],
    certificateUrl: "https://www.udemy.com/certificate/UC-0e76bc1a-306d-4eb1-8882-175595092790/",
    repoUrl: "https://github.com/RubenGonz/next-course",
    demoUrl: "https://teslo-shop-rubengonz.vercel.app",
  },
  {
    slug: "nodejs-de-cero-a-experto",
    title: "NodeJS: De cero a experto",
    platform: "Udemy",
    year: 2026,
    status: "completed",
    shortDescription:
      "End-to-end Node.js course covering REST APIs, Clean Architecture, testing, WebSockets, databases and serverless — from console apps to full backend systems.",
    fullDescription:
      "Learned Node.js from scratch, building modern backend applications and understanding its role within the full-stack ecosystem. Developed REST APIs using Express, applying Clean Architecture and best coding practices.\n\nImplemented testing with Jest, managed asynchronous operations and events, and worked with WebSockets, webhooks, and serverless functions for real-time applications.\n\nWorked with databases such as PostgreSQL, MongoDB, and file systems, applied design patterns like the Repository Pattern, and deployed applications in environments such as Railway.\n\nThe course included several hands-on projects ranging from console applications to full systems combining REST APIs and WebSockets.",
    topics: [
      {
        label: "Core Node.js",
        items: ["Express", "Async / events", "File systems", "Serverless functions"],
      },
      {
        label: "Architecture",
        items: ["Clean Architecture", "Repository Pattern", "REST API design", "WebSockets & webhooks"],
      },
      {
        label: "Databases",
        items: ["PostgreSQL", "MongoDB", "Prisma ORM"],
      },
      {
        label: "Testing & Deploy",
        items: ["Jest", "Unit & integration tests", "Railway deployment"],
      },
    ],
    tags: ["Node.js", "Express", "TypeScript", "PostgreSQL", "MongoDB", "Jest", "WebSockets", "Clean Architecture"],
    certificateUrl: "https://www.udemy.com/certificate/UC-45533473-331c-4d80-9277-f915fb783dd4/",
    repoUrl: "https://github.com/RubenGonz/node-course",
  },
];

/** Spanish translations, keyed by course slug. */
export interface CourseTranslationSeed {
  title: string;
  shortDescription: string;
  fullDescription: string;
  topics: { label: string; items: string[] }[];
  tags: string[];
}

export const courseTranslationsEs: Record<string, CourseTranslationSeed> = {
  "nextjs-framework-react": {
    title: "Next.js: El framework de React para producción",
    shortDescription:
      "Curso completo de Next.js construyendo aplicaciones listas para producción, incluido Teslo-Shop, un e-commerce con autenticación, pagos y renderizado híbrido.",
    fullDescription:
      "Aprendí Next.js desarrollando varios proyectos, incluida una aplicación de e-commerce completa (Teslo-Shop). Cubrí estrategias de renderizado híbrido (SSR, SSG, ISR, CSR), autenticación basada en JWT e implementación de APIs REST.\n\nTrabajé con rutas dinámicas y anidadas, diseño responsive con Material UI, Next UI y Tailwind CSS, e integré PostgreSQL. Gestioné cookies, construí formularios dinámicos con React Hook Form e implementé pagos con PayPal y tarjeta de crédito.\n\nTambién cubrí despliegues en varias plataformas y buenas prácticas de control de versiones con Git y GitHub.",
    topics: [
      { label: "React y Next.js", items: ["App Router", "SSR / SSG / ISR / CSR", "Rutas dinámicas", "Layouts anidados"] },
      { label: "Backend y datos", items: ["Implementación de APIs REST", "PostgreSQL", "Autenticación JWT", "Cookies y sesiones"] },
      { label: "UI y formularios", items: ["Tailwind CSS", "Material UI", "Next UI", "React Hook Form"] },
      { label: "Pagos y despliegue", items: ["Integración de PayPal", "Pagos con tarjeta", "Despliegue multiplataforma"] },
    ],
    tags: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS", "API REST", "React Hook Form"],
  },
  "nodejs-de-cero-a-experto": {
    title: "NodeJS: De cero a experto",
    shortDescription:
      "Curso integral de Node.js que cubre APIs REST, Clean Architecture, testing, WebSockets, bases de datos y serverless, desde apps de consola hasta sistemas backend completos.",
    fullDescription:
      "Aprendí Node.js desde cero, construyendo aplicaciones backend modernas y entendiendo su papel dentro del ecosistema full-stack. Desarrollé APIs REST con Express, aplicando Clean Architecture y buenas prácticas de código.\n\nImplementé testing con Jest, gestioné operaciones asíncronas y eventos, y trabajé con WebSockets, webhooks y funciones serverless para aplicaciones en tiempo real.\n\nTrabajé con bases de datos como PostgreSQL y MongoDB, además de sistemas de ficheros, apliqué patrones de diseño como el Repository Pattern y desplegué aplicaciones en entornos como Railway.\n\nEl curso incluyó varios proyectos prácticos, desde aplicaciones de consola hasta sistemas completos que combinan APIs REST y WebSockets.",
    topics: [
      { label: "Node.js esencial", items: ["Express", "Asincronía / eventos", "Sistemas de ficheros", "Funciones serverless"] },
      { label: "Arquitectura", items: ["Clean Architecture", "Repository Pattern", "Diseño de APIs REST", "WebSockets y webhooks"] },
      { label: "Bases de datos", items: ["PostgreSQL", "MongoDB", "Prisma ORM"] },
      { label: "Testing y despliegue", items: ["Jest", "Tests unitarios y de integración", "Despliegue en Railway"] },
    ],
    tags: ["Node.js", "Express", "TypeScript", "PostgreSQL", "MongoDB", "Jest", "WebSockets", "Clean Architecture"],
  },
};
