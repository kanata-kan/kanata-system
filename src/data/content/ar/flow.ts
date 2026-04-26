import type { FlowContent } from "../types";

export const flow: FlowContent = {
  intro: {
    headline:
      "أغلب الناس كيجيو بطلب واضح…\nولكن غالبًا هاد الطلب ماشي هو المشكل الحقيقي.",
    subtext: "كنبدأ بالفهم قبل التنفيذ.",
    cta: "نبدا ←",
  },
  goal: {
    question: "شنو الهدف الحقيقي من هاد المشروع؟",
    options: [
      "نزيد المبيعات",
      "نحسن تجربة المستخدم",
      "نبني presence ديالي",
      "مازال ما واضحش",
    ],
    error: "اختار الهدف باش نكملو",
  },
  problem: {
    question: "فين كتحس كاين المشكل دابا؟",
    placeholder: "وصف المشكل اللي كتواجه...",
    error: "هاد السؤال ضروري باش نفهم الوضعية",
  },
  attempts: {
    question: "شنو جربتي تدير قبل باش تحل هاد المشكل؟",
    placeholder: "إلا جربتي شي حاجة قبل، قولها لنا هنا...",
    optionalLabel: "اختياري",
  },
  timing: {
    question: "علاش دابا بالضبط؟",
    options: ["محتاج حل عاجل", "كنفكر من مدة", "فرصة جديدة"],
    error: "اختار التوقيت باش نكملو",
  },
  filter: {
    headline: "ما كنخدمش مع أي واحد.",
    subtext: "كنخدم مع الناس اللي باغيين يفهمو قبل ما يطلبو.",
    cta: "كمل ←",
  },
  submit: {
    title: "ملخص الطلب ديالك",
    labels: {
      goal: "الهدف",
      problem: "المشكل",
      attempts: "المحاولات السابقة",
      timing: "التوقيت",
    },
    submitCta: "إرسال عبر WhatsApp",
    successTitle: "تم إرسال الطلب عبر WhatsApp",
    successSubtext: "غادي نراجع الطلب ديالك ونرد عليك في أقرب وقت.",
    backHome: "← الرجوع للصفحة الرئيسية",
    whatsappGreeting: "مرحبا عبدالإله 👋",
    whatsappIntro: "عمرت الاستمارة ديال الموقع وهادي هي المعلومات:",
    whatsappClosing: "متشوق نتناقش معك 🤝",
  },
  nav: {
    next: "التالي →",
    back: "← رجوع",
    stepOf: (c, t) => `الخطوة ${c} / ${t}`,
  },
  footer: "AW | استقبال العملاء",
};
