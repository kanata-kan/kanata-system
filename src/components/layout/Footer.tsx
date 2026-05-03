/**
 * @file Footer.tsx
 * @description Minimal footer — identity aligned.
 * Server Component — uses CSS custom properties for theme, CSS for responsive.
 */

import type { Locale } from "@/data/content/types";
import { getContent } from "@/data/content";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const content = getContent(locale);
  return (
    <footer
      className="sc-footer"
      style={{
        borderTop: "1px solid var(--t-line)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
        background: "var(--t-bg)",
        transition: "background .35s",
      }}
    >
      {/* Left */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: "var(--t-faint)",
          letterSpacing: 1.5,
        }}
      >
        {content.footer.copyright}{" "}
        <span style={{ color: "var(--t-muted)" }}>{content.footer.author}</span>
      </span>

      {/* Right */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: "var(--t-faint)",
          letterSpacing: 1.5,
        }}
      >
        {content.footer.tagline}
      </span>
    </footer>
  );
}
