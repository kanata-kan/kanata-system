/**
 * @file NavLinks.tsx
 * @description Liens de navigation desktop avec numéros et hover.
 * Atome de navigation — aucun state interne.
 */

import Link from "next/link";
import type { Theme } from "@/tokens/themes";
import { getNavLinks } from "@/data/nav";
import { useLocale } from "@/hooks/useLocale";

interface NavLinksProps {
  C: Theme;
  onNavigate: (id: string) => void;
}

export function NavLinks({ C, onNavigate }: NavLinksProps) {
  const { locale } = useLocale();
  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: 1.5,
    color: C.muted,
    textTransform: "uppercase",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
      {getNavLinks(locale).map((l) =>
        l.id.startsWith("/") ? (
          <Link
            key={l.id}
            href={`/${locale}${l.id}`}
            className="hover-cyan"
            style={linkStyle}
          >
            <span style={{ color: C.faint, marginInlineEnd: 4 }}>{l.n}</span>
            {l.label}
          </Link>
        ) : (
          <button
            key={l.id}
            type="button"
            onClick={() => onNavigate(l.id)}
            className="hover-cyan"
            style={linkStyle}
          >
            <span style={{ color: C.faint, marginInlineEnd: 4 }}>{l.n}</span>
            {l.label}
          </button>
        ),
      )}
    </nav>
  );
}
