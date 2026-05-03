/**
 * @file Screenshot.tsx
 * @description Compact screenshot card with browser chrome and lightbox on click.
 * Premium variant: hover overlay with zoom icon, refined chrome, glow shadow.
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { useLocale } from "@/hooks/useLocale";
import { getCaseStudyCopy } from "@/lib/caseStudyCopy";
import type { Theme } from "@/tokens/themes";
import type { CaseStudyScreenshot } from "@/data/content";

interface ScreenshotProps {
  screenshot: CaseStudyScreenshot;
  color: string;
  C: Theme;
  isMobile: boolean;
}

export function Screenshot({
  screenshot,
  color,
  C,
  isMobile,
}: ScreenshotProps) {
  const { locale } = useLocale();
  const copy = getCaseStudyCopy(locale);
  const [hovered, setHovered] = useState(false);

  return (
    <ImageLightbox
      src={screenshot.src}
      alt={screenshot.alt}
      caption={screenshot.caption}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${hovered ? color + "30" : C.line}`,
          background: C.bg2,
          maxWidth: isMobile ? "100%" : 540,
          boxShadow: hovered
            ? `0 12px 36px ${color}14, 0 0 0 1px ${color}18`
            : "0 2px 8px rgba(0,0,0,0.08)",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition:
            "box-shadow 0.32s ease, transform 0.32s cubic-bezier(0.16,1,0.3,1), border-color 0.32s ease",
        }}
      >
        {/* ── Browser chrome ── */}
        <div
          style={{
            padding: "7px 12px",
            background: hovered
              ? `color-mix(in srgb, ${C.bg3} 92%, ${color})`
              : C.bg3,
            borderBottom: `1px solid ${C.line}`,
            display: "flex",
            alignItems: "center",
            gap: 5,
            transition: "background 0.32s ease",
          }}
        >
          {/* Traffic lights */}
          {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((bg, i) => (
            <div
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: bg,
                opacity: hovered ? 0.75 : 0.42,
                transition: "opacity 0.28s",
                flexShrink: 0,
              }}
            />
          ))}

          {/* URL / label */}
          <div
            style={{
              marginLeft: 8,
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 5,
              minWidth: 0,
            }}
          >
            {/* Lock icon */}
            <svg
              width="7"
              height="8"
              viewBox="0 0 7 8"
              fill="none"
              aria-hidden="true"
              style={{ flexShrink: 0, opacity: 0.35 }}
            >
              <rect
                x="0.5"
                y="3.5"
                width="6"
                height="4"
                rx="1"
                stroke={C.faint}
              />
              <path
                d="M1.5 3.5V2.5a2 2 0 0 1 4 0v1"
                stroke={C.faint}
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                color: C.faint,
                letterSpacing: 0.4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                opacity: 0.8,
              }}
            >
              {screenshot.alt}
            </span>
          </div>

          {/* Expand hint */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              color: color,
              opacity: hovered ? 0.8 : 0,
              letterSpacing: 0.8,
              flexShrink: 0,
              transition: "opacity 0.28s",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {copy.screenshot.clickToExpand}
          </span>
        </div>

        {/* ── Image area ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            background: `linear-gradient(135deg, ${color}06 0%, ${color}10 100%)`,
            overflow: "hidden",
          }}
        >
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={800}
            height={450}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.015)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
            onError={(e) => {
              const t = e.currentTarget;
              t.style.display = "none";
              if (t.parentElement) {
                const ph = document.createElement("div");
                ph.style.cssText =
                  "display:flex;align-items:center;justify-content:center;width:100%;height:100%;position:absolute;inset:0;";
                ph.innerHTML = `<span style="font-family:var(--font-mono);font-size:10px;color:${C.faint};letter-spacing:2px;opacity:.5">SCREENSHOT</span>`;
                t.parentElement.appendChild(ph);
              }
            }}
          />

          {/* Hover overlay */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: hovered
                ? `color-mix(in srgb, ${color} 10%, rgba(0,0,0,0.35))`
                : "rgba(0,0,0,0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.32s ease",
              pointerEvents: "none",
            }}
          >
            {/* Zoom icon */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.22)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: hovered ? 1 : 0,
                transform: hovered ? "scale(1)" : "scale(0.72)",
                transition:
                  "opacity 0.28s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="7.5"
                  cy="7.5"
                  r="5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeOpacity="0.9"
                />
                <path
                  d="M11.5 11.5L15 15"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeOpacity="0.9"
                />
                {/* + lines */}
                <path
                  d="M7.5 5.5v4M5.5 7.5h4"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeOpacity="0.7"
                />
              </svg>
            </div>
          </div>

          {/* Bottom edge gradient for caption bleed */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 32,
              background: `linear-gradient(0deg, ${C.bg2} 0%, transparent 100%)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── Caption ── */}
        <div
          style={{
            padding: isMobile ? "9px 12px" : "11px 14px",
            borderTop: `1px solid ${C.line}`,
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          {/* Color dot accent */}
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: color,
              flexShrink: 0,
              marginTop: 4,
              opacity: 0.65,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: C.muted,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {screenshot.caption}
          </p>
        </div>
      </div>
    </ImageLightbox>
  );
}
