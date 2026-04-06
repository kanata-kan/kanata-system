/**
 * @file content/en.ts
 * @description English locale — all site text content.
 * To add a new language, duplicate this file (e.g. fr.ts, ar.ts)
 * and translate every string value.
 */

import type { SiteContent } from "./types";

export const en: SiteContent = {
  /* ── Meta ── */
  meta: {
    title: "Abdelilah Wajid · Full-Stack Engineer",
    description:
      "Portfolio of Abdelilah Wajid — Full-Stack Engineer based in Marrakech, Morocco. I help startups diagnose product bottlenecks and build systems that scale without breaking.",
    author: "Abdelilah Wajid",
    keywords:
      "Abdelilah Wajid, full-stack engineer, web developer, react, next.js, typescript, portfolio, marrakech, morocco, freelance",
    siteUrl: "https://abdelilahwajid.com",
    ogType: "website",
    ogSiteName: "Abdelilah Wajid",
    twitterHandle: "@abdelilahwajid",
  },

  /* ── Nav ── */
  nav: {
    logoInitial: "A.",
    logoName: "ABDELILAH",
    logoTagline: "UNDERSTAND · DECIDE · BUILD",
    links: [
      { id: "work", n: "01", label: "Approach" },
      { id: "about", n: "02", label: "Mindset" },
      { id: "skills", n: "03", label: "Tools" },
      { id: "contact", n: "04", label: "Contact" },
    ],
  },

  /* ── Hero ── */
  hero: {
    badge: "AVAILABLE FOR WORK",
    name: {
      base: "Abdel",
      highlight: "ilah",
      lastName: "Wajid",
    },
    roles: [
      "Diagnose before building",
      "Remove what slows growth",
      "Ship systems that hold under pressure",
      "Structure that holds under load",
    ],
    pills: [
      "System thinking",
      "Clear decisions",
      "Scalable architecture",
      "Outcome-driven work",
    ],
    bio: "I work with startups and product teams to identify what's actually blocking growth — slow systems, unclear flows, or fragile architecture. Then I build solutions that perform, scale, and don't need a rewrite six months later.",
    cta: {
      primary: "VIEW MY WORK ↓",
      secondary: "LET'S TALK →",
    },
    scroll: "SCROLL",
    avatar: {
      displayName: "Abdelilah W.",
      tagline: "UNDERSTAND → DECIDE → BUILD",
      locationShort: "Marrakech · Open to remote",
      infoItems: ["Marrakech, Morocco", "UTC+1 — GMT+1", "Open to remote"],
      socials: [
        { href: "https://github.com/abdelilah", label: "GitHub" },
        {
          href: "https://linkedin.com/in/abdelilahwajid",
          label: "LinkedIn",
        },
        { href: "https://x.com/abdelilahwajid", label: "X" },
      ],
    },
  },

  /* ── About ── */
  about: {
    label: "02 — Mindset",
    headingLine1: "I diagnose systems,",
    headingLine2: "then I build.",
    paragraphs: [
      "Most engineering problems aren't missing features — they're unclear decisions made early that compound over time.",
      "Before writing a line of code, I map the system: where it breaks, where complexity hides, and what's actually worth solving.",
      "That's where the real work happens. Everything I build after that is grounded in what the product actually needs — not what seemed like a good idea in a sprint.",
    ],
    tags: [
      { text: "Clarity first", colorKey: "cyan" },
      { text: "No blind execution", colorKey: "amber" },
      { text: "Value over noise", colorKey: "purple" },
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
    label: "01 — Approach",
    heading: "Problems solved. Products shipped.",
    subtitle: "4 real problems · 4 structural decisions · shipped.",
  },

  /* ── Skills ── */
  skills: {
    label: "03 — Tools",
    heading: "Tools I reach for — and why.",
    subtitle: "The right tool for the right problem. Nothing more.",
  },

  /* ── Contact ── */
  contact: {
    label: "04 — Contact",
    headingLine1: "Tell me what's broken,",
    headingHighlight: "I'll tell you what's worth fixing.",
    paragraphLine1:
      "If your product is slow, hard to scale, or accumulating decisions nobody remembers making — that's exactly where I work best.",
    paragraphLine2:
      "I'll give you an honest read on the situation. If there's a fit, I'll show you how. If there isn't, I'll tell you upfront.",
    email: "abdelilah@email.com",
    copyLabel: "COPY",
    copiedLabel: "COPIED ✓",
    socials: ["GitHub", "LinkedIn", "Twitter / X"],
  },

  /* ── Footer ── */
  footer: {
    copyright: "© 2026",
    author: "Abdelilah Wajid",
    tagline: "Clarity ships. Complexity sinks.",
  },

  /* ── Stats ── */
  stats: [
    { value: "4+", label: "Years exp.", colorKey: "cyan" },
    { value: "12+", label: "Shipped", colorKey: "purple" },
    { value: "20+", label: "Clients", colorKey: "amber" },
    { value: "3", label: "Countries", colorKey: "green" },
  ],

  /* ── Tech Strip ── */
  techStrip: [
    "Zero technical debt day one",
    "Architecture before features",
    "Performance by design",
    "Structure for scale",
    "Remove the friction",
    "Business-aware engineering",
    "Think in flows",
    "Cut complexity early",
    "Ship with confidence",
    "Clarity at every layer",
  ],

  /* ── Projects ── */
  projects: [
    {
      n: "01",
      year: "2024",
      name: "SaaSify",
      type: "SaaS Product",
      color: "#38BDF8",
      status: "Live",
      statusColor: "#3FB950",
      link: "saasify.dev",
      desc: "Multi-tenant SaaS where the real problem was structural debt — not missing features.",
      longDesc:
        "I designed the architecture before writing a line of product code. That decision alone prevented two rewrites.",
      stack: [
        "Next.js 14",
        "Prisma",
        "Stripe",
        "PostgreSQL",
        "Resend",
        "Tailwind",
      ],
      highlights: [
        "Architected multi-tenant isolation to eliminate future data bleed risk",
        "Picked Stripe early and built webhook handling that didn't break at scale",
        "Defined role-permission boundaries before the first user was onboarded",
        "Structured data access patterns for query performance under load",
      ],
    },
    {
      n: "02",
      year: "2024",
      name: "DevMetrics",
      type: "Internal Tool",
      color: "#F0883E",
      status: "Beta",
      statusColor: "#F0883E",
      link: "devmetrics.io",
      desc: "Engineering teams had the data — it was scattered across six tools and slowing every decision.",
      longDesc:
        "I built a single source of truth that cut context-switching and surfaced what actually mattered.",
      stack: [
        "React",
        "Node.js",
        "WebSockets",
        "Redis",
        "GitHub API",
        "Linear API",
      ],
      highlights: [
        "Consolidated six data sources into one coherent dashboard",
        "Used WebSockets to deliver live signal without manual refresh",
        "Prioritized actionable metrics over raw data dumps",
        "Reduced daily context-switching for a 12-person engineering team",
      ],
    },
    {
      n: "03",
      year: "2023",
      name: "openapi-gen",
      type: "Open Source CLI",
      color: "#A78BFA",
      status: "OSS",
      statusColor: "#A78BFA",
      link: "github.com/abdelilah/openapi-gen",
      desc: "Teams weren't losing time writing APIs — they were losing it keeping SDKs in sync after every change.",
      longDesc:
        "I built a CLI tool that makes type-safe SDK generation automatic, not a manual chore.",
      stack: ["Node.js", "TypeScript", "Zod", "Commander.js", "Prettier"],
      highlights: [
        "Automated SDK generation, removing a recurring source of human error",
        "Leveraged TypeScript inference for strict, compile-time type safety",
        "Added Zod validation for runtime contracts that don't silently fail",
        "Designed for zero-config adoption — works out of the box",
      ],
    },
    {
      n: "04",
      year: "2023",
      name: "MoroccoMap",
      type: "Data Visualization",
      color: "#3FB950",
      status: "Live",
      statusColor: "#3FB950",
      link: "moroccomap.ma",
      desc: "The data existed. The problem was it was unusable — dense, unstructured, and inaccessible.",
      longDesc:
        "I focused on information hierarchy and interaction design before touching the dataset.",
      stack: ["D3.js", "Next.js", "Python", "FastAPI", "PostgreSQL", "Mapbox"],
      highlights: [
        "Transformed raw civic datasets into digestible visual narratives",
        "Designed exploration-first interactions over static charts",
        "Kept visual complexity low to maximize real-world usability",
        "Shipped full trilingual support (AR / FR / EN) from day one",
      ],
    },
  ],

  /* ── Skill Groups ── */
  skillGroups: [
    {
      title: "Frontend",
      color: "#38BDF8",
      items: [
        "React / Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "HTML / CSS",
      ],
    },
    {
      title: "Backend",
      color: "#3FB950",
      items: ["Node.js / Express", "PostgreSQL", "Prisma ORM", "REST APIs"],
    },
    {
      title: "DevOps",
      color: "#F0883E",
      items: ["Docker", "Vercel", "AWS", "Linux"],
    },
    {
      title: "Tooling",
      color: "#A78BFA",
      items: ["Git / GitHub", "Postman", "Figma", "Notion"],
    },
  ],
};
