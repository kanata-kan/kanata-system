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
  bg: "#0D1117",
  bg2: "#161B22",
  bg3: "#1C2333",
  card: "#21262D",

  text: "#F0F6FC",
  sub: "#C9D1D9",
  muted: "#8B949E",
  faint: "#3D444D",

  cyan: "#38BDF8",
  green: "#3FB950",
  amber: "#F0883E",
  purple: "#A78BFA",

  border: "rgba(56,189,248,0.12)",
  border2: "rgba(56,189,248,0.30)",
  line: "rgba(240,246,252,0.06)",

  gridLine: "rgba(56,189,248,0.10)",
  glow1: "rgba(56,189,248,0.14)",
  glow2: "rgba(167,139,250,0.10)",
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
  bg: "#F8F9FB",
  bg2: "#FFFFFF",
  bg3: "#EEF1F5",
  card: "#E4E8EE",

  text: "#1B1F24",
  sub: "#2D333B",
  muted: "#4D5562",
  faint: "#8C95A1",

  cyan: "#0550AE",
  green: "#116329",
  amber: "#7D4E00",
  purple: "#512EA8",

  border: "rgba(27,31,36,0.12)",
  border2: "rgba(27,31,36,0.25)",
  line: "rgba(27,31,36,0.08)",

  gridLine: "rgba(27,31,36,0.04)",
  glow1: "rgba(5,80,174,0.06)",
  glow2: "rgba(81,46,168,0.05)",
  shadow: "0 24px 48px rgba(27,31,36,0.08)",
};
