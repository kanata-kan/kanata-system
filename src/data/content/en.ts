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
    title: "Abdelilah Wajid · Product Engineer",
    description:
      "Case-study-driven portfolio of Abdelilah Wajid, a product engineer focused on operational systems, clear architecture, and defensible technical decisions.",
    author: "Abdelilah Wajid",
    keywords:
      "Abdelilah Wajid, product engineer, case study portfolio, react, next.js, typescript, operational systems, marrakech, morocco",
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
    email: "kanata10@gmail.com",
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

  /* ── Projects ── */
  projects: [
    {
      n: "01",
      slug: "electro-abidin",
      year: "2025",
      name: "Electro Abidin eSystem",
      type: "Retail Management System",
      color: "#3B82F6",
      status: "Private deployment",
      statusColor: "#3FB950",
      link: "/work/electro-abidin",
      desc: "A retail operation with manual stock checks, paper-based tracking, and slow checkout needed one system that staff could trust in real time.",
      longDesc:
        "I turned inventory, checkout, invoicing, and warranty handling into a single operational flow with reliable stock, pricing, and profit logic.",
      stack: {
        core: ["Next.js", "React", "TypeScript"],
        backend: ["MongoDB", "Mongoose", "Zod", "JWT Auth", "bcrypt"],
        features: [
          "Recharts",
          "Excel Export (ExcelJS)",
          "Date Handling (date-fns)",
        ],
        system: ["Styled Components", "Nodemailer", "Sharp"],
        testing: ["Jest", "Supertest"],
      },
      highlights: [
        "Connected stock availability directly to checkout so sales staff stop guessing what is available",
        "Used FIFO batch costing to keep profit reporting tied to real purchase prices",
        "Separated workflow state from financial truth with immutable transaction records",
        "Supported invoices, VAT handling, returns, and warranty tracking in one retail workflow",
      ],
      caseStudy: {
        headline:
          "Replacing manual retail operations with a system staff could trust",
        subtitle:
          "This case study shows how I turned disconnected stock checks, pricing decisions, and invoicing into one operational workflow for an electronics store.",
        tags: [
          "Retail Operations",
          "Inventory Logic",
          "Checkout Flow",
          "Business Rules",
        ],
        problem: [
          "The store relied on manual stock checking inside the storage room",
          "Employees had to physically verify product availability multiple times per day",
          "Frequent sales errors (selling unavailable products)",
          "Slow checkout process due to lack of real-time visibility",
          "No clear financial tracking or stock accuracy",
        ],
        impact: [
          "Lost sales due to unavailable products going undetected until checkout",
          "Wasted time and physical effort for employees on repetitive stock verification",
          "Poor customer experience caused by long wait times inside the store",
          "Inaccurate understanding of inventory levels and actual revenue",
          "Operational chaos affecting daily performance and decision-making",
        ],
        decisions: [
          "Connected inventory directly to the sales process (real-time sync)",
          "Introduced multi-product order system instead of single-product checkout",
          "Added stock threshold alerts for better anticipation",
          "Implemented flexible pricing (min/max) to support real negotiation",
          "Designed invoice system supporting both individuals and companies",
          "Made VAT (TVA) optional based on real business scenarios",
          "Integrated automatic warranty logic per product",
        ],
        architecture: [
          "Separated product entity from stock entity to avoid data duplication",
          "Each stock batch has its own purchase price for accurate accounting",
          "Implemented FIFO logic for precise profit calculation",
          "Used status-based operations for cancel/return with automatic stock recovery",
          "Designed system with data consistency and transactional integrity in mind",
        ],
        results: [
          "Stock availability became visible during checkout instead of after a manual trip to storage",
          "Cashiers could process multi-product orders inside one consistent flow",
          "Profit tracking moved from approximation to batch-based calculation",
          "Returns and cancellations restored stock through defined system rules",
          "The owner gained a clearer daily view of sales, stock movement, and invoicing",
        ],
        screenshots: [
          {
            src: "/electro-abidin/pos.webp",
            alt: "POS system with real-time stock visibility",
            caption:
              "Real-time product search and stock visibility — no more manual checks",
          },
          {
            src: "/electro-abidin/checkout.webp",
            alt: "Checkout system with pricing and VAT calculation",
            caption:
              "Multi-product checkout with automatic calculations and flexible pricing",
          },
          {
            src: "/electro-abidin/dashboard.webp",
            alt: "Admin dashboard with sales and stock analytics",
            caption:
              "Full operational visibility with real-time business insights",
          },
          {
            src: "/electro-abidin/catalogue.webp",
            alt: "Product and inventory management system",
            caption:
              "Structured product and stock separation for accurate data handling",
          },
          {
            src: "/electro-abidin/invoice.webp",
            alt: "Invoice generation system with VAT support",
            caption:
              "Automatic invoice generation with support for VAT and client types",
          },
        ],
        cta: "The value was not a prettier dashboard. It was a workflow the store could rely on during real sales.",
        technicalDeepDive: {
          sectionTitle: "Technical Deep Dive",
          sectionSubtitle:
            "How the system is designed under the hood — architecture, data model, and guarantees.",
          erdTitle: "Data Model",
          entities: [
            {
              name: "Product",
              desc: "Catalog entry with cached stock (synced from FIFO)",
              type: "core",
            },
            {
              name: "InventoryLog",
              desc: "FIFO batch — single source of truth for stock & cost",
              type: "core",
              ssot: "Stock Source of Truth",
              central: true,
            },
            {
              name: "Sale",
              desc: "Single-product workflow document (UI entry point)",
              type: "transaction",
            },
            {
              name: "Order",
              desc: "Multi-product sale with embedded OrderItems",
              type: "transaction",
            },
            {
              name: "SalesTransactionItem",
              desc: "Canonical financial record — immutable after creation",
              type: "financial",
              ssot: "Financial Source of Truth",
            },
            {
              name: "Invoice",
              desc: "Legal document (FACTURE / BON DE VENTE) with embedded items",
              type: "financial",
            },
            {
              name: "Guarantee",
              desc: "Warranty document with lifecycle tracking",
              type: "financial",
            },
            {
              name: "STIDailySnapshot",
              desc: "Immutable daily aggregates for drift detection",
              type: "audit",
            },
          ],
          relationships: [
            {
              from: "Product",
              to: "InventoryLog",
              label: "FIFO batches",
              cardinality: "1 → N",
            },
            {
              from: "Product",
              to: "Sale",
              label: "sold via",
              cardinality: "1 → N",
            },
            {
              from: "Sale",
              to: "SalesTransactionItem",
              label: "dual-write",
              cardinality: "1 → 1",
            },
            {
              from: "Order",
              to: "SalesTransactionItem",
              label: "per item",
              cardinality: "1 → N",
            },
            {
              from: "Sale",
              to: "Invoice",
              label: "generates",
              cardinality: "1 → 0..1",
            },
            {
              from: "Invoice",
              to: "Guarantee",
              label: "warranty",
              cardinality: "1 → 0..1",
            },
          ],
          archTitle: "Core Architecture",
          archBlocks: [
            {
              title: "FIFO Cost Engine",
              why: "Ensures accurate profit per unit sold",
              impact:
                "Every unit sold carries batch-based purchase cost, which makes margin tracking far more reliable than manual estimation",
              points: [
                "Each InventoryLog entry = one batch with remainingQty and purchasePrice",
                "On sale: oldest batches consumed first (sort: createdAt ASC)",
                "Atomic guard: $gte check on remainingQty prevents concurrent conflicts",
                "No fallback — FIFO exhaustion hard-rejects the sale",
              ],
            },
            {
              title: "Dual-Write Pattern",
              why: "Separates workflow state from financial truth",
              impact:
                "Analytics and reports stay insulated from most workflow mutations and UI-driven state changes",
              points: [
                "Sale/Order = workflow documents for UI and process tracking",
                "SalesTransactionItem = canonical financial truth for analytics",
                "STI financial fields are immutable — corrections require cancel + re-sell",
                "Feature flags control migration from Sale-based to STI-based statistics",
              ],
            },
            {
              title: "3-Layer Validation",
              why: "No invalid data reaches the database — ever",
              impact:
                "Zero corrupted records in production — every entry passes 3 independent checkpoints",
              points: [
                "Layer 1: Zod schemas at API boundary (14 validation files)",
                "Layer 2: Service-level business rules (stock, pricing, relationships)",
                "Layer 3: Mongoose schema constraints (required, min/max, enum, unique)",
              ],
            },
            {
              title: "Snapshot Architecture",
              why: "Past records stay accurate regardless of future changes",
              impact:
                "Past invoices remain tied to the product data captured at sale time",
              points: [
                "Every sale captures a point-in-time product snapshot",
                "Invoice and Guarantee items are fully embedded — immutable after creation",
                "Historical accuracy: product changes never affect past records",
              ],
            },
          ],
          flowTitle: "Sale Execution Flow",
          flowSteps: [
            {
              step: "Validate inputs",
              desc: "productId, quantity, sellingPrice, cashierId — Zod + business rules",
            },
            {
              step: "Calculate TVA",
              desc: "tvaAmount = priceHT × tvaRate, priceTTC = priceHT × (1 + tvaRate)",
            },
            {
              step: "Start MongoDB transaction",
              desc: "All subsequent operations are atomic — commit or rollback",
            },
            {
              step: "Check stock (cached + FIFO)",
              desc: "Product.stock (cached projection) ≥ qty, then authoritative check: aggregate(InventoryLog.remainingQty) ≥ qty",
            },
            {
              step: "Consume FIFO batches",
              desc: "Loop oldest → decrement remainingQty → accumulate cost with $gte guard",
            },
            {
              step: "Create Sale + STI",
              desc: "Dual-write: Sale (workflow) + SalesTransactionItem (financial truth)",
            },
            {
              step: "Decrement Product.stock",
              desc: "adjustStock(-qty) updates the cached projection — FIFO batches remain the source of truth",
            },
            {
              step: "Commit transaction",
              desc: "All-or-nothing — any failure rolls back every operation",
            },
          ],
          guaranteesTitle: "System Guarantees",
          guarantees: [
            {
              title: "No Overselling",
              desc: "3-layer defense: cached stock → FIFO aggregate → atomic batch guard ($gte). Concurrent conflicts return 409.",
              category: "data",
            },
            {
              title: "Consistent State",
              desc: "Cancellation atomically updates Sale + STI + Invoice + Guarantee + FIFO restore in one transaction.",
              category: "data",
            },
            {
              title: "Accurate Profit Calculation",
              desc: "Cost comes from FIFO batches (not product-level). Each unit sold carries its exact purchase price.",
              category: "financial",
            },
            {
              title: "Immutable Financial Records",
              desc: "STI financial fields and daily snapshots cannot be modified. Corrections create new records.",
              category: "financial",
            },
            {
              title: "Transaction Safety",
              desc: "Every critical operation uses MongoDB transactions. Partial state is impossible — commit or full rollback.",
              category: "transaction",
            },
            {
              title: "Historical Accuracy",
              desc: "Point-in-time snapshots on every sale so later product edits do not rewrite past invoices or reports.",
              category: "transaction",
            },
          ],
          codeTitle: "Data Flow",
          codeSnippets: [
            {
              label: "Stock Truth — System SSOT",
              lines: [
                "InventoryLog.remainingQty  ←  SINGLE SOURCE OF TRUTH",
                "Product.stock = Σ(InventoryLog.remainingQty)  // cached",
                "Sale → FIFO consumption (oldest batch first)",
                "Cancel → FIFO restoration (new entry at original cost)",
              ],
            },
            {
              label: "Relationship Map",
              lines: [
                "Product (1) ────── (N) InventoryLog",
                "Sale (1) ────────── (1) SalesTransactionItem",
                "Order (1) ───────── (N) SalesTransactionItem",
                "Invoice (1) ─────── (0..1) Guarantee",
              ],
            },
            {
              label: "Transaction Boundary — Atomicity",
              lines: [
                "session = mongoose.startSession()",
                "session.startTransaction()",
                "  ... all ops with { session } ...",
                "session.commitTransaction() || abortTransaction()",
              ],
            },
          ],
          flowNote:
            "All operations between steps 3–8 execute within a single MongoDB transaction. Any failure triggers a full rollback.",
          tradeoffsTitle: "Trade-offs",
          tradeoffs: [
            {
              chose: "FIFO costing",
              over: "Average cost pricing",
              reason:
                "Exact profit per unit — critical for a store where purchase prices fluctuate between batches",
            },
            {
              chose: "Dual-write (Sale + STI)",
              over: "Single document",
              reason:
                "Separates mutable workflow state from immutable financial truth — analytics stay clean",
            },
            {
              chose: "Embedded snapshots",
              over: "Reference-only lookups",
              reason:
                "Historical accuracy without heavy join queries - past invoices stay tied to stored sale snapshots",
            },
            {
              chose: "Cached stock on Product",
              over: "Live aggregation only",
              reason:
                "Fast reads for UI/POS — FIFO aggregation remains authoritative for all write operations",
            },
          ],
          principlesTitle: "System Principles",
          principles: [
            "Single source of truth — InventoryLog.remainingQty owns stock reality; Product.stock is a cached projection",
            "Immutable financial records — SalesTransactionItem cannot be edited; corrections create new records",
            "Snapshot-based historical accuracy — every sale freezes product state at point of transaction",
            "Atomic operations — no partial state is possible; every critical flow is wrapped in a MongoDB transaction",
          ],
        },
      },
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
