import type { ProjectContent } from "../../types";

export const meditransCore: ProjectContent = {
  n: "03",
  slug: "meditrans-core",
  year: "2025",

  // 🔥 SEO NAME
  name: "Medical Transport SaaS Platform & Pricing Engine",

  type: "SaaS Platform — In Development",
  color: "#10B981",

  status: "Phase 1 complete",
  statusColor: "#F59E0B",

  link: "/work/meditrans-core",
  repoUrl: "https://github.com/kanata-kan/meditrans-core",

  // 🔥 HOOK
  desc: "Medical transport operators rely on spreadsheets and manual calculations for scheduling, pricing, and invoicing. This platform introduces a unified system with deterministic pricing and full operational control.",

  // 🔥 VALUE
  longDesc:
    "I am building a modular SaaS platform designed to handle complex healthcare operations — including scheduling, pricing, invoicing, and payments — with deterministic logic, auditability, and test-driven guarantees from day one.",

  stack: {
    core: ["Next.js 14", "TypeScript (strict)"],
    backend: ["PostgreSQL", "Prisma 5", "Zod", "NextAuth"],
    features: [
      "7-Step Pricing Engine",
      "Immutable Snapshots",
      "Domain Modules",
      "@react-pdf/renderer",
    ],
    system: ["Tailwind CSS", "Recharts", "Vercel"],
    testing: ["Vitest", "@vitest/coverage-v8"],
  },

  highlights: [
    "Designed a modular SaaS architecture with clear domain boundaries",
    "Built a deterministic 7-step pricing engine with immutable snapshots",
    "Implemented full test coverage for pricing and invoicing logic from the start",
    "Structured the system for long-term scalability and maintainability",
  ],

  caseStudy: {
    // 🔥 STORY
    headline:
      "Designing a SaaS platform for complex medical transport operations",

    subtitle:
      "How I built a modular system with deterministic pricing, auditability, and 146 automated tests — designed for real healthcare workflows.",

    tags: [
      "SaaS Architecture",
      "Healthcare System",
      "Pricing Engine",
      "Test-Driven",
    ],

    problem: [
      "Medical transport operators manage scheduling, pricing, and invoicing through disconnected spreadsheets",
      "No unified system exists for ambulance dispatch, home care visits, and coordination",
      "Pricing rules are complex — urgency, staff type, distance, time, and holidays",
      "Manual invoice generation leads to frequent errors and inconsistencies",
      "No audit trail or role-based access control for sensitive operations",
    ],

    impact: [
      "Frequent pricing errors due to manual calculations",
      "Revenue loss from inconsistent invoicing and tracking",
      "No visibility into operational performance or financial metrics",
      "Compliance risks due to lack of audit logs",
      "Operational fatigue caused by repetitive manual tasks",
    ],

    decisions: [
      "Adopted modular DDD-style architecture with strict boundaries per domain",
      "Used Server Actions as the only mutation layer (no REST API complexity)",
      "Built a deterministic pricing engine with 7 explicit steps",
      "Introduced immutable snapshots to preserve financial history",
      "Implemented RBAC with enforced access control at every mutation point",
      "Designed a full PDF invoice system with structured pricing breakdown",
    ],

    architecture: [
      "8 modular domains (clients, patients, services, invoices, payments, pricing, users, dashboard)",
      "Deterministic pricing engine resolving through 7 steps with full traceability",
      "Immutable pricing snapshots stored alongside services",
      "PostgreSQL with Prisma ORM ensuring relational integrity",
      "Custom design system with reusable components and layout consistency",
    ],

    results: [
      "146 automated tests ensuring reliability of pricing and invoicing logic",
      "Clean modular codebase with clear domain boundaries",
      "Scalable foundation ready for production deployment",
      "Deterministic pricing system eliminating calculation ambiguity",
      "Professional invoice generation with consistent structure",
    ],

    screenshots: [],

    cta: "This is not a demo project — it is a production-grade SaaS platform designed to handle real-world healthcare operations.",

    technicalDeepDive: {
      sectionTitle: "Technical Deep Dive",
      sectionSubtitle:
        "How the pricing engine, security model, and module architecture are designed — from schema to deployment.",
      erdTitle: "Data Model",
      entities: [
        {
          name: "Client",
          desc: "Business or individual client with contact info and billing details",
          type: "core",
        },
        {
          name: "Patient",
          desc: "Patient record linked to client — name, condition, transport needs",
          type: "core",
        },
        {
          name: "Service",
          desc: "Scheduled transport or care visit with pricing snapshot",
          type: "core",
          central: true,
        },
        {
          name: "PricingRule",
          desc: "Catalog-based pricing rules with urgency and staff type modifiers",
          type: "core",
          ssot: "Pricing Source of Truth",
        },
        {
          name: "PricingSnapshot",
          desc: "Immutable point-in-time capture of pricing calculation",
          type: "financial",
        },
        {
          name: "Invoice",
          desc: "Generated from completed services with itemized lines and PDF export",
          type: "financial",
        },
        {
          name: "Payment",
          desc: "Multi-method payment record with auto-reconciliation",
          type: "financial",
        },
        {
          name: "User",
          desc: "Admin or assistant with RBAC and session hardening",
          type: "audit",
        },
        {
          name: "AuditLog",
          desc: "Automatic logging of all critical operations",
          type: "audit",
        },
      ],
      relationships: [
        {
          from: "Client",
          to: "Patient",
          label: "has patients",
          cardinality: "1 → N",
        },
        {
          from: "Patient",
          to: "Service",
          label: "receives",
          cardinality: "1 → N",
        },
        {
          from: "Service",
          to: "PricingSnapshot",
          label: "captures price",
          cardinality: "1 → 1",
        },
        {
          from: "Service",
          to: "Invoice",
          label: "generates",
          cardinality: "N → 1",
        },
        {
          from: "Invoice",
          to: "Payment",
          label: "paid by",
          cardinality: "1 → N",
        },
        {
          from: "User",
          to: "AuditLog",
          label: "logged by",
          cardinality: "1 → N",
        },
      ],
      archTitle: "Core Architecture",
      archBlocks: [
        {
          title: "7-Step Pricing Engine",
          why: "Medical transport pricing involves complex stacking rules that must be deterministic and auditable",
          impact:
            "Every service gets a verifiable price trace — no black-box calculations",
          points: [
            "Step 1: Catalog resolution — match service type, urgency, and staff to pricing rule",
            "Step 2: Base price extraction from matched rule",
            "Step 3: Distance fee calculation by zone (urban, rural, inter-city)",
            "Step 4: Modifier application — night (+%), weekend (+MAD), holiday stacking",
            "Step 5: Manual override check — admin can set fixed price with audit trail",
            "Step 6: VAT calculation on final amount",
            "Step 7: Immutable snapshot creation — persisted alongside the service record",
          ],
        },
        {
          title: "Modular DDD Architecture",
          why: "8 business domains must evolve independently without cross-contamination",
          impact:
            "Adding a new module (e.g. fleet management) follows a known pattern without touching existing code",
          points: [
            "Each module: schema.ts → types.ts → repository.ts → service.ts → actions.ts",
            "No cross-module imports at the repository level — only through service boundaries",
            "Shared /lib layer for auth, db, audit, validation, and utilities",
            "Server Actions as the only entry point for mutations — typed, validated, audited",
          ],
        },
        {
          title: "Security Layers",
          why: "Medical and financial data requires defense in depth — not just login checks",
          impact:
            "Every request passes through 4 security boundaries before reaching business logic",
          points: [
            "Layer 1: Next.js middleware — redirect unauthenticated users from /dashboard",
            "Layer 2: requireSession() — validates JWT, checks isActive flag, extracts role",
            "Layer 3: requireAdmin() — blocks assistant users from mutation routes",
            "Layer 4: Zod validation + audit log — every mutation is schema-checked and recorded",
          ],
        },
        {
          title: "PDF Invoice Engine",
          why: "Professional invoices are a business requirement — not a nice-to-have",
          impact:
            "Invoices render server-side with consistent layout, branding, and pricing breakdown",
          points: [
            "Built with @react-pdf/renderer — 11 modular components",
            "Itemized service lines with per-line pricing breakdown",
            "Status badges (Paid, Partial, Unpaid, Cancelled) embedded in PDF",
            "Auto-generated invoice numbers with company branding",
          ],
        },
      ],
      flowTitle: "Service Pricing Flow",
      flowSteps: [
        {
          step: "Create service request",
          desc: "Client, patient, service type, urgency, staff type, distance — validated with Zod",
        },
        {
          step: "Resolve pricing rule",
          desc: "Match catalog code + urgency + staff type to active PricingRule",
        },
        {
          step: "Calculate base + distance",
          desc: "Base price from rule + distance fee from zone configuration",
        },
        {
          step: "Apply modifiers",
          desc: "Night auto-detection, weekend check, holiday stacking — each modifier logged",
        },
        {
          step: "Check manual override",
          desc: "Admin can set fixed price — original calculation preserved in snapshot for audit",
        },
        {
          step: "Calculate VAT",
          desc: "Apply configured VAT rate to final amount",
        },
        {
          step: "Persist snapshot",
          desc: "Immutable PricingSnapshot created alongside Service — never modified after creation",
        },
      ],
      guaranteesTitle: "System Guarantees",
      guarantees: [
        {
          title: "Deterministic Pricing",
          desc: "Same inputs always produce the same price. Every calculation step is logged and snapshot-persisted.",
          category: "data",
        },
        {
          title: "Immutable Price History",
          desc: "PricingSnapshots are never modified. Rule changes don't retroactively alter past service prices.",
          category: "financial",
        },
        {
          title: "Payment Reconciliation",
          desc: "Invoice status auto-updates based on payment totals: Unpaid → Partial → Paid. No manual status management.",
          category: "financial",
        },
        {
          title: "Audit Trail",
          desc: "Every create, delete, and cancel operation is logged with userId, role, entity, entityId, and timestamp.",
          category: "transaction",
        },
        {
          title: "Role Enforcement",
          desc: "RBAC checked at every server action — not just at the UI level. Assistant users cannot access admin mutations.",
          category: "transaction",
        },
        {
          title: "Session Hardening",
          desc: "JWT with 8h maxAge, isActive re-validation on refresh, middleware protection on all dashboard routes.",
          category: "data",
        },
      ],
      codeTitle: "Data Flow",
      codeSnippets: [
        {
          label: "Pricing Resolution — 7 Steps",
          lines: [
            "1. matchRule(serviceType, urgency, staffType)",
            "2. basePrice = rule.price",
            "3. distanceFee = getZoneRate(zone) × distance",
            "4. modifiers = applyNight() + applyWeekend() + applyHoliday()",
            "5. override? = admin.fixedPrice ?? calculated",
            "6. vat = finalAmount × vatRate",
            "7. snapshot = persist({ steps, total, timestamp })",
          ],
        },
        {
          label: "Module Boundary Pattern",
          lines: [
            "schema.ts   → Zod validation (input/output shapes)",
            "types.ts    → TypeScript interfaces & enums",
            "repository  → Prisma queries (select, create, update)",
            "service.ts  → Business logic + cross-module coordination",
            "actions.ts  → Server Actions (auth + validate + service + audit)",
          ],
        },
        {
          label: "Security Chain",
          lines: [
            "middleware.ts → redirect if no session cookie",
            "requireSession() → JWT decode + isActive check",
            "requireAdmin() → role === 'admin' guard",
            "zodSchema.parse() → input validation",
            "auditLog() → { userId, role, action, entity, entityId }",
          ],
        },
      ],
      flowNote:
        "All 7 pricing steps execute synchronously. The final snapshot is persisted atomically with the service record.",
      tradeoffsTitle: "Trade-offs",
      tradeoffs: [
        {
          chose: "Snapshot-based pricing",
          over: "Live rule evaluation",
          reason:
            "Past invoices always reflect the rules active at service time — rule changes never corrupt history",
        },
        {
          chose: "Server Actions only",
          over: "REST API routes",
          reason:
            "Simpler mutation layer with built-in type safety — no API versioning or endpoint management needed",
        },
        {
          chose: "Vitest from Phase 0",
          over: "Testing after features",
          reason:
            "Pricing engine was 100% tested before any UI existed — caught 12 edge cases during development",
        },
        {
          chose: "Modular DDD boundaries",
          over: "Feature-folder organization",
          reason:
            "Each module can evolve independently — adding fleet management won't touch pricing or invoicing code",
        },
      ],
      principlesTitle: "System Principles",
      principles: [
        "Deterministic pricing — same inputs always produce the same price, with a full audit trail of each calculation step",
        "Immutable snapshots — pricing, invoicing, and audit records are never modified after creation",
        "Test-first development — 146 tests existed before the dashboard UI was built",
        "Defense in depth — 4 security layers ensure no unauthorized mutation reaches business logic",
      ],
    },
  },
};
