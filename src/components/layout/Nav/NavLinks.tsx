/**
 * @file NavLinks.tsx
 * @description Liens de navigation desktop avec numéros et hover.
 * Atome de navigation — aucun state interne.
 */

import type { Theme } from "@/tokens/themes";
import { getNavLinks } from "@/data/nav";

interface NavLinksProps {
  C: Theme;
  onNavigate: (id: string) => void;
}

export function NavLinks({ C, onNavigate }: NavLinksProps) {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
      {getNavLinks().map((l) => (
        <button
          key={l.id}
          onClick={() => onNavigate(l.id)}
          className="hover-cyan"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: 1.5,
            color: C.muted,
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          <span style={{ color: C.faint, marginRight: 4 }}>{l.n}</span>
          {l.label}
        </button>
      ))}
    </nav>
  );
}
