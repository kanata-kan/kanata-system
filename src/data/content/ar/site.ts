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
    title: "عبد الإله واجد · مطور Fullstack",
    description:
      "معرض أعمال مبني على دراسات حالة لعبد الإله واجد، مطور fullstack متخصص في الأنظمة التشغيلية، الهندسة الواضحة، والقرارات التقنية المدافع عنها.",
    author: "Abdelilah Wajid",
    keywords:
      "عبد الإله واجد, مطور fullstack, دراسات حالة, react, next.js, typescript, أنظمة تشغيلية, مراكش, المغرب",
    siteUrl: "https://kanata-system.vercel.app",
    ogType: "website",
    ogSiteName: "Abdelilah Wajid",
    twitterHandle: "",
  },

  /* Nav */
  nav: {
    logoInitial: "A.",
    logoName: "ABDELILAH",
    logoTagline: "فهم · قرار · بناء",
    links: [
      { id: "work", n: "01", label: "دراسات الحالة" },
      { id: "about", n: "02", label: "المنهجية" },
      { id: "skills", n: "03", label: "الأدوات" },
      { id: "contact", n: "04", label: "تواصل" },
    ],
  },

  /* Hero */
  hero: {
    badge: "متاح للعمل",
    name: {
      base: "Abdel",
      highlight: "ilah",
      lastName: "Wajid",
    },
    positioning:
      "مهندس منتجات متخصص في الأنظمة التشغيلية، دراسات الحالة، وهندسة يمكن للفرق صيانتها.",
    roles: [
      "هندسة منتجات موجهة بدراسات الحالة",
      "سير عمل تشغيلي قبل العروض البصرية",
      "هندسة معمارية مبنية على قيود حقيقية",
      "أنظمة واضحة يمكن للفرق الوثوق بها",
    ],
    pills: [
      "Case-study driven",
      "أنظمة تشغيلية",
      "مقايضات واضحة",
      "هندسة قابلة للصيانة",
    ],
    bio: "هذا المعرض هو عرض هندسي مبني على دراسات الحالة. أركز على سير العمل التشغيلي المعقد — المخزون، التسعير، التقارير، والأدوات الداخلية — وأحوّلها إلى أنظمة أسهل في الثقة والشرح والتوسيع.",
    cta: {
      primary: "عرض دراسة الحالة ↓",
      secondary: "تواصل معي →",
    },
    scroll: "تمرير",
    avatar: {
      displayName: "Abdelilah W.",
      tagline: "فهم → قرار → بناء",
      locationShort: "مراكش · متاح عن بعد",
      infoItems: ["مراكش، المغرب", "UTC+1 — GMT+1", "متاح عن بعد"],
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
    label: "02 — المنهجية",
    headingLine1: "أحوّل العمليات المعقدة،",
    headingLine2: "إلى أنظمة واضحة.",
    paragraphs: [
      "أكون أكثر فائدة عندما يوجد منتج بالفعل لكن سير العمل خلفه بطيء أو هش أو صعب التفسير.",
      "عملي يبدأ بالتشخيص: أين ينكسر النظام، أين يظهر التكرار، أين تفقد البيانات معناها، وأي قرارات يجب أن تصبح قواعد نظام.",
      "هذا المعرض مصمم لإظهار هذا التفكير علنياً — عبر دراسات حالة ومقايضات وتفاصيل تنفيذ — وليس مجرد شاشات نهائية.",
    ],
    tags: [
      { text: "Case-study driven", colorKey: "cyan" },
      { text: "قرارات مدافع عنها", colorKey: "amber" },
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
        { text: '"افهم-أولاً"', colorKey: "amber" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  focus: ", colorKey: "muted" },
        { text: '"الوضوح-قبل-السرعة"', colorKey: "amber" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  approach: ", colorKey: "muted" },
        { text: '"أصلح-ما-يبطئ"', colorKey: "green" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  decisions: ", colorKey: "muted" },
        { text: "true", colorKey: "cyan" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  hire: ", colorKey: "muted" },
        { text: '"فقط-إذا-كان-منطقياً"', colorKey: "amber" },
      ],
      [{ text: "}", colorKey: "muted" }],
    ],
  },

  /* Work */
  work: {
    label: "01 — دراسات الحالة",
    heading: "أنظمة تشغيلية، مشروحة بوضوح.",
    subtitle: "مشكلة → حل → قرارات → أثر",
  },

  /* Skills */
  skills: {
    label: "03 — الأدوات",
    heading: "Stack أساسي وعادات تنفيذ.",
    subtitle: "مختارة للموثوقية والصيانة وسرعة التسليم.",
  },

  /* Contact */
  contact: {
    label: "04 — تواصل",
    headingLine1: "متاح لأدوار هندسة المنتجات،",
    headingHighlight: "الاستشارة، والمشاريع المحددة.",
    paragraphLine1:
      "إذا كنت بحاجة لشخص يحوّل سير العمل المعقد إلى أنظمة موثوقة، أرسل لي السياق والقيود وما يبطئ الفريق فعلاً.",
    paragraphLine2:
      "أرد بوضوح حول التوافق والنطاق وأسرع مسار نحو شيء مفيد.",
    email: "kanata10kan@gmail.com",
    copyLabel: "نسخ",
    copiedLabel: "تم النسخ ✓",
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
    "سير عمل تشغيلي",
    "محتوى مكتوب",
    "مقايضات واضحة",
    "UI متجاوب",
    "قواعد الأعمال أولاً",
    "منطق المخزون",
    "هندسة قابلة للقراءة",
    "فحص سريع",
    "قرارات مدافع عنها",
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
