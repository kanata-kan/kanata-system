/**
 * @file Avatar.tsx
 * @description Profile photo avatar with animated conic gradient ring,
 * green "online" status dot with glow animation,
 * and fullscreen photo lightbox on click.
 * Uses createPortal to render lightbox in document.body
 * (escaping parent transform that breaks position:fixed).
 * Reçoit le thème via prop `c: Theme`.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Theme } from "@/tokens/themes";
import { content } from "@/data/content";

interface AvatarProps {
  c: Theme;
  size?: number;
}

const KEYFRAMES = `
  @keyframes spin-ring {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.55), 0 0 8px rgba(74,222,128,0.4); }
    50%       { box-shadow: 0 0 0 5px rgba(74,222,128,0),  0 0 14px rgba(74,222,128,0.6); }
  }
  @keyframes avatar-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-4px); }
  }
  @keyframes shimmer-in {
    from { opacity: 0; transform: scale(0.88) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
`;

export function Avatar({ c, size = 110 }: AvatarProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isBrowser = typeof window !== "undefined";

  const openModal = useCallback(() => {
    setOpen(true);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    document.body.style.overflow = "";
    setTimeout(() => setOpen(false), 320);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  const lightbox = open ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Profile photo"
      onClick={closeModal}
      style={{
        position: "fixed",
        top: 0,
        insetInlineStart: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: visible ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(28px) saturate(180%)" : "blur(0px)",
        WebkitBackdropFilter: visible
          ? "blur(28px) saturate(180%)"
          : "blur(0px)",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
        cursor: "zoom-out",
        padding: 32,
        boxSizing: "border-box" as const,
      }}
    >
      {/* Ambient glow blobs */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${c.cyan}18 0%, transparent 70%)`,
          top: "10%",
          left: "20%",
          pointerEvents: "none",
          filter: "blur(60px)",
          transition: "opacity 0.6s",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${c.purple}14 0%, transparent 70%)`,
          bottom: "15%",
          right: "20%",
          pointerEvents: "none",
          filter: "blur(60px)",
          transition: "opacity 0.6s 0.1s",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Close button */}
      <button
        type="button"
        aria-label="Close photo"
        onClick={closeModal}
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 8,
          padding: "7px 18px",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "rgba(255,255,255,0.65)",
          letterSpacing: 2,
          cursor: "pointer",
          transition: "all .22s",
          zIndex: 10,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.14)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          e.currentTarget.style.color = "rgba(255,255,255,0.65)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
        }}
      >
        ESC
      </button>

      {/* Photo card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: 420,
          maxHeight: "84vh",
          width: "100%",
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: visible
            ? `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), 0 0 80px ${c.cyan}18`
            : "0 24px 64px rgba(0,0,0,0.6)",
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.9) translateY(24px)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s, box-shadow 0.45s",
          cursor: "default",
          background: c.bg2,
        }}
      >
        {/* Top gradient accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${c.cyan}, ${c.purple}, ${c.cyan})`,
            zIndex: 2,
          }}
        />

        <div style={{ aspectRatio: "3 / 4", position: "relative" }}>
          <Image
            src="/Abdelilah-Wajid.png"
            alt="Abdelilah Wajid — Full photo"
            width={440}
            height={587}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            priority
          />

          {/* Subtle vignette at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: `linear-gradient(to top, ${c.bg}dd 0%, transparent 100%)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Info bar */}
        <div
          style={{
            padding: "18px 24px",
            borderTop: `1px solid ${c.line}`,
            background: `${c.bg}e8`,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontStyle: "italic",
                color: c.text,
                letterSpacing: -0.4,
                fontWeight: 500,
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              {content.hero.avatar.displayName}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: c.muted,
                letterSpacing: 1.6,
                marginTop: 5,
                lineHeight: 1.5,
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                textTransform: "uppercase",
              }}
            >
              {content.hero.avatar.tagline}
            </div>
          </div>

          {/* Status badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 16px",
              borderRadius: 999,
              background: `${c.green}10`,
              border: `1px solid ${c.green}28`,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: c.green,
                animation: "pulse-dot 2.2s ease-in-out infinite",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: c.green,
                letterSpacing: 1.2,
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {content.hero.badge}
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Inject keyframes once */}
      <style>{KEYFRAMES}</style>

      {/* Avatar button */}
      <button
        type="button"
        onClick={openModal}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="View full photo"
        style={{
          position: "relative",
          width: size,
          height: size,
          flexShrink: 0,
          borderRadius: "50%",
          cursor: "pointer",
          border: "none",
          background: "transparent",
          padding: 0,
          outline: "none",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          animation: "avatar-float 5s ease-in-out infinite",
        }}
      >
        {/* Outer glow when hovered */}
        <div
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${c.cyan}28 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
            filter: "blur(8px)",
          }}
        />

        {/* Spinning gradient ring */}
        <div
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            overflow: "hidden",
            padding: 0,
          }}
        >
          {/* Conic ring using pseudo-element trick via inline style */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: `conic-gradient(from 0deg, ${c.cyan}, ${c.purple}, ${c.cyan}88, ${c.purple}60, ${c.cyan})`,
              animation: "spin-ring 4s linear infinite",
            }}
          />
          {/* Inner cutout to create ring shape */}
          <div
            style={{
              position: "absolute",
              inset: 4,
              borderRadius: "50%",
              background: c.bg,
            }}
          />
        </div>

        {/* Photo */}
        <div
          style={{
            position: "absolute",
            inset: 4,
            borderRadius: "50%",
            overflow: "hidden",
            border: `1px solid ${c.border}`,
          }}
        >
          <Image
            src="/Abdelilah-Wajid.png"
            alt="Abdelilah Wajid"
            width={size}
            height={size}
            sizes={`${size}px`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition:
                "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              filter: hovered
                ? "brightness(1.06) saturate(1.12)"
                : "brightness(1) saturate(1)",
            }}
            priority
          />
        </div>

        {/* Online dot — bottom-right */}
        <span
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: c.green,
            border: `2.5px solid ${c.bg}`,
            animation: "pulse-dot 2.2s ease-in-out infinite",
            display: "block",
            zIndex: 2,
          }}
        />
      </button>

      {/* Portal: render lightbox in document.body to escape transform parents */}
      {isBrowser && lightbox && createPortal(lightbox, document.body)}
    </>
  );
}
