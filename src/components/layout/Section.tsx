/**
 * @file Section.tsx
 * @description Primitive de section réutilisable.
 * Gère automatiquement : padding vertical responsive, bordure inférieure,
 * transition de background, et background alternatif (bg2).
 * Élimine le boilerplate répété dans chaque section.
 * Uses CSS classes (.sc-section) — no JS hooks needed.
 */

interface SectionProps {
  id: string;
  bg?: "default" | "alt";
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Section({ id, bg = "default", children, style }: SectionProps) {
  const className = bg === "alt" ? "sc-section sc-section--alt" : "sc-section";

  return (
    <section id={id} className={className} style={style}>
      {children}
    </section>
  );
}
