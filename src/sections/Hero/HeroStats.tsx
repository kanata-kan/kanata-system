/**
 * @file HeroStats.tsx
 * @description Hero stats bar (desktop only) sourced from the content system.
 * with colored values and separators. No internal state.
 */
"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { useLocale } from "@/hooks/useLocale";
import { resolveColor } from "@/tokens/themes";
import { getHeroMetrics } from "@/data/stats";
import { TEXT } from "@/tokens/typography";

export function HeroStats() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const { locale } = useLocale();
  const metrics = getHeroMetrics(locale);

  if (isMobile) {
    return (
      <div
        className="rv d7"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          marginTop: 28,
          borderRadius: 10,
          overflow: "hidden",
          border: `1px solid ${C.line}`,
          background: C.line,
          position: "relative",
          zIndex: 1,
        }}
      >
        {metrics.map((m) => (
          <div
            key={m.label}
            style={{
              padding: "14px 16px",
              background: C.bg2,
              transition: "background .35s",
            }}
          >
            <div
              style={{
                ...TEXT.metricValue(resolveColor(C, m.colorKey)),
                fontSize: 20,
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                ...TEXT.metricLabel(C),
                marginTop: 3,
                fontSize: 9,
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="rv d7"
      style={{
        display: "flex",
        gap: 0,
        marginTop: 48,
        borderTop: `1px solid ${C.line}`,
        paddingTop: 28,
      }}
    >
      {metrics.map((m, i) => (
        <div
          key={m.label}
          style={{
            paddingRight: 36,
            marginRight: 36,
            borderRight:
              i < metrics.length - 1 ? `1px solid ${C.line}` : "none",
          }}
        >
          <div
            style={{
              ...TEXT.metricValue(resolveColor(C, m.colorKey)),
              fontSize: 30,
            }}
          >
            {m.value}
          </div>
          <div style={{ ...TEXT.metricLabel(C), marginTop: 5 }}>{m.label}</div>
        </div>
      ))}
    </div>
  );
}
