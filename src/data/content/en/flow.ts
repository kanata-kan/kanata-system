import type { FlowContent } from "../types";

export const flow: FlowContent = {
  intro: {
    headline:
      "Most people come with a clear request…\nbut often that request isn't the real problem.",
    subtext: "I start by understanding before executing.",
    cta: "Let's begin →",
  },
  goal: {
    question: "What's the real goal of this project?",
    options: [
      "Increase sales",
      "Improve user experience",
      "Build my online presence",
      "Not sure yet",
    ],
    error: "Pick a goal to continue",
  },
  problem: {
    question: "Where do you feel the problem is right now?",
    placeholder: "Describe the problem you're facing…",
    error: "This question is required to understand your situation",
  },
  attempts: {
    question: "What have you tried before to solve this?",
    placeholder: "If you've tried something before, tell us here…",
    optionalLabel: "OPTIONAL",
  },
  timing: {
    question: "Why now, specifically?",
    options: ["I need an urgent solution", "Been thinking about it", "New opportunity"],
    error: "Select a timing to continue",
  },
  filter: {
    headline: "I don't work with everyone.",
    subtext: "I work with people who want to understand before they ask.",
    cta: "Continue →",
  },
  submit: {
    title: "Your request summary",
    labels: {
      goal: "Goal",
      problem: "Problem",
      attempts: "Previous attempts",
      timing: "Timing",
    },
    submitCta: "Send via WhatsApp",
    successTitle: "Request sent via WhatsApp",
    successSubtext: "I'll review your request and get back to you shortly.",
    backHome: "← Back to homepage",
    whatsappGreeting: "Hello Abdelilah 👋",
    whatsappIntro: "I filled out the intake form on your site. Here are the details:",
    whatsappClosing: "Looking forward to discussing 🤝",
  },
  nav: {
    next: "Next →",
    back: "← Back",
    stepOf: (c, t) => `STEP ${c} / ${t}`,
  },
  footer: "AW | CLIENT INTAKE",
};
