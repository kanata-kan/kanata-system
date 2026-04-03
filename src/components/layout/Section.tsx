/**
 * @file Section.tsx
 * @description Primitive de section réutilisable.
 * Gère automatiquement : padding vertical responsive, bordure inférieure,
 * transition de background, et background alternatif (bg2).
 * Élimine le boilerplate répété dans chaque section.
 */

import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { SECTION_SPACING } from "@/tokens/spacing";

interface SectionProps {
  id: string;
  bg?: "default" | "alt";
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Section({
  id,
  bg = "default",
  children,
  style,
}: SectionProps) {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();

  return (
    <section
      id={id}
      style={{
        paddingTop: isMobile
          ? SECTION_SPACING.y.mobile
          : SECTION_SPACING.y.desktop,
        paddingBottom: isMobile
          ? SECTION_SPACING.y.mobile
          : SECTION_SPACING.y.desktop,
        background: bg === "alt" ? C.bg2 : undefined,
        borderBottom: `1px solid ${C.line}`,
        transition: "background .35s",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
