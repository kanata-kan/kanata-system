import type { Locale } from "@/data/content/types";

type CaseStudyMetaInput = {
  name: string;
  subtitle?: string;
  desc: string;
};

const CASE_STUDY_COPY = {
  en: {
    hero: {
      back: "Back",
      liveSite: "Live Site",
      sourceCode: "Source Code",
      quickHighlights: "Quick Highlights",
      stats: {
        problems: "Problems",
        decisions: "Decisions",
        results: "Results",
      },
    },
    sections: {
      context: {
        label: "Context",
        heading: "Start with the situation before the implementation",
        sub: (count: number) =>
          `${count} signals frame the real scope before the solution appears`,
      },
      problem: {
        label: "Problem",
        heading: "What needed to change",
        sub: (count: number) =>
          `${count} friction points identified before moving into execution`,
      },
      impact: {
        label: "Impact",
        heading: "Why it mattered to the business",
        sub: (count: number) =>
          `${count} business consequences made the problem impossible to ignore`,
      },
      solution: {
        label: "Solution",
        heading: "Move from diagnosis into deliberate decisions",
        sub: (count: number) =>
          `${count} trade-offs explain how the solution took shape`,
      },
      decisions: {
        label: "Decisions",
        heading: "Why these choices held up",
        sub: "A focused view of the structural decisions that shaped the final system.",
      },
      system: {
        label: "System",
        heading: "Keep the architecture readable at a glance",
        sub: "A shorter systems view up front, with deeper engineering details available later.",
      },
      architecture: {
        label: "Architecture",
        heading: "How the core pieces fit together",
        sub: (count: number) =>
          `${count} structural patterns describe the blueprint without dropping into full technical depth`,
      },
      results: {
        label: "Results",
        heading: "What changed after shipping",
        sub: (count: number) =>
          `${count} measurable improvements surface the outcome without forcing a deep read`,
        summaryHeading: "What improved after launch",
        summarySub:
          "A concise outcome layer first, with the full set available on demand.",
      },
      toggleMore: "Show more",
      toggleLess: "Show less",
    },
    cta: {
      eyebrow: "What's next?",
      nextProject: (name: string) => `Next Project: ${name}`,
      backHome: "Back to Homepage",
      startConversation: "Start a Conversation",
    },
    page: {
      technicalEyebrow: "Technical Deep Dive",
      technicalBody:
        "Detailed architecture, guarantees, and code paths stay available for engineers without overwhelming the main story.",
      viewTechnical: "View Technical Details",
      hideTechnical: "Hide Technical Details",
    },
    technical: {
      label: "Engineering",
      dataModel: "Data Model",
      architecture: "Architecture",
      executionFlow: "Execution Flow",
      note: "Note",
      guarantees: "Guarantees",
      dataIntegrity: "Data Integrity",
      financialAccuracy: "Financial Accuracy",
      transactionSafety: "Transaction Safety",
      dataFlow: "Data Flow",
      relationships: "Relationships",
      tradeoffs: "Tradeoffs",
      over: "over",
      types: {
        core: "Core",
        transaction: "Transaction",
        financial: "Financial",
        audit: "Audit",
      },
    },
    screenshot: {
      clickToExpand: "Click to Expand",
    },
    meta: {
      fallbackTitle: "Case Study",
      title: (name: string) => `How I Built ${name} - A Real System Case Study`,
      description: ({ name, subtitle, desc }: CaseStudyMetaInput) =>
        `Case study: ${name}. ${subtitle || desc}. Built to solve real operational problems.`,
    },
  },
  fr: {
    hero: {
      back: "Retour",
      liveSite: "Site Live",
      sourceCode: "Code Source",
      quickHighlights: "Points Cles",
      stats: {
        problems: "Problemes",
        decisions: "Decisions",
        results: "Resultats",
      },
    },
    sections: {
      context: {
        label: "Contexte",
        heading: "Commencer par la situation avant l'implementation",
        sub: (count: number) =>
          `${count} signaux cadrent l'ampleur reelle avant d'arriver a la solution`,
      },
      problem: {
        label: "Probleme",
        heading: "Ce qui devait changer",
        sub: (count: number) =>
          `${count} points de friction identifies avant l'execution`,
      },
      impact: {
        label: "Impact",
        heading: "Pourquoi c'etait important pour le business",
        sub: (count: number) =>
          `${count} consequences business ont rendu le probleme impossible a ignorer`,
      },
      solution: {
        label: "Solution",
        heading: "Passer du diagnostic a des decisions assumees",
        sub: (count: number) =>
          `${count} arbitrages expliquent comment la solution a pris forme`,
      },
      decisions: {
        label: "Decisions",
        heading: "Pourquoi ces choix tenaient la route",
        sub: "Une vue concentree des decisions structurelles qui ont faconne le systeme final.",
      },
      system: {
        label: "Systeme",
        heading: "Garder l'architecture lisible au premier regard",
        sub: "Une vue systeme plus courte d'abord, avec les details d'ingenierie plus loin.",
      },
      architecture: {
        label: "Architecture",
        heading: "Comment les pieces principales s'assemblent",
        sub: (count: number) =>
          `${count} choix structurels decrivent le blueprint sans plonger tout de suite dans tout le detail technique`,
      },
      results: {
        label: "Resultats",
        heading: "Ce qui a change apres la mise en ligne",
        sub: (count: number) =>
          `${count} ameliorations mesurables montrent l'impact sans forcer une lecture profonde`,
        summaryHeading: "Ce qui s'est ameliore apres le lancement",
        summarySub:
          "Une couche de resultat concise d'abord, avec le reste disponible a la demande.",
      },
      toggleMore: "Voir plus",
      toggleLess: "Voir moins",
    },
    cta: {
      eyebrow: "Et ensuite ?",
      nextProject: (name: string) => `Projet Suivant : ${name}`,
      backHome: "Retour a l'accueil",
      startConversation: "Demarrer une conversation",
    },
    page: {
      technicalEyebrow: "Approfondissement Technique",
      technicalBody:
        "L'architecture detaillee, les garanties et les parcours de code restent disponibles pour les profils techniques sans alourdir l'histoire principale.",
      viewTechnical: "Voir les details techniques",
      hideTechnical: "Masquer les details techniques",
    },
    technical: {
      label: "Ingenierie",
      dataModel: "Modele de Donnees",
      architecture: "Architecture",
      executionFlow: "Flux d'Execution",
      note: "Note",
      guarantees: "Garanties",
      dataIntegrity: "Integrite des Donnees",
      financialAccuracy: "Precision Financiere",
      transactionSafety: "Securite Transactionnelle",
      dataFlow: "Flux de Donnees",
      relationships: "Relations",
      tradeoffs: "Arbitrages",
      over: "plutot que",
      types: {
        core: "Noyau",
        transaction: "Transaction",
        financial: "Finance",
        audit: "Audit",
      },
    },
    screenshot: {
      clickToExpand: "Cliquer pour agrandir",
    },
    meta: {
      fallbackTitle: "Etude de Cas",
      title: (name: string) => `Comment j'ai construit ${name} - Une etude de cas systeme`,
      description: ({ name, subtitle, desc }: CaseStudyMetaInput) =>
        `Etude de cas : ${name}. ${subtitle || desc}. Concu pour resoudre de vrais problemes operationnels.`,
    },
  },
  ar: {
    hero: {
      back: "رجوع",
      liveSite: "الموقع المباشر",
      sourceCode: "الكود المصدري",
      quickHighlights: "خلاصة سريعة",
      stats: {
        problems: "مشاكل",
        decisions: "قرارات",
        results: "نتائج",
      },
    },
    sections: {
      context: {
        label: "السياق",
        heading: "ابدأ بالصورة قبل التنفيذ",
        sub: (count: number) =>
          `${count} إشارات توضّح حجم المشكلة الحقيقي قبل الوصول إلى الحل`,
      },
      problem: {
        label: "المشكلة",
        heading: "ما الذي كان يحتاج إلى تغيير",
        sub: (count: number) =>
          `${count} نقاط احتكاك ظهرت قبل الدخول في التنفيذ`,
      },
      impact: {
        label: "الأثر",
        heading: "لماذا كان هذا مهما على مستوى العمل",
        sub: (count: number) =>
          `${count} نتائج تشغيلية وتجارية جعلت المشكلة واضحة ولا يمكن تجاهلها`,
      },
      solution: {
        label: "الحل",
        heading: "من التشخيص إلى قرارات واضحة",
        sub: (count: number) =>
          `${count} قرارات مدروسة تشرح كيف تشكّل الحل`,
      },
      decisions: {
        label: "القرارات",
        heading: "لماذا نجحت هذه الخيارات",
        sub: "عرض مركز للقرارات الهيكلية التي شكّلت النظام النهائي.",
      },
      system: {
        label: "النظام",
        heading: "اجعل الهيكلة واضحة من النظرة الأولى",
        sub: "نظرة مختصرة على النظام أولا، مع إبقاء العمق الهندسي متاحا لاحقا.",
      },
      architecture: {
        label: "المعمارية",
        heading: "كيف ترتبط الأجزاء الأساسية",
        sub: (count: number) =>
          `${count} أنماط هيكلية تشرح المخطط العام بدون الغرق مباشرة في كل التفاصيل التقنية`,
      },
      results: {
        label: "النتائج",
        heading: "ما الذي تغيّر بعد الإطلاق",
        sub: (count: number) =>
          `${count} نتائج قابلة للقياس توضّح الأثر بدون فرض قراءة تقنية عميقة`,
        summaryHeading: "ما الذي تحسّن بعد الإطلاق",
        summarySub:
          "طبقة مختصرة من النتائج أولا، مع إبقاء الباقي متاحا عند الطلب.",
      },
      toggleMore: "إظهار المزيد",
      toggleLess: "إظهار أقل",
    },
    cta: {
      eyebrow: "ما التالي؟",
      nextProject: (name: string) => `المشروع التالي: ${name}`,
      backHome: "العودة إلى الرئيسية",
      startConversation: "ابدأ محادثة",
    },
    page: {
      technicalEyebrow: "التفاصيل التقنية",
      technicalBody:
        "التفاصيل المعمارية والضمانات ومسارات الكود تبقى متاحة للمهندسين بدون أن تثقل القصة الرئيسية.",
      viewTechnical: "عرض التفاصيل التقنية",
      hideTechnical: "إخفاء التفاصيل التقنية",
    },
    technical: {
      label: "الهندسة",
      dataModel: "نموذج البيانات",
      architecture: "المعمارية",
      executionFlow: "سير التنفيذ",
      note: "ملاحظة",
      guarantees: "الضمانات",
      dataIntegrity: "سلامة البيانات",
      financialAccuracy: "الدقة المالية",
      transactionSafety: "سلامة المعاملات",
      dataFlow: "تدفق البيانات",
      relationships: "العلاقات",
      tradeoffs: "المقايضات",
      over: "بدلا من",
      types: {
        core: "أساسي",
        transaction: "معاملة",
        financial: "مالي",
        audit: "تدقيق",
      },
    },
    screenshot: {
      clickToExpand: "اضغط للتكبير",
    },
    meta: {
      fallbackTitle: "دراسة حالة",
      title: (name: string) => `كيف بنيت ${name} - دراسة حالة لنظام حقيقي`,
      description: ({ name, subtitle, desc }: CaseStudyMetaInput) =>
        `دراسة حالة: ${name}. ${subtitle || desc}. نظام بُني لحل مشاكل تشغيلية حقيقية.`,
    },
  },
} as const;

export function getCaseStudyCopy(locale: Locale) {
  return CASE_STUDY_COPY[locale] ?? CASE_STUDY_COPY.en;
}
