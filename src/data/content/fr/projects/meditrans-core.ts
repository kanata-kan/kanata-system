import type { ProjectContent } from "../../types";

export const meditransCore: ProjectContent = {
  n: "03",
  slug: "meditrans-core",
  year: "2025",

  // 🔥 SEO NAME
  name: "Plateforme SaaS pour la gestion du transport médical",

  type: "Plateforme SaaS — En Développement",
  color: "#10B981",

  status: "Phase 1 terminée",
  statusColor: "#F59E0B",

  link: "/work/meditrans-core",
  repoUrl: "https://github.com/kanata-kan/meditrans-core",

  // 🔥 HOOK
  desc: "Les entreprises de transport médical utilisent encore des tableurs et des processus manuels pour gérer leurs opérations. Cette plateforme centralise la planification, la tarification et la facturation dans un système unique et fiable.",

  // 🔥 VALUE
  longDesc:
    "Je développe une plateforme SaaS modulaire pour gérer les opérations de transport médical — de la planification à la facturation — avec une logique claire, testée et traçable. L'objectif est de réduire les erreurs et d'apporter un contrôle total sur les opérations.",

  stack: {
    core: ["Next.js 14", "TypeScript (strict)"],
    backend: ["PostgreSQL", "Prisma 5", "Zod", "NextAuth"],
    features: [
      "Moteur de Tarification 7 Étapes",
      "Snapshots Immuables",
      "Modules par Domaine",
      "@react-pdf/renderer",
    ],
    system: ["Tailwind CSS", "Recharts", "Vercel"],
    testing: ["Vitest", "@vitest/coverage-v8"],
  },

  highlights: [
    "Moteur de tarification en 7 étapes, clair et traçable",
    "Snapshots immuables pour garantir la cohérence financière",
    "Couverture de tests dès le début pour sécuriser la logique métier",
    "Architecture modulaire pensée pour évoluer sans casser le système",
  ],

  caseStudy: {
    // 🔥 STRONG STORY
    headline:
      "Construire une plateforme SaaS pour des opérations médicales complexes",

    subtitle:
      "Comment j'ai conçu un système qui regroupe la planification, la tarification et la facturation dans une plateforme fiable, avec une logique testée et contrôlée.",

    tags: [
      "Architecture SaaS",
      "Système Médical",
      "Moteur de Tarification",
      "Test-Driven",
    ],

    problem: [
      "Les opérations sont gérées via Excel et des processus manuels",
      "Aucun système centralisé pour coordonner les services",
      "La tarification est complexe et difficile à calculer manuellement",
      "La facturation et les paiements sont sources d'erreurs",
      "Aucun suivi fiable ni audit des opérations",
    ],

    impact: [
      "Erreurs fréquentes dans les prix et les factures",
      "Perte de revenus due à un suivi insuffisant",
      "Manque de visibilité sur les performances",
      "Risque élevé sur des données sensibles",
      "Fatigue opérationnelle liée aux tâches répétitives",
    ],

    decisions: [
      "Construire une architecture modulaire avec des frontières claires",
      "Créer un moteur de tarification explicite et non implicite",
      "Utiliser Server Actions pour simplifier la logique backend",
      "Mettre en place un système de rôles pour sécuriser les opérations",
      "Penser le système pour évoluer dès le départ",
    ],

    architecture: [
      "Organisation du système en modules métier indépendants",
      "Moteur de tarification basé sur des étapes explicites",
      "Stockage des données avec historique préservé",
      "PostgreSQL pour garantir la cohérence des relations",
    ],

    results: [
      "Réduction des erreurs de tarification",
      "Meilleure fiabilité des factures",
      "Base solide pour évoluer vers la production",
      "Système plus clair et contrôlable",
    ],

    screenshots: [],

    cta: "La vraie valeur n'est pas le nombre de fonctionnalités, mais la fiabilité du système dans des opérations réelles.",

    technicalDeepDive: {
      sectionTitle: "Analyse Technique",
      sectionSubtitle:
        "Comment le moteur de tarification, le modèle de sécurité et l'architecture modulaire sont conçus — du schéma au déploiement.",
      erdTitle: "Modèle de Données",
      entities: [
        {
          name: "Client",
          desc: "Client entreprise ou particulier avec coordonnées et détails de facturation",
          type: "core",
        },
        {
          name: "Patient",
          desc: "Dossier patient lié au client — nom, condition, besoins de transport",
          type: "core",
        },
        {
          name: "Service",
          desc: "Transport planifié ou visite de soins avec snapshot de tarification",
          type: "core",
          central: true,
        },
        {
          name: "PricingRule",
          desc: "Règles de tarification basées catalogue avec modificateurs urgence et type personnel",
          type: "core",
          ssot: "Source de Vérité Tarification",
        },
        {
          name: "PricingSnapshot",
          desc: "Capture immuable point-in-time du calcul de tarification",
          type: "financial",
        },
        {
          name: "Invoice",
          desc: "Générée à partir des services complétés avec lignes détaillées et export PDF",
          type: "financial",
        },
        {
          name: "Payment",
          desc: "Enregistrement de paiement multi-méthode avec réconciliation automatique",
          type: "financial",
        },
        {
          name: "User",
          desc: "Admin ou assistant avec RBAC et durcissement de session",
          type: "audit",
        },
        {
          name: "AuditLog",
          desc: "Journalisation automatique de toutes les opérations critiques",
          type: "audit",
        },
      ],
      relationships: [
        {
          from: "Client",
          to: "Patient",
          label: "a des patients",
          cardinality: "1 → N",
        },
        {
          from: "Patient",
          to: "Service",
          label: "reçoit",
          cardinality: "1 → N",
        },
        {
          from: "Service",
          to: "PricingSnapshot",
          label: "capture le prix",
          cardinality: "1 → 1",
        },
        {
          from: "Service",
          to: "Invoice",
          label: "génère",
          cardinality: "N → 1",
        },
        {
          from: "Invoice",
          to: "Payment",
          label: "payé par",
          cardinality: "1 → N",
        },
        {
          from: "User",
          to: "AuditLog",
          label: "journalisé par",
          cardinality: "1 → N",
        },
      ],
      archTitle: "Architecture Principale",
      archBlocks: [
        {
          title: "Moteur de Tarification 7 Étapes",
          why: "La tarification du transport médical implique des règles d'empilement complexes qui doivent être déterministes et auditables",
          impact:
            "Chaque service obtient une trace de prix vérifiable — aucun calcul boîte noire",
          points: [
            "Étape 1 : Résolution catalogue — correspondance type de service, urgence et personnel à la règle de tarification",
            "Étape 2 : Extraction du prix de base de la règle correspondante",
            "Étape 3 : Calcul des frais de distance par zone (urbaine, rurale, inter-ville)",
            "Étape 4 : Application des modificateurs — nuit (+%), weekend (+MAD), empilement jours fériés",
            "Étape 5 : Vérification override manuel — l'admin peut fixer un prix avec piste d'audit",
            "Étape 6 : Calcul TVA sur le montant final",
            "Étape 7 : Création snapshot immuable — persisté aux côtés de l'enregistrement de service",
          ],
        },
        {
          title: "Architecture DDD Modulaire",
          why: "8 domaines métier doivent évoluer indépendamment sans contamination croisée",
          impact:
            "Ajouter un nouveau module (ex : gestion de flotte) suit un pattern connu sans toucher le code existant",
          points: [
            "Chaque module : schema.ts → types.ts → repository.ts → service.ts → actions.ts",
            "Pas d'imports cross-module au niveau repository — uniquement via les frontières service",
            "Couche /lib partagée pour auth, db, audit, validation et utilitaires",
            "Server Actions comme seul point d'entrée pour les mutations — typées, validées, auditées",
          ],
        },
        {
          title: "Couches de Sécurité",
          why: "Les données médicales et financières nécessitent une défense en profondeur — pas juste des checks de login",
          impact:
            "Chaque requête passe par 4 frontières de sécurité avant d'atteindre la logique métier",
          points: [
            "Couche 1 : Middleware Next.js — redirection des utilisateurs non authentifiés depuis /dashboard",
            "Couche 2 : requireSession() — valide le JWT, vérifie le flag isActive, extrait le rôle",
            "Couche 3 : requireAdmin() — bloque les utilisateurs assistant des routes de mutation",
            "Couche 4 : Validation Zod + log d'audit — chaque mutation est vérifiée par schéma et enregistrée",
          ],
        },
        {
          title: "Moteur PDF de Facturation",
          why: "Les factures professionnelles sont un besoin métier — pas un nice-to-have",
          impact:
            "Les factures sont rendues côté serveur avec mise en page cohérente, branding et ventilation des prix",
          points: [
            "Construit avec @react-pdf/renderer — 11 composants modulaires",
            "Lignes de service détaillées avec ventilation prix par ligne",
            "Badges de statut (Payé, Partiel, Impayé, Annulé) intégrés dans le PDF",
            "Numéros de facture auto-générés avec branding entreprise",
          ],
        },
      ],
      flowTitle: "Flux de Tarification Service",
      flowSteps: [
        {
          step: "Créer demande de service",
          desc: "Client, patient, type de service, urgence, type de personnel, distance — validé avec Zod",
        },
        {
          step: "Résoudre règle de tarification",
          desc: "Correspondance code catalogue + urgence + type personnel à PricingRule active",
        },
        {
          step: "Calculer base + distance",
          desc: "Prix de base de la règle + frais distance de la configuration de zone",
        },
        {
          step: "Appliquer modificateurs",
          desc: "Auto-détection nuit, vérification weekend, empilement jours fériés — chaque modificateur journalisé",
        },
        {
          step: "Vérifier override manuel",
          desc: "L'admin peut fixer un prix — calcul original préservé dans le snapshot pour audit",
        },
        {
          step: "Calculer TVA",
          desc: "Appliquer le taux de TVA configuré au montant final",
        },
        {
          step: "Persister snapshot",
          desc: "PricingSnapshot immuable créé aux côtés du Service — jamais modifié après création",
        },
      ],
      guaranteesTitle: "Garanties Système",
      guarantees: [
        {
          title: "Tarification Déterministe",
          desc: "Les mêmes entrées produisent toujours le même prix. Chaque étape de calcul est journalisée et persistée en snapshot.",
          category: "data",
        },
        {
          title: "Historique de Prix Immuable",
          desc: "Les PricingSnapshots ne sont jamais modifiés. Les changements de règles n'altèrent pas rétroactivement les prix des services passés.",
          category: "financial",
        },
        {
          title: "Réconciliation des Paiements",
          desc: "Le statut facture se met à jour automatiquement selon les totaux de paiement : Impayé → Partiel → Payé. Pas de gestion manuelle de statut.",
          category: "financial",
        },
        {
          title: "Piste d'Audit",
          desc: "Chaque opération de création, suppression et annulation est journalisée avec userId, rôle, action, entité, entityId et timestamp.",
          category: "transaction",
        },
        {
          title: "Application des Rôles",
          desc: "RBAC vérifié à chaque server action — pas seulement au niveau UI. Les utilisateurs assistant ne peuvent pas accéder aux mutations admin.",
          category: "transaction",
        },
        {
          title: "Durcissement de Session",
          desc: "JWT avec maxAge 8h, re-validation isActive au refresh, protection middleware sur toutes les routes dashboard.",
          category: "data",
        },
      ],
      codeTitle: "Flux de Données",
      codeSnippets: [
        {
          label: "Résolution Tarification — 7 Étapes",
          lines: [
            "1. matchRule(serviceType, urgency, staffType)",
            "2. basePrice = rule.price",
            "3. distanceFee = getZoneRate(zone) × distance",
            "4. modifiers = applyNight() + applyWeekend() + applyHoliday()",
            "5. override? = admin.fixedPrice ?? calculated",
            "6. vat = finalAmount × vatRate",
            "7. snapshot = persist({ steps, total, timestamp })",
          ],
        },
        {
          label: "Pattern Frontière Module",
          lines: [
            "schema.ts   → Validation Zod (formes input/output)",
            "types.ts    → Interfaces TypeScript & enums",
            "repository  → Requêtes Prisma (select, create, update)",
            "service.ts  → Logique métier + coordination cross-module",
            "actions.ts  → Server Actions (auth + validate + service + audit)",
          ],
        },
        {
          label: "Chaîne de Sécurité",
          lines: [
            "middleware.ts → redirect si pas de cookie session",
            "requireSession() → décodage JWT + vérification isActive",
            "requireAdmin() → garde role === 'admin'",
            "zodSchema.parse() → validation input",
            "auditLog() → { userId, role, action, entity, entityId }",
          ],
        },
      ],
      flowNote:
        "Les 7 étapes de tarification s'exécutent de manière synchrone. Le snapshot final est persisté atomiquement avec l'enregistrement de service.",
      tradeoffsTitle: "Compromis",
      tradeoffs: [
        {
          chose: "Tarification par snapshot",
          over: "Évaluation de règles en temps réel",
          reason:
            "Les factures passées reflètent toujours les règles actives au moment du service — les changements de règles ne corrompent jamais l'historique",
        },
        {
          chose: "Server Actions uniquement",
          over: "Routes API REST",
          reason:
            "Couche de mutation plus simple avec type safety intégrée — pas de versioning d'API ou gestion d'endpoints nécessaire",
        },
        {
          chose: "Vitest dès la Phase 0",
          over: "Tests après les features",
          reason:
            "Le moteur de tarification était testé à 100% avant toute UI — 12 cas limites détectés pendant le développement",
        },
        {
          chose: "Frontières DDD modulaires",
          over: "Organisation par feature-folder",
          reason:
            "Chaque module peut évoluer indépendamment — ajouter la gestion de flotte ne touchera pas le code tarification ou facturation",
        },
      ],
      principlesTitle: "Principes Système",
      principles: [
        "Tarification déterministe — les mêmes entrées produisent toujours le même prix, avec une piste d'audit complète de chaque étape de calcul",
        "Snapshots immuables — les enregistrements de tarification, facturation et audit ne sont jamais modifiés après création",
        "Développement test-first — 146 tests existaient avant la construction de l'UI dashboard",
        "Défense en profondeur — 4 couches de sécurité garantissent qu'aucune mutation non autorisée n'atteint la logique métier",
      ],
    },
  },
};
