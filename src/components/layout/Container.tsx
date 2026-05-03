/**
 * @file Container.tsx
 * @description Centralized container component with breakpoint-aware max-widths.
 * Replaces repeated maxWidth + margin patterns throughout sections.
 * Uses CSS classes (.sc-container) for responsive padding — no JS hooks needed.
 */

type ContainerVariant = "narrow" | "default" | "wide";

const VARIANT_CLASS: Record<ContainerVariant, string> = {
  narrow: "sc-container sc-container--narrow",
  default: "sc-container sc-container--default",
  wide: "sc-container sc-container--wide",
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
  return (
    <Tag className={VARIANT_CLASS[variant]} style={style}>
      {children}
    </Tag>
  );
}
