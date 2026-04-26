import type { FlowContent } from "../types";

export const flow: FlowContent = {
  intro: {
    headline:
      "La plupart des gens arrivent avec une demande claire…\nmais souvent cette demande n'est pas le vrai problème.",
    subtext: "Je commence par comprendre avant d'exécuter.",
    cta: "Commençons →",
  },
  goal: {
    question: "Quel est le vrai objectif de ce projet ?",
    options: [
      "Augmenter les ventes",
      "Améliorer l'expérience utilisateur",
      "Construire ma présence en ligne",
      "Pas encore clair",
    ],
    error: "Choisissez un objectif pour continuer",
  },
  problem: {
    question: "Où ressentez-vous le problème actuellement ?",
    placeholder: "Décrivez le problème que vous rencontrez…",
    error: "Cette question est nécessaire pour comprendre votre situation",
  },
  attempts: {
    question: "Qu'avez-vous déjà essayé pour résoudre ce problème ?",
    placeholder: "Si vous avez déjà tenté quelque chose, dites-le ici…",
    optionalLabel: "FACULTATIF",
  },
  timing: {
    question: "Pourquoi maintenant, précisément ?",
    options: ["J'ai besoin d'une solution urgente", "J'y réfléchis depuis un moment", "Nouvelle opportunité"],
    error: "Sélectionnez un timing pour continuer",
  },
  filter: {
    headline: "Je ne travaille pas avec tout le monde.",
    subtext: "Je travaille avec ceux qui veulent comprendre avant de demander.",
    cta: "Continuer →",
  },
  submit: {
    title: "Résumé de votre demande",
    labels: {
      goal: "Objectif",
      problem: "Problème",
      attempts: "Tentatives précédentes",
      timing: "Timing",
    },
    submitCta: "Envoyer via WhatsApp",
    successTitle: "Demande envoyée via WhatsApp",
    successSubtext: "Je vais examiner votre demande et vous recontacter rapidement.",
    backHome: "← Retour à l'accueil",
    whatsappGreeting: "Bonjour Abdelilah 👋",
    whatsappIntro: "J'ai rempli le formulaire sur votre site. Voici les détails :",
    whatsappClosing: "Au plaisir d'en discuter 🤝",
  },
  nav: {
    next: "Suivant →",
    back: "← Retour",
    stepOf: (c, t) => `ÉTAPE ${c} / ${t}`,
  },
  footer: "AW | PRISE DE CONTACT",
};
