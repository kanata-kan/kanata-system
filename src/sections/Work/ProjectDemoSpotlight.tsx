"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/hooks/useLocale";
import type { ProjectDemoMedia } from "@/data/content";
import type { Theme } from "@/tokens/themes";

const DEMO_COPY = {
  en: {
    eyebrow: "Operational Preview",
    titleHero: "See the workflow in motion",
    titleCard: "Preview the real flow",
    load: "Load Demo",
    loading: "Loading Demo...",
    live: "Live Preview",
    liveBadge: "Flow Active",
    onDemandHint: "GIF stays paused until hover, focus, or tap.",
    autoHint: "Loads only after this card enters the viewport.",
    reduceMotionHint: "Reduced motion is respected. Tap to play.",
  },
  fr: {
    eyebrow: "Apercu Operationnel",
    titleHero: "Voir le flux en action",
    titleCard: "Apercu du flux reel",
    load: "Charger la demo",
    loading: "Chargement...",
    live: "Apercu Actif",
    liveBadge: "Flux Actif",
    onDemandHint: "Le GIF reste en pause jusqu'au survol ou au clic.",
    autoHint: "Se charge seulement quand la carte entre dans l'ecran.",
    reduceMotionHint: "Le mode reduit le mouvement. Touchez pour lire.",
  },
  ar: {
    eyebrow: "عرض تشغيلي",
    titleHero: "شاهد سير العمل أثناء التشغيل",
    titleCard: "معاينة للتدفق الحقيقي",
    load: "تحميل العرض",
    loading: "جاري التحميل...",
    live: "معاينة حية",
    liveBadge: "التدفق يعمل",
    onDemandHint: "يبقى GIF متوقفا حتى التمرير عليه أو الضغط.",
    autoHint: "يتم التحميل فقط بعد ظهور البطاقة على الشاشة.",
    reduceMotionHint: "نحترم تقليل الحركة. اضغط للتشغيل.",
  },
} as const;

interface ProjectDemoSpotlightProps {
  demo: ProjectDemoMedia;
  summary: string;
  chips: string[];
  color: string;
  C: Theme;
  isMobile: boolean;
  mode?: "hero" | "card";
  autoPlayWhenVisible?: boolean;
}

