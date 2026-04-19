import type { ProjectContent } from "../../types";

export const elmoussaaifBrand: ProjectContent = {
  n: "02",
  slug: "elmoussaaif-brand",
  year: "2025",
  name: "Elmoussaaif Abdelghafour Brand",
  type: "Client Project — Production",
  color: "#8B5CF6",
  status: "Live in production",
  statusColor: "#3FB950",
  link: "/work/elmoussaaif-brand",
  desc: "A client needed a professional personal brand website with full content management, multilingual support, and a polished design that reflects their identity.",
  longDesc:
    "I designed and built the entire platform — from database schema and authentication to CMS, SEO, and deployment — and delivered it live in production.",
  stack: {
    core: ["Next.js 16", "React 19", "TypeScript"],
    backend: ["MongoDB", "Mongoose", "Zod", "JWT Auth", "bcrypt"],
    features: [
      "Cloudinary (Image CDN)",
      "Sharp (Optimization)",
      "DnD Kit (Drag & Drop)",
      "Resend (Email)",
    ],
    system: ["Tailwind CSS 4", "Framer Motion"],
    testing: [],
  },
  highlights: [
    "Built a full CMS with drag-and-drop content ordering, image optimization via Cloudinary + Sharp, and a protected admin dashboard",
    "Implemented JWT + bcrypt authentication with role-based access control for admin routes",
    "Delivered multilingual content management and structured SEO metadata for search discoverability",
    "Designed responsive UI with Framer Motion animations and Tailwind CSS 4",
  ],
  caseStudy: {
    headline:
      "Building a multilingual brand platform from zero digital presence to production",
    subtitle:
      "This case study shows how I took a client from scattered WhatsApp messages and zero online visibility to a professional, self-managed multilingual platform — live at elmoussaif.com.",
    tags: [
      "Client Delivery",
      "Multilingual (4 locales)",
      "CMS & Admin",
      "Production",
    ],
    problem: [
      "The client operated a successful private transport service but had zero digital presence",
      "All bookings came through scattered WhatsApp messages and word-of-mouth",
      "No credibility tool — potential B2B partners (riads, villas, hotels) had no way to evaluate the service",
      "Photos, pricing, and service descriptions were scattered across messaging apps with no content ownership",
      "Clients and partners operate in 4 languages (EN, FR, ES, AR) — no multilingual support existed",
      "The client needed to manage content independently with zero technical knowledge",
    ],
    impact: [
      "No online discoverability — the business was invisible to potential international clients",
      "B2B partnerships were harder to establish without a professional interface",
      "Content was lost or duplicated across messaging platforms",
      "No SEO presence meant zero organic traffic from search engines",
      "Every content update required developer intervention",
    ],
    decisions: [
      "Server Components by default — client components only where interactivity demands it (forms, animations, drag-and-drop)",
      "Server Actions for all mutations — no separate REST API layer needed",
      "Singleton MongoDB connection to prevent pool exhaustion in serverless environment",
      "HSL-based design token system with CSS custom properties for theme variants (light, dark, luxury)",
      "Strict separation of concerns — no database logic in components; all data access through server-only modules",
      "4-locale routing architecture with culturally adapted content (not literal translations)",
      "Full RTL support for Arabic with dedicated font stack (Noto Sans Arabic)",
    ],
    architecture: [
      "Next.js App Router with SSR/SSG for public pages and Server Actions for admin dashboard",
      "Shared /lib layer for db, auth, i18n, validators, SEO, email, and Cloudinary integration",
      "MongoDB Atlas for data, Cloudinary for image CDN with transforms, Resend for transactional email",
      "Modular data models: Settings, HomePage, AboutPage, ServicePage, Fleet, Tour, ContactMessage, Admin",
      "All content models support 4-language localized fields stored as nested objects in MongoDB",
    ],
    results: [
      "Client went from zero online visibility to a professional multilingual platform (0 → 1)",
      "4-language coverage serving the full Marrakech tourism market (EN, FR, ES, AR)",
      "Self-service admin — client manages all content independently without developer intervention",
      "B2B partners (riads, villas, hotels) can now evaluate services through a professional interface",
      "SEO infrastructure in place: structured data (JSON-LD), per-locale metadata, semantic HTML, optimized assets",
    ],
    screenshots: [],
    cta: "The value was not a prettier website. It was giving a real business the digital infrastructure to grow beyond word-of-mouth.",
  },
};
