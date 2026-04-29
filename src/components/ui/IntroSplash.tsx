"use client";

import { startTransition, useEffect, useId, useMemo, useState } from "react";
import { getContent } from "@/data/content";
import { useLocale } from "@/hooks/useLocale";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { useThemeContext } from "@/hooks/useTheme";
import {
  INTRO_SPLASH_COOKIE,
  INTRO_SPLASH_STORAGE_KEY,
  INTRO_SPLASH_VERSION,
  hasSeenIntroSplash,
} from "@/lib/introSplash";

type IntroMode = "desktop" | "mobile" | "reduced";
type IntroPhase = "idle" | "active" | "exit";

interface IntroTimings {
  activateDelay: number;
  stageDelay: number;
  stageDuration: number;
  markDelay: number;
  markDraw: number;
  crossbarDelay: number;
  crossbarDraw: number;
  railDelay: number;
  railDuration: number;
  copyDelay: number;
  copyDuration: number;
  taglineDelay: number;
  taglineDuration: number;
  haloDelay: number;
  haloDuration: number;
  sweepDelay: number;
  sweepDuration: number;
  exitStart: number;
  exitDuration: number;
  total: number;
}

const TIMINGS: Record<IntroMode, IntroTimings> = {
  desktop: {
    activateDelay: 40,
    stageDelay: 60,
    stageDuration: 700,
    markDelay: 140,
    markDraw: 720,
    crossbarDelay: 480,
    crossbarDraw: 260,
    railDelay: 680,
    railDuration: 420,
    copyDelay: 820,
    copyDuration: 520,
    taglineDelay: 980,
    taglineDuration: 620,
    haloDelay: 120,
    haloDuration: 900,
    sweepDelay: 660,
    sweepDuration: 900,
    exitStart: 2150,
    exitDuration: 360,
    total: 2550,
  },
  mobile: {
    activateDelay: 20,
    stageDelay: 40,
    stageDuration: 560,
    markDelay: 100,
    markDraw: 580,
    crossbarDelay: 400,
    crossbarDraw: 220,
    railDelay: 560,
    railDuration: 360,
    copyDelay: 700,
    copyDuration: 440,
    taglineDelay: 860,
    taglineDuration: 520,
    haloDelay: 80,
    haloDuration: 760,
    sweepDelay: 560,
    sweepDuration: 760,
    exitStart: 1850,
    exitDuration: 320,
    total: 2220,
  },
  reduced: {
    activateDelay: 0,
    stageDelay: 0,
    stageDuration: 180,
    markDelay: 0,
    markDraw: 220,
    crossbarDelay: 60,
    crossbarDraw: 140,
    railDelay: 80,
    railDuration: 180,
    copyDelay: 120,
    copyDuration: 180,
    taglineDelay: 180,
    taglineDuration: 180,
    haloDelay: 0,
    haloDuration: 180,
    sweepDelay: 0,
    sweepDuration: 0,
    exitStart: 760,
    exitDuration: 180,
    total: 980,
  },
};

function shouldReduceSplashMotion() {
  if (typeof window === "undefined") return false;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const navigatorWithConnection = navigator as Navigator & {
    connection?: { saveData?: boolean };
  };

  return reduceMotion || Boolean(navigatorWithConnection.connection?.saveData);
}

function markIntroSplashSeen() {
  if (typeof document === "undefined") return;

  try {
    sessionStorage.setItem(INTRO_SPLASH_STORAGE_KEY, INTRO_SPLASH_VERSION);
  } catch {
    // Ignore sessionStorage failures in private or restricted contexts.
  }
  document.cookie = `${INTRO_SPLASH_COOKIE}=${INTRO_SPLASH_VERSION}; path=/; samesite=lax`;
}

function hasSeenIntroSplashClient() {
  if (typeof window === "undefined") return false;

  try {
    return hasSeenIntroSplash(sessionStorage.getItem(INTRO_SPLASH_STORAGE_KEY));
  } catch {
    // Ignore sessionStorage failures in private or restricted contexts.
    return false;
  }
}

