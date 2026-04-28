"use client";

import { memo, useState } from "react";
import { useLocale } from "@/hooks/useLocale";
import { useThemeContext } from "@/hooks/useTheme";
import { WindowDots } from "@/components/ui/WindowDots";

const COPY = {
  en: {
    file: "system-map-lite.ts",
    chaos: "Chaos",
    system: "System",
    captionIdle: "touch signal",
    captionLive: "signal active",
    ctaIdle: "Tap to organize",
    ctaLive: "Tap to reset",
    footerIdle: "Touch the cue and watch the pattern settle.",
    footerLive: "Same idea, tuned for mobile.",
  },
  fr: {
    file: "system-map-lite.ts",
    chaos: "Chaos",
    system: "Systeme",
    captionIdle: "signal tactile",
    captionLive: "signal actif",
    ctaIdle: "Touchez pour organiser",
    ctaLive: "Touchez pour reinitialiser",
    footerIdle: "Touchez le signal et regardez le schema se calmer.",
    footerLive: "La meme idee, ajustee pour mobile.",
  },
  ar: {
    file: "system-map-lite.ts",
    chaos: "فوضى",
    system: "نظام",
    captionIdle: "إشارة لمس",
    captionLive: "الإشارة نشطة",
    ctaIdle: "اضغط لترتيب الفوضى",
    ctaLive: "اضغط لإعادة المعاينة",
    footerIdle: "اضغط على الإشارة لترى النمط يستقر.",
    footerLive: "نفس الفكرة، لكن بشكل أخف للهاتف.",
  },
} as const;

const CHAOS_STACK = [
  { label: "Orders", x: 14, y: 18, rotate: -10 },
  { label: "Pricing", x: 56, y: 52, rotate: 7 },
  { label: "Reports", x: 18, y: 94, rotate: -6 },
];

const SYSTEM_STACK = [
  { label: "Inventory", x: 12, y: 16 },
  { label: "Automation", x: 12, y: 56 },
  { label: "Dashboard", x: 12, y: 96 },
];

