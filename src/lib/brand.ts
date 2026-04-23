/**
 * @file brand.ts
 * @description Shared brand identity constants used across the application.
 * Single source of truth for monogram, name, and visual brand elements.
 */

export const BRAND = {
  /**
   * Monogram used in logo and OG images
   */
  monogram: "AW",

  /**
   * Full name (used in OG images)
   */
  name: "Abdelilah Wajid",

  /**
   * Role/title (used in OG images)
   */
  role: "PRODUCT ENGINEER",

  /**
   * Location (used in OG images)
   */
  location: "MARRAKECH, MOROCCO",

  /**
   * Profile photo path (used in OG images)
   */
  profilePhoto: "Abdelilah-Wajid.png",
} as const;

/**
 * Type-safe brand constants
 */
export type Brand = typeof BRAND;
