/**
 * @file nav.ts
 * @description Navigation links — sourced from content system.
 */

import { getContent } from "@/data/content";
import type { Locale } from "@/data/content/types";
export type { NavLinkContent as NavLink } from "@/data/content";

export function getNavLinks(locale?: Locale) {
  const content = getContent(locale);
  return content.nav.links;
}
