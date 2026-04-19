/**
 * @file ar/index.ts
 * @description Assembles the full Arabic SiteContent from modular parts.
 * Site-level content lives in ./site.ts
 * Projects live in ./projects/ (one file per project)
 */

import type { SiteContent } from "../types";
import { site } from "./site";
import { projects } from "./projects";

export const ar: SiteContent = {
  ...site,
  projects,
};
