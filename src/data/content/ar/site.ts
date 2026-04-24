/**
 * @file ar/site.ts
 * @description Arabic locale — all non-project site content.
 * Technical terms remain in English (FIFO, MongoDB, etc.).
 * Projects are split into individual files under ./projects/
 */

import type { SiteContent } from "../types";

export type SiteData = Omit<SiteContent, "projects">;

export const site: SiteData = {
  /* Meta */
  meta: {
    title: "عبد الإله واجد · Product Engineer",
    description:
      "بورتفوليو مبني على دراسات حالة لعبد الإله واجد، Product Engineer يركز على الأنظمة التشغيلية، هندسة واضحة، وقرارات تقنية قابلة للدفاع.",
    author: "Abdelilah Wajid",
    keywords:
      "عبد الإله واجد, product engineer, مطور fullstack, دراسات حالة, react, next.js, typescript, أنظمة تشغيلية, مراكش, المغرب",
    siteUrl: "https://abdelilahwajid.com",
    ogType: "website",
    ogSiteName: "Abdelilah Wajid",
    twitterHandle: "",
  },

  /* Nav */
  nav: {
    logoTagline: "تحويل الفوضى إلى أنظمة موثوقة",
    links: [
      { id: "work", n: "01", label: "دراسات الحالة" },
      { id: "about", n: "02", label: "المنهجية" },
      { id: "skills", n: "03", label: "Stack" },
      { id: "contact", n: "04", label: "تواصل" },
    ],
  },

  /* Hero */
  hero: {
    badge: "متاح للعمل",

    name: {
      base: "Abdelilah",
      highlight: "Wajid",
      lastName: "",
    },

    positioning: "Product Engineer كيبني أنظمة حقيقية كتخدم تحت قيود واقعية.",

    roles: [
      "كنخدم على مشاريع مبنية على case studies حقيقية، ماشي demos",
      "كنركز على workflows تشغيلية، ماشي غير الواجهة",
      "كنوضح المقايضات التقنية بشكل صريح",
      "كنبني أنظمة الفرق تقدر تفهمها وتطورها بسهولة",
    ],

    pills: [
      "أنظمة واقعية",
      "تفكير تشغيلي",
      "مقايضات واضحة",
      "هندسة قابلة للتطوير",
    ],

    bio: "هاد البورتفوليو كيعرض خدمتي من خلال case studies حقيقية. كنركز على مشاكل تشغيلية معقدة بحال المخزون، التسعير، والتقارير، ونحوّلها لأنظمة واضحة، موثوقة، وقابلة للتطور مع الوقت.",

    cta: {
      primary: "عرض دراسة الحالة ↓",
      secondary: "تواصل معي →",
    },

    scroll: "تمرير",

    avatar: {
      displayName: "Abdelilah Wajid",
      tagline: "من الفوضى إلى أنظمة مفهومة وقابلة للتطوير",
      locationShort: "مراكش · متاح عن بعد",

      infoItems: ["مراكش، المغرب", "UTC+1 — GMT+1", "متاح للعمل عن بعد"],

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
    label: "02 — المنهجية",
    headingLine1: "أحوّل العمليات المعقدة،",
    headingLine2: "إلى أنظمة واضحة وقابلة للاعتماد.",
    paragraphs: [
      "أكون أكثر قيمة عندما يوجد منتج فعلاً، لكن workflow خلفه بطيء أو هش أو صعب الفهم.",
      "أبدأ دائماً بالتشخيص: أين يحدث الكسر، أين يوجد التكرار، أين تفقد البيانات معناها، وما القرارات التي يجب تحويلها إلى قواعد داخل النظام.",
      "هذا البورتفوليو يوضح طريقة تفكيري — عبر case studies، وtrade-offs، وتفاصيل التنفيذ — وليس فقط واجهات جاهزة.",
    ],
    tags: [
      { text: "Case-study driven", colorKey: "cyan" },
      { text: "قرارات قابلة للدفاع", colorKey: "amber" },
      { text: "وضوح النظام", colorKey: "purple" },
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
    label: "01 — دراسات الحالة",
    heading: "أنظمة تشغيلية، مفهومة بوضوح.",
    subtitle: "مشكلة → قيود → قرارات → أثر",
  },

  /* Skills */
  skills: {
    label: "03 — Stack",
    heading: "الأدوات التي أستخدمها لبناء أنظمة موثوقة.",
    subtitle: "مختارة للوضوح، قابلية الصيانة، وسرعة التنفيذ.",
  },

  /* Contact */
  contact: {
    label: "04 — تواصل",
    headingLine1: "متاح لأدوار Product Engineering،",
    headingHighlight: "الاستشارة، والمشاريع المحددة.",
    paragraphLine1:
      "إذا كان لديك workflow بطيء أو غير واضح أو هش، أرسل لي السياق، القيود، وما يسبب المشكلة فعلياً.",
    paragraphLine2:
      "سأعطيك جواباً واضحاً حول التوافق، النطاق، وأسرع طريقة للوصول إلى حل عملي.",
    email: "kanata10kan@gmail.com",
    copyLabel: "نسخ",
    copiedLabel: "تم النسخ ✓",
    whatsapp: {
      phone: "+212652064823",
      label: "واتساب",
      message:
        "مرحباً عبد الإله، أتواصل معك من خلال البورتفوليو الخاص بك. أود مناقشة تعاون محتمل.",
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
    tagline: "دراسات الحالة قبل الادعاءات.",
  },

  /* Stats */
  stats: [
    { value: "3", label: "لغات مدعومة", colorKey: "cyan" },
    { value: "Typed", label: "هندسة المحتوى", colorKey: "purple" },
    { value: "FIFO", label: "منطق تكلفة المخزون", colorKey: "amber" },
    { value: "خاص", label: "نموذج النشر", colorKey: "green" },
  ],

  /* Tech Strip */
  techStrip: [
    "Case-study driven",
    "Workflows تشغيلية",
    "Typed content",
    "مقايضات واضحة",
    "UI متجاوب",
    "Business rules first",
    "منطق المخزون",
    "هندسة واضحة",
    "قراءة سريعة",
    "قرارات قابلة للدفاع",
  ],

  /* Skill Groups */
  skillGroups: [
    {
      title: "Frontend",
      color: "#22d3ee",
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
