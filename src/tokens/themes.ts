/**
 * @file themes.ts
 * @description Définit les deux thèmes (DARK / LIGHT) sous forme de tokens typés.
 * Toutes les couleurs et ombres de l'application viennent d'ici.
 * Aucun composant ne code une couleur en dur.
 */

export interface Theme {
  bg: string;
  bg2: string;
  bg3: string;
  card: string;

  text: string;
  sub: string;
  muted: string;
  faint: string;

  cyan: string;
  green: string;
  amber: string;
  purple: string;

  border: string;
  border2: string;
  line: string;

  gridLine: string;
  glow1: string;
  glow2: string;
  shadow: string;
}

export const DARK: Theme = {
  bg: "#0e1117",
  bg2: "#0d1b2a",
  bg3: "#1C2333",
  card: "#21262D",

  text: "#e2e8f0",
  sub: "#cbd5e1",
  muted: "#64748b",
  faint: "#475569",

  cyan: "#22d3ee",
  green: "#3FB950",
  amber: "#F0883E",
  purple: "#a855f7",

  border: "rgba(34,211,238,0.12)",
  border2: "rgba(34,211,238,0.30)",
  line: "rgba(226,232,240,0.06)",

  gridLine: "rgba(34,211,238,0.10)",
  glow1: "rgba(34,211,238,0.14)",
  glow2: "rgba(168,85,247,0.10)",
  shadow: "0 24px 48px rgba(0,0,0,0.35)",
};

/**
 * Résout une clé de couleur ("cyan", "green", etc.) vers la valeur hex du thème.
 * Remplace les colorMap dupliqués dans About.tsx et HeroStats.tsx.
 */
export function resolveColor(C: Theme, key: string): string {
  const map: Record<string, string> = {
    cyan: C.cyan,
    green: C.green,
    amber: C.amber,
    purple: C.purple,
    text: C.text,
    sub: C.sub,
    muted: C.muted,
    faint: C.faint,
  };
  return map[key] ?? C.text;
}

export const LIGHT: Theme = {
  bg: "#f8fafc",
  bg2: "#ffffff",
  bg3: "#f1f5f9",
  card: "#e2e8f0",

  text: "#0f172a",
  sub: "#334155",
  muted: "#64748b",
  faint: "#94a3b8",

  cyan: "#22d3ee",
  green: "#116329",
  amber: "#7D4E00",
  purple: "#a855f7",

  border: "rgba(15,23,42,0.12)",
  border2: "rgba(15,23,42,0.25)",
  line: "rgba(15,23,42,0.08)",

  gridLine: "rgba(15,23,42,0.04)",
  glow1: "rgba(34,211,238,0.06)",
  glow2: "rgba(168,85,247,0.05)",
  shadow: "0 24px 48px rgba(15,23,42,0.08)",
};
