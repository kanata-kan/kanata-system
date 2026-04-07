/**
 * @file SNum.tsx
 * @description Section number indicator for case study sections.
 */

interface SNumProps {
  n: string;
  color: string;
}

export function SNum({ n, color }: SNumProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 700,
        color,
        opacity: 0.5,
        letterSpacing: 1,
        userSelect: "none",
      }}
    >
      {n}
    </span>
  );
}
