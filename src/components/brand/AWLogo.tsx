"use client";

import { AWMark } from "./AWMark";

const BRAND = {
  cyan: "#22d3ee",
  violet: "#a855f7",
  darkText: "#e2e8f0",
  lightText: "#0f172a",
  mutedDark: "#64748b",
  mutedLight: "#94a3b8",
  darkBg: "#0e1117",
  lightBg: "#f8fafc",
};

export interface AWLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "horizontal" | "stacked" | "mark-only";
  forceTheme?: "dark" | "light";
  dir?: "ltr" | "rtl";
}

export function AWLogo({
  size = "md",
  variant = "horizontal",
  forceTheme,
  dir = "ltr",
}: AWLogoProps) {
  const isDark = forceTheme === "dark";
  const isRTL = dir === "rtl";

  const scales = {
    xs: { mark: 24, name: 13, tagline: 9, gap: 8 },
    sm: { mark: 32, name: 15, tagline: 10, gap: 10 },
    md: { mark: 40, name: 18, tagline: 11, gap: 12 },
    lg: { mark: 56, name: 24, tagline: 13, gap: 16 },
    xl: { mark: 80, name: 32, tagline: 16, gap: 22 },
  };
  const sc = scales[size] || scales.md;
  const textColor = isDark ? BRAND.darkText : BRAND.lightText;
  const muteColor = isDark ? BRAND.mutedDark : BRAND.mutedLight;

  const wordmark = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isRTL ? "flex-end" : "flex-start",
        direction: "ltr",
      }}
    >
      <span
        style={{
          fontSize: sc.name,
          fontWeight: 800,
          color: textColor,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: textColor }}>Abdelilah</span>
        <span
          style={{
            background: `linear-gradient(90deg, ${BRAND.cyan}, ${BRAND.violet})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {" Wajid"}
        </span>
      </span>
      {size !== "xs" && (
        <span
          style={{
            fontSize: sc.tagline,
            color: muteColor,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginTop: 2,
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          Product Engineer
        </span>
      )}
    </div>
  );

  if (variant === "mark-only") {
    return <AWMark size={sc.mark} forceTheme={forceTheme} />;
  }

  if (variant === "stacked") {
    return (
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: sc.gap * 0.6,
        }}
      >
        <AWMark size={sc.mark} forceTheme={forceTheme} />
        <div style={{ textAlign: "center", direction: "ltr" }}>
          <div
            style={{
              fontSize: sc.name,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              background: `linear-gradient(90deg, ${BRAND.cyan}, ${BRAND.violet})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Abdelilah Wajid
          </div>
          {size !== "xs" && size !== "sm" && (
            <div
              style={{
                fontSize: sc.tagline,
                color: muteColor,
                marginTop: 4,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              Product Engineer
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      style={{
        display: "inline-flex",
        flexDirection: isRTL ? "row-reverse" : "row",
        alignItems: "center",
        gap: sc.gap,
      }}
    >
      <AWMark size={sc.mark} forceTheme={forceTheme} />
      {wordmark}
    </div>
  );
}
