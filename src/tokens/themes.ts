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

/**
 * Résout une clé de couleur vers la CSS custom property correspondante.
 * For use in Server Components that don't have access to the Theme object.
 */
export function resolveColorVar(key: string): string {
  const map: Record<string, string> = {
    cyan: "var(--t-cyan)",
    green: "var(--t-green)",
    amber: "var(--t-amber)",
    purple: "var(--t-purple)",
    text: "var(--t-text)",
    sub: "var(--t-sub)",
    muted: "var(--t-muted)",
    faint: "var(--t-faint)",
  };
  return map[key] ?? "var(--t-text)";
}

export const LIGHT: Theme = {
  bg: "#f4f7fb",
  bg2: "#ffffff",
  bg3: "#e2e8f0",
  card: "#cbd5e1",

  text: "#0f172a",
  sub: "#253243",
  muted: "#475569",
  faint: "#64748b",

  cyan: "#0e7490",
  green: "#166534",
  amber: "#92400e",
  purple: "#6d28d9",

  border: "rgba(15,23,42,0.16)",
  border2: "rgba(15,23,42,0.28)",
  line: "rgba(15,23,42,0.14)",

  gridLine: "rgba(15,23,42,0.08)",
  glow1: "rgba(14,116,144,0.10)",
  glow2: "rgba(109,40,217,0.08)",
  shadow: "0 18px 42px rgba(15,23,42,0.08), 0 2px 10px rgba(15,23,42,0.05)",
};
