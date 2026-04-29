"use client";

import { memo, useState, useCallback } from "react";
import { useLocale } from "@/hooks/useLocale";
import { useThemeContext } from "@/hooks/useTheme";
import { WindowDots } from "@/components/ui/WindowDots";

// ─── Keyframes injected once ────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes sysNodeIn {
    0%   { transform: translateZ(0) scale(0.55) translateY(8px); opacity: 0; }
    65%  { transform: translateZ(0) scale(1.07) translateY(-1.5px); opacity: 1; }
    100% { transform: translateZ(0) scale(1) translateY(0); opacity: 1; }
  }
  @keyframes chaosNodeDim {
    0%   { opacity: 1; filter: blur(0px); }
    100% { opacity: 0.22; filter: blur(0.6px); }
  }
  @keyframes chaosNodeRevive {
    0%   { opacity: 0.22; filter: blur(0.6px); }
    100% { opacity: 1; filter: blur(0px); }
  }
  @keyframes sysNodeDim {
    0%   { opacity: 1; }
    100% { opacity: 0.28; transform: translateZ(0) scale(0.92) translateY(3px); }
  }
  @keyframes arrowOrganize {
    0%   { transform: scale(1) rotate(0deg); }
    25%  { transform: scale(1.5) rotate(12deg); }
    55%  { transform: scale(0.85) rotate(-6deg); }
    80%  { transform: scale(1.1) rotate(2deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  @keyframes particleDot {
    0%   { transform: translateX(-6px) scale(0); opacity: 0; }
    25%  { transform: translateX(0) scale(1); opacity: 1; }
    75%  { transform: translateX(0) scale(1); opacity: 1; }
    100% { transform: translateX(6px) scale(0); opacity: 0; }
  }
  @keyframes dotBeat {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 currentColor; }
    50%       { transform: scale(1.5); box-shadow: 0 0 0 3px transparent; }
  }
  @keyframes ripple {
    from { transform: scale(0); opacity: 0.35; }
    to   { transform: scale(2.8); opacity: 0; }
  }
  @keyframes lineGlow {
    0%, 100% { opacity: 0.18; }
    50%       { opacity: 0.65; }
  }
  @keyframes scanLine {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

// ─── Copy ────────────────────────────────────────────────────────────────────
const COPY = {
  en: {
    file: "system-transform.ts",
    chaos: "Chaos",
    system: "System",
    captionIdle: "chaos mode",
    captionLive: "system ready",
    ctaIdle: "Tap to transform",
    ctaLive: "Tap to reset",
    footerIdle: "Tap to see the transformation.",
    footerLive: "Reliable systems, built from chaos.",
    message: "I turn chaos into reliable systems",
  },
  fr: {
    file: "system-transform.ts",
    chaos: "Chaos",
    system: "Systeme",
    captionIdle: "mode chaos",
    captionLive: "systeme pret",
    ctaIdle: "Touchez pour transformer",
    ctaLive: "Touchez pour reinitialiser",
    footerIdle: "Touchez pour voir la transformation.",
    footerLive: "Systemes fiables, construits a partir du chaos.",
    message: "Je transforme le chaos en systemes fiables",
  },
  ar: {
    file: "system-transform.ts",
    chaos: "فوضى",
    system: "نظام",
    captionIdle: "وضع فوضى",
    captionLive: "النظام جاهز",
    ctaIdle: "اضغط للتحويل",
    ctaLive: "اضغط لإعادة",
    footerIdle: "اضغط لرؤية التحويل.",
    footerLive: "أنظمة موثوقة، مبينة من الفوضى.",
    message: "أحول الفوضى إلى أنظمة موثوقة",
  },
} as const;

const CHAOS_ITEMS = [
  { label: "Data", x: 8, y: 12 },
  { label: "Errors", x: 56, y: 38 },
  { label: "Process", x: 24, y: 82 },
];

const SYSTEM_ITEMS = [
  { label: "Structure", x: 12, y: 16 },
  { label: "Automation", x: 12, y: 56 },
  { label: "System", x: 12, y: 96 },
];

// ─── Particle dots in the center arrow column ────────────────────────────────
function FlowParticles({
  active,
  color,
  animKey,
}: {
  active: boolean;
  color: string;
  animKey: number;
}) {
  if (!active) return null;
  // 3 staggered dots
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={`${animKey}-${i}`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: color,
            marginTop: -2,
            marginLeft: -2,
            willChange: "transform, opacity",
            animation: `particleDot 0.7s ease-in-out ${i * 160}ms both`,
          }}
        />
      ))}
    </>
  );
}

