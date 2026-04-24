/**
 * @file brandStyles.ts
 * @description Shared brand styling constants — single source of truth.
 * Colors mirror the DARK theme tokens so OG images and the live site are visually identical.
 *
 * SECTIONS:
 * - Shared colors
 * - Navigation styles
 * - OG Image styles
 */

/* ── SHARED COLORS ── mirrors DARK theme in tokens/themes.ts ── */
export const BRAND_COLORS = {
  primary: "#22d3ee", // Cyan — matches DARK.cyan
  secondary: "#a855f7", // Violet — matches DARK.purple

  text: {
    light: "#e2e8f0", // Matches DARK.text
    muted: "#64748b", // Matches DARK.muted
    dim: "#475569", // Matches DARK.faint
  },

  bg: {
    darkStart: "#0e1117", // Matches DARK.bg
    darkEnd: "#0d1b2a", // Matches DARK.bg2
  },
} as const;

/* ── NAVIGATION STYLES ── */
export const NAV_STYLES = {
  monogram: {
    size: {
      width: 32, // Smaller = more confident
      height: 32,
    },
    border: {
      radius: 6,
      width: "1px",
    },
    gradientOpacity: 0, // No gradient — flat bg with border only
    hover: {
      gradientOpacity: 8,
      transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  monogramText: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 2, // Tight mono feel
  },

  spacing: {
    gap: 10,
    textGap: 2,
  },

  name: {
    fontSize: 12,
    fontWeight: 400, // Light weight = editorial maturity
    letterSpacing: 0.2,
    lastName: {
      fontWeight: 600,
      colorKey: "primary", // The ONE accent
    },
  },

  tagline: {
    fontSize: 9,
    fontWeight: 400,
    letterSpacing: 1.8, // Stretched small caps feel
    colorKey: "muted",
  },
} as const;

/* ── OG IMAGE STYLES ── */
export const OG_STYLES = {
  dimensions: {
    width: 1200,
    height: 630,
  },

  padding: {
    horizontal: 96, // More breathing room
    vertical: 80,
  },

  background: {
    start: BRAND_COLORS.bg.darkStart,
    end: BRAND_COLORS.bg.darkEnd,
    angle: 180, // Straight vertical — no diagonal clichés
  },

  /**
   * Minimal glow — just a whisper of orange, top-right only.
   * One source of light = more dramatic.
   */
  glow: {
    position: { top: -80, right: -80 },
    size: 420,
    color: BRAND_COLORS.primary,
    opacity: "17", // 2-digit hex alpha ≈ 9% — appended directly to hex color
  },

  /**
   * Monogram — oversized, raw, typographic.
   */
  monogram: {
    fontSize: 64,
    fontWeight: 900,
    letterSpacing: -2, // Tight = modern
    colors: {
      first: BRAND_COLORS.text.light,
      second: BRAND_COLORS.primary,
    },
  },

  /**
   * No decorative dashes — the negative space is the decoration.
   */
  dashes: {
    gap: 0,
    marginLeft: 0,
    items: [] as Array<{ width: number; height: number }>,
    color: "transparent",
    radius: 0,
  },

  name: {
    fontSize: 56,
    fontWeight: 800,
    color: BRAND_COLORS.text.light,
    lineHeight: 0.95, // Tight leading = magazine cover energy
    letterSpacing: -2,
    marginBottom: 20,
  },

  role: {
    fontSize: 11,
    fontWeight: 500,
    color: BRAND_COLORS.text.muted,
    letterSpacing: 6, // All-caps stretched label
    marginBottom: 28,
  },

  tagline: {
    fontSize: 18,
    fontWeight: 300, // Thin weight = contrast with heavy name
    color: BRAND_COLORS.text.muted,
    letterSpacing: 0.3,
  },

  location: {
    fontSize: 11,
    color: BRAND_COLORS.text.dim,
    letterSpacing: 3,
    marginTop: 24,
  },

  photo: {
    size: 280,
    border: {
      width: 1, // Hair-thin border — restrained luxury
      color: BRAND_COLORS.primary,
      radius: "4px", // Nearly square, not circular
    },
    shadow: {
      color: BRAND_COLORS.primary,
      opacity: "1F", // 2-digit hex alpha ≈ 12% — appended directly to hex color
      blur: 48,
    },
    fallback: {
      gradient: {
        start: BRAND_COLORS.bg.darkStart,
        end: BRAND_COLORS.bg.darkEnd,
        angle: 135,
      },
      text: {
        fontSize: 64,
        fontWeight: 900,
        color: BRAND_COLORS.primary, // Just the accent on dark
      },
    },
  },

  spacing: {
    monogramMarginBottom: 32, // More air = more confidence
    photoPaddingLeft: 60,
  },
} as const;

/* ── TYPE DEFINITIONS ── */
export type BrandColors = typeof BRAND_COLORS;
export type NavStyles = typeof NAV_STYLES;
export type OgStyles = typeof OG_STYLES;
