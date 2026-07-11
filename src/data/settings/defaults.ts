// Built-in fallback content and the settings keys, shared by the public reader
// (index.ts) and the admin edit builder (edit.ts).

export const DEFAULTS = {
  hero: {
    title: "Frontend\nDeveloper",
    tagline: "Banking sector · Enterprise systems · Now full-stack",
    description: "Spent a few years building production apps for banks and enterprise clients — the kind real people depend on. Now going full-stack, and this portfolio is the first thing I'm shipping to prove it.",
  },
  tickerText: "React · Angular · TypeScript · Next.js · Node.js · PostgreSQL · Tailwind CSS · Git · Jest · Express · Prisma · Docker · GraphQL · Redux · MongoDB",
  contact: {
    headline: "Let's talk.",
    subtext: "Open to full-time roles, freelance and collaborations.\nBased in Elche, Spain. I usually reply within 24 hours.",
  },
};

export const KEYS = ["hero_title", "hero_tagline", "hero_description", "ticker_text", "contact_headline", "contact_subtext", "available", "available_label", "cv_url"];
