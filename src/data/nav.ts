/**
 * @file nav.ts
 * @description Liens de navigation.
 */

export interface NavLink {
  id: string;
  n: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: "work", n: "01", label: "Approach" },
  { id: "about", n: "02", label: "Mindset" },
  { id: "skills", n: "03", label: "Tools" },
  { id: "contact", n: "04", label: "Contact" },
];
