/**
 * @file fr/site.ts
 * @description French locale (Moroccan professional tone) — all non-project site content.
 * Technical terms remain in English (FIFO, MongoDB, etc.).
 * Projects are split into individual files under ./projects/
 */

import type { SiteContent } from "../types";

export type SiteData = Omit<SiteContent, "projects">;

export const site: SiteData = {
  /* Meta */
  meta: {
    title: "Abdelilah Wajid · Développeur Fullstack",
    description:
      "Portfolio oriente case studies d'Abdelilah Wajid, developpeur fullstack focalise sur les systemes operationnels, l'architecture claire, et des decisions techniques defendables.",
    author: "Abdelilah Wajid",
    keywords:
      "Abdelilah Wajid, développeur javascript, développeur frontend, react, next.js, typescript, portfolio, marrakech, maroc",
    siteUrl: "https://kanata-system.vercel.app",
    ogType: "website",
    ogSiteName: "Abdelilah Wajid",
    twitterHandle: "",
  },

  /* Nav */
  nav: {
    logoInitial: "A.",
    logoName: "ABDELILAH",
    logoTagline: "COMPRENDRE · DÉCIDER · CONSTRUIRE",
    links: [
      { id: "work", n: "01", label: "Approche" },
      { id: "about", n: "02", label: "État d'esprit" },
      { id: "skills", n: "03", label: "Outils" },
      { id: "contact", n: "04", label: "Contact" },
    ],
  },

  /* Hero */
  hero: {
    badge: "OUVERT AUX OPPORTUNITES",
    name: {
      base: "Abdel",
      highlight: "ilah",
      lastName: "Wajid",
    },
    positioning:
      "Product engineer focalise sur les systemes operationnels, les case studies, et une architecture que les equipes peuvent maintenir.",
    roles: [
      "Ingenierie produit guidee par les case studies",
      "Workflows operationnels avant demos visuelles",
      "Architecture guidee par de vraies contraintes",
      "Systemes clairs que les equipes peuvent expliquer",
    ],
    pills: [
      "Case-study driven",
      "Systemes operationnels",
      "Trade-offs clairs",
      "Architecture maintenable",
    ],
    bio: "Ce portfolio est une vitrine d'ingenierie guidee par les case studies. Je travaille surtout sur des workflows operationnels confus - stock, pricing, reporting, outils internes - pour les transformer en systemes plus fiables, explicables, et maintenables.",
    cta: {
      primary: "VOIR LE CASE STUDY ↓",
      secondary: "ME CONTACTER →",
    },
    scroll: "DÉFILER",
    avatar: {
      displayName: "Abdelilah W.",
      tagline: "PENSER -> CONSTRUIRE -> AMÉLIORER",
      locationShort: "Marrakech · Ouvert au remote",
      infoItems: ["Marrakech, Maroc", "UTC+1 - GMT+1", "Ouvert au remote"],
      socials: [
        { href: "https://github.com/kanata-kan", label: "GitHub" },
        {
          href: "https://linkedin.com/in/abdelilahwajid",
          label: "LinkedIn",
        },
      ],
    },
  },

  /* About */
  about: {
    label: "02 - État d'esprit",
    headingLine1: "Je transforme des operations confuses,",
    headingLine2: "en systemes clairs.",
    paragraphs: [
      "Je suis surtout utile quand un produit existe deja mais que le workflow derriere reste lent, fragile, ou difficile a expliquer.",
      "Mon travail commence par le diagnostic : ou ca casse, ou la duplication apparait, ou la donnee perd son sens, et quelles decisions doivent devenir des regles systeme.",
      "Ce portfolio sert a montrer cette reflexion en public - via des case studies, des trade-offs, et des details d'implementation - pas seulement des ecrans finis.",
    ],
    tags: [
      { text: "Case-study driven", colorKey: "cyan" },
      { text: "Decisions defendables", colorKey: "amber" },
      { text: "Clarite systeme", colorKey: "purple" },
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
        { text: '"comprendre-dabord"', colorKey: "amber" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  focus: ", colorKey: "muted" },
        { text: '"clarté-plutôt-qu-vitesse"', colorKey: "amber" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  approach: ", colorKey: "muted" },
        { text: '"corriger-ce-qui-ralentit"', colorKey: "green" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  decisions: ", colorKey: "muted" },
        { text: "true", colorKey: "cyan" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  hire: ", colorKey: "muted" },
        { text: '"seulement-si-ça-a-du-sens"', colorKey: "amber" },
      ],
      [{ text: "}", colorKey: "muted" }],
    ],
  },

  /* Work */
  work: {
    label: "01 - Case Studies",
    heading: "Systemes operationnels, expliques clairement.",
    subtitle: "Probleme -> solution -> decisions -> impact",
  },

  /* Skills */
  skills: {
    label: "03 - Outils",
    heading: "Stack principal et habitudes d'implementation.",
    subtitle:
      "Choisis pour la fiabilite, la maintenabilite, et la vitesse de livraison.",
  },

  /* Contact */
  contact: {
    label: "04 - Contact",
    headingLine1: "Ouvert aux roles de product engineering,",
    headingHighlight: "au consulting, et aux builds bien scopes.",
    paragraphLine1:
      "Si vous avez besoin de transformer des workflows confus en systemes fiables, envoyez-moi le contexte, les contraintes, et ce qui ralentit vraiment l'equipe.",
    paragraphLine2:
      "Je reponds clairement sur le fit, le scope, et le chemin le plus rapide vers quelque chose d'utile.",
    email: "kanata10kan@gmail.com",
    copyLabel: "COPIER",
    copiedLabel: "COPIE",
    socials: [
      { href: "https://github.com/kanata-kan", label: "GitHub" },
      {
        href: "https://linkedin.com/in/abdelilahwajid",
        label: "LinkedIn",
      },
    ],
  },

  /* Footer */
  footer: {
    copyright: "© 2026",
    author: "Abdelilah Wajid",
    tagline: "Les case studies avant les claims.",
  },

  /* Stats */
  stats: [
    { value: "3", label: "Locales supportees", colorKey: "cyan" },
    { value: "Typed", label: "Architecture de contenu", colorKey: "purple" },
    { value: "FIFO", label: "Logique de cout stock", colorKey: "amber" },
    { value: "Prive", label: "Mode de deploiement", colorKey: "green" },
  ],

  /* Tech Strip */
  techStrip: [
    "Case-study driven",
    "Workflows operationnels",
    "Contenu type-safe",
    "Trade-offs clairs",
    "UI responsive",
    "Business rules first",
    "Logique d'inventaire",
    "Architecture lisible",
    "Scan rapide",
    "Decisions defendables",
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
