/**
 * @file en/index.ts
 * @description Assembles the full English SiteContent from modular parts.
 * Site-level content lives in ./site.ts
 * Projects live in ./projects/ (one file per project)
 */

import type { SiteContent } from "../types";
import { site } from "./site";
import { projects } from "./projects";

export const en: SiteContent = {
  ...site,
  projects,
};
