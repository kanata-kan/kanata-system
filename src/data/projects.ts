/**
 * @file projects.ts
 * @description Projects data — sourced from content system.
 * Provides PROJECTS array and slug-based lookup.
 */

import { getContent } from "@/data/content";
import type { Locale } from "@/data/content/types";
import type { ProjectContent } from "@/data/content";

export type { ProjectContent as Project } from "@/data/content";

export function getProjects(locale?: Locale) {
  const content = getContent(locale);
  return content.projects;
}

export function getProjectBySlug(
  slug: string,
  locale?: Locale,
): ProjectContent | undefined {
  const PROJECTS = getProjects(locale);
  return PROJECTS.find((p) => p.slug === slug);
}
