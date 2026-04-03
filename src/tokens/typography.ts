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
  /** Titre de section : serif italic, responsive */
  sectionHeading: (
    C: Theme,
    isMobile: boolean,
  ): CSSProperties => ({
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontSize: isMobile ? 28 : 40,
    letterSpacing: -1.5,
    color: C.text,
  }),

  /** Label mono minuscule (9px, uppercase, letterSpacing 2) */
  monoLabel: (C: Theme): CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    letterSpacing: 2,
    color: C.faint,
    textTransform: "uppercase",
  }),

  /** Label mono cyan (Label composant, nav items) */
  monoCyan: (C: Theme): CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: 3,
    color: C.cyan,
  }),

  /** Texte body : sans, 14px, muted */
  body: (C: Theme): CSSProperties => ({
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    color: C.muted,
    lineHeight: 1.8,
    fontWeight: 300,
  }),

  /** Texte body petit (13px) */
  bodySmall: (C: Theme): CSSProperties => ({
    fontFamily: "var(--font-sans)",
    fontSize: 13,
    color: C.muted,
    lineHeight: 1.8,
    fontWeight: 300,
  }),

  /** Mono pill/tag (10px) */
  monoPill: (): CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: 0.5,
  }),

  /** Serif italic titre de projet */
  projectTitle: (
    C: Theme,
    isMobile: boolean,
  ): CSSProperties => ({
    fontFamily: "var(--font-serif)",
    fontSize: isMobile ? 26 : 34,
    fontStyle: "italic",
    color: C.text,
    letterSpacing: -1,
    lineHeight: 1.1,
  }),

  /** Mono nav link */
  navLink: (C: Theme): CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: 1.5,
    color: C.muted,
    textTransform: "uppercase",
  }),

  /** Metric number (serif, italic, big) */
  metricValue: (color: string): CSSProperties => ({
    fontFamily: "var(--font-serif)",
    fontSize: 32,
    fontStyle: "italic",
    color,
    lineHeight: 1,
  }),

  /** Metric label (mono, small, muted) */
  metricLabel: (C: Theme): CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    color: C.muted,
    letterSpacing: 2,
    textTransform: "uppercase",
  }),
} as const;