// ─── MiniNode ─────────────────────────────────────────────────────────────────
// Key trick: passing `animKey` forces React to remount → re-fires CSS animation
function MiniNode({
  label,
  x,
  y,
  accent,
  text,
  border,
  bg,
  index = 0,
  animKey = 0,
  animName = "none",
}: {
  label: string;
  x: number;
  y: number;
  accent: string;
  text: string;
  border: string;
  bg: string;
  index?: number;
  animKey?: number;
  animName?: string;
}) {
  const delay = `${index * 60}ms`;

  return (
    <div
      // Remounting forces animation to replay cleanly
      key={`${label}-${animKey}`}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 76,
        height: 26,
        borderRadius: 6,
        border: `1px solid ${border}`,
        background: bg,
        overflow: "hidden",
        willChange: "transform, opacity, filter",
        animation:
          animName !== "none"
            ? `${animName} 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay} both`
            : undefined,
      }}
    >
      {/* color bar */}
      <div
        style={{
          position: "absolute",
          insetInline: 8,
          top: 6,
          height: 1.5,
          borderRadius: 999,
          background: accent,
          opacity: 0.8,
        }}
      />
      {/* label */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 3,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            fontWeight: 600,
            letterSpacing: 0.3,
            color: text,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export const HeroSystemTransformMobile = memo(
  function HeroSystemTransformMobile() {
    const { locale } = useLocale();
    const { C } = useThemeContext();
    const [organized, setOrganized] = useState(false);
    // Incremented on every toggle → forces node remount → re-fires animation
    const [animKey, setAnimKey] = useState(0);
    const [pressing, setPressing] = useState(false);
    const [showRipple, setShowRipple] = useState(false);

    const copy = COPY[locale];
    const isArabic = locale === "ar";
    const labelFont = isArabic ? "var(--font-arabic)" : "var(--font-mono)";
    const labelSpacing = isArabic ? 0 : 0.5;

    const handleToggle = useCallback(() => {
      setOrganized((v) => !v);
      setAnimKey((k) => k + 1);
      // Ripple effect
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);
    }, []);

    return (
      <>
        {/* Inject keyframes once */}
        <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

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
              {/* ── Titlebar ───────────────────────────────────────────── */}
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

                {/* Status badge */}
                <span
                  style={{
                    marginInlineStart: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontFamily: labelFont,
                    fontSize: 8,
                    color: organized ? C.green : C.amber,
                    letterSpacing: labelSpacing,
                    transition: "color 0.15s ease",
                  }}
                >
                  {/* Pulsing status dot */}
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: organized ? C.green : C.amber,
                      display: "inline-block",
                      animation: "dotBeat 1.2s ease-in-out infinite",
                      willChange: "transform",
                    }}
                  />
                  {organized ? copy.captionLive : copy.captionIdle}
                </span>
              </div>

              {/* ── Main panels ────────────────────────────────────────── */}
              <div
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "1fr 24px 1fr",
                  gap: 8,
                  padding: 14,
                  alignItems: "center",
                }}
              >
                {/* Animated center glow line */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 24,
                    right: 24,
                    top: "50%",
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`,
                    willChange: "transform, opacity",
                    animation: organized
                      ? "lineGlow 1.6s ease-in-out infinite"
                      : undefined,
                    opacity: organized ? undefined : 0.15,
                    transform: `translateY(-0.5px) scaleX(${organized ? 1 : 0.6})`,
                    transition: organized
                      ? undefined
                      : "transform 0.22s ease, opacity 0.22s ease",
                    pointerEvents: "none",
                  }}
                />

                {/* ── Chaos panel ──────────────────────────────────────── */}
                <div>
                  <div
                    style={{
                      fontFamily: labelFont,
                      fontSize: 9,
                      letterSpacing: isArabic ? 0 : 0.8,
                      color: organized ? C.faint : C.muted,
                      marginBottom: 8,
                      transition: "color 0.15s ease",
                    }}
                  >
                    {copy.chaos}
                  </div>
                  <div
                    style={{
                      position: "relative",
                      height: 120,
                      borderRadius: 10,
                      border: `1px dashed ${C.border}`,
                      background: `linear-gradient(180deg, ${C.card}, ${C.bg2})`,
                      willChange: "transform, opacity",
                      transform: `translateZ(0) translateX(${organized ? -4 : 0}px) scale(${organized ? 0.97 : 1})`,
                      opacity: organized ? 0.45 : 1,
                      transition:
                        "transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.22s ease",
                      overflow: "hidden",
                    }}
                  >
                    {/* Scan line when organizing */}
                    {organized && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(90deg, transparent, ${C.cyan}22, transparent)`,
                          width: "40%",
                          animation: "scanLine 1.8s linear infinite",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                    {CHAOS_ITEMS.map((node, i) => (
                      <MiniNode
                        key={`chaos-${node.label}-${animKey}`}
                        label={node.label}
                        x={node.x}
                        y={node.y}
                        index={i}
                        animKey={animKey}
                        animName={
                          organized
                            ? "chaosNodeDim"
                            : animKey > 0
                              ? "chaosNodeRevive"
                              : "none"
                        }
                        accent={`linear-gradient(90deg, ${C.faint}, transparent)`}
                        text={C.muted}
                        border={C.border}
                        bg={C.card}
                      />
                    ))}
                  </div>
                </div>

                {/* ── Arrow column ─────────────────────────────────────── */}
                <div
                  aria-hidden="true"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {/* Flow particles */}
                  <FlowParticles
                    active={organized}
                    color={C.cyan}
                    animKey={animKey}
                  />

                  <div
                    key={animKey}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: `1px solid ${C.border2}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: organized ? C.cyan : C.amber,
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      background: C.bg3,
                      willChange: "transform, color",
                      animation:
                        animKey > 0
                          ? `arrowOrganize 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) both`
                          : undefined,
                      transition: "color 0.15s ease",
                    }}
                  >
                    {">"}
                  </div>
                </div>

                {/* ── System panel ─────────────────────────────────────── */}
                <div>
                  <div
                    style={{
                      fontFamily: labelFont,
                      fontSize: 9,
                      letterSpacing: isArabic ? 0 : 0.8,
                      color: C.cyan,
                      marginBottom: 8,
                    }}
                  >
                    {copy.system}
                  </div>
                  <div
                    style={{
                      position: "relative",
                      height: 120,
                      borderRadius: 10,
                      border: `1px solid ${organized ? C.cyan + "55" : C.border2}`,
                      background: `linear-gradient(180deg, ${C.bg3}, ${C.bg2})`,
                      willChange: "transform, opacity",
                      transform: `translateZ(0) translateX(${organized ? 0 : 4}px) scale(${organized ? 1 : 0.97})`,
                      opacity: organized ? 1 : 0.75,
                      transition:
                        "transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.22s ease, border-color 0.22s ease",
                      // Subtle glow on organized
                      boxShadow: organized
                        ? `0 0 12px ${C.cyan}22, inset 0 0 8px ${C.cyan}11`
                        : "none",
                    }}
                  >
                    {/* Grid background */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 8,
                        borderRadius: 8,
                        backgroundImage: `linear-gradient(${C.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${C.gridLine} 1px, transparent 1px)`,
                        backgroundSize: "18px 18px",
                        opacity: organized ? 1 : 0.5,
                        transition: "opacity 0.22s ease",
                      }}
                    />
                    {SYSTEM_ITEMS.map((node, i) => (
                      <MiniNode
                        key={`sys-${node.label}-${animKey}`}
                        label={node.label}
                        x={node.x}
                        y={node.y}
                        index={i}
                        animKey={animKey}
                        animName={
                          organized
                            ? "sysNodeIn"
                            : animKey > 0
                              ? "sysNodeDim"
                              : "none"
                        }
                        accent={`linear-gradient(90deg, ${C.cyan}, ${C.purple})`}
                        text={C.text}
                        border={organized ? C.border2 : C.border}
                        bg={C.bg3}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Toggle button ────────────────────────────────────────── */}
              <div style={{ padding: "0 14px 10px" }}>
                <button
                  type="button"
                  aria-pressed={organized}
                  onPointerDown={() => setPressing(true)}
                  onPointerUp={() => setPressing(false)}
                  onPointerLeave={() => setPressing(false)}
                  onClick={handleToggle}
                  style={{
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    border: `1px solid ${organized ? C.cyan + "66" : C.border}`,
                    borderRadius: 999,
                    padding: "10px 12px",
                    background: organized
                      ? `linear-gradient(180deg, ${C.bg3}, ${C.bg2})`
                      : `linear-gradient(180deg, ${C.bg2}, ${C.card})`,
                    cursor: "pointer",
                    touchAction: "manipulation",
                    overflow: "hidden",
                    willChange: "transform",
                    transform: pressing ? "scale(0.97)" : "scale(1)",
                    transition:
                      "border-color 0.15s ease, background 0.2s ease, transform 0.1s ease",
                  }}
                >
                  {/* Ripple */}
                  {showRipple && (
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 60,
                        height: 60,
                        marginTop: -30,
                        marginLeft: -30,
                        borderRadius: "50%",
                        background: organized ? C.cyan : C.amber,
                        opacity: 0,
                        pointerEvents: "none",
                        animation: "ripple 0.55s ease-out both",
                        willChange: "transform, opacity",
                      }}
                    />
                  )}

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      minWidth: 0,
                      textAlign: isArabic ? "right" : "left",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: organized ? C.green : C.amber,
                        flexShrink: 0,
                        transition: "background-color 0.15s ease",
                        willChange: "transform",
                        animation: "dotBeat 1.2s ease-in-out infinite",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: labelFont,
                        fontSize: isArabic ? 11 : 9.5,
                        fontWeight: 700,
                        letterSpacing: isArabic ? 0 : 0.4,
                        color: C.text,
                        lineHeight: 1.3,
                      }}
                    >
                      {organized ? copy.ctaLive : copy.ctaIdle}
                    </span>
                  </span>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 8,
                      color: organized ? C.cyan : C.muted,
                      letterSpacing: 0.4,
                      flexShrink: 0,
                      transition: "color 0.15s ease",
                      position: "relative",
                    }}
                  >
                    {organized ? "reset()" : "transform()"}
                  </span>
                </button>
              </div>

              {/* ── Footer ──────────────────────────────────────────────── */}
              <div
                style={{
                  padding: "8px 14px 12px",
                  borderTop: `1px solid ${C.line}`,
                }}
              >
                <span
                  style={{
                    fontFamily: labelFont,
                    fontSize: 9,
                    color: C.muted,
                    letterSpacing: labelSpacing,
                    lineHeight: 1.4,
                  }}
                >
                  {organized ? copy.footerLive : copy.footerIdle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);

// ─── Placeholder (unchanged logic, small perf tweak) ────────────────────────
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
                system-transform.ts
              </span>
            </div>
            <div
              style={{
                contain: "strict",
                height: 260,
                position: "relative",
                backgroundImage: `linear-gradient(${C.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${C.gridLine} 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
                opacity: 0.7,
              }}
            />
          </div>
        </div>
      </div>
    );
  },
);
