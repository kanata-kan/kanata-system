/**
 * @file Hero.tsx
 * @description Section Hero : combines HeroContent, HeroStats, HeroAvatar.
 * Handles layout, glow orbs, grid background, and scroll indicator.
 * Delegates all content to subcomponents.
 */
"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { HeroContent, HeroStats, HeroAvatar, PILLS } from "./Hero/index";
import { Container } from "@/components/layout/Container";
import { SECTION_SPACING } from "@/tokens/spacing";

export function Hero() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();

  return (
    <section
      id="top"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: isMobile
          ? SECTION_SPACING.y.mobile
          : SECTION_SPACING.y.desktop,
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

      <Container variant="wide">
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 32 : 48,
            alignItems: isMobile ? "stretch" : "flex-start",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* LEFT — wider column for name & text */}
          <div style={{ flex: isMobile ? "unset" : "1.3 1 0%", minWidth: 0 }}>
            <HeroContent />
          </div>

          {/* RIGHT — card column */}
          <div
            style={{
              flex: isMobile ? "unset" : "0.7 1 0%",
              minWidth: isMobile ? "unset" : 300,
              maxWidth: isMobile ? "unset" : 380,
              display: "flex",
              justifyContent: isMobile ? "stretch" : "flex-end",
              paddingTop: isMobile ? 0 : 16,
            }}
          >
            <HeroAvatar />
          </div>
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
          {PILLS.map((p) => (
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

        {/* Stats — desktop only */}
        {!isMobile && <HeroStats />}
      </Container>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: isMobile ? 20 : 48,
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
          SCROLL
        </span>
        <div style={{ width: 28, height: 1, background: C.text }} />
      </div>
    </section>
  );
}
