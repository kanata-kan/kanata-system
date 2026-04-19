import type { ProjectContent } from "../../types";

export const elmoussaaifBrand: ProjectContent = {
  n: "02",
  slug: "elmoussaaif-brand",
  year: "2025",
  name: "Elmoussaaif Abdelghafour Brand",
  type: "Projet Client — Production",
  color: "#8B5CF6",
  status: "En production",
  statusColor: "#3FB950",
  link: "/work/elmoussaaif-brand",
  desc: "Un client avait besoin d'un site de marque personnelle professionnel avec gestion de contenu complète, support multilingue, et un design soigné reflétant son identité.",
  longDesc:
    "J'ai conçu et construit la plateforme entière — du schéma base de données et authentification au CMS, SEO, et déploiement — livrée en production.",
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
    "Construit un CMS complet avec tri drag-and-drop, optimisation d'images via Cloudinary + Sharp, et tableau de bord admin protégé",
    "Implémenté authentification JWT + bcrypt avec contrôle d'accès basé sur les rôles pour les routes admin",
    "Livré gestion de contenu multilingue et métadonnées SEO structurées pour la visibilité",
    "Conçu une UI responsive avec animations Framer Motion et Tailwind CSS 4",
  ],
  caseStudy: {
    headline:
      "Construire une plateforme de marque multilingue de zéro présence digitale à la production",
    subtitle:
      "Ce case study montre comment j'ai accompagné un client de messages WhatsApp éparpillés et zéro visibilité en ligne vers une plateforme multilingue professionnelle et autogérée — en production sur elmoussaif.com.",
    tags: [
      "Livraison Client",
      "Multilingue (4 locales)",
      "CMS & Admin",
      "Production",
    ],
    problem: [
      "Le client opérait un service de transport privé réussi mais n'avait aucune présence digitale",
      "Toutes les réservations passaient par des messages WhatsApp éparpillés et le bouche-à-oreille",
      "Aucun outil de crédibilité — les partenaires B2B potentiels (riads, villas, hôtels) ne pouvaient pas évaluer le service",
      "Photos, tarifs et descriptions de services éparpillés dans les applications de messagerie sans propriété de contenu",
      "Les clients et partenaires opèrent en 4 langues (EN, FR, ES, AR) — aucun support multilingue n'existait",
      "Le client devait gérer le contenu de manière indépendante avec zéro connaissance technique",
    ],
    impact: [
      "Aucune découvrabilité en ligne — l'entreprise était invisible pour les clients internationaux potentiels",
      "Les partenariats B2B étaient plus difficiles à établir sans interface professionnelle",
      "Le contenu était perdu ou dupliqué entre les plateformes de messagerie",
      "Aucune présence SEO signifiait zéro trafic organique des moteurs de recherche",
      "Chaque mise à jour de contenu nécessitait l'intervention d'un développeur",
    ],
    decisions: [
      "Server Components par défaut — composants client uniquement là où l'interactivité l'exige (formulaires, animations, drag-and-drop)",
      "Server Actions pour toutes les mutations — pas de couche API REST séparée nécessaire",
      "Connexion MongoDB singleton pour éviter l'épuisement du pool en environnement serverless",
      "Système de design tokens HSL avec propriétés CSS custom pour variantes de thème (light, dark, luxury)",
      "Séparation stricte des préoccupations — pas de logique base de données dans les composants ; accès données via modules server-only",
      "Architecture de routage 4 locales avec contenu culturellement adapté (pas de traductions littérales)",
      "Support RTL complet pour l'arabe avec stack de polices dédiée (Noto Sans Arabic)",
    ],
    architecture: [
      "Next.js App Router avec SSR/SSG pour les pages publiques et Server Actions pour le dashboard admin",
      "Couche /lib partagée pour db, auth, i18n, validateurs, SEO, email, et intégration Cloudinary",
      "MongoDB Atlas pour les données, Cloudinary pour CDN image avec transforms, Resend pour email transactionnel",
      "Modèles de données modulaires : Settings, HomePage, AboutPage, ServicePage, Fleet, Tour, ContactMessage, Admin",
      "Tous les modèles de contenu supportent des champs localisés 4 langues stockés comme objets imbriqués en MongoDB",
    ],
    results: [
      "Le client est passé de zéro visibilité en ligne à une plateforme multilingue professionnelle (0 → 1)",
      "Couverture 4 langues servant l'ensemble du marché touristique de Marrakech (EN, FR, ES, AR)",
      "Admin self-service — le client gère tout le contenu de manière indépendante sans intervention développeur",
      "Les partenaires B2B (riads, villas, hôtels) peuvent maintenant évaluer les services via une interface professionnelle",
      "Infrastructure SEO en place : données structurées (JSON-LD), métadonnées par locale, HTML sémantique, assets optimisés",
    ],
    screenshots: [],
    cta: "La valeur n'était pas un plus beau site web. C'était donner à une vraie entreprise l'infrastructure digitale pour croître au-delà du bouche-à-oreille.",
  },
};
