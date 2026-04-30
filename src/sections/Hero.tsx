/**
 * @file Hero.tsx
 * @description Section Hero : combines HeroContent, HeroStats, HeroAvatar.
 * Handles layout, glow orbs, grid background, and scroll indicator.
 * Delegates all content to subcomponents.
 */
"use client";

import dynamic from "next/dynamic";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { useLocale } from "@/hooks/useLocale";
import { HeroContent, HeroStats } from "./Hero/index";
import {
  HeroSystemTransformMobile,
  HeroSystemTransformPlaceholder,
} from "./Hero/HeroSystemTransformMobile";
import { Container } from "@/components/layout/Container";
import { SECTION_SPACING } from "@/tokens/spacing";
import { getContent } from "@/data/content";

const DesktopHeroSystemTransform = dynamic(
  () =>
    import("./Hero/HeroSystemTransform").then((mod) => mod.HeroSystemTransform),
  {
    ssr: false,
    loading: () => <HeroSystemTransformPlaceholder />,
  },
);

export function Hero() {
  const { C } = useThemeContext();
  const { isMobile, width } = useResponsiveContext();
  const showDesktopTransform = width >= 1100;
  const { locale } = useLocale();
  const content = getContent(locale);

  return (
    <section
      id="top"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: isMobile ? 32 : 80,
        paddingBottom: isMobile
          ? SECTION_SPACING.y.mobile
          : SECTION_SPACING.y.desktop,
        position: "relative",
        overflow: "hidden",
        borderBottom: `1px solid ${C.line}`,
        transition: "background .35s",
      }}
    >
      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-5%",
          width: isMobile ? 260 : 500,
          height: isMobile ? 260 : 500,
          borderRadius: "50%",
          background: `radial-gradient(circle,${C.glow1},transparent 68%)`,
          pointerEvents: "none",
          transition: "background .35s",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0%",
          left: "-8%",
          width: isMobile ? 180 : 360,
          height: isMobile ? 180 : 360,
          borderRadius: "50%",
          background: `radial-gradient(circle,${C.glow2},transparent 68%)`,
          pointerEvents: "none",
          transition: "background .35s",
        }}
      />

      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(${C.gridLine} 1px,transparent 1px),linear-gradient(90deg,${C.gridLine} 1px,transparent 1px)`,
          backgroundSize: "64px 64px",
          transition: "opacity .35s",
        }}
      />

      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 28 : 40,
            alignItems: isMobile ? "stretch" : "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* LEFT — identity + content */}
          <div style={{ flex: isMobile ? "unset" : "1.1 1 0%", minWidth: 0 }}>
            <HeroContent />

            {!showDesktopTransform && (
              <div style={{ marginTop: isMobile ? 24 : 28 }}>
                <HeroSystemTransformMobile />
              </div>
            )}
          </div>

          {/* RIGHT — system transform visualization (wide desktop only) */}
          {showDesktopTransform && (
            <div
              style={{
                flex: "0.85 1 0%",
                minWidth: 320,
                maxWidth: 468,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <DesktopHeroSystemTransform />
            </div>
          )}
        </div>

        {/* Pills — full-width below columns */}
        <div
          className="rv d5"
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginTop: isMobile ? 28 : 40,
            position: "relative",
            zIndex: 1,
          }}
        >
          {content.hero.pills.map((p) => (
            <span
              key={p}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: 0.5,
                padding: "5px 14px",
                borderRadius: 4,
                border: `1px solid ${C.line}`,
                color: C.muted,
                background: C.bg2,
                transition: "all .35s",
              }}
            >
              {p}
            </span>
          ))}
        </div>

        <HeroStats />
      </Container>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          insetInlineEnd: isMobile ? 20 : 48,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: 0.3,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: C.text,
            letterSpacing: 2,
          }}
        >
          {content.hero.scroll}
        </span>
        <div style={{ width: 28, height: 1, background: C.text }} />
      </div>
    </section>
  );
}
