/**
 * @file Label.tsx
 * @description Étiquette de section : ligne horizontale + texte mono uppercase.
 * Atome pur — reçoit le thème via prop `c: Theme`.
 * Usage : <Label c={C}>01 — Work</Label>
 */

import type { Theme } from "@/tokens/themes";

interface LabelProps {
  children: React.ReactNode;
  c: Theme;
}

export function Label({ children, c }: LabelProps) {
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
      <div
        style={{ width: 18, height: 1.5, background: c.cyan, opacity: 0.7 }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: 1.5,
          color: c.cyan,
          overflowWrap: "anywhere",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}
