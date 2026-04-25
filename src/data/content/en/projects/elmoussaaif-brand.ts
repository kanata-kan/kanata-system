import type { ProjectContent } from "../../types";

export const elmoussaaifBrand: ProjectContent = {
  n: "02",
  slug: "elmoussaaif-brand",
  year: "2025",

  // 🔥 SEO NAME (بدل الشخصي)
  name: "Multilingual Business Website & CMS Platform",

  type: "Client Project — Production",
  color: "#8B5CF6",

  status: "Live in production",
  statusColor: "#3FB950",

  link: "/work/elmoussaaif-brand",
  liveUrl: "https://elmoussaif.com",

  // 🔥 HOOK
  desc: "A transport business with zero online presence relied entirely on WhatsApp and word-of-mouth. This platform introduced a multilingual website and a full CMS to manage content independently.",

  // 🔥 VALUE
  longDesc:
    "I designed and built a complete digital platform — including CMS, authentication, multilingual content, SEO, and deployment — transforming a real business from offline operations into a structured, self-managed online presence.",

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
    "Built a full CMS with drag-and-drop content ordering and optimized media handling",
    "Implemented secure authentication with role-based access control",
    "Delivered multilingual content management across 4 locales",
    "Designed a responsive and animated UI aligned with business identity",
  ],

  caseStudy: {
    // 🔥 STRONG STORY
    headline: "From zero online presence to a multilingual business platform",

    subtitle:
      "How I transformed a transport service from WhatsApp-based operations into a structured, self-managed digital platform serving international clients.",

    tags: [
      "Client Platform",
      "Multilingual CMS",
      "SEO Infrastructure",
      "Production System",
    ],

    problem: [
      "The business had no online presence and relied entirely on WhatsApp and word-of-mouth",
      "Potential clients had no way to evaluate services or trust the business online",
      "All content (photos, pricing, services) was scattered across messaging apps",
      "No multilingual support despite serving international clients",
      "The client had no technical knowledge to manage or update content",
    ],

    impact: [
      "The business was invisible to international clients searching online",
      "Missed opportunities for partnerships with hotels, riads, and agencies",
      "Content duplication and loss across multiple communication channels",
      "Zero organic traffic due to lack of SEO presence",
      "High dependency on developers for any content change",
    ],

    decisions: [
      "Used Server Components by default for performance and scalability",
      "Handled all mutations via Server Actions instead of REST APIs",
      "Designed a 4-locale system with culturally adapted content",
      "Implemented a singleton MongoDB connection for stability in serverless environments",
      "Built a theme system using design tokens for flexible branding",
      "Ensured full RTL support for Arabic with dedicated typography",
    ],

    architecture: [
      "Next.js App Router with SSR/SSG for public pages and Server Actions for admin",
      "Centralized /lib layer handling db, auth, i18n, validation, SEO, and integrations",
      "MongoDB Atlas for data, Cloudinary for image CDN, Resend for email handling",
      "Modular content models supporting multilingual fields (EN, FR, ES, AR)",
    ],

    results: [
      "The business moved from offline-only to a fully functional online platform",
      "4-language support enabled access to international customers",
      "Client can now manage all content independently via admin dashboard",
      "Improved credibility for B2B partnerships with hotels and agencies",
      "SEO foundation established for long-term organic growth",
    ],

    screenshots: [],

    cta: "The real value was not the website itself — it was giving the business control over its digital presence and growth.",
  },
};
