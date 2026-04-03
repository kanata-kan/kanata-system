/**
 * @file breakpoints.ts
 * @description Single source of truth for responsive breakpoints.
 * Used by Container component and can be used in CSS media queries.
 */

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/** Usage in JS: window.innerWidth >= BREAKPOINTS.lg */
/** Usage in CSS: @media (min-width: ${BREAKPOINTS.md}px) */
