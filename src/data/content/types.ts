/**
 * @file content/types.ts
 * @description Type definitions for all site content.
 * Designed for i18n — each locale file implements SiteContent.
 */

export type Locale = "en" | "fr" | "ar";

/* ── Meta ── */
export interface MetaContent {
  title: string;
  description: string;
  author: string;
  keywords: string;
  siteUrl: string;
  ogType: string;
  ogSiteName: string;
  twitterHandle: string;
}

/* ── Nav ── */
export interface NavLinkContent {
  id: string;
  n: string;
  label: string;
}

export interface NavContent {
  logoInitial: string;
  logoName: string;
  logoTagline: string;
  links: NavLinkContent[];
}

/* ── Hero ── */
export interface HeroNameContent {
  base: string;
  highlight: string;
  lastName: string;
}

export interface HeroCtaContent {
  primary: string;
  secondary: string;
}

export interface SocialLinkContent {
  href: string;
  label: string;
}

export interface HeroAvatarContent {
  displayName: string;
  tagline: string;
  locationShort: string;
  infoItems: string[];
  socials: SocialLinkContent[];
}

export interface HeroContent {
  badge: string;
  name: HeroNameContent;
  roles: string[];
  pills: string[];
  bio: string;
  cta: HeroCtaContent;
  scroll: string;
  avatar: HeroAvatarContent;
}

/* ── About ── */
export interface AboutTagContent {
  text: string;
  colorKey: string;
}

export interface CodeToken {
  text: string;
  colorKey: string;
}

export interface AboutContent {
  label: string;
  headingLine1: string;
  headingLine2: string;
  paragraphs: string[];
  tags: AboutTagContent[];
  codeFilename: string;
  codeRows: CodeToken[][];
}

/* ── Work ── */
export interface WorkContent {
  label: string;
  heading: string;
  subtitle: string;
}

/* ── Projects ── */
export interface ProjectContent {
  n: string;
  year: string;
  name: string;
  type: string;
  desc: string;
  longDesc: string;
  stack: string[];
  status: string;
  statusColor: string;
  link: string;
  highlights: string[];
  color: string;
}

/* ── Skills ── */
export interface SkillsContent {
  label: string;
  heading: string;
  subtitle: string;
}

export interface SkillGroupContent {
  title: string;
  color: string;
  items: string[];
}

/* ── Stats ── */
export interface MetricContent {
  value: string;
  label: string;
  colorKey: string;
}

/* ── Contact ── */
export interface ContactContent {
  label: string;
  headingLine1: string;
  headingHighlight: string;
  paragraphLine1: string;
  paragraphLine2: string;
  email: string;
  copyLabel: string;
  copiedLabel: string;
  socials: string[];
}

/* ── Footer ── */
export interface FooterContent {
  copyright: string;
  author: string;
  tagline: string;
}

/* ── Full Site Content ── */
export interface SiteContent {
  meta: MetaContent;
  nav: NavContent;
  hero: HeroContent;
  about: AboutContent;
  work: WorkContent;
  skills: SkillsContent;
  contact: ContactContent;
  footer: FooterContent;
  stats: MetricContent[];
  techStrip: string[];
  projects: ProjectContent[];
  skillGroups: SkillGroupContent[];
}
