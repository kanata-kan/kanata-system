/**
 * @file en/site.ts
 * @description English locale — all non-project site content.
 * Projects are split into individual files under ./projects/
 */

import type { SiteContent } from "../types";

export type SiteData = Omit<SiteContent, "projects">;

export const site: SiteData = {
  /* ── Meta ── */
  meta: {
    title: "Abdelilah Wajid · Fullstack Developer",
    description:
      "Case-study-driven portfolio of Abdelilah Wajid, a fullstack developer focused on operational systems, clear architecture, and defensible technical decisions.",
    author: "Abdelilah Wajid",
    keywords:
      "Abdelilah Wajid, fullstack developer, case study portfolio, react, next.js, typescript, operational systems, marrakech, morocco",
    siteUrl: "https://kanata-system.vercel.app",
    ogType: "website",
    ogSiteName: "Abdelilah Wajid",
    twitterHandle: "",
  },

  /* ── Nav ── */
  nav: {
    logoInitial: "A.",
    logoName: "ABDELILAH",
    logoTagline: "UNDERSTAND · DECIDE · BUILD",
    links: [
      { id: "work", n: "01", label: "Case Studies" },
      { id: "about", n: "02", label: "Mindset" },
      { id: "skills", n: "03", label: "Tools" },
      { id: "contact", n: "04", label: "Contact" },
    ],
  },

  /* ── Hero ── */
  hero: {
    badge: "OPEN TO WORK",
    name: {
      base: "Abdel",
      highlight: "ilah",
      lastName: "Wajid",
    },
    positioning:
      "Product engineer focused on operational systems, case-study thinking, and architecture teams can maintain.",
    roles: [
      "Case-study driven product engineering",
      "Operational workflows over flashy demos",
      "Architecture shaped by real constraints",
      "Clear systems that teams can trust",
    ],
    pills: [
      "Case-study driven",
      "Operational systems",
      "Clear trade-offs",
      "Maintainable architecture",
    ],
    bio: "This portfolio is a case-study-driven engineering showcase. I focus on messy operational workflows - inventory, pricing, reporting, and internal tools - and turn them into systems that are easier to trust, explain, and extend.",
    cta: {
      primary: "VIEW CASE STUDY ↓",
      secondary: "CONTACT ME →",
    },
    scroll: "SCROLL",
    avatar: {
      displayName: "Abdelilah W.",
      tagline: "UNDERSTAND → DECIDE → BUILD",
      locationShort: "Marrakech · Open to remote",
      infoItems: ["Marrakech, Morocco", "UTC+1 — GMT+1", "Open to remote"],
      socials: [
        { href: "https://github.com/kanata-kan", label: "GitHub" },
        {
          href: "https://linkedin.com/in/abdelilahwajid",
          label: "LinkedIn",
        },
      ],
    },
  },

  /* ── About ── */
  about: {
    label: "02 — Mindset",
    headingLine1: "I turn messy operations,",
    headingLine2: "into clear systems.",
    paragraphs: [
      "I am most useful when a product already exists but the workflow behind it is slow, fragile, or hard to reason about.",
      "My process starts with diagnosis: what breaks, what is duplicated, where data loses meaning, and which decisions deserve to become system rules.",
      "This portfolio is built to show that thinking in public - through case studies, trade-offs, and implementation details - not just finished screens.",
    ],
    tags: [
      { text: "Case-study driven", colorKey: "cyan" },
      { text: "Defensible decisions", colorKey: "amber" },
      { text: "System clarity", colorKey: "purple" },
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
        { text: '"fix-what-slows"', colorKey: "green" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  decisions: ", colorKey: "muted" },
        { text: "true", colorKey: "cyan" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  hire: ", colorKey: "muted" },
        { text: '"only-if-it-makes-sense"', colorKey: "amber" },
      ],
      [{ text: "}", colorKey: "muted" }],
    ],
  },

  /* ── Work ── */
  work: {
    label: "01 — Case Studies",
    heading: "Operational systems, explained clearly.",
    subtitle: "Problem → solution → decisions → impact",
  },

  /* ── Skills ── */
  skills: {
    label: "03 — Tools",
    heading: "Core stack and implementation habits.",
    subtitle: "Chosen for reliability, maintainability, and delivery speed.",
  },

  /* ── Contact ── */
  contact: {
    label: "04 — Contact",
    headingLine1: "Open to product engineering roles,",
    headingHighlight: "consulting, and scoped builds.",
    paragraphLine1:
      "If you need someone to turn messy workflows into reliable product systems, send me the context, constraints, and what is slowing the team down.",
    paragraphLine2:
      "I respond clearly about fit, scope, and the fastest path to something useful.",
    email: "kanata10kan@gmail.com",
    copyLabel: "COPY",
    copiedLabel: "COPIED ✓",
    socials: [
      { href: "https://github.com/kanata-kan", label: "GitHub" },
      {
        href: "https://linkedin.com/in/abdelilahwajid",
        label: "LinkedIn",
      },
    ],
  },

  /* ── Footer ── */
  footer: {
    copyright: "© 2026",
    author: "Abdelilah Wajid",
    tagline: "Case studies over claims.",
  },

  /* ── Stats ── */
  stats: [
    { value: "2", label: "Supported locales", colorKey: "cyan" },
    { value: "Typed", label: "Content architecture", colorKey: "purple" },
    { value: "FIFO", label: "Inventory cost logic", colorKey: "amber" },
    { value: "Private", label: "Deployment model", colorKey: "green" },
  ],

  /* ── Tech Strip ── */
  techStrip: [
    "Case-study driven",
    "Operational workflows",
    "Typed content",
    "Clear trade-offs",
    "Responsive UI",
    "Business rules first",
    "Inventory logic",
    "Readable architecture",
    "Fast scanning",
    "Defensible decisions",
  ],

  /* ── Skill Groups ── */
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
