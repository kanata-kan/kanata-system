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

export function ImageLightbox({ src, alt, caption, C, children }: ImageLightboxProps) {
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
    setTimeout(() => setOpen(false), 300);
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
        background: visible ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(16px)" : "blur(0px)",
        transition: "background 0.3s, backdrop-filter 0.3s",
        cursor: "zoom-out",
        padding: 32,
        boxSizing: "border-box" as const,
      }}
    >
      {/* Close button */}
      <button
        aria-label="Close"
        onClick={closeModal}
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 8,
          padding: "6px 14px",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: 1.5,
          cursor: "pointer",
          transition: "all .2s",
          zIndex: 10,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.15)";
          e.currentTarget.style.color = "rgba(255,255,255,0.8)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          e.currentTarget.style.color = "rgba(255,255,255,0.5)";
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
          maxHeight: "85vh",
          width: "100%",
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.92) translateY(12px)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s",
          cursor: "default",
          background: C.bg2,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: caption ? "calc(85vh - 48px)" : "85vh",
            objectFit: "contain",
            display: "block",
          }}
          priority
        />

        {caption && (
          <div
            style={{
              padding: "12px 20px",
              borderTop: `1px solid ${C.line}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                color: C.muted,
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
                letterSpacing: 1,
                flexShrink: 0,
                marginLeft: 16,
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
      <div
        onClick={openModal}
        role="button"
        tabIndex={0}
        aria-label={`View ${alt}`}
        onKeyDown={(e) => {
          if (e.key === "Enter") openModal();
        }}
        style={{ cursor: "zoom-in" }}
      >
        {children}
      </div>
      {isBrowser && lightbox && createPortal(lightbox, document.body)}
    </>
  );
}
