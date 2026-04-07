/**
 * @file projects.ts
 * @description Projects data — sourced from content system.
 * Provides PROJECTS array and slug-based lookup.
 */

import { content } from "@/data/content";
import type { ProjectContent } from "@/data/content";

export type { ProjectContent as Project } from "@/data/content";

export const PROJECTS = content.projects;

export function getProjectBySlug(slug: string): ProjectContent | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
