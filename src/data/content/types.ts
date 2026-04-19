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
  positioning: string;
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

/* ── Case Study ── */
export interface CaseStudyScreenshot {
  src: string;
  alt: string;
  caption: string;
}

/* ── Technical Deep Dive ── */
export interface TechEntity {
  name: string;
  desc: string;
  type: string;
  ssot?: string;
  central?: boolean;
}

export interface TechRelationship {
  from: string;
  to: string;
  label: string;
  cardinality: string;
}

export interface TechArchBlock {
  title: string;
  why: string;
  impact: string;
  points: string[];
}

export interface TechFlowStep {
  step: string;
  desc: string;
}

export interface TechGuarantee {
  title: string;
  desc: string;
  category: "data" | "financial" | "transaction";
}

export interface TechTradeoff {
  chose: string;
  over: string;
  reason: string;
}

export interface TechCodeSnippet {
  label: string;
  lines: string[];
}

export interface TechnicalDeepDive {
  sectionTitle: string;
  sectionSubtitle: string;
  erdTitle: string;
  entities: TechEntity[];
  relationships: TechRelationship[];
  archTitle: string;
  archBlocks: TechArchBlock[];
  flowTitle: string;
  flowSteps: TechFlowStep[];
  guaranteesTitle: string;
  guarantees: TechGuarantee[];
  codeTitle: string;
  codeSnippets: TechCodeSnippet[];
  flowNote: string;
  principlesTitle: string;
  principles: string[];
  tradeoffsTitle: string;
  tradeoffs: TechTradeoff[];
}

export interface CaseStudyContent {
  headline: string;
  subtitle: string;
  tags: string[];
  problem: string[];
  impact: string[];
  decisions: string[];
  architecture: string[];
  results: string[];
  screenshots: CaseStudyScreenshot[];
  cta: string;
  technicalDeepDive?: TechnicalDeepDive;
}

/* ── Projects ── */
export interface ProjectContent {
  n: string;
  slug: string;
  year: string;
  name: string;
  type: string;
  desc: string;
  longDesc: string;
  stack: Record<string, string[]>;
  status: string;
  statusColor: string;
  link: string;
  liveUrl?: string;
  repoUrl?: string;
  highlights: string[];
  color: string;
  caseStudy?: CaseStudyContent;
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
  socials: SocialLinkContent[];
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
