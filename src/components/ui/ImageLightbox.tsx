/**
 * @file ImageLightbox.tsx
 * @description Reusable fullscreen image lightbox with blur backdrop,
 * smooth scale animation, and ESC to close.
 * Based on the Avatar lightbox pattern — uses createPortal.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Theme } from "@/tokens/themes";

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  C: Theme;
  children: React.ReactNode;
}

export function ImageLightbox({
  src,
  alt,
  caption,
  C,
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
      aria-label={alt}
      onClick={closeModal}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: visible ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0)",
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
          background: `radial-gradient(circle, ${C.cyan}14 0%, transparent 70%)`,
          top: "8%",
          left: "15%",
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
          background: `radial-gradient(circle, ${C.purple}10 0%, transparent 70%)`,
          bottom: "12%",
          right: "18%",
          pointerEvents: "none",
          filter: "blur(60px)",
          transition: "opacity 0.6s 0.1s",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Close button */}
      <button
        type="button"
        aria-label="Close"
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

      {/* Image card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: 960,
          maxHeight: "86vh",
          width: "100%",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: visible
            ? `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), 0 0 60px ${C.cyan}10`
            : "0 24px 64px rgba(0,0,0,0.6)",
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.9) translateY(24px)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s, box-shadow 0.45s",
          cursor: "default",
          background: C.bg2,
        }}
      >
        {/* Top gradient accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, ${C.cyan}, ${C.purple}, ${C.cyan})`,
            zIndex: 2,
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
            maxHeight: caption ? "calc(86vh - 56px)" : "86vh",
            objectFit: "contain",
            display: "block",
          }}
          priority
        />

        {caption && (
          <div
            style={{
              padding: "14px 22px",
              borderTop: `1px solid ${C.line}`,
              background: `${C.bg}e8`,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                color: C.sub,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {caption}
            </p>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: C.faint,
                letterSpacing: 1.2,
                flexShrink: 0,
                textTransform: "uppercase",
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
        aria-label={`View ${alt}`}
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
