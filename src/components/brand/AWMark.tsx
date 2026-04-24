// ═══════════════════════════════════════════════════════════════
//  BRAND TOKENS — single source of truth
// ═══════════════════════════════════════════════════════════════
import { useId } from "react";

const BRAND = {
  cyan: "#22d3ee",
  violet: "#a855f7",
  darkBg: "#0e1117",
  lightBg: "#f8fafc",
  darkText: "#e2e8f0",
  lightText: "#0f172a",
};

export interface AWMarkProps {
  size?: number;
  className?: string;
  forceTheme?: "dark" | "light";
}

export function AWMark({ size = 40, className, forceTheme }: AWMarkProps) {
  // Unique gradId per instance to avoid SVG gradient conflicts
  const id = useId();
  const gradId = `aw-${id}`;
  const theme = forceTheme ?? "dark";
  const isDark = theme === "dark";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-label="AW — Abdelilah Wajid"
      role="img"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={BRAND.cyan} />
          <stop offset="100%" stopColor={BRAND.violet} />
        </linearGradient>
      </defs>
      {isDark && <rect width="100" height="100" rx="18" fill={BRAND.darkBg} />}
      <g
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8,82 L28,16 L50,82 L63,16 L76,82 L89,16" />
        <path d="M17.5,53 L42,53" />
      </g>
    </svg>
  );
}
