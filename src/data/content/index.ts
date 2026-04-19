/**
 * @file content/index.ts
 * @description Locale resolver — exports the active locale's content.
 * To switch language, change DEFAULT_LOCALE or pass a locale to getContent().
 * To add a language, create a new file (e.g. fr.ts) and register it below.
 */

import { en } from "./en/index";
import { fr } from "./fr/index";
import { ar } from "./ar/index";
import type { SiteContent, Locale } from "./types";

const locales: Record<string, SiteContent> = { en, fr, ar };

const DEFAULT_LOCALE: Locale = "en";

export function getContent(locale: Locale = DEFAULT_LOCALE): SiteContent {
  return locales[locale] ?? locales[DEFAULT_LOCALE];
}

/** Active content — import this in components */
export const content: SiteContent = getContent();

export type {
  Locale,
  SiteContent,
  MetaContent,
  NavContent,
  NavLinkContent,
  HeroContent,
  HeroNameContent,
  HeroCtaContent,
  HeroAvatarContent,
  SocialLinkContent,
  AboutContent,
  AboutTagContent,
  CodeToken,
  WorkContent,
  ProjectContent,
  CaseStudyContent,
  CaseStudyScreenshot,
  SkillsContent,
  SkillGroupContent,
  MetricContent,
  ContactContent,
  FooterContent,
} from "./types";
