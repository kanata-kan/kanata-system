import type { ProjectContent } from "../../types";

export const elmoussaaifBrand: ProjectContent = {
  n: "02",
  slug: "elmoussaaif-brand",
  year: "2025",

  // 🔥 SEO NAME
  name: "Plateforme web multilingue avec CMS",

  type: "Projet Client — Production",
  color: "#8B5CF6",

  status: "En production",
  statusColor: "#3FB950",

  link: "/work/elmoussaaif-brand",
  liveUrl: "https://elmoussaif.com",

  // 🔥 HOOK
  desc: "Cette entreprise de transport fonctionnait uniquement via WhatsApp et le bouche-à-oreille, sans aucune présence en ligne. Cette plateforme a introduit un site professionnel multilingue avec un système de gestion de contenu autonome.",

  // 🔥 VALUE
  longDesc:
    "J'ai conçu et développé une plateforme digitale complète incluant un site web, un CMS et un système d'administration. L'objectif était de transformer une activité offline en présence en ligne structurée, avec un contrôle total sur le contenu et l'évolution du service.",

  stack: {
    core: ["Next.js 16", "React 19", "TypeScript"],
    backend: ["MongoDB", "Mongoose", "Zod", "JWT Auth", "bcrypt"],
    features: [
      "Cloudinary (CDN Image)",
      "Sharp (Optimisation)",
      "DnD Kit (Drag & Drop)",
      "Resend (Email)",
    ],
    system: ["Tailwind CSS 4", "Framer Motion"],
    testing: [],
  },

  highlights: [
    "Création d'un CMS permettant au client de gérer son contenu sans dépendre d'un développeur",
    "Mise en place d'un système multilingue couvrant 4 langues",
    "Implémentation d'un système d'authentification sécurisé avec gestion des rôles",
    "Interface moderne et responsive adaptée à l'identité du service",
  ],

  caseStudy: {
    // 🔥 STRONG STORY
    headline:
      "D'une activité basée sur WhatsApp à une plateforme digitale complète",

    subtitle:
      "Comment j'ai transformé un service de transport sans présence en ligne en une plateforme multilingue professionnelle, entièrement gérée par le client.",

    tags: [
      "Livraison Client",
      "Multilingue (4 locales)",
      "CMS & Admin",
      "Production",
    ],

    problem: [
      "Aucune présence en ligne malgré une activité existante",
      "Toutes les réservations passaient par WhatsApp",
      "Aucun moyen de présenter les services ou inspirer confiance",
      "Contenu (photos, prix, services) dispersé et difficile à gérer",
      "Absence de support multilingue pour des clients internationaux",
      "Le client ne pouvait pas gérer son contenu de manière autonome",
    ],

    impact: [
      "Invisibilité totale sur les moteurs de recherche",
      "Difficulté à établir des partenariats professionnels",
      "Perte ou duplication du contenu",
      "Zéro trafic organique",
      "Dépendance constante au développeur pour chaque modification",
    ],

    decisions: [
      "Construire un CMS simple et accessible pour un utilisateur non technique",
      "Supporter plusieurs langues dès le départ",
      "Séparer clairement la logique métier de l'interface",
      "Créer une base solide pour évoluer avec le business",
    ],

    architecture: [
      "Next.js App Router avec pages optimisées pour SEO",
      "Server Actions pour gérer les opérations côté serveur",
      "MongoDB pour une gestion flexible du contenu",
      "Cloudinary pour la gestion et l'optimisation des images",
      "Structure de données supportant le multilingue",
    ],

    results: [
      "Passage de zéro présence digitale à une plateforme professionnelle",
      "Accès à des clients internationaux grâce au multilingue",
      "Autonomie complète du client dans la gestion du contenu",
      "Amélioration de la crédibilité auprès des partenaires",
      "Base solide pour le référencement et la croissance future",
    ],

    screenshots: [],

    cta: "La valeur n'était pas seulement dans le site, mais dans la capacité du business à exister et évoluer en ligne.",
  },
};
