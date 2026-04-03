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
    <div className="inline-flex items-center gap-2.5 mb-4">
      <div
        style={{ width: 18, height: 1.5, background: c.cyan, opacity: 0.7 }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: 3,
          color: c.cyan,
        }}
        className="uppercase tracking-widest"
      >
        {children}
      </span>
    </div>
  );
}
