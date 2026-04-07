/**
 * @file ContentCard.tsx
 * @description Grid of content cards for case study sections (problem, decisions, etc).
 */

import type { Theme } from "@/tokens/themes";

interface ContentCardProps {
  items: string[];
  color: string;
  C: Theme;
  variant?: "default" | "danger" | "success";
  isMobile: boolean;
}

export function ContentCard({
  items,
  color,
  C,
  variant = "default",
  isMobile,
}: ContentCardProps) {
  const accent =
    variant === "danger"
      ? "#E5484D"
      : variant === "success"
        ? "#3FB950"
        : color;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? 10 : 14,
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            padding: isMobile ? "14px 16px" : "18px 20px",
            borderRadius: 10,
            background: C.bg2,
            borderTop: `1px solid ${C.line}`,
            borderRight: `1px solid ${C.line}`,
            borderBottom: `1px solid ${C.line}`,
            borderLeft: `3px solid ${accent}${variant === "danger" ? "80" : "50"}`,
            transition: "all .25s",
            cursor: "default",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderTopColor = `${accent}30`;
            e.currentTarget.style.borderRightColor = `${accent}30`;
            e.currentTarget.style.borderBottomColor = `${accent}30`;
            e.currentTarget.style.background = C.bg3;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderTopColor = C.line;
            e.currentTarget.style.borderRightColor = C.line;
            e.currentTarget.style.borderBottomColor = C.line;
            e.currentTarget.style.borderLeftColor = `${accent}${variant === "danger" ? "80" : "50"}`;
            e.currentTarget.style.background = C.bg2;
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: accent,
                fontWeight: 600,
                marginTop: 4,
                flexShrink: 0,
                opacity: 0.7,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: isMobile ? 13 : 14,
                color: C.sub,
                lineHeight: 1.65,
                fontWeight: 400,
                margin: 0,
              }}
            >
              {item}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