export function ProjectDemoSpotlight({
  demo,
  summary,
  chips,
  color,
  C,
  isMobile,
  mode = "card",
  autoPlayWhenVisible = false,
}: ProjectDemoSpotlightProps) {
  const { locale } = useLocale();
  const copy = DEMO_COPY[locale] ?? DEMO_COPY.en;
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hasActivated, setHasActivated] = useState(false);
  const [isAnimatedReady, setIsAnimatedReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const visibleChips = chips.slice(0, 3);
  const title = mode === "hero" ? copy.titleHero : copy.titleCard;
  const shouldLoadAnimated =
    hasActivated || (autoPlayWhenVisible && hasEnteredViewport && !prefersReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncPreference();

    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (!autoPlayWhenVisible || prefersReducedMotion) return;
    if (!cardRef.current || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [autoPlayWhenVisible, prefersReducedMotion]);

  const activateDemo = () => {
    setHasActivated(true);
  };

  const hintText = prefersReducedMotion
    ? copy.reduceMotionHint
    : autoPlayWhenVisible
      ? copy.autoHint
      : copy.onDemandHint;

  const previewHeight = mode === "hero" ? (isMobile ? 240 : 280) : 220;

  return (
    <div
      ref={cardRef}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: mode === "hero" ? (isMobile ? 18 : 22) : isMobile ? 16 : 18,
        borderRadius: mode === "hero" ? 16 : 14,
        border: `1px solid ${color}28`,
        background:
          mode === "hero"
            ? `linear-gradient(180deg, ${color}10, ${C.bg2})`
            : `linear-gradient(180deg, ${color}08, ${C.bg3})`,
        boxShadow:
          mode === "hero" ? `0 18px 42px ${color}12` : `0 10px 28px ${color}10`,
        overflow: "hidden",
      }}
      onMouseEnter={() => {
        if (!isMobile && !prefersReducedMotion) {
          activateDemo();
        }
      }}
      onFocusCapture={() => {
        if (!prefersReducedMotion) {
          activateDemo();
        }
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: 1.8,
            color,
            textTransform: "uppercase",
          }}
        >
          {copy.eyebrow}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: 1.2,
            color: shouldLoadAnimated ? C.green : C.muted,
            background: shouldLoadAnimated ? `${C.green}12` : `${C.text}08`,
            border: `1px solid ${shouldLoadAnimated ? `${C.green}35` : C.line}`,
            padding: "5px 10px",
            borderRadius: 999,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: shouldLoadAnimated ? C.green : C.faint,
              boxShadow: shouldLoadAnimated ? `0 0 10px ${C.green}` : "none",
            }}
          />
          {shouldLoadAnimated ? copy.liveBadge : copy.load}
        </span>
      </div>

      <div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: mode === "hero" ? (isMobile ? 22 : 26) : 20,
            lineHeight: 1.15,
            letterSpacing: -0.8,
            color: C.text,
            margin: 0,
            marginBottom: 8,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            lineHeight: 1.65,
            color: C.sub,
            margin: 0,
          }}
        >
          {summary}
        </p>
      </div>

      <div
        style={{
          position: "relative",
          borderRadius: 14,
          overflow: "hidden",
          border: `1px solid ${C.line}`,
          background: `linear-gradient(135deg, ${color}18, ${C.bg} 72%)`,
          minHeight: previewHeight,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at top right, ${color}18, transparent 42%)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 3,
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "6px 10px",
            borderRadius: 999,
            background: "rgba(14,17,23,0.72)",
            border: `1px solid ${C.border}`,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 10px ${color}`,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              letterSpacing: 1.2,
              color: C.text,
              textTransform: "uppercase",
            }}
          >
            {hasActivated && isAnimatedReady ? copy.live : copy.eyebrow}
          </span>
        </div>

        <Image
          src={demo.posterSrc}
          alt={shouldLoadAnimated ? "" : demo.alt}
          aria-hidden={shouldLoadAnimated || undefined}
          fill
          priority={mode === "hero"}
          sizes={
            mode === "hero"
              ? isMobile
                ? "100vw"
                : "420px"
              : isMobile
                ? "100vw"
                : "360px"
          }
          style={{
            objectFit: "cover",
            objectPosition: "top center",
            filter: shouldLoadAnimated ? "blur(0px)" : "saturate(1.02)",
            transform: shouldLoadAnimated ? "scale(1.01)" : "scale(1)",
            transition: "transform .35s ease, filter .35s ease",
          }}
        />

        {shouldLoadAnimated && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={demo.animatedSrc}
              alt={demo.alt}
              loading={mode === "hero" ? "eager" : "lazy"}
              decoding="async"
              onLoad={() => setIsAnimatedReady(true)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                opacity: isAnimatedReady ? 1 : 0,
                transition: "opacity .25s ease",
                zIndex: 1,
              }}
            />
            {!isAnimatedReady && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(14,17,23,0.16)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: 1.4,
                    color: C.text,
                    background: "rgba(14,17,23,0.72)",
                    border: `1px solid ${C.border}`,
                    padding: "8px 12px",
                    borderRadius: 999,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  {copy.loading}
                </span>
              </div>
            )}
          </>
        )}

        {visibleChips.length > 0 && (
          <div
            style={{
              position: "absolute",
              left: 12,
              right: 12,
              bottom: 12,
              zIndex: 4,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "flex-end",
            }}
          >
            {visibleChips.map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 8,
                  letterSpacing: 1,
                  color: C.text,
                  background: "rgba(14,17,23,0.68)",
                  border: `1px solid ${C.border}`,
                  padding: "6px 9px",
                  borderRadius: 999,
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "space-between",
          gap: 12,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <button
          type="button"
          onClick={activateDemo}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: 1.4,
            color: hasActivated ? C.bg : color,
            background: hasActivated ? color : `${color}10`,
            border: `1px solid ${color}45`,
            padding: "10px 16px",
            borderRadius: 999,
            cursor: "pointer",
            minWidth: isMobile ? "100%" : 150,
            transition: "all .2s ease",
          }}
        >
            {shouldLoadAnimated ? (isAnimatedReady ? copy.live : copy.loading) : copy.load}
        </button>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            lineHeight: 1.55,
            color: C.muted,
            margin: 0,
            textAlign: isMobile ? "center" : "right",
            maxWidth: mode === "hero" ? 250 : 220,
          }}
        >
          {hintText}
        </p>
      </div>
    </div>
  );
}
