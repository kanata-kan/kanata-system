/**
 * @file Container.tsx
 * @description Centralized container component with breakpoint-aware max-widths.
 * Replaces repeated maxWidth + margin patterns throughout sections.
 */

import { useResponsiveContext } from "@/hooks/useResponsive";
import { BREAKPOINTS } from "@/tokens/breakpoints";
import { CONTAINER_PADDING } from "@/tokens/spacing";

type ContainerVariant = "narrow" | "default" | "wide";

const MAX_WIDTH: Record<ContainerVariant, number> = {
  narrow: BREAKPOINTS.md, // 768
  default: BREAKPOINTS.xl, // 1280
  wide: BREAKPOINTS["2xl"], // 1536
};

interface ContainerProps {
  variant?: ContainerVariant;
  as?: React.ElementType;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Container({
  variant = "default",
  as: Tag = "div",
  children,
  style,
}: ContainerProps) {
  const { isMobile } = useResponsiveContext();
  const px = isMobile
    ? CONTAINER_PADDING.x.mobile
    : CONTAINER_PADDING.x.desktop;

  return (
    <Tag
      style={{
        maxWidth: MAX_WIDTH[variant],
        margin: "0 auto",
        paddingLeft: px,
        paddingRight: px,
        width: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
