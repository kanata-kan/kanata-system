/**
 * @file Label.tsx
 * @description Étiquette de section : ligne horizontale + texte mono uppercase.
 * Supports both Server (CSS vars) and Client (Theme prop) usage.
 * Usage : <Label>01 — Work</Label>  or  <Label c={C}>01 — Work</Label>
 */

import type { Theme } from "@/tokens/themes";

interface LabelProps {
  children: React.ReactNode;
  c?: Theme;
}

export function Label({ children, c }: LabelProps) {
  const cyan = c ? c.cyan : "var(--t-cyan)";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
        maxWidth: "100%",
        marginBottom: 16,
      }}
    >
      <div style={{ width: 18, height: 1.5, background: cyan, opacity: 0.7 }} />
      <span
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 10,
          letterSpacing: "var(--ui-tracking)",
          color: cyan,
          overflowWrap: "anywhere",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}