function BrandMark({
  active,
  mode,
  accentStart,
  accentEnd,
  dark,
}: {
  active: boolean;
  mode: IntroMode;
  accentStart: string;
  accentEnd: string;
  dark: boolean;
}) {
  const gradientId = useId();
  const timing = TIMINGS[mode];
  const size = mode === "desktop" ? 136 : mode === "mobile" ? 112 : 104;
  const strokeWidth = mode === "desktop" ? 9.5 : 8.5;
  const shadow = dark
    ? "0 0 0 1px rgba(255,255,255,0.03), 0 18px 38px rgba(0,0,0,0.42)"
    : "0 0 0 1px rgba(15,23,42,0.05), 0 18px 32px rgba(15,23,42,0.12)";

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        display: "grid",
        placeItems: "center",
        boxShadow: shadow,
        background: dark
          ? "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.03), rgba(255,255,255,0.01))"
          : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), rgba(255,255,255,0.55))",
        transform: active ? "scale(1)" : "scale(0.92)",
        willChange: "transform",
        transition: `transform ${timing.stageDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.stageDelay}ms`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        aria-hidden="true"
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentStart} />
            <stop offset="100%" stopColor={accentEnd} />
          </linearGradient>
        </defs>

        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke={dark ? "rgba(226,232,240,0.06)" : "rgba(15,23,42,0.08)"}
          strokeWidth="1"
          style={{
            opacity: active ? 1 : 0,
            transformOrigin: "50px 50px",
            transform: active ? "scale(1)" : "scale(0.92)",
            transition: `opacity ${timing.haloDuration}ms ease ${timing.haloDelay}ms, transform ${timing.haloDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.haloDelay}ms`,
          }}
        />

        <path
          d="M8,82 L28,16 L50,82 L63,16 L76,82 L89,16"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 430,
            strokeDashoffset: active ? 0 : 430,
            transition: `stroke-dashoffset ${timing.markDraw}ms cubic-bezier(0.4, 0, 0.2, 1) ${timing.markDelay}ms`,
          }}
        />

        <path
          d="M17.5,53 L42,53"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            strokeDasharray: 26,
            strokeDashoffset: active ? 0 : 26,
            transition: `stroke-dashoffset ${timing.crossbarDraw}ms cubic-bezier(0.4, 0, 0.2, 1) ${timing.crossbarDelay}ms`,
          }}
        />
      </svg>
    </div>
  );
}

