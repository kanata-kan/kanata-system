/**
 * @file fr/site.ts
 * @description French locale (professional tone) — all non-project site content.
 * Technical terms remain in English (FIFO, MongoDB, etc.).
 * Projects are split into individual files under ./projects/
 */

import type { SiteContent } from "../types";

export type SiteData = Omit<SiteContent, "projects">;

export const site: SiteData = {
  /* Meta */
  meta: {
    title: "Abdelilah Wajid · Product Engineer",
    description:
      "Portfolio orienté case studies d'Abdelilah Wajid, product engineer spécialisé dans les systèmes opérationnels, l’architecture claire, et des décisions techniques défendables.",
    author: "Abdelilah Wajid",
    keywords:
      "Abdelilah Wajid, product engineer, développeur fullstack, react, next.js, typescript, portfolio, systèmes opérationnels, marrakech, maroc",
    siteUrl: "https://abdelilahwajid.com",
    ogType: "website",
    ogSiteName: "Abdelilah Wajid",
    twitterHandle: "",
  },

  /* Nav */
  nav: {
    logoTagline: "Transformer le chaos en systèmes fiables",
    links: [
      { id: "work", n: "01", label: "Case Studies" },
      { id: "about", n: "02", label: "Approche" },
      { id: "skills", n: "03", label: "Stack" },
      { id: "contact", n: "04", label: "Contact" },
    ],
  },

  /* Hero */
  hero: {
    badge: "OUVERT AUX OPPORTUNITÉS",

    name: {
      base: "Abdelilah",
      highlight: "Wajid",
      lastName: "",
    },

    positioning:
      "Product Engineer spécialisé dans la conception de systèmes fiables sous contraintes réelles.",

    roles: [
      "Je travaille à partir de cas réels, pas de démos fictives",
      "Je conçois pour des workflows opérationnels, pas seulement pour l’interface",
      "Je rends les trade-offs techniques explicites",
      "Je construis des systèmes compréhensibles et évolutifs",
    ],

    pills: [
      "Systèmes réels",
      "Pensée opérationnelle",
      "Trade-offs explicites",
      "Architecture maintenable",
    ],

    bio: "Ce portfolio présente mon travail à travers des cas concrets. Je me concentre sur des problématiques opérationnelles — stock, pricing, reporting, outils internes — pour les transformer en systèmes fiables, clairs et conçus pour évoluer dans le temps.",

    cta: {
      primary: "VOIR UNE ÉTUDE DE CAS ↓",
      secondary: "ME CONTACTER →",
    },

    scroll: "DÉFILER",

    avatar: {
      displayName: "Abdelilah Wajid",
      tagline: "Des workflows complexes vers des systèmes fiables",
      locationShort: "Marrakech · Remote",

      infoItems: ["Marrakech, Maroc", "UTC+1 — GMT+1", "Disponible en remote"],

      socials: [
        { href: "https://github.com/kanata-kan", label: "GitHub (Kanata)" },
        {
          href: "https://www.linkedin.com/in/abdelilah-wajid-847888285",
          label: "LinkedIn",
        },
      ],
    },
  },

  /* About */
  about: {
    label: "02 — Approche",
    headingLine1: "Je transforme des opérations complexes,",
    headingLine2: "en systèmes clairs et fiables.",
    paragraphs: [
      "Je suis particulièrement utile quand un produit existe déjà mais que le workflow derrière est lent, fragile ou difficile à comprendre.",
      "Mon travail commence par un diagnostic précis : où ça casse, où la duplication apparaît, où la donnée perd du sens, et quelles décisions doivent devenir des règles système.",
      "Ce portfolio montre ma manière de penser — à travers des case studies, des trade-offs et des choix d’implémentation — pas seulement des interfaces finales.",
    ],
    tags: [
      { text: "Case-study driven", colorKey: "cyan" },
      { text: "Décisions défendables", colorKey: "amber" },
      { text: "Clarté système", colorKey: "purple" },
    ],
    codeFilename: "about.ts",
    codeRows: [
      [
        { text: "const ", colorKey: "cyan" },
        { text: "dev", colorKey: "text" },
        { text: " = {", colorKey: "muted" },
      ],
      [
        { text: "  mindset: ", colorKey: "muted" },
        { text: '"understand-first"', colorKey: "amber" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  focus: ", colorKey: "muted" },
        { text: '"clarity-over-speed"', colorKey: "amber" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  approach: ", colorKey: "muted" },
        { text: '"fix-what-slows-teams"', colorKey: "green" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  decisions: ", colorKey: "muted" },
        { text: "defensible", colorKey: "cyan" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  hire: ", colorKey: "muted" },
        { text: '"only-when-impact-is-clear"', colorKey: "amber" },
      ],
      [{ text: "}", colorKey: "muted" }],
    ],
  },

  /* Work */
  work: {
    label: "01 — Case Studies",
    heading: "Systèmes opérationnels, expliqués clairement.",
    subtitle: "Problème → contraintes → décisions → impact",
  },

  /* Skills */
  skills: {
    label: "03 — Stack",
    heading: "Les outils que j’utilise pour livrer des systèmes fiables.",
    subtitle:
      "Choisis pour leur clarté, leur maintenabilité et leur vitesse de livraison.",
  },

  /* Contact */
  contact: {
    label: "04 — Contact",
    headingLine1: "Ouvert aux rôles de product engineering,",
    headingHighlight: "au consulting et aux builds bien cadrés.",
    paragraphLine1:
      "Si votre équipe fait face à des workflows lents, flous ou fragiles, envoyez-moi le contexte, les contraintes et ce qui bloque réellement.",
    paragraphLine2:
      "Je vous répondrai clairement sur le fit, le scope et le chemin le plus rapide vers une solution utile.",
    email: "kanata10kan@gmail.com",
    copyLabel: "COPIER",
    copiedLabel: "COPIÉ ✓",
    whatsapp: {
      phone: "+212652064823",
      label: "WHATSAPP",
      message:
        "Bonjour Abdelilah, je vous contacte depuis votre portfolio. J'aimerais discuter d'une collaboration potentielle.",
    },
    socials: [
      { href: "https://github.com/kanata-kan", label: "GitHub" },
      {
        href: "https://www.linkedin.com/in/abdelilah-wajid/",
        label: "LinkedIn",
      },
    ],
  },

  /* Footer */
  footer: {
    copyright: "© 2026",
    author: "Abdelilah Wajid",
    tagline: "Les case studies avant les promesses.",
  },

  /* Stats */
  stats: [
    { value: "3", label: "Langues supportées", colorKey: "cyan" },
    { value: "Typed", label: "Architecture de contenu", colorKey: "purple" },
    { value: "FIFO", label: "Logique de coût stock", colorKey: "amber" },
    { value: "Privé", label: "Mode de déploiement", colorKey: "green" },
  ],

  /* Tech Strip */
  techStrip: [
    "Case-study driven",
    "Workflows opérationnels",
    "Typed content",
    "Trade-offs clairs",
    "UI responsive",
    "Business rules first",
    "Logique d'inventaire",
    "Architecture lisible",
    "Scan rapide",
    "Décisions défendables",
  ],

  /* Skill Groups */
  skillGroups: [
    {
      title: "Frontend",
      color: "#38BDF8",
      items: [
        "React / Next.js",
        "TypeScript",
        "JavaScript (ES6+)",
        "Tailwind CSS",
        "Styled Components",
        "Framer Motion",
      ],
    },
    {
      title: "Backend",
      color: "#3FB950",
      items: [
        "Node.js / Express",
        "MongoDB / Mongoose",
        "PostgreSQL / Prisma",
        "Zod",
        "REST APIs",
      ],
    },
    {
      title: "DevOps",
      color: "#F0883E",
      items: ["Vercel", "Git / GitHub", "Cloudinary"],
    },
    {
      title: "Testing",
      color: "#A78BFA",
      items: ["Jest", "Supertest", "Vitest"],
    },
  ],
};