function MiniNode({
  label,
  x,
  y,
  rotate = 0,
  accent,
  text,
  border,
  bg,
}: {
  label: string;
  x: number;
  y: number;
  rotate?: number;
  accent: string;
  text: string;
  border: string;
  bg: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 88,
        height: 28,
        transform: `rotate(${rotate}deg)`,
        borderRadius: 8,
        border: `1px solid ${border}`,
        background: bg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          insetInline: 10,
          top: 7,
          height: 2,
          borderRadius: 999,
          background: accent,
          opacity: 0.85,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 4,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8.5,
            fontWeight: 600,
            letterSpacing: 0.35,
            color: text,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export const HeroSystemTransformMobile = memo(function HeroSystemTransformMobile() {
  const { locale } = useLocale();
  const { C } = useThemeContext();
  const [organized, setOrganized] = useState(false);
  const copy = COPY[locale];
  const isArabic = locale === "ar";
  const labelFont = isArabic ? "var(--font-arabic)" : "var(--font-mono)";
  const labelSpacing = isArabic ? 0 : 0.8;

  return (
    <div className="rv d4" style={{ width: "100%" }}>
      <div
        style={{
          borderRadius: 16,
          padding: 1,
          background: `linear-gradient(145deg, ${C.border2}, ${C.line}, ${C.border})`,
        }}
      >
        <div
          style={{
            borderRadius: 15,
            overflow: "hidden",
            background: C.bg2,
            boxShadow: C.shadow,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderBottom: `1px solid ${C.line}`,
              background: C.bg3,
            }}
          >
            <WindowDots />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: C.muted,
                letterSpacing: 0.5,
              }}
            >
              {copy.file}
            </span>
            <span
              style={{
                marginInlineStart: "auto",
                fontFamily: labelFont,
                fontSize: 8,
                color: organized ? C.cyan : C.amber,
                letterSpacing: labelSpacing,
              }}
            >
              {organized ? copy.captionLive : copy.captionIdle}
            </span>
          </div>

          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr 28px 1fr",
              gap: 10,
              padding: 16,
              alignItems: "center",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 28,
                right: 28,
                top: "50%",
                height: 1,
                background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`,
                opacity: organized ? 0.55 : 0.18,
                transform: `translateY(-0.5px) scaleX(${organized ? 1 : 0.72})`,
                transformOrigin: "center",
                transition: "transform .3s ease, opacity .3s ease",
                pointerEvents: "none",
              }}
            />

            <div>
              <div
                style={{
                  fontFamily: labelFont,
                  fontSize: 9,
                  letterSpacing: isArabic ? 0 : 1,
                  color: organized ? C.muted : C.faint,
                  marginBottom: 10,
                  transition: "color .24s ease",
                }}
              >
                {copy.chaos}
              </div>
              <div
                style={{
                  position: "relative",
                  height: 134,
                  borderRadius: 12,
                  border: `1px dashed ${C.border}`,
                  background: `linear-gradient(180deg, ${C.card}, ${C.bg2})`,
                  opacity: organized ? 0.62 : 1,
                  transform: `translateX(${organized ? -4 : 0}px) scale(${organized ? 0.985 : 1})`,
                  transition: "transform .32s ease, opacity .32s ease",
                }}
              >
                {CHAOS_STACK.map((node) => (
                  <MiniNode
                    key={node.label}
                    label={node.label}
                    x={node.x}
                    y={node.y}
                    rotate={node.rotate}
                    accent={`linear-gradient(90deg, ${C.faint}, transparent)`}
                    text={C.muted}
                    border={C.border}
                    bg={C.card}
                  />
                ))}
              </div>
            </div>

            <div
              aria-hidden="true"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                data-hero-cue="pulse"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: `1px solid ${C.border2}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: organized ? C.cyan : C.amber,
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  background: C.bg3,
                  transform: `scale(${organized ? 1 : 0.96})`,
                  animation: organized ? "none" : "heroCuePulse 2.6s ease-in-out infinite",
                  transition: "transform .24s ease, color .24s ease",
                }}
              >
                {">"}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: labelFont,
                  fontSize: 9,
                  letterSpacing: isArabic ? 0 : 1,
                  color: C.cyan,
                  marginBottom: 10,
                }}
              >
                {copy.system}
              </div>
              <div
                style={{
                  position: "relative",
                  height: 134,
                  borderRadius: 12,
                  border: `1px solid ${C.border2}`,
                  background: `linear-gradient(180deg, ${C.bg3}, ${C.bg2})`,
                  opacity: organized ? 1 : 0.82,
                  transform: `translateX(${organized ? 0 : 4}px) scale(${organized ? 1 : 0.985})`,
                  transition: "transform .32s ease, opacity .32s ease",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 12,
                    borderRadius: 10,
                    backgroundImage: `linear-gradient(${C.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${C.gridLine} 1px, transparent 1px)`,
                    backgroundSize: "22px 22px",
                    opacity: 0.8,
                  }}
                />
                {SYSTEM_STACK.map((node) => (
                  <MiniNode
                    key={node.label}
                    label={node.label}
                    x={node.x}
                    y={node.y}
                    accent={`linear-gradient(90deg, ${C.cyan}, ${C.purple})`}
                    text={C.text}
                    border={C.border2}
                    bg={C.bg3}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: "0 16px 12px" }}>
            <button
              type="button"
              data-hero-cue="pulse"
              aria-pressed={organized}
              onClick={() => setOrganized((current) => !current)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                border: `1px solid ${organized ? C.border2 : C.border}`,
                borderRadius: 999,
                padding: "11px 14px",
                background: organized
                  ? `linear-gradient(180deg, ${C.bg3}, ${C.bg2})`
                  : `linear-gradient(180deg, ${C.bg2}, ${C.card})`,
                cursor: "pointer",
                touchAction: "manipulation",
                transition:
                  "border-color .24s ease, background .24s ease, transform .24s ease",
                animation: organized ? "none" : "heroCuePulse 2.6s ease-in-out infinite",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  minWidth: 0,
                  textAlign: isArabic ? "right" : "left",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: organized ? C.cyan : C.amber,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: labelFont,
                    fontSize: isArabic ? 11.5 : 9.5,
                    fontWeight: 700,
                    letterSpacing: isArabic ? 0 : 0.45,
                    color: C.text,
                    lineHeight: 1.35,
                  }}
                >
                  {organized ? copy.ctaLive : copy.ctaIdle}
                </span>
              </span>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: organized ? C.cyan : C.muted,
                  letterSpacing: 0.45,
                  flexShrink: 0,
                }}
              >
                {organized ? "reset()" : "activate()"}
              </span>
            </button>
          </div>

          <div
            style={{
              padding: "10px 16px 14px",
              borderTop: `1px solid ${C.line}`,
            }}
          >
            <span
              style={{
                fontFamily: labelFont,
                fontSize: 9,
                color: C.muted,
                letterSpacing: labelSpacing,
                lineHeight: 1.5,
              }}
            >
              {organized ? copy.footerLive : copy.footerIdle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export const HeroSystemTransformPlaceholder = memo(
  function HeroSystemTransformPlaceholder() {
    const { C } = useThemeContext();

    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            borderRadius: 16,
            padding: 1,
            background: `linear-gradient(145deg, ${C.border2}, ${C.line}, ${C.border})`,
          }}
        >
          <div
            style={{
              borderRadius: 15,
              overflow: "hidden",
              background: C.bg2,
              boxShadow: C.shadow,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                borderBottom: `1px solid ${C.line}`,
                background: C.bg3,
              }}
            >
              <WindowDots />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: C.muted,
                  letterSpacing: 0.5,
                }}
              >
                system-map.ts
              </span>
            </div>
            <div
              style={{
                height: 292,
                position: "relative",
                backgroundImage: `linear-gradient(${C.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${C.gridLine} 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
                opacity: 0.72,
              }}
            />
          </div>
        </div>
      </div>
    );
  },
);
