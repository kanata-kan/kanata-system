/**
 * @file spacing.ts
 * @description Two-layer spacing system:
 *   space  → granular scale for component-level gaps
 *   section → semantic tokens for section vertical rhythm
 */

export const SPACE = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
} as const;

export type SpaceKey = keyof typeof SPACE;

export const SECTION_SPACING = {
  y: { mobile: 60, desktop: 80 },
} as const;

export const CONTAINER_PADDING = {
  x: { mobile: 20, desktop: 48 },
} as const;
