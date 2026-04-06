/**
 * @file content/ar.ts
 * @description Arabic locale — all site text content.
 */

import type { SiteContent } from "./types";

export const ar: SiteContent = {
  /* ── Meta ── */
  meta: {
    title: "عبد الإله واجد · مهندس برمجيات متكامل",
    description:
      "ملف أعمال عبد الإله واجد — مهندس برمجيات متكامل مقيم في مراكش، المغرب. أساعد الشركات الناشئة على تشخيص اختناقات منتجاتها وبناء أنظمة تتوسع دون أن تنهار.",
    author: "Abdelilah Wajid",
    keywords:
      "عبد الإله واجد, مهندس برمجيات, مطور ويب, react, next.js, typescript, portfolio, مراكش, المغرب, freelance",
    siteUrl: "https://abdelilahwajid.com",
    ogType: "website",
    ogSiteName: "عبد الإله واجد",
    twitterHandle: "@abdelilahwajid",
  },

  /* ── Nav ── */
  nav: {
    logoInitial: "ع.",
    logoName: "عبد الإله",
    logoTagline: "افهم · قرر · ابنِ",
    links: [
      { id: "work", n: "01", label: "المقاربة" },
      { id: "about", n: "02", label: "العقلية" },
      { id: "skills", n: "03", label: "الأدوات" },
      { id: "contact", n: "04", label: "التواصل" },
    ],
  },

  /* ── Hero ── */
  hero: {
    badge: "متاح للعمل",
    name: {
      base: "عبد",
      highlight: "الإله",
      lastName: "واجد",
    },
    roles: [
      "شخّص قبل أن تبني",
      "أزل ما يُبطئ النمو",
      "سلّم أنظمة تصمد تحت الضغط",
      "بنية تتحمل الحِمل",
    ],
    pills: [
      "تفكير منظومي",
      "قرارات واضحة",
      "معمارية قابلة للتوسع",
      "عمل موجّه بالنتائج",
    ],
    bio: "أعمل مع الشركات الناشئة وفرق المنتج لتحديد ما يعيق النمو فعلاً — أنظمة بطيئة، أو تدفقات غير واضحة، أو معمارية هشّة. ثم أبني حلولاً تؤدي وظيفتها، وتتوسع، ولا تحتاج إلى إعادة كتابة بعد ستة أشهر.",
    cta: {
      primary: "اطّلع على أعمالي ↓",
      secondary: "لنتحدث ←",
    },
    scroll: "مرر",
    avatar: {
      displayName: "عبد الإله و.",
      tagline: "افهم ← قرر ← ابنِ",
      locationShort: "مراكش · متاح عن بُعد",
      infoItems: ["مراكش، المغرب", "UTC+1 — GMT+1", "متاح للعمل عن بُعد"],
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
    label: "02 — العقلية",
    headingLine1: "أشخّص الأنظمة،",
    headingLine2: "ثم أبني.",
    paragraphs: [
      "معظم مشاكل البرمجيات ليست غياب ميزات — بل قرارات غامضة اتُّخذت مبكراً وتراكمت آثارها مع الوقت.",
      "قبل كتابة سطر واحد من الكود، أرسم خريطة النظام: أين ينكسر، وأين يختبئ التعقيد، وما الذي يستحق الحلّ فعلاً.",
      "هنا يقع العمل الحقيقي. كل ما أبنيه بعد ذلك مبنيٌّ على ما يحتاجه المنتج — لا على ما بدا فكرة جيدة في جلسة عصف ذهني.",
    ],
    tags: [
      { text: "الوضوح أولاً", colorKey: "cyan" },
      { text: "لا تنفيذاً أعمى", colorKey: "amber" },
      { text: "القيمة فوق الضجيج", colorKey: "purple" },
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
    label: "01 — المقاربة",
    heading: "مشاكل حُلّت. منتجات شُحنت.",
    subtitle: "٤ مشاكل حقيقية · ٤ قرارات هيكلية · شُحنت.",
  },

  /* ── Skills ── */
  skills: {
    label: "03 — الأدوات",
    heading: "الأدوات التي أختارها — ولماذا.",
    subtitle: "الأداة المناسبة للمشكلة المناسبة. لا أكثر.",
  },

  /* ── Contact ── */
  contact: {
    label: "04 — التواصل",
    headingLine1: "أخبرني بما يعطّل،",
    headingHighlight: "وسأخبرك بما يستحق الإصلاح.",
    paragraphLine1:
      "إذا كان منتجك بطيئاً، أو يصعب توسيعه، أو يتراكم فيه قرارات لا يتذكرها أحد — فهذا بالضبط أين أعمل.",
    paragraphLine2:
      "سأعطيك قراءة صادقة للوضع. إن كان هناك تناسب، سأريك الطريق. وإن لم يكن، سأقولها لك مبكراً.",
    email: "abdelilah@email.com",
    copyLabel: "نسخ",
    copiedLabel: "تم النسخ ✓",
    socials: ["GitHub", "LinkedIn", "Twitter / X"],
  },

  /* ── Footer ── */
  footer: {
    copyright: "© 2026",
    author: "عبد الإله واجد",
    tagline: "الوضوح يُنجز. التعقيد يُغرق.",
  },

  /* ── Stats ── */
  stats: [
    { value: "+4", label: "سنوات خبرة", colorKey: "cyan" },
    { value: "+12", label: "مشروع مكتمل", colorKey: "purple" },
    { value: "+20", label: "عميل", colorKey: "amber" },
    { value: "3", label: "دول", colorKey: "green" },
  ],

  /* ── Tech Strip ── */
  techStrip: [
    "صفر ديون تقنية منذ اليوم الأول",
    "المعمارية قبل الميزات",
    "الأداء بالتصميم",
    "بنية قابلة للتوسع",
    "إزالة الاحتكاك",
    "هندسة واعية بالأعمال",
    "التفكير في التدفقات",
    "قطع التعقيد مبكراً",
    "الشحن بثقة",
    "الوضوح في كل طبقة",
  ],

  /* ── Projects ── */
  projects: [
    {
      n: "01",
      year: "2024",
      name: "SaaSify",
      type: "منتج SaaS",
      color: "#38BDF8",
      status: "Live",
      statusColor: "#3FB950",
      link: "saasify.dev",
      desc: "منصة SaaS متعددة المستأجرين — المشكلة الحقيقية كانت الدَّيْن الهيكلي، لا الميزات الناقصة.",
      longDesc:
        "صممت المعمارية قبل كتابة سطر واحد من كود المنتج. هذا القرار وحده أوقف إعادتَي كتابة كاملتين.",
      stack: [
        "Next.js 14",
        "Prisma",
        "Stripe",
        "PostgreSQL",
        "Resend",
        "Tailwind",
      ],
      highlights: [
        "بنيت عزلاً كاملاً بين المستأجرين للقضاء على خطر تسرّب البيانات مستقبلاً",
        "اخترت Stripe مبكراً وبنيت معالجة الـ webhooks لتصمد عند التوسع",
        "حدّدت حدود الأدوار والصلاحيات قبل إضافة أول مستخدم",
        "هيكلت أنماط الوصول للبيانات لأداء استعلامات فعّال تحت الحِمل",
      ],
    },
    {
      n: "02",
      year: "2024",
      name: "DevMetrics",
      type: "أداة داخلية",
      color: "#F0883E",
      status: "Beta",
      statusColor: "#F0883E",
      link: "devmetrics.io",
      desc: "فِرَق الهندسة كانت تملك البيانات — لكنها مشتتة عبر ستة أدوات وتُبطئ كل قرار.",
      longDesc:
        "بنيت مصدراً موحداً للحقيقة يقلّص التنقل بين السياقات ويُظهر ما يهم فعلاً.",
      stack: [
        "React",
        "Node.js",
        "WebSockets",
        "Redis",
        "GitHub API",
        "Linear API",
      ],
      highlights: [
        "دمجت ستة مصادر بيانات في لوحة تحكم واحدة متماسكة",
        "استخدمت WebSockets لتوصيل إشارة حية دون تحديث يدوي",
        "أعطيت الأولوية للمقاييس القابلة للتنفيذ على تفريغ البيانات الخام",
        "قلّصت التنقل اليومي بين السياقات لفريق هندسة من ١٢ شخصاً",
      ],
    },
    {
      n: "03",
      year: "2023",
      name: "openapi-gen",
      type: "أداة مفتوحة المصدر",
      color: "#A78BFA",
      status: "OSS",
      statusColor: "#A78BFA",
      link: "github.com/abdelilah/openapi-gen",
      desc: "الفِرَق لم تكن تخسر الوقت في كتابة الـ APIs — بل في إبقاء الـ SDKs متزامنة بعد كل تغيير.",
      longDesc:
        "بنيت أداة CLI تجعل توليد الـ SDK الآمن من حيث النوع تلقائياً، لا مهمة يدوية متكررة.",
      stack: ["Node.js", "TypeScript", "Zod", "Commander.js", "Prettier"],
      highlights: [
        "أتمتت توليد الـ SDK وأزالت مصدراً متكرراً للأخطاء البشرية",
        "استفدت من استنتاج TypeScript لأمان نوع صارم في وقت الترجمة",
        "أضفت تحقق Zod لعقود وقت التشغيل التي لا تفشل بصمت",
        "صُمِّمت للتبني دون إعداد — تعمل فور الاستخدام",
      ],
    },
    {
      n: "04",
      year: "2023",
      name: "MoroccoMap",
      type: "تصوير بياني للبيانات",
      color: "#3FB950",
      status: "Live",
      statusColor: "#3FB950",
      link: "moroccomap.ma",
      desc: "البيانات كانت موجودة. المشكلة أنها كانت غير قابلة للاستخدام — كثيفة وغير منظمة وغير متاحة.",
      longDesc:
        "ركّزت على هرمية المعلومات وتصميم التفاعل قبل لمس مجموعة البيانات.",
      stack: ["D3.js", "Next.js", "Python", "FastAPI", "PostgreSQL", "Mapbox"],
      highlights: [
        "حوّلت مجموعات البيانات المدنية الخام إلى روايات مرئية مفهومة",
        "صممت تفاعلات تعتمد الاستكشاف أولاً بدلاً من الرسوم البيانية الثابتة",
        "أبقيت التعقيد المرئي منخفضاً لتعظيم قابلية الاستخدام الواقعية",
        "شحنت دعماً ثلاثي اللغة كاملاً (AR / FR / EN) منذ اليوم الأول",
      ],
    },
  ],

  /* ── Skill Groups ── */
  skillGroups: [
    {
      title: "الواجهة الأمامية",
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
      title: "الواجهة الخلفية",
      color: "#3FB950",
      items: ["Node.js / Express", "PostgreSQL", "Prisma ORM", "REST APIs"],
    },
    {
      title: "العمليات",
      color: "#F0883E",
      items: ["Docker", "Vercel", "AWS", "Linux"],
    },
    {
      title: "الأدوات",
      color: "#A78BFA",
      items: ["Git / GitHub", "Postman", "Figma", "Notion"],
    },
  ],
};
