/**
 * @file typography.ts
 * @description Presets typographiques centralisés.
 * Chaque preset retourne un objet CSSProperties prêt à l'emploi.
 * Élimine la répétition de fontFamily / fontSize / letterSpacing
 * à travers les ~45 occurrences dans le code.
 */

import type { CSSProperties } from "react";
import type { Theme } from "./themes";

export const TEXT = {
  /** Titre de section : Outfit, responsive */
  sectionHeading: (C: Theme, isMobile: boolean): CSSProperties => ({
    fontFamily: "var(--font-display)",
    fontSize: isMobile ? 28 : 40,
    fontWeight: 600,
    letterSpacing: -0.02,
    color: C.text,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  }),

  /** Label mono minuscule (9px, uppercase, letterSpacing 2) */
  monoLabel: (C: Theme): CSSProperties => ({
    fontFamily: "var(--font-ui)",
    fontSize: 9,
    letterSpacing: "var(--ui-tracking)",
    color: C.muted,
    textTransform: "uppercase",
    fontWeight: 500,
  }),

  /** Label mono cyan (Label composant, nav items) */
  monoCyan: (C: Theme): CSSProperties => ({
    fontFamily: "var(--font-ui)",
    fontSize: 10,
    letterSpacing: "var(--ui-wide-tracking)",
    color: C.cyan,
    fontWeight: 600,
  }),

  /** Texte body : Inter, 16px, muted */
  body: (C: Theme): CSSProperties => ({
    fontFamily: "var(--font-body)",
    fontSize: 16,
    color: C.sub,
    lineHeight: 1.7,
    fontWeight: 400,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  }),

  /** Texte body petit (14px) */
  bodySmall: (C: Theme): CSSProperties => ({
    fontFamily: "var(--font-body)",
    fontSize: 14,
    color: C.sub,
    lineHeight: 1.7,
    fontWeight: 400,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  }),

  /** Pill/tag (10px) */
  monoPill: (): CSSProperties => ({
    fontFamily: "var(--font-body)",
    fontSize: 10,
    letterSpacing: 0.5,
  }),

  /** Outfit titre de projet */
  projectTitle: (C: Theme, isMobile: boolean): CSSProperties => ({
    fontFamily: "var(--font-display)",
    fontSize: isMobile ? 26 : 34,
    fontWeight: 700,
    color: C.text,
    letterSpacing: -0.02,
    lineHeight: 1.15,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  }),

  /** Nav link */
  navLink: (C: Theme): CSSProperties => ({
    fontFamily: "var(--font-ui)",
    fontSize: 11,
    letterSpacing: "var(--ui-tracking)",
    color: C.muted,
    textTransform: "uppercase",
    fontWeight: 500,
  }),

  /** Metric number (Outfit, big) */
  metricValue: (color: string): CSSProperties => ({
    fontFamily: "var(--font-display)",
    fontSize: 32,
    fontWeight: 700,
    color,
    lineHeight: 1,
    letterSpacing: -0.02,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  }),

  /** Metric label (Inter, small, muted) */
  metricLabel: (C: Theme): CSSProperties => ({
    fontFamily: "var(--font-ui)",
    fontSize: 9,
    color: C.muted,
    letterSpacing: "var(--ui-tracking)",
    textTransform: "uppercase",
    fontWeight: 500,
  }),

  /** Hero Title (Outfit, big, bold) */
  heroTitle: (C: Theme, isMobile: boolean): CSSProperties => ({
    fontFamily: "var(--font-display)",
    fontSize: isMobile ? "clamp(36px, 10vw, 52px)" : "clamp(56px, 5.5vw, 80px)",
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: -0.01,
    color: C.text,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  }),
} as const;

/**
 * Server-Component–safe typography presets.
 * Use CSS custom properties instead of Theme object.
 * Responsive font sizes use CSS clamp() instead of isMobile boolean.
 */
export const SC_TEXT = {
  sectionHeading: (): CSSProperties => ({
    fontFamily: "var(--font-display)",
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 600,
    letterSpacing: -0.02,
    color: "var(--t-text)",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  }),

  monoLabel: (): CSSProperties => ({
    fontFamily: "var(--font-ui)",
    fontSize: 9,
    letterSpacing: "var(--ui-tracking)",
    color: "var(--t-muted)",
    textTransform: "uppercase",
    fontWeight: 500,
  }),

  body: (): CSSProperties => ({
    fontFamily: "var(--font-body)",
    fontSize: 16,
    color: "var(--t-sub)",
    lineHeight: 1.7,
    fontWeight: 400,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  }),

  bodySmall: (): CSSProperties => ({
    fontFamily: "var(--font-body)",
    fontSize: 14,
    color: "var(--t-sub)",
    lineHeight: 1.7,
    fontWeight: 400,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  }),

  metricValue: (color: string): CSSProperties => ({
    fontFamily: "var(--font-display)",
    fontSize: 32,
    fontWeight: 700,
    color,
    lineHeight: 1,
    letterSpacing: -0.02,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  }),

  metricLabel: (): CSSProperties => ({
    fontFamily: "var(--font-ui)",
    fontSize: 9,
    color: "var(--t-muted)",
    letterSpacing: "var(--ui-tracking)",
    textTransform: "uppercase",
    fontWeight: 500,
  }),
} as const;
