/**
 * @file HeroContent.tsx
 * @description Hero content with integrated avatar beside the name.
 * Layout: Badge → [Avatar + Name] → Role → Bio → CTA.
 * Manages cursor blink and role rotation state.
 */
"use client";

import { useState, useEffect } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { Avatar } from "@/components/ui/Avatar";
import { content } from "@/data/content";
import { HeroCTA } from "./HeroCTA";

const ROLES = content.hero.roles;

export const PILLS = content.hero.pills;

export function HeroContent() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const [cur, setCur] = useState(true);
  const [ri, setRi] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCur((c) => !c), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setRi((r) => (r + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const avatarSize = isMobile ? 80 : 120;

  return (
    <div>
      {/* Available badge with location */}
      <div
        className="rv d1"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: isMobile ? 28 : 36,
          background: `${C.green}15`,
          border: `1px solid ${C.green}35`,
          borderRadius: 40,
          padding: "6px 16px",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: C.green,
            display: "inline-block",
            animation: "glow 2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: C.green,
            letterSpacing: 1.5,
          }}
        >
          {content.hero.badge}
        </span>
        <span
          style={{
            width: 1,
            height: 12,
            background: `${C.green}40`,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: `${C.green}BB`,
            letterSpacing: 1,
          }}
        >
          {content.hero.avatar.infoItems[0]}
        </span>
      </div>

      {/* Avatar + Name integrated row */}
      <div
        className="rv d2"
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 18 : 28,
          marginBottom: isMobile ? 16 : 20,
        }}
      >
        <Avatar size={avatarSize} c={C} />

        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: isMobile
                ? "clamp(36px,10vw,52px)"
                : "clamp(56px,5.5vw,80px)",
              fontWeight: 700,
              lineHeight: 0.93,
              letterSpacing: "-.03em",
              color: C.text,
              paddingRight: 8,
            }}
          >
            {content.hero.name.base}
            <span
              className="grad-text"
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                paddingRight: 6,
              }}
            >
              {content.hero.name.highlight}
            </span>
            <br />
            {content.hero.name.lastName}
            <span style={{ color: C.cyan }}>.</span>
          </h1>
        </div>
      </div>

      {/* Rotating role */}
      <div
        className="rv d3"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 24,
            height: 1.5,
            background: `linear-gradient(90deg,${C.cyan},${C.purple})`,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: isMobile ? 11 : 13,
            color: C.sub,
            letterSpacing: 1,
            transition: "opacity 0.3s",
          }}
        >
          {content.hero.roles[ri]}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "0.9em",
              background: C.cyan,
              verticalAlign: "middle",
              marginLeft: 4,
              borderRadius: 1,
              opacity: cur ? 1 : 0,
              transition: "opacity .1s",
            }}
          />
        </span>
      </div>

      {/* Bio */}
      <p
        className="rv d4"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: isMobile ? 14 : 15,
          color: C.muted,
          lineHeight: 1.75,
          maxWidth: 540,
          marginBottom: 24,
          fontWeight: 300,
        }}
      >
        {content.hero.bio}
      </p>

      <HeroCTA />
    </div>
  );
}
