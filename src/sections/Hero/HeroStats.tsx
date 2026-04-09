/**
 * @file HeroStats.tsx
 * @description Hero stats bar (desktop only): 4+ Years / 12+ Shipped / 20+ Clients
 * with colored values and separators. No internal state.
 */
"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { resolveColor } from "@/tokens/themes";
import { getHeroMetrics } from "@/data/stats";
import { TEXT } from "@/tokens/typography";

export function HeroStats() {
  const { C } = useThemeContext();

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
      {getHeroMetrics().map((m, i) => (
        <div
          key={m.label}
          style={{
            paddingRight: 36,
            marginRight: 36,
            borderRight:
              i < getHeroMetrics().length - 1 ? `1px solid ${C.line}` : "none",
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
