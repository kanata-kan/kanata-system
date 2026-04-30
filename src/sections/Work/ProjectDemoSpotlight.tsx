"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
    expand: "Expand Demo",
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
    expand: "Agrandir",
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
    expand: "تكبير العرض",
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
  const isBrowser = typeof window !== "undefined";

  const [hasActivated, setHasActivated] = useState(false);
  const [isAnimatedReady, setIsAnimatedReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

  const visibleChips = chips.slice(0, 3);
  const title = mode === "hero" ? copy.titleHero : copy.titleCard;
  const shouldLoadAnimated =
    isExpanded ||
    hasActivated ||
    (autoPlayWhenVisible && hasEnteredViewport && !prefersReducedMotion);

  useEffect(() => {
    if (!isBrowser) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncPreference();

    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, [isBrowser]);

  useEffect(() => {
    if (!autoPlayWhenVisible || prefersReducedMotion) return;
    if (!cardRef.current || !isBrowser) return;

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
  }, [autoPlayWhenVisible, isBrowser, prefersReducedMotion]);

  const activateDemo = () => {
    setHasActivated(true);
  };

  const openExpandedPreview = useCallback(() => {
    setHasActivated(true);
    setIsExpanded(true);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setLightboxVisible(true)),
    );
  }, []);

  const closeExpandedPreview = useCallback(() => {
    setLightboxVisible(false);
    document.body.style.overflow = "";
    setTimeout(() => setIsExpanded(false), 320);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeExpandedPreview();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeExpandedPreview, isExpanded]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const hintText = prefersReducedMotion
    ? copy.reduceMotionHint
    : autoPlayWhenVisible
      ? copy.autoHint
      : copy.onDemandHint;

  const previewHeight = mode === "hero" ? (isMobile ? 240 : 280) : 220;
  const triggerMinWidth = isMobile ? "100%" : 150;

  const lightbox = isExpanded ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={demo.alt}
      onClick={closeExpandedPreview}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? 16 : 28,
        background: lightboxVisible ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0)",
        backdropFilter: lightboxVisible
          ? "blur(24px) saturate(180%)"
          : "blur(0px)",
        WebkitBackdropFilter: lightboxVisible
          ? "blur(24px) saturate(180%)"
          : "blur(0px)",
        transition: "background .35s ease, backdrop-filter .35s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: isMobile ? 260 : 420,
          height: isMobile ? 260 : 420,
          top: "8%",
          left: "8%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}16 0%, transparent 70%)`,
          filter: "blur(50px)",
          opacity: lightboxVisible ? 1 : 0,
          transition: "opacity .45s ease",
          pointerEvents: "none",
        }}
      />

      <button
        type="button"
        aria-label="Close Demo"
        onClick={closeExpandedPreview}
        style={{
          position: "absolute",
          top: isMobile ? 16 : 20,
          right: isMobile ? 16 : 24,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 8,
          padding: "7px 18px",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "rgba(255,255,255,0.72)",
          letterSpacing: 2,
          cursor: "pointer",
          zIndex: 2,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        ESC
      </button>

      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 1240,
          borderRadius: 22,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background: C.bg2,
          boxShadow: lightboxVisible
            ? `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px ${color}18`
            : "0 24px 64px rgba(0,0,0,0.55)",
          transform: lightboxVisible
            ? "scale(1) translateY(0)"
            : "scale(0.94) translateY(24px)",
          opacity: lightboxVisible ? 1 : 0,
          transition:
            "transform .45s cubic-bezier(0.16, 1, 0.3, 1), opacity .35s ease, box-shadow .4s ease",
        }}
      >
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, ${color}, ${C.cyan}, ${color})`,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: isMobile ? "12px 14px" : "14px 18px",
            borderBottom: `1px solid ${C.line}`,
            background: `${C.bg}e8`,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: 1.4,
              color,
              textTransform: "uppercase",
            }}
          >
            {copy.live}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              color: C.sub,
            }}
          >
            {demo.alt}
          </span>
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            minHeight: isMobile ? 260 : 420,
            maxHeight: "78vh",
            aspectRatio: "16 / 9",
            background: `linear-gradient(135deg, ${color}14, ${C.bg} 72%)`,
          }}
        >
          <Image
            src={demo.posterSrc}
            alt={shouldLoadAnimated ? "" : demo.alt}
            aria-hidden={shouldLoadAnimated || undefined}
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "contain",
              padding: isMobile ? 12 : 18,
            }}
          />

          {shouldLoadAnimated && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={demo.animatedSrc}
                alt={demo.alt}
                decoding="async"
                onLoad={() => setIsAnimatedReady(true)}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: isMobile ? 12 : 18,
                  opacity: isAnimatedReady ? 1 : 0,
                  transition: "opacity .25s ease",
                }}
              />
              {!isAnimatedReady && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(14,17,23,0.12)",
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
                    }}
                  >
                    {copy.loading}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: 14,
            padding: isMobile ? "14px 16px" : "16px 18px",
            borderTop: `1px solid ${C.line}`,
            background: `${C.bg}ee`,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: C.sub,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {summary}
          </p>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: C.faint,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            {copy.expand}
          </span>
        </div>
      </div>
    </div>
  ) : null;

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

        <button
          type="button"
          onClick={openExpandedPreview}
          aria-label={`${copy.expand}: ${demo.alt}`}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 5,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            letterSpacing: 1.1,
            color: C.text,
            background: "rgba(14,17,23,0.72)",
            border: `1px solid ${C.border}`,
            padding: "7px 10px",
            borderRadius: 999,
            cursor: "zoom-in",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: `1px solid ${color}55`,
              color,
              fontSize: 9,
              lineHeight: 1,
            }}
          >
            +
          </span>
          {copy.expand}
        </button>

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
            {shouldLoadAnimated && isAnimatedReady ? copy.live : copy.eyebrow}
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
        <div
          style={{
            display: "flex",
            gap: 8,
            width: isMobile ? "100%" : "auto",
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
              color: shouldLoadAnimated ? C.bg : color,
              background: shouldLoadAnimated ? color : `${color}10`,
              border: `1px solid ${color}45`,
              padding: "10px 16px",
              borderRadius: 999,
              cursor: "pointer",
              minWidth: triggerMinWidth,
              transition: "all .2s ease",
            }}
          >
            {shouldLoadAnimated
              ? isAnimatedReady
                ? copy.live
                : copy.loading
              : copy.load}
          </button>
          <button
            type="button"
            onClick={openExpandedPreview}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: 1.4,
              color,
              background: "transparent",
              border: `1px solid ${C.border2}`,
              padding: "10px 16px",
              borderRadius: 999,
              cursor: "zoom-in",
              minWidth: triggerMinWidth,
              transition: "all .2s ease",
            }}
          >
            {copy.expand}
          </button>
        </div>
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

      {isBrowser && lightbox && createPortal(lightbox, document.body)}
    </div>
  );
}
