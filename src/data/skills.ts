/**
 * @file skills.ts
 * @description Skills and tech strip data — sourced from content system.
 */

import { getContent } from "@/data/content";
import type { Locale } from "@/data/content/types";
export type { SkillGroupContent as SkillGroup } from "@/data/content";

export function getSkillGroups(locale?: Locale) {
  const content = getContent(locale);
  return content.skillGroups;
}

export function getTechStrip(locale?: Locale) {
  const content = getContent(locale);
  return content.techStrip;
}
