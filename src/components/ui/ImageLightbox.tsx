/**
 * @file ImageLightbox.tsx
 * @description Reusable fullscreen image lightbox with blur backdrop,
 * spring-physics scale animation, grain overlay, ambient glow, and ESC to close.
 * Based on the Avatar lightbox pattern — uses createPortal.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  children: React.ReactNode;
}

export function ImageLightbox({
  src,
  alt,
  caption,
  children,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const isBrowser = typeof window !== "undefined";

  const openModal = useCallback(() => {
    setOpen(true);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    document.body.style.overflow = "";
    setTimeout(() => setOpen(false), 360);
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
      aria-label={alt}
      onClick={closeModal}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: visible ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(32px) saturate(160%)" : "blur(0px)",
        WebkitBackdropFilter: visible
          ? "blur(32px) saturate(160%)"
          : "blur(0px)",
        transition:
          "background 0.38s cubic-bezier(0.4,0,0.2,1), backdrop-filter 0.38s cubic-bezier(0.4,0,0.2,1)",
        cursor: "zoom-out",
        padding: "32px 24px",
        boxSizing: "border-box",
      }}
    >
      {/* ── Noise grain overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: visible ? 0.032 : 0,
          transition: "opacity 0.5s",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Ambient glow — cyan top-left ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--t-cyan) 10%, transparent) 0%, transparent 68%)",
          top: "-6%",
          left: "8%",
          pointerEvents: "none",
          filter: "blur(72px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.65s 0.05s",
          zIndex: 0,
        }}
      />

      {/* ── Ambient glow — purple bottom-right ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 440,
          height: 440,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--t-purple) 8%, transparent) 0%, transparent 68%)",
          bottom: "-4%",
          right: "12%",
          pointerEvents: "none",
          filter: "blur(72px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.65s 0.12s",
          zIndex: 0,
        }}
      />

      {/* ── Close button ── */}
      <button
        type="button"
        aria-label="Close lightbox"
        onClick={closeModal}
        style={{
          position: "absolute",
          top: 18,
          right: 22,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 7,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.11)",
          borderRadius: 9,
          padding: "6px 16px 6px 12px",
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: 2,
          color: "rgba(255,255,255,0.5)",
          cursor: "pointer",
          transition: "background 0.2s, color 0.2s, border-color 0.2s",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-6px)",
          transitionProperty:
            "background, color, border-color, opacity, transform",
          transitionDuration: "0.2s, 0.2s, 0.2s, 0.35s, 0.35s",
          transitionTimingFunction: "ease",
        }}
        onMouseOver={(e) => {
          const b = e.currentTarget;
          b.style.background = "rgba(255,255,255,0.11)";
          b.style.color = "rgba(255,255,255,0.9)";
          b.style.borderColor = "rgba(255,255,255,0.22)";
        }}
        onMouseOut={(e) => {
          const b = e.currentTarget;
          b.style.background = "rgba(255,255,255,0.05)";
          b.style.color = "rgba(255,255,255,0.5)";
          b.style.borderColor = "rgba(255,255,255,0.11)";
        }}
      >
        {/* × icon */}
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1l7 7M8 1L1 8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        ESC
      </button>

      {/* ── Image card ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 980,
          maxHeight: "88vh",
          width: "100%",
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: visible
            ? `0 48px 120px rgba(0,0,0,0.75),
               0 0 0 1px rgba(255,255,255,0.04),
               0 0 80px color-mix(in srgb, var(--t-cyan) 7%, transparent)`
            : "0 24px 64px rgba(0,0,0,0.5)",
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.88) translateY(28px)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.38s ease, box-shadow 0.5s ease",
          cursor: "default",
          background: "var(--t-bg2)",
        }}
      >
        {/* Top shimmer accent */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, var(--t-cyan) 30%, var(--t-purple) 70%, transparent 100%)",
            zIndex: 2,
            opacity: 0.7,
          }}
        />

        {/* Inner top highlight */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 80,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: caption ? "calc(88vh - 58px)" : "88vh",
            objectFit: "contain",
            display: "block",
          }}
          priority
        />

        {caption && (
          <div
            style={{
              padding: "13px 20px",
              borderTop: "1px solid var(--t-line)",
              background: "color-mix(in srgb, var(--t-bg) 88%, transparent)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                color: "var(--t-sub)",
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              {caption}
            </p>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                color: "var(--t-faint)",
                letterSpacing: 1.5,
                flexShrink: 0,
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              {alt}
            </span>
          </div>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        aria-label={`View ${alt} fullscreen`}
        style={{
          cursor: "zoom-in",
          border: "none",
          background: "transparent",
          padding: 0,
          display: "block",
          width: "100%",
        }}
      >
        {children}
      </button>
      {isBrowser && lightbox && createPortal(lightbox, document.body)}
    </>
  );
}
