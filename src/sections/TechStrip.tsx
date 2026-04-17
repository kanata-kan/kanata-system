/**
 * @file TechStrip.tsx
 * @description Bande défilante (marquee) de technologies.
 * Utilise useThemeContext pour accéder aux tokens de couleur.
 * Inclut : bordures haut/bas, background bg2, ✦ décoratifs,
 * couleurs alternées, et séparateurs entre items.
 */
"use client";

import { getTechStrip } from "@/data/skills";
import { useThemeContext } from "@/hooks/useTheme";
import { useLocale } from "@/hooks/useLocale";
import { Container } from "@/components/layout/Container";

export function TechStrip() {
  const { locale } = useLocale();
  const techStrip = getTechStrip(locale);
  const { C } = useThemeContext();
  const items = [...techStrip, ...techStrip];

  return (
    <div
      style={{
        borderTop: `1px solid ${C.line}`,
        borderBottom: `1px solid ${C.line}`,
        padding: "13px 0",
        overflow: "hidden",
        background: C.bg2,
        transition: "background .35s",
      }}
    >
      <Container variant="wide">
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "marquee 30s linear infinite",
          }}
        >
          {items.map((t, i) => (
            <span
              key={`${t}-${i}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: 2.5,
                color: i % 4 === 0 ? C.cyan : C.muted,
                padding: "0 28px",
                textTransform: "uppercase",
                borderRight: `1px solid ${C.line}`,
                whiteSpace: "nowrap",
                transition: "color .35s",
              }}
            >
              {i % 6 === 0 && (
                <span style={{ color: C.cyan, marginRight: 8, opacity: 0.5 }}>
                  ✦
                </span>
              )}
              {t}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
