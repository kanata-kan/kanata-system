import type { ProjectContent } from "../../types";

export const electroAbidin: ProjectContent = {
  n: "01",
  slug: "electro-abidin",
  year: "2025",
  name: "Electro Abidin eSystem",
  type: "Retail Management System",
  color: "#3B82F6",
  status: "Private deployment",
  statusColor: "#3FB950",
  link: "/work/electro-abidin",
  liveUrl: "https://abdelilahwajid.com/work/electro-abidin",
  desc: "A retail operation with manual stock checks, paper-based tracking, and slow checkout needed one system that staff could trust in real time.",
  longDesc:
    "I turned inventory, checkout, invoicing, and warranty handling into a single operational flow with reliable stock, pricing, and profit logic.",
  stack: {
    core: ["Next.js", "React", "JavaScript (ES6+)"],
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
        caption: "Full operational visibility with real-time business insights",
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
};
