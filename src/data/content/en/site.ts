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
    title: "Abdelilah Wajid · Product Engineer",
    description:
      "Case-study-driven portfolio of Abdelilah Wajid, a product engineer focused on operational systems, clear architecture, and defensible technical decisions.",
    author: "Abdelilah Wajid",
    keywords:
      "Abdelilah Wajid, product engineer, fullstack developer, case study portfolio, react, next.js, typescript, operational systems, marrakech, morocco",
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
      { id: "about", n: "02", label: "Approach" },
      { id: "skills", n: "03", label: "Stack" },
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
      "Product engineer working on operational systems, with a case-study-driven approach and architecture built for real teams under real constraints.",
    roles: [
      "Case-study-driven product engineering",
      "Operational workflows over surface-level demos",
      "Architecture shaped by real constraints",
      "Systems that teams can trust, explain, and extend",
    ],
    pills: [
      "Case-study driven",
      "Operational systems",
      "Clear trade-offs",
      "Maintainable architecture",
    ],
    bio: "This portfolio is an engineering showcase built around real case studies. I focus on messy operational workflows — inventory, pricing, reporting, and internal tools — and turn them into systems that are reliable, understandable, and built to evolve.",
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
    label: "02 — Approach",
    headingLine1: "I turn messy operations,",
    headingLine2: "into clear, reliable systems.",
    paragraphs: [
      "I am most useful when a product already exists but the workflow behind it is slow, fragile, or hard to reason about.",
      "My work starts with diagnosis: what breaks, what is duplicated, where data loses meaning, and which decisions should become system rules.",
      "This portfolio shows how I think in public — through case studies, trade-offs, and implementation details — not just finished interfaces.",
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

  /* ── Work ── */
  work: {
    label: "01 — Case Studies",
    heading: "Operational systems, broken down clearly.",
    subtitle: "Problem → constraints → decisions → impact",
  },

  /* ── Skills ── */
  skills: {
    label: "03 — Stack",
    heading: "Tools I use to ship reliable systems.",
    subtitle: "Chosen for clarity, maintainability, and delivery speed.",
  },

  /* ── Contact ── */
  contact: {
    label: "04 — Contact",
    headingLine1: "Open to product engineering roles,",
    headingHighlight: "consulting, and scoped builds.",
    paragraphLine1:
      "If your team is dealing with slow, unclear, or fragile workflows, send me the context, constraints, and what is breaking.",
    paragraphLine2:
      "I will respond clearly about fit, scope, and the fastest path to a working solution.",
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
    { value: "3", label: "Supported locales", colorKey: "cyan" },
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