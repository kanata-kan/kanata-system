import type { ProjectContent } from "../../types";

export const electroAbidin: ProjectContent = {
  n: "01",
  slug: "electro-abidin",
  year: "2025",
  name: "Electro Abidin eSystem",
  type: "Système de Gestion de Vente au Détail",
  color: "#3B82F6",
  status: "Déploiement privé",
  statusColor: "#3FB950",
  link: "/work/electro-abidin",
  liveUrl: "https://kanata-system.vercel.app/work/electro-abidin",
  desc: "Une operation retail avec des controles de stock manuels, du suivi papier, et une caisse lente avait besoin d'un systeme unique que l'equipe pouvait vraiment faire confiance en temps reel.",
  longDesc:
    "J'ai reuni stock, caisse, facturation, et gestion de garantie dans un seul flux operationnel avec des regles fiables pour le stock, le pricing, et la marge.",
  stack: {
    core: ["Next.js", "React", "JavaScript (ES6+)"],
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
    "Relie la disponibilite stock directement a la caisse pour eviter les ventes a l'aveugle",
    "Utilise le cout par lot FIFO pour un suivi de marge base sur le vrai prix d'achat",
    "Separe l'etat workflow de la verite financiere avec des enregistrements immuables",
    "Couvre facturation, TVA, retours, et garanties dans le meme workflow retail",
  ],
  caseStudy: {
    headline:
      "Remplacer des operations retail manuelles par un systeme fiable en caisse",
    subtitle:
      "Ce case study montre comment j'ai transforme des verifications de stock deconnectees, des decisions de pricing, et la facturation en un workflow operationnel unique pour un magasin d'electronique.",
    tags: [
      "Operations Retail",
      "Logique Stock",
      "Flux de Caisse",
      "Business Rules",
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
      "La disponibilite stock devient visible pendant le checkout au lieu d'un aller-retour manuel vers la reserve",
      "Les caissiers peuvent traiter des commandes multi-produits dans un seul flux coherent",
      "Le suivi de marge passe de l'approximation a un calcul base sur les lots",
      "Les retours et annulations restaurent le stock via des regles systeme explicites",
      "Le proprietaire obtient une vision plus claire des ventes, du mouvement stock, et de la facturation",
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
    cta: "La valeur n'etait pas un dashboard plus joli. C'etait un workflow sur lequel le magasin pouvait compter pendant de vraies ventes.",
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
};
