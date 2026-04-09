/**
 * @file content/fr.ts
 * @description French locale (Moroccan professional tone).
 * Technical terms remain in English (FIFO, MongoDB, etc.).
 */

import type { SiteContent } from "./types";

export const fr: SiteContent = {
  /* Meta */
  meta: {
    title: "Abdelilah Wajid · Ingénieur Full-Stack",
    description:
      "Portfolio d'Abdelilah Wajid - Ingénieur Full-Stack basé à Marrakech, Maroc. J'aide les startups à identifier les goulots d'étranglement produit et à construire des systèmes qui passent à l'échelle sans tomber.",
    author: "Abdelilah Wajid",
    keywords:
      "Abdelilah Wajid, ingénieur full-stack, développeur web, react, next.js, typescript, portfolio, marrakech, maroc, freelance",
    siteUrl: "https://abdelilahwajid.com",
    ogType: "website",
    ogSiteName: "Abdelilah Wajid",
    twitterHandle: "@abdelilahwajid",
  },

  /* Nav */
  nav: {
    logoInitial: "A.",
    logoName: "ABDELILAH",
    logoTagline: "COMPRENDRE · DÉCIDER · CONSTRUIRE",
    links: [
      { id: "work", n: "01", label: "Approche" },
      { id: "about", n: "02", label: "État d'esprit" },
      { id: "skills", n: "03", label: "Outils" },
      { id: "contact", n: "04", label: "Contact" },
    ],
  },

  /* Hero */
  hero: {
    badge: "DISPONIBLE POUR MISSION",
    name: {
      base: "Abdel",
      highlight: "ilah",
      lastName: "Wajid",
    },
    roles: [
      "Diagnostiquer avant de construire",
      "Éliminer ce qui ralentit la croissance",
      "Livrer des systèmes qui tiennent sous pression",
      "Une structure qui résiste à la charge",
    ],
    pills: [
      "Pensée système",
      "Décisions claires",
      "Architecture évolutive",
      "Travail orienté résultat",
    ],
    bio: "J'interviens auprès des startups et équipes produit pour identifier ce qui bloque réellement la croissance - systèmes lents, flux incompréhensibles, ou architecture fragile. Ensuite je construis des solutions performantes, évolutives, qui n'auront pas besoin d'être réécrites six mois plus tard.",
    cta: {
      primary: "VOIR MES RÉALISATIONS",
      secondary: "DISCUTONS ENSEMBLE",
    },
    scroll: "DÉFILER",
    avatar: {
      displayName: "Abdelilah W.",
      tagline: "COMPRENDRE -> DÉCIDER -> CONSTRUIRE",
      locationShort: "Marrakech · Ouvert au remote",
      infoItems: ["Marrakech, Maroc", "UTC+1 - GMT+1", "Ouvert au remote"],
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

  /* About */
  about: {
    label: "02 - État d'esprit",
    headingLine1: "Je diagnostique les systèmes,",
    headingLine2: "puis je construis.",
    paragraphs: [
      "La plupart des problèmes d'ingénierie ne sont pas des fonctionnalités manquantes - ce sont des décisions peu claires prises au début qui se cumulent avec le temps.",
      "Avant d'écrire une ligne de code, je cartographie le système : où il casse, où se cache la complexité, et ce qui vaut vraiment la peine d'être résolu.",
      "C'est là que le vrai travail se passe. Tout ce que je construis ensuite est ancré dans ce dont le produit a réellement besoin - pas ce qui semblait une bonne idée dans un sprint.",
    ],
    tags: [
      { text: "Clarté d'abord", colorKey: "cyan" },
      { text: "Pas d'exécution aveugle", colorKey: "amber" },
      { text: "La valeur plutôt que le bruit", colorKey: "purple" },
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
        { text: '"comprendre-dabord"', colorKey: "amber" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  focus: ", colorKey: "muted" },
        { text: '"clarté-plutôt-qu-vitesse"', colorKey: "amber" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  approach: ", colorKey: "muted" },
        { text: '"corriger-ce-qui-ralentit"', colorKey: "green" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  decisions: ", colorKey: "muted" },
        { text: "true", colorKey: "cyan" },
        { text: ",", colorKey: "muted" },
      ],
      [
        { text: "  hire: ", colorKey: "muted" },
        { text: '"seulement-si-ça-a-du-sens"', colorKey: "amber" },
      ],
      [{ text: "}", colorKey: "muted" }],
    ],
  },

  /* Work */
  work: {
    label: "01 - Approche",
    heading: "Problèmes résolus. Produits livrés.",
    subtitle: "Vrais problèmes · Décisions structurelles · Livrés.",
  },

  /* Skills */
  skills: {
    label: "03 - Outils",
    heading: "Les outils que je choisis - et pourquoi.",
    subtitle: "Le bon outil pour le bon problème. Rien de plus.",
  },

  /* Contact */
  contact: {
    label: "04 - Contact",
    headingLine1: "Dites-moi ce qui est cassé,",
    headingHighlight: "je vous dirai ce qui vaut la peine d'être réparé.",
    paragraphLine1:
      "Si votre produit est lent, difficile à faire évoluer, ou accumule des décisions dont personne ne se souvient - c'est précisément là que j'interviens le mieux.",
    paragraphLine2:
      "Je vous donnerai une lecture honnête de la situation. S'il y a une adéquation, je vous montrerai comment. S'il n'y en a pas, je vous le dirai franchement.",
    email: "abdelilah@email.com",
    copyLabel: "COPIER",
    copiedLabel: "COPIÉ",
    socials: ["GitHub", "LinkedIn", "Twitter / X"],
  },

  /* Footer */
  footer: {
    copyright: "© 2026",
    author: "Abdelilah Wajid",
    tagline: "La clarté livre. La complexité coule.",
  },

  /* Stats */
  stats: [
    { value: "4+", label: "Ans exp.", colorKey: "cyan" },
    { value: "12+", label: "Projets livrés", colorKey: "purple" },
    { value: "20+", label: "Clients", colorKey: "amber" },
    { value: "3", label: "Pays", colorKey: "green" },
  ],

  /* Tech Strip */
  techStrip: [
    "Zéro dette technique le jour 1",
    "Architecture avant fonctionnalités",
    "Performance par conception",
    "Structure pour l'échelle",
    "Éliminer les frictions",
    "Ingénierie orientée business",
    "Penser en flux",
    "Couper la complexité tôt",
    "Livrer avec confiance",
    "Clarté à chaque couche",
  ],

  /* Projects */
  projects: [
    {
      n: "01",
      slug: "electro-abidin",
      year: "2025",
      name: "Electro Abidin eSystem",
      type: "Système de Gestion de Vente au Détail",
      color: "#3B82F6",
      status: "En ligne",
      statusColor: "#3FB950",
      link: "",
      desc: "Un magasin d'électronique fonctionnant avec des vérifications de stock manuelles et un suivi papier - le système a remplacé le chaos par un contrôle opérationnel en temps réel.",
      longDesc:
        "J'ai conçu la gestion des stocks, des ventes et de la facturation comme un flux intégré - pas trois outils séparés boulonnés ensemble.",
      stack: {
        core: ["Next.js", "React", "TypeScript"],
        backend: ["MongoDB", "Mongoose", "Zod", "JWT Auth", "bcrypt"],
        features: [
          "Recharts",
          "Export Excel (ExcelJS)",
          "Gestion des dates (date-fns)",
        ],
        system: ["Styled Components", "Nodemailer", "Sharp"],
        testing: ["Jest", "Supertest"],
      },
      highlights: [
        "Éliminé les vérifications de stock manuelles en connectant directement l'inventaire au flux de vente",
        "Construit un calcul de profit basé sur FIFO pour un suivi financier précis par unité vendue",
        "Conçu une facturation flexible supportant particuliers et entreprises avec TVA optionnelle",
        "Implémenté un suivi de garantie automatique lié à chaque produit au point de vente",
      ],
      caseStudy: {
        headline: "Du chaos manuel au contrôle retail en temps réel",
        subtitle:
          "Le magasin ne manquait pas de logiciel - il manquait d'un système qui comprenait comment une véritable entreprise d'électronique opère réellement.",
        tags: [
          "Gestion d'Inventaire",
          "Point de Vente",
          "Suivi Financier",
          "Automatisation Business",
        ],
        problem: [
          "Le magasin dépendait de vérifications de stock manuelles dans la réserve",
          "Les employés devaient vérifier physiquement la disponibilité plusieurs fois par jour",
          "Erreurs de vente fréquentes (produits non disponibles)",
          "Processus de caisse lent dû au manque de visibilité en temps réel",
          "Aucun suivi financier ou de précision de stock clair",
        ],
        impact: [
          "Ventes perdues dues à des produits indisponibles non détectés jusqu'à la caisse",
          "Temps et effort physique gaspillés pour les employés sur vérifications répétitives",
          "Mauvaise expérience client causée par de longues attentes en magasin",
          "Compréhension inexacte des niveaux d'inventaire et des revenus réels",
          "Chaos opérationnel affectant la performance quotidienne et la prise de décision",
        ],
        decisions: [
          "Connecté directement l'inventaire au processus de vente (sync temps réel)",
          "Introduit un système de commande multi-produits au lieu de caisse mono-produit",
          "Ajouté des alertes de seuil de stock pour meilleure anticipation",
          "Implémenté une tarification flexible (min/max) pour supporter la vraie négociation",
          "Conçu un système de facturation supportant particuliers et entreprises",
          "Rendu la TVA optionnelle selon scénarios business réels",
          "Intégré une logique de garantie automatique par produit",
        ],
        architecture: [
          "Séparé l'entité produit de l'entité stock pour éviter la duplication de données",
          "Chaque lot de stock a son propre prix d'achat pour une comptabilité précise",
          "Implémenté une logique FIFO pour un calcul de profit précis",
          "Utilisé des opérations basées sur statut pour annulation/retour avec récupération automatique de stock",
          "Conçu le système avec cohérence des données et intégrité transactionnelle en tête",
        ],
        results: [
          "Éliminé complètement le besoin de vérifications de stock manuelles",
          "Réduit significativement les frictions à la caisse et le temps d'attente",
          "Évité la vente de produits non disponibles",
          "Permis un suivi précis des profits et des finances",
          "Amélioré l'efficacité des employés et réduit la charge physique",
          "Donné au propriétaire une visibilité en temps réel sur les opérations et la performance",
        ],
        screenshots: [
          {
            src: "/electro-abidin/pos.webp",
            alt: "Système POS avec visibilité stock temps réel",
            caption:
              "Recherche produit et visibilité stock temps réel - plus de vérifications manuelles",
          },
          {
            src: "/electro-abidin/checkout.webp",
            alt: "Système de caisse avec calculs prix et TVA",
            caption:
              "Caisse multi-produits avec calculs automatiques et tarification flexible",
          },
          {
            src: "/electro-abidin/dashboard.webp",
            alt: "Dashboard admin avec analytics ventes et stock",
            caption:
              "Visibilité opérationnelle complète avec insights business temps réel",
          },
          {
            src: "/electro-abidin/catalogue.webp",
            alt: "Système gestion produits et inventaire",
            caption:
              "Séparation structurée produit/stock pour une gestion précise des données",
          },
          {
            src: "/electro-abidin/invoice.webp",
            alt: "Système génération factures avec support TVA",
            caption:
              "Génération factures automatiques avec support TVA et types clients",
          },
        ],
        cta: "Le système n'a pas simplement digitalisé le processus - il a redéfini comment l'entreprise opère.",
        technicalDeepDive: {
          sectionTitle: "Analyse Technique",
          sectionSubtitle:
            "Comment le système est conçu en interne - architecture, modèle de données, et garanties.",
          erdTitle: "Modèle de Données",
          entities: [
            {
              name: "Product",
              desc: "Entrée catalogue avec stock mis en cache (synchronisé depuis FIFO)",
              type: "core",
            },
            {
              name: "InventoryLog",
              desc: "Lot FIFO - source unique de vérité pour stock et coût",
              type: "core",
              ssot: "Source de Vérité Stock",
              central: true,
            },
            {
              name: "Sale",
              desc: "Document workflow mono-produit (point d'entrée UI)",
              type: "transaction",
            },
            {
              name: "Order",
              desc: "Vente multi-produits avec OrderItems intégrés",
              type: "transaction",
            },
            {
              name: "SalesTransactionItem",
              desc: "Enregistrement financier canonique - immuable après création",
              type: "financial",
              ssot: "Source de Vérité Financière",
            },
            {
              name: "Invoice",
              desc: "Document légal (FACTURE / BON DE VENTE) avec items intégrés",
              type: "financial",
            },
            {
              name: "Guarantee",
              desc: "Document garantie avec suivi de cycle de vie",
              type: "financial",
            },
            {
              name: "STIDailySnapshot",
              desc: "Agrégats quotidiens immuables pour détection dérive",
              type: "audit",
            },
          ],
          relationships: [
            {
              from: "Product",
              to: "InventoryLog",
              label: "Lots FIFO",
              cardinality: "1 -> N",
            },
            {
              from: "Product",
              to: "Sale",
              label: "vendu via",
              cardinality: "1 -> N",
            },
            {
              from: "Sale",
              to: "SalesTransactionItem",
              label: "double-écriture",
              cardinality: "1 -> 1",
            },
            {
              from: "Order",
              to: "SalesTransactionItem",
              label: "par item",
              cardinality: "1 -> N",
            },
            {
              from: "Sale",
              to: "Invoice",
              label: "génère",
              cardinality: "1 -> 0..1",
            },
            {
              from: "Invoice",
              to: "Guarantee",
              label: "garantie",
              cardinality: "1 -> 0..1",
            },
          ],
          archTitle: "Architecture Principale",
          archBlocks: [
            {
              title: "Moteur de Coût FIFO",
              why: "Assure un profit précis par unité vendue",
              impact:
                "Chaque unité vendue porte son vrai coût d'achat - les marges profit ne sont jamais estimées",
              points: [
                "Chaque entrée InventoryLog = un lot avec remainingQty et purchasePrice",
                "À la vente : lots les plus anciens consommés d'abord (tri : createdAt ASC)",
                "Garde atomique : check $gte sur remainingQty empêche les conflits concurrents",
                "Pas de fallback - épuisement FIFO rejette dur la vente",
              ],
            },
            {
              title: "Pattern Double-Écriture",
              why: "Sépare l'état workflow de la vérité financière",
              impact:
                "Les analytics et rapports ne sont jamais pollués par les mutations workflow ou changements d'état UI",
              points: [
                "Sale/Order = documents workflow pour UI et suivi processus",
                "SalesTransactionItem = vérité financière canonique pour analytics",
                "Champs financiers STI immuables - corrections nécessitent annulation + revente",
                "Feature flags contrôlent migration de statistiques basées Sale vers STI",
              ],
            },
            {
              title: "Validation 3 Couches",
              why: "Aucune donnée invalide n'atteint la base - jamais",
              impact:
                "Zéro enregistrements corrompus en production - chaque entrée passe 3 checkpoints indépendants",
              points: [
                "Couche 1 : Schémas Zod à frontière API (14 fichiers validation)",
                "Couche 2 : Règles métier niveau service (stock, tarification, relations)",
                "Couche 3 : Contraintes schéma Mongoose (required, min/max, enum, unique)",
              ],
            },
            {
              title: "Architecture Snapshot",
              why: "Les enregistrements passés restent précis malgré les changements futurs",
              impact:
                "Une facture d'il y a 6 mois montre toujours le nom produit exact, prix, et marque au moment de la vente",
              points: [
                "Chaque vente capture un snapshot produit temporel",
                "Items facture et garantie entièrement intégrés - immuables après création",
                "Précision historique : changements produit n'affectent jamais les enregistrements passés",
              ],
            },
          ],
          flowTitle: "Flux d'Exécution Vente",
          flowSteps: [
            {
              step: "Valider entrées",
              desc: "productId, quantity, sellingPrice, cashierId - Zod + règles métier",
            },
            {
              step: "Calculer TVA",
              desc: "tvaAmount = priceHT × tvaRate, priceTTC = priceHT × (1 + tvaRate)",
            },
            {
              step: "Démarrer transaction MongoDB",
              desc: "Toutes opérations suivantes atomiques - commit ou rollback",
            },
            {
              step: "Vérifier stock (mis en cache + FIFO)",
              desc: "Product.stock (projection mis en cache) >= qty, puis check autoritaire : aggregate(InventoryLog.remainingQty) >= qty",
            },
            {
              step: "Consommer lots FIFO",
              desc: "Boucle plus ancien -> décrémenter remainingQty -> accumuler coût avec garde $gte",
            },
            {
              step: "Créer Sale + STI",
              desc: "Double-écriture : Sale (workflow) + SalesTransactionItem (vérité financière)",
            },
            {
              step: "Décrémenter Product.stock",
              desc: "adjustStock(-qty) met à jour projection mis en cache - lots FIFO restent source de vérité",
            },
            {
              step: "Commettre transaction",
              desc: "Tout ou rien - tout échec déclenche rollback complet",
            },
          ],
          guaranteesTitle: "Garanties Système",
          guarantees: [
            {
              title: "Pas de Survente",
              desc: "Défense 3 couches : stock mis en cache -> agrégat FIFO -> garde lot atomique ($gte). Conflits concurrents retournent 409.",
              category: "data",
            },
            {
              title: "État Cohérent",
              desc: "Annulation met à jour atomiquement Sale + STI + Invoice + Guarantee + restauration FIFO en une transaction.",
              category: "data",
            },
            {
              title: "Calcul Profit Précis",
              desc: "Le coût vient des lots FIFO (pas niveau produit). Chaque unité vendue porte son prix d'achat exact.",
              category: "financial",
            },
            {
              title: "Enregistrements Financiers Immuables",
              desc: "Champs financiers STI et snapshots quotidiens non modifiables. Corrections créent nouveaux enregistrements.",
              category: "financial",
            },
            {
              title: "Sécurité Transaction",
              desc: "Toute opération critique utilise transactions MongoDB. État partiel impossible - commit ou rollback complet.",
              category: "transaction",
            },
            {
              title: "Précision Historique",
              desc: "Snapshots temporels sur chaque vente. Changements produit n'affectent jamais rétroactivement factures ou rapports.",
              category: "transaction",
            },
          ],
          codeTitle: "Flux de Données",
          codeSnippets: [
            {
              label: "Vérité Stock - SSOT Système",
              lines: [
                "InventoryLog.remainingQty  <-  SOURCE UNIQUE DE VÉRITÉ",
                "Product.stock = SUM(InventoryLog.remainingQty)  // mis en cache",
                "Sale -> consommation FIFO (plus ancien lot d'abord)",
                "Annulation -> restauration FIFO (nouvelle entrée au coût original)",
              ],
            },
            {
              label: "Carte Relations",
              lines: [
                "Product (1) ----- (N) InventoryLog",
                "Sale (1) --------- (1) SalesTransactionItem",
                "Order (1) -------- (N) SalesTransactionItem",
                "Invoice (1) ------ (0..1) Guarantee",
              ],
            },
            {
              label: "Limite Transaction - Atomicité",
              lines: [
                "session = mongoose.startSession()",
                "session.startTransaction()",
                "  ... toutes ops avec { session } ...",
                "session.commitTransaction() || abortTransaction()",
              ],
            },
          ],
          flowNote:
            "Toutes opérations entre étapes 3-8 s'exécutent dans une seule transaction MongoDB. Tout échec déclenche rollback complet.",
          tradeoffsTitle: "Compromis",
          tradeoffs: [
            {
              chose: "Coût FIFO",
              over: "Tarification coût moyen",
              reason:
                "Profit exact par unité - critique pour un magasin où les prix d'achat fluctuent entre lots",
            },
            {
              chose: "Double-écriture (Sale + STI)",
              over: "Document unique",
              reason:
                "Sépare l'état workflow mutable de la vérité financière immuable - les analytics restent propres",
            },
            {
              chose: "Snapshots intégrés",
              over: "Références uniquement",
              reason:
                "Précision historique sans jointures - les factures passées ne changent jamais lors des mises à jour produit",
            },
            {
              chose: "Stock mis en cache sur Product",
              over: "Agrégation temps réel uniquement",
              reason:
                "Lectures rapides pour UI/POS - l'agrégation FIFO reste autoritaire pour toutes écritures",
            },
          ],
          principlesTitle: "Principes Système",
          principles: [
            "Source unique de vérité - InventoryLog.remainingQty possède la réalité stock ; Product.stock est une projection mise en cache",
            "Enregistres financiers immuables - SalesTransactionItem non éditable ; corrections créent nouveaux enregistrements",
            "Précision historique basée sur snapshots - chaque vente fige l'état produit au moment de la transaction",
            "Opérations atomiques - aucun état partiel possible ; tout flux critique enveloppé dans transaction MongoDB",
          ],
        },
      },
    },
  ],

  /* Skill Groups */
  skillGroups: [
    {
      title: "Frontend",
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
      title: "Backend",
      color: "#3FB950",
      items: ["Node.js / Express", "PostgreSQL", "Prisma ORM", "REST APIs"],
    },
    {
      title: "DevOps",
      color: "#F0883E",
      items: ["Docker", "Vercel", "AWS", "Linux"],
    },
    {
      title: "Tooling",
      color: "#A78BFA",
      items: ["Git / GitHub", "Postman", "Figma", "Notion"],
    },
  ],
};
