/**
 * @file Footer.tsx
 * @description Minimal footer — identity aligned.
 */

import type { Theme } from "@/tokens/themes";

interface FooterProps {
  C: Theme;
  isMobile: boolean;
}

export function Footer({ C, isMobile }: FooterProps) {
  return (
    <footer
      style={{
        padding: isMobile ? "16px 20px" : "16px 48px",
        borderTop: `1px solid ${C.line}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
        background: C.bg,
        transition: "background .35s",
      }}
    >
      {/* Left */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: C.faint,
          letterSpacing: 1.5,
        }}
      >
        © 2026 <span style={{ color: C.muted }}>Abdelilah Wajid</span>
      </span>

      {/* Right */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: C.faint,
          letterSpacing: 1.5,
        }}
      >
        Built with clarity · not complexity
      </span>
    </footer>
  );
}
