/**
 * @file Stack.tsx
 * @description Layout primitive for flex layouts with consistent spacing.
 * Replaces raw flex divs throughout the application.
 */

import { SPACE, SpaceKey } from "@/tokens/spacing";

interface StackProps {
  gap?: SpaceKey;
  direction?: "row" | "column";
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  wrap?: boolean;
  as?: React.ElementType;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Stack({
  gap = "md",
  direction = "column",
  align,
  justify,
  wrap = false,
  as: Tag = "div",
  children,
  style,
}: StackProps) {
  return (
    <Tag
      style={{
        display: "flex",
        flexDirection: direction,
        gap: SPACE[gap],
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
