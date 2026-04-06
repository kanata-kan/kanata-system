/**
 * @file NavLogo.tsx
 * @description Logo box "A." avec monogramme et tagline desktop.
 * Atome de navigation — aucun state interne.
 */

import type { Theme } from "@/tokens/themes";
import { content } from "@/data/content";

interface NavLogoProps {
  C: Theme;
  isMobile: boolean;
  onNavigate: (id: string) => void;
}

export function NavLogo({ C, isMobile, onNavigate }: NavLogoProps) {
  return (
    <button
      onClick={() => onNavigate("top")}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexShrink: 0,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: `linear-gradient(135deg,${C.cyan}20,${C.purple}20)`,
          border: `1px solid ${C.cyan}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: C.cyan,
            fontWeight: 500,
          }}
        >
          {content.nav.logoInitial}
        </span>
      </div>
      {!isMobile && (
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: 2,
              color: C.text,
              fontWeight: 500,
            }}
          >
            {content.nav.logoName}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              color: C.muted,
              letterSpacing: 1.5,
            }}
          >
            {content.nav.logoTagline}
          </div>
        </div>
      )}
    </button>
  );
}