export function IntroSplash({
  initialSeen = false,
}: {
  initialSeen?: boolean;
}) {
  const { dark, C } = useThemeContext();
  const { locale } = useLocale();
  const { isMobile } = useResponsiveContext();
  const content = useMemo(() => getContent(locale), [locale]);
  const [visible, setVisible] = useState(() => {
    if (initialSeen) return false;
    if (typeof window === "undefined") return false;
    const reduce = shouldReduceSplashMotion();
    const isNarrow = window.innerWidth < 768;
    const nav = navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    };
    const slowConn =
      Boolean(nav.connection?.saveData) ||
      /(^|\b)(2g|3g)\b/i.test(nav.connection?.effectiveType ?? "");
    // Only show on wider screens, fast connections, and when motion is allowed
    return !reduce && !isNarrow && !slowConn;
  });
  const [phase, setPhase] = useState<IntroPhase>("idle");
  const [mode, setMode] = useState<IntroMode>(isMobile ? "mobile" : "desktop");

  const isArabic = locale === "ar";
  const active = phase === "active" || phase === "exit";
  const exiting = phase === "exit";

  const palette = useMemo(
    () => ({
      shell: dark
        ? "linear-gradient(180deg, #060913 0%, #090f1d 100%)"
        : "linear-gradient(180deg, #fbfdff 0%, #f1f5f9 100%)",
      stage: dark
        ? "linear-gradient(180deg, rgba(12,18,30,0.96), rgba(10,15,25,0.94))"
        : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(241,245,249,0.96))",
      edge: dark
        ? `linear-gradient(145deg, ${C.border2}, rgba(255,255,255,0.03), ${C.line})`
        : `linear-gradient(145deg, ${C.border2}, rgba(15,23,42,0.05), ${C.line})`,
      frame: dark ? "rgba(226,232,240,0.06)" : "rgba(15,23,42,0.08)",
      eyebrow: C.cyan,
      name: C.text,
      tagline: dark ? "rgba(203,213,225,0.80)" : "rgba(51,65,85,0.82)",
      accentStart: C.cyan,
      accentEnd: C.purple,
      grid: dark ? `${C.cyan}14` : `${C.text}10`,
      glowLeft: `radial-gradient(circle, ${C.cyan}18 0%, transparent 68%)`,
      glowRight: `radial-gradient(circle, ${C.purple}14 0%, transparent 68%)`,
      sweep: `linear-gradient(90deg, transparent, ${C.cyan}12, ${C.purple}0D, transparent)`,
      shadow: dark
        ? "0 24px 60px rgba(0,0,0,0.45)"
        : "0 24px 56px rgba(15,23,42,0.12)",
    }),
    [C, dark],
  );

  useEffect(() => {
    if (!visible) return;

    if (hasSeenIntroSplashClient()) {
      const seenFrame = window.requestAnimationFrame(() => {
        startTransition(() => setVisible(false));
      });

      return () => window.cancelAnimationFrame(seenFrame);
    }

    const runtimeMode = shouldReduceSplashMotion()
      ? "reduced"
      : window.innerWidth < 768
        ? "mobile"
        : "desktop";
    const timing = TIMINGS[runtimeMode];

    markIntroSplashSeen();

    let activationTimeout = 0;
    const frame = window.requestAnimationFrame(() => {
      startTransition(() => setMode(runtimeMode));
      activationTimeout = window.setTimeout(
        () => setPhase("active"),
        timing.activateDelay,
      );
    });

    const exitTimer = window.setTimeout(() => {
      startTransition(() => setPhase("exit"));
    }, timing.exitStart);

    const hideTimer = window.setTimeout(() => {
      startTransition(() => setVisible(false));
    }, timing.total);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(activationTimeout);
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, [visible]);

  if (!visible) return null;

  const timing = TIMINGS[mode];
  const stageWidth =
    mode === "desktop" ? "min(72vw, 540px)" : "min(90vw, 380px)";
  const stagePadding = mode === "desktop" ? "76px 34px 34px" : "64px 22px 24px";
  const stageRadius = mode === "desktop" ? 28 : 24;
  const overlayOpacity = exiting ? 0 : 1;

  return (
    <div
      aria-hidden="true"
      dir="ltr"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: palette.shell,
        overflow: "hidden",
        opacity: overlayOpacity,
        transition: `opacity ${timing.exitDuration}ms ease`,
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${palette.grid} 1px, transparent 1px), linear-gradient(90deg, ${palette.grid} 1px, transparent 1px)`,
          backgroundSize: mode === "desktop" ? "40px 40px" : "32px 32px",
          opacity: active && mode !== "reduced" ? (dark ? 0.18 : 0.14) : 0,
          transition: `opacity ${timing.haloDuration}ms ease ${timing.haloDelay}ms`,
        }}
      />

      <div
        style={{
          position: "absolute",
          insetInlineStart: mode === "desktop" ? "-10vw" : "-24vw",
          top: mode === "desktop" ? "8vh" : "10vh",
          width: mode === "desktop" ? "38vw" : "58vw",
          height: mode === "desktop" ? "38vw" : "58vw",
          borderRadius: "50%",
          background: palette.glowLeft,
          opacity: active && mode !== "reduced" ? 1 : 0,
          transform: active ? "scale(1)" : "scale(0.7)",
          willChange: "transform, opacity",
          transition: `opacity ${timing.haloDuration}ms ease ${timing.haloDelay}ms, transform ${timing.haloDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.haloDelay}ms`,
        }}
      />

      <div
        style={{
          position: "absolute",
          insetInlineEnd: mode === "desktop" ? "-12vw" : "-28vw",
          bottom: mode === "desktop" ? "6vh" : "12vh",
          width: mode === "desktop" ? "34vw" : "54vw",
          height: mode === "desktop" ? "34vw" : "54vw",
          borderRadius: "50%",
          background: palette.glowRight,
          opacity: active && mode !== "reduced" ? 1 : 0,
          transform: active ? "scale(1)" : "scale(0.72)",
          willChange: "transform, opacity",
          transition: `opacity ${timing.haloDuration}ms ease ${timing.haloDelay + 80}ms, transform ${timing.haloDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.haloDelay + 80}ms`,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: stageWidth,
          transform: active
            ? exiting
              ? "translate3d(0, -8px, 0) scale(1.01)"
              : "translate3d(0, 0, 0) scale(1)"
            : "translate3d(0, 18px, 0) scale(0.97)",
          willChange: "transform",
          transition: `transform ${timing.stageDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.stageDelay}ms`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: mode === "desktop" ? -22 : -16,
            borderRadius: stageRadius + 12,
            background: `radial-gradient(circle at 50% 50%, ${C.cyan}12, transparent 62%)`,
            opacity: active && mode !== "reduced" ? 1 : 0,
            transform: active ? "scale(1)" : "scale(0.86)",
            transition: `opacity ${timing.haloDuration}ms ease ${timing.haloDelay}ms, transform ${timing.haloDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.haloDelay}ms`,
          }}
        />

        <div
          style={{
            position: "relative",
            borderRadius: stageRadius,
            padding: 1,
            background: palette.edge,
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: stageRadius - 1,
              background: palette.stage,
              boxShadow: palette.shadow,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `linear-gradient(${palette.grid} 1px, transparent 1px), linear-gradient(90deg, ${palette.grid} 1px, transparent 1px)`,
                backgroundSize: mode === "desktop" ? "28px 28px" : "24px 24px",
                opacity:
                  active && mode !== "reduced" ? (dark ? 0.34 : 0.26) : 0,
                transition: `opacity ${timing.haloDuration}ms ease ${timing.haloDelay}ms`,
              }}
            />

            {mode !== "reduced" && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: mode === "desktop" ? 160 : 112,
                  background: palette.sweep,
                  transform: active
                    ? "translate3d(340%, 0, 0)"
                    : "translate3d(-130%, 0, 0)",
                  willChange: "transform",
                  transition: `transform ${timing.sweepDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.sweepDelay}ms`,
                  pointerEvents: "none",
                }}
              />
            )}

            <div
              style={{
                position: "absolute",
                insetInline: 0,
                top: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${C.cyan}, ${C.purple}, transparent)`,
                opacity: active ? 1 : 0,
                transform: active ? "scaleX(1)" : "scaleX(0.35)",
                transformOrigin: "center center",
                transition: `opacity ${timing.railDuration}ms ease ${timing.railDelay}ms, transform ${timing.railDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.railDelay}ms`,
              }}
            />

            <div
              style={{
                position: "absolute",
                insetInline: mode === "desktop" ? 20 : 16,
                top: mode === "desktop" ? 18 : 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                opacity: active ? 1 : 0,
                transform: active
                  ? "translate3d(0, 0, 0)"
                  : "translate3d(0, -6px, 0)",
                transition: `opacity ${timing.copyDuration}ms ease ${timing.copyDelay - 160}ms, transform ${timing.copyDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.copyDelay - 160}ms`,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: 1.8,
                  color: palette.eyebrow,
                  textTransform: "uppercase",
                }}
              >
                aw.systems
              </span>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 8,
                  letterSpacing: 1.2,
                  color: dark
                    ? "rgba(203,213,225,0.55)"
                    : "rgba(51,65,85,0.62)",
                  textTransform: "uppercase",
                }}
              >
                [{locale}]
              </span>
            </div>

            {(
              [
                ["top", "left"],
                ["top", "right"],
                ["bottom", "left"],
                ["bottom", "right"],
              ] as const
            ).map(([vertical, horizontal], index) => (
              <span
                key={`${vertical}-${horizontal}`}
                style={{
                  position: "absolute",
                  [vertical]: mode === "desktop" ? 16 : 12,
                  [horizontal]: mode === "desktop" ? 16 : 12,
                  width: mode === "desktop" ? 20 : 16,
                  height: mode === "desktop" ? 20 : 16,
                  borderTop:
                    vertical === "top" ? `1px solid ${palette.frame}` : "none",
                  borderBottom:
                    vertical === "bottom"
                      ? `1px solid ${palette.frame}`
                      : "none",
                  borderLeft:
                    horizontal === "left"
                      ? `1px solid ${palette.frame}`
                      : "none",
                  borderRight:
                    horizontal === "right"
                      ? `1px solid ${palette.frame}`
                      : "none",
                  opacity: active && mode !== "reduced" ? 1 : 0,
                  transition: `opacity ${timing.copyDuration}ms ease ${timing.copyDelay - 120 + index * 45}ms`,
                }}
              />
            ))}

            <div
              style={{
                position: "relative",
                zIndex: 2,
                padding: stagePadding,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <BrandMark
                active={active}
                mode={mode}
                accentStart={palette.accentStart}
                accentEnd={palette.accentEnd}
                dark={dark}
              />

              <div
                style={{
                  width: active ? (mode === "desktop" ? 168 : 132) : 0,
                  height: 1,
                  marginTop: mode === "desktop" ? 24 : 20,
                  background: `linear-gradient(90deg, transparent, ${C.cyan}, ${C.purple}, transparent)`,
                  transition: `width ${timing.railDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.railDelay}ms`,
                }}
              />

              <div
                style={{
                  marginTop: mode === "desktop" ? 18 : 16,
                  fontFamily: "var(--font-display)",
                  fontSize: mode === "desktop" ? 26 : 22,
                  fontWeight: 600,
                  letterSpacing: active ? "0.08em" : "0.02em",
                  textTransform: "uppercase",
                  color: palette.name,
                  opacity: active ? 1 : 0,
                  transform: active
                    ? "translate3d(0, 0, 0)"
                    : "translate3d(0, 10px, 0)",
                  transition: `opacity ${timing.copyDuration}ms ease ${timing.copyDelay}ms, transform ${timing.copyDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.copyDelay}ms, letter-spacing ${timing.copyDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.copyDelay}ms`,
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                }}
              >
                {content.meta.author}
              </div>

              <p
                dir={isArabic ? "rtl" : "ltr"}
                style={{
                  margin: `${mode === "desktop" ? 10 : 8}px 0 0`,
                  maxWidth: mode === "desktop" ? 340 : 280,
                  fontFamily: isArabic
                    ? "var(--font-arabic)"
                    : "var(--font-body)",
                  fontSize: mode === "desktop" ? 14 : 13,
                  lineHeight: isArabic ? 1.75 : 1.6,
                  letterSpacing: isArabic ? 0 : 0.02,
                  color: palette.tagline,
                  opacity: active ? 1 : 0,
                  transform: active
                    ? "translate3d(0, 0, 0)"
                    : "translate3d(0, 10px, 0)",
                  transition: `opacity ${timing.taglineDuration}ms ease ${timing.taglineDelay}ms, transform ${timing.taglineDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${timing.taglineDelay}ms`,
                  textWrap: "balance",
                }}
              >
                {content.nav.logoTagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
