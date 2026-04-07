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
    subtitle: "مشاكل حقيقية · قرارات هيكلية · شُحنت.",
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
      slug: "electro-abidin",
      year: "2025",
      name: "Electro Abidin eSystem",
      type: "نظام إدارة تجارة التجزئة",
      color: "#3B82F6",
      status: "Live",
      statusColor: "#3FB950",
      link: "",
      desc: "متجر إلكترونيات يعتمد على الجرد اليدوي والتتبع الورقي — النظام استبدل الفوضى بتحكم تشغيلي فوري.",
      longDesc:
        "صممت المخزون والمبيعات والفواتير كتدفق متكامل واحد — وليس ثلاث أدوات منفصلة ملتصقة ببعضها.",
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
        "ألغيت الجرد اليدوي بربط المخزون مباشرة بعملية البيع",
        "بنيت حساب أرباح بمنطق FIFO لتتبع مالي دقيق لكل وحدة مباعة",
        "صممت فوترة مرنة تدعم الأفراد والشركات مع ضريبة القيمة المضافة الاختيارية",
        "أدمجت تتبع الضمان تلقائياً مرتبطاً بكل منتج عند نقطة البيع",
      ],
      caseStudy: {
        headline: "من الفوضى اليدوية إلى تحكم فوري في تجارة التجزئة",
        subtitle:
          "المتجر لم يكن ينقصه برنامج — كان ينقصه نظام يفهم كيف تعمل تجارة الإلكترونيات فعلاً.",
        tags: ["إدارة المخزون", "نقطة البيع", "التتبع المالي", "أتمتة الأعمال"],
        problem: [
          "المتجر كان يعتمد على الجرد اليدوي داخل غرفة التخزين",
          "الموظفون كانوا يتحققون فعلياً من توفر المنتجات عدة مرات يومياً",
          "أخطاء بيع متكررة (بيع منتجات غير متوفرة)",
          "عملية دفع بطيئة بسبب غياب الرؤية الفورية",
          "لا تتبع مالي واضح ولا دقة في المخزون",
        ],
        impact: [
          "مبيعات ضائعة بسبب منتجات غير متوفرة لا تُكتشف إلا عند الدفع",
          "وقت ومجهود بدني مهدور للموظفين في التحقق المتكرر من المخزون",
          "تجربة عملاء سيئة بسبب أوقات الانتظار الطويلة داخل المتجر",
          "فهم غير دقيق لمستويات المخزون والإيرادات الفعلية",
          "فوضى تشغيلية تؤثر على الأداء اليومي واتخاذ القرارات",
        ],
        decisions: [
          "ربط المخزون مباشرة بعملية البيع (مزامنة فورية)",
          "إدخال نظام طلبات متعدد المنتجات بدلاً من الدفع لمنتج واحد",
          "إضافة تنبيهات عتبة المخزون لاستباق أفضل",
          "تطبيق تسعير مرن (حد أدنى/أقصى) لدعم التفاوض الحقيقي",
          "تصميم نظام فوترة يدعم الأفراد والشركات",
          "جعل ضريبة القيمة المضافة (TVA) اختيارية حسب سيناريوهات العمل الحقيقية",
          "دمج منطق ضمان تلقائي لكل منتج",
        ],
        architecture: [
          "فصل كيان المنتج عن كيان المخزون لتجنب تكرار البيانات",
          "كل دفعة مخزون لها سعر شراء خاص بها للمحاسبة الدقيقة",
          "تطبيق منطق FIFO لحساب الأرباح بدقة",
          "استخدام عمليات قائمة على الحالة للإلغاء/الإرجاع مع استرداد المخزون تلقائياً",
          "تصميم النظام مع مراعاة تناسق البيانات وسلامة المعاملات",
        ],
        results: [
          "إلغاء الحاجة للجرد اليدوي بالكامل",
          "تقليل ملحوظ في احتكاك الدفع ووقت الانتظار",
          "منع بيع المنتجات غير المتوفرة",
          "تمكين تتبع دقيق للأرباح والمالية",
          "تحسين كفاءة الموظفين وتقليل المجهود البدني",
          "منح المالك رؤية فورية للعمليات والأداء",
        ],
        screenshots: [
          {
            src: "/electro-abidin/pos.webp",
            alt: "نظام نقطة البيع مع رؤية فورية للمخزون",
            caption:
              "بحث فوري عن المنتجات ورؤية المخزون — لا مزيد من الجرد اليدوي",
          },
          {
            src: "/electro-abidin/checkout.webp",
            alt: "نظام الدفع مع حساب التسعير والضريبة",
            caption: "دفع متعدد المنتجات مع حسابات تلقائية وتسعير مرن",
          },
          {
            src: "/electro-abidin/dashboard.webp",
            alt: "لوحة تحكم المدير مع تحليلات المبيعات والمخزون",
            caption: "رؤية تشغيلية كاملة مع رؤى أعمال فورية",
          },
          {
            src: "/electro-abidin/catalogue.webp",
            alt: "نظام إدارة المنتجات والمخزون",
            caption: "فصل منظم للمنتجات والمخزون لمعالجة بيانات دقيقة",
          },
          {
            src: "/electro-abidin/invoice.webp",
            alt: "نظام إنشاء الفواتير مع دعم الضريبة",
            caption: "إنشاء فواتير تلقائي مع دعم الضريبة وأنواع العملاء",
          },
        ],
        cta: "النظام لم يرقمن العملية فقط — بل أعاد تصميم طريقة عمل المتجر.",
        technicalDeepDive: {
          sectionTitle: "Technical Deep Dive",
          sectionSubtitle:
            "كيف صُمم النظام من الداخل — الهندسة المعمارية، نموذج البيانات، والضمانات.",
          erdTitle: "نموذج البيانات",
          entities: [
            {
              name: "Product",
              desc: "عنصر الكتالوج مع مخزون مؤقت (مزامن من FIFO)",
              type: "core",
            },
            {
              name: "InventoryLog",
              desc: "دفعة FIFO — المصدر الوحيد للحقيقة للمخزون والتكلفة",
              type: "core",
              ssot: "مصدر حقيقة المخزون",
              central: true,
            },
            {
              name: "Sale",
              desc: "مستند سير عمل لمنتج واحد (نقطة دخول UI)",
              type: "transaction",
            },
            {
              name: "Order",
              desc: "بيع متعدد المنتجات مع OrderItems مدمجة",
              type: "transaction",
            },
            {
              name: "SalesTransactionItem",
              desc: "السجل المالي القانوني — غير قابل للتعديل بعد الإنشاء",
              type: "financial",
              ssot: "مصدر الحقيقة المالية",
            },
            {
              name: "Invoice",
              desc: "مستند قانوني (FACTURE / BON DE VENTE) مع عناصر مدمجة",
              type: "financial",
            },
            {
              name: "Guarantee",
              desc: "مستند الضمان مع تتبع دورة الحياة",
              type: "financial",
            },
            {
              name: "STIDailySnapshot",
              desc: "تجميعات يومية غير قابلة للتعديل لكشف الانحراف",
              type: "audit",
            },
          ],
          relationships: [
            {
              from: "Product",
              to: "InventoryLog",
              label: "دفعات FIFO",
              cardinality: "1 → N",
            },
            {
              from: "Product",
              to: "Sale",
              label: "يُباع عبر",
              cardinality: "1 → N",
            },
            {
              from: "Sale",
              to: "SalesTransactionItem",
              label: "كتابة مزدوجة",
              cardinality: "1 → 1",
            },
            {
              from: "Order",
              to: "SalesTransactionItem",
              label: "لكل عنصر",
              cardinality: "1 → N",
            },
            {
              from: "Sale",
              to: "Invoice",
              label: "يُنشئ",
              cardinality: "1 → 0..1",
            },
            {
              from: "Invoice",
              to: "Guarantee",
              label: "ضمان",
              cardinality: "1 → 0..1",
            },
          ],
          archTitle: "الهندسة المعمارية الأساسية",
          archBlocks: [
            {
              title: "محرك تكلفة FIFO",
              why: "يضمن حساب أرباح دقيق لكل وحدة مباعة",
              impact:
                "كل وحدة مباعة تحمل تكلفة شرائها الحقيقية — هوامش الربح لا تُقدّر أبداً",
              points: [
                "كل إدخال InventoryLog = دفعة واحدة مع remainingQty و purchasePrice",
                "عند البيع: الدفعات الأقدم تُستهلك أولاً (sort: createdAt ASC)",
                "حارس ذري: فحص $gte على remainingQty يمنع التضاربات المتزامنة",
                "لا بديل — استنفاد FIFO يرفض البيع بشكل قاطع",
              ],
            },
            {
              title: "نمط الكتابة المزدوجة",
              why: "يفصل حالة سير العمل عن الحقيقة المالية",
              impact:
                "التحليلات والتقارير لا تتلوث أبداً بتغييرات سير العمل أو تحديثات الواجهة",
              points: [
                "Sale/Order = مستندات سير العمل لواجهة المستخدم وتتبع العملية",
                "SalesTransactionItem = الحقيقة المالية القانونية للتحليلات",
                "حقول STI المالية غير قابلة للتعديل — التصحيحات تتطلب إلغاء + إعادة بيع",
                "أعلام الميزات تتحكم في الانتقال من إحصائيات Sale إلى STI",
              ],
            },
            {
              title: "التحقق على 3 طبقات",
              why: "لا بيانات غير صالحة تصل إلى قاعدة البيانات — أبداً",
              impact:
                "صفر سجلات تالفة في الإنتاج — كل إدخال يمر ب 3 نقاط تحقق مستقلة",
              points: [
                "الطبقة 1: مخططات Zod عند حدود API (14 ملف تحقق)",
                "الطبقة 2: قواعد عمل على مستوى الخدمة (مخزون، تسعير، علاقات)",
                "الطبقة 3: قيود مخططات Mongoose (required, min/max, enum, unique)",
              ],
            },
            {
              title: "هندسة اللقطات",
              why: "السجلات السابقة تبقى دقيقة بغض النظر عن التغييرات المستقبلية",
              impact:
                "فاتورة من 6 أشهر لا تزال تعرض اسم المنتج والسعر والعلامة التجارية بالضبط وقت البيع",
              points: [
                "كل عملية بيع تلتقط لقطة زمنية للمنتج",
                "عناصر الفاتورة والضمان مدمجة بالكامل — غير قابلة للتعديل بعد الإنشاء",
                "دقة تاريخية: تغييرات المنتج لا تؤثر على السجلات السابقة",
              ],
            },
          ],
          flowTitle: "تدفق تنفيذ البيع",
          flowSteps: [
            {
              step: "التحقق من المدخلات",
              desc: "productId, quantity, sellingPrice, cashierId — Zod + قواعد العمل",
            },
            {
              step: "حساب TVA",
              desc: "tvaAmount = priceHT × tvaRate, priceTTC = priceHT × (1 + tvaRate)",
            },
            {
              step: "بدء معاملة MongoDB",
              desc: "جميع العمليات التالية ذرية — تأكيد أو تراجع",
            },
            {
              step: "فحص المخزون (مؤقت + FIFO)",
              desc: "Product.stock (إسقاط مؤقت) ≥ qty، ثم فحص موثوق: aggregate(InventoryLog.remainingQty) ≥ qty",
            },
            {
              step: "استهلاك دفعات FIFO",
              desc: "حلقة الأقدم → إنقاص remainingQty → تجميع التكلفة مع حارس $gte",
            },
            {
              step: "إنشاء Sale + STI",
              desc: "كتابة مزدوجة: Sale (سير العمل) + SalesTransactionItem (الحقيقة المالية)",
            },
            {
              step: "إنقاص Product.stock",
              desc: "adjustStock(-qty) يحدّث الإسقاط المؤقت — دفعات FIFO تبقى مصدر الحقيقة",
            },
            {
              step: "تأكيد المعاملة",
              desc: "الكل أو لا شيء — أي فشل يتراجع عن كل العمليات",
            },
          ],
          guaranteesTitle: "ضمانات النظام",
          guarantees: [
            {
              title: "لا بيع زائد",
              desc: "دفاع 3 طبقات: مخزون مؤقت → تجميع FIFO → حارس دفعة ذري ($gte). التضاربات المتزامنة ترجع 409.",
              category: "data",
            },
            {
              title: "حالة متسقة",
              desc: "الإلغاء يحدّث ذرياً Sale + STI + Invoice + Guarantee + استعادة FIFO في معاملة واحدة.",
              category: "data",
            },
            {
              title: "حساب أرباح دقيق",
              desc: "التكلفة تأتي من دفعات FIFO (ليس مستوى المنتج). كل وحدة مباعة تحمل سعر شرائها الدقيق.",
              category: "financial",
            },
            {
              title: "سجلات مالية غير قابلة للتعديل",
              desc: "حقول STI المالية واللقطات اليومية لا يمكن تعديلها. التصحيحات تنشئ سجلات جديدة.",
              category: "financial",
            },
            {
              title: "أمان المعاملات",
              desc: "كل عملية حرجة تستخدم معاملات MongoDB. الحالة الجزئية مستحيلة — تأكيد أو تراجع كامل.",
              category: "transaction",
            },
            {
              title: "دقة تاريخية",
              desc: "لقطات زمنية على كل عملية بيع. تغييرات المنتج لا تؤثر بأثر رجعي على الفواتير أو التقارير.",
              category: "transaction",
            },
          ],
          codeTitle: "تدفق البيانات",
          codeSnippets: [
            {
              label: "حقيقة المخزون — SSOT",
              lines: [
                "InventoryLog.remainingQty  ←  SINGLE SOURCE OF TRUTH",
                "Product.stock = Σ(InventoryLog.remainingQty)  // cached",
                "Sale → FIFO consumption (oldest batch first)",
                "Cancel → FIFO restoration (new entry at original cost)",
              ],
            },
            {
              label: "خريطة العلاقات",
              lines: [
                "Product (1) ────── (N) InventoryLog",
                "Sale (1) ────────── (1) SalesTransactionItem",
                "Order (1) ───────── (N) SalesTransactionItem",
                "Invoice (1) ─────── (0..1) Guarantee",
              ],
            },
            {
              label: "حدود المعاملة — الذرية",
              lines: [
                "session = mongoose.startSession()",
                "session.startTransaction()",
                "  ... all ops with { session } ...",
                "session.commitTransaction() || abortTransaction()",
              ],
            },
          ],
          flowNote:
            "جميع العمليات بين الخطوات 3–8 تُنفذ ضمن معاملة MongoDB واحدة. أي فشل يؤدي إلى تراجع كامل.",
          tradeoffsTitle: "المقايضات",
          tradeoffs: [
            {
              chose: "FIFO costing",
              over: "Average cost pricing",
              reason:
                "ربح دقيق لكل وحدة — حاسم لمتجر تتقلب فيه أسعار الشراء بين الدفعات",
            },
            {
              chose: "Dual-write (Sale + STI)",
              over: "Single document",
              reason:
                "يفصل حالة سير العمل القابلة للتعديل عن الحقيقة المالية غير القابلة للتعديل — التحليلات تبقى نظيفة",
            },
            {
              chose: "Embedded snapshots",
              over: "Reference-only lookups",
              reason:
                "دقة تاريخية بدون join queries — الفواتير القديمة لا تتغير أبداً عند تحديث المنتجات",
            },
            {
              chose: "Cached stock on Product",
              over: "Live aggregation only",
              reason:
                "قراءات سريعة للواجهة/POS — تجميع FIFO يبقى المرجع لكل عمليات الكتابة",
            },
          ],
          principlesTitle: "مبادئ النظام",
          principles: [
            "مصدر حقيقة واحد — InventoryLog.remainingQty يملك واقع المخزون؛ Product.stock إسقاط مؤقت",
            "سجلات مالية غير قابلة للتعديل — SalesTransactionItem لا يمكن تحريره؛ التصحيحات تنشئ سجلات جديدة",
            "دقة تاريخية بالقطات — كل عملية بيع تجمّد حالة المنتج عند نقطة المعاملة",
            "عمليات ذرية — لا حالة جزئية ممكنة؛ كل تدفق حرج مغلف بمعاملة MongoDB",
          ],
        },
      },
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
