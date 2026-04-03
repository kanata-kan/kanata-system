/**
 * @file stats.ts
 * @description Métriques partagées entre HeroStats et About.
 * Source unique de vérité pour les chiffres clés du portfolio.
 */

export interface Metric {
  value: string;
  label: string;
  colorKey: string;
}

/** Métriques principales — utilisées dans HeroStats (3) et About (4). */
export const METRICS: Metric[] = [
  { value: "4+", label: "Years exp.", colorKey: "cyan" },
  { value: "12+", label: "Shipped", colorKey: "purple" },
  { value: "20+", label: "Clients", colorKey: "amber" },
  { value: "3", label: "Countries", colorKey: "green" },
];

/** Sous-ensemble pour le Hero (sans "Countries"). */
export const HERO_METRICS = METRICS.slice(0, 3);
