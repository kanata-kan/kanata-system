/**
 * @file NavLogo.tsx
 * @description Professional brand identity component with monogram, name, and tagline.
 * Hybrid styling: className for static styles, inline styles for theme integration.
 * Uses NAV_STYLES from brandStyles.ts for consistent styling.
 */

import type { Theme } from "@/tokens/themes";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/data/content";
import { BRAND } from "@/lib/brand";
import { NAV_STYLES, BRAND_COLORS } from "@/lib/brandStyles";

interface NavLogoProps {
  C: Theme;
  isMobile: boolean;
  onNavigate: (id: string) => void;
}

export function NavLogo({ C, isMobile, onNavigate }: NavLogoProps) {
  const { locale } = useLocale();
  const content = getContent(locale);

  // Extract first name and last name for highlighting from BRAND
  const nameParts = BRAND.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <button
      type="button"
      onClick={() => onNavigate("top")}
      aria-label="Go to top of page"
      className="nav-logo-button"
      style={{
        display: "flex",
        alignItems: "center",
        gap: NAV_STYLES.spacing.gap,
        flexShrink: 0,
        cursor: "pointer",
        border: "none",
        background: "transparent",
        padding: 0,
      }}
    >
      {/* Monogram — inline SVG mirroring icon.svg identity */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", flexShrink: 0 }}
      >
        <defs>
          <linearGradient
            id="navlogo-bg"
            x1="0"
            y1="0"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={C.bg} />
            <stop offset="100%" stopColor={C.bg2} />
          </linearGradient>
          <radialGradient id="navlogo-glow" cx="80%" cy="15%" r="55%">
            <stop offset="0%" stopColor={C.cyan} stopOpacity="0.13" />
            <stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
          </radialGradient>
          <pattern
            id="navlogo-grid"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 4 0 L 0 0 0 4"
              fill="none"
              stroke={C.faint}
              strokeWidth="0.4"
            />
          </pattern>
          <clipPath id="navlogo-clip">
            <rect width="32" height="32" rx="7" />
          </clipPath>
        </defs>

        <rect width="32" height="32" rx="7" fill="url(#navlogo-bg)" />
        <rect
          width="32"
          height="32"
          fill="url(#navlogo-grid)"
          clipPath="url(#navlogo-clip)"
          opacity={C.bg === "#0D1117" ? 0.55 : 0.3}
        />
        <rect width="32" height="32" rx="7" fill="url(#navlogo-glow)" />

        {/* A — white italic serif */}
        <text
          x="3"
          y="22"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic"
          fontWeight="700"
          fontSize="14"
          fill={C.text}
          opacity={0.95}
        >
          {BRAND.monogram[0]}
        </text>

        {/* W — cyan upright serif */}
        <text
          x="13"
          y="22"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="normal"
          fontWeight="700"
          fontSize="14"
          fill={C.cyan}
        >
          {BRAND.monogram[1]}
        </text>

        {/* Brand dot — signature mark */}
        <circle cx="29" cy="9" r="1.5" fill={C.cyan} />
      </svg>

      {/* Name and Tagline - Desktop Only */}
      {!isMobile && (
        <div
          className="nav-logo-text"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: NAV_STYLES.spacing.textGap,
          }}
        >
          {/* Name with highlighted last name */}
          <div
            className="nav-logo-name"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: NAV_STYLES.name.fontSize,
              letterSpacing: NAV_STYLES.name.letterSpacing,
              color: C.text,
              fontWeight: NAV_STYLES.name.fontWeight,
              display: "flex",
              alignItems: "baseline",
              gap: 4,
            }}
          >
            <span>{firstName}</span>
            <span
              style={{
                color: BRAND_COLORS.primary,
                fontWeight: NAV_STYLES.name.lastName.fontWeight,
              }}
            >
              {lastName}
            </span>
          </div>

          {/* Tagline */}
          <div
            suppressHydrationWarning
            className="nav-logo-tagline"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: NAV_STYLES.tagline.fontSize,
              color: C.muted,
              letterSpacing: NAV_STYLES.tagline.letterSpacing,
              fontWeight: NAV_STYLES.tagline.fontWeight,
            }}
          >
            {content.nav.logoTagline}
          </div>
        </div>
      )}
    </button>
  );
}
