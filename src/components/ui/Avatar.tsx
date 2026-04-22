/**
 * @file Avatar.tsx
 * @description Profile photo avatar with conic gradient ring,
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

export function Avatar({ c, size = 110 }: AvatarProps) {
  const dotSize = Math.max(12, Math.round(size * 0.12));
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

      {/* Photo card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: 420,
          maxHeight: "80vh",
          width: "100%",
          borderRadius: 16,
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
          background: c.bg2,
        }}
      >
        <div style={{ aspectRatio: "1 / 1", position: "relative" }}>
          <Image
            src="/Abdelilah-Wajid.png"
            alt="Abdelilah Wajid — Full photo"
            width={420}
            height={420}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            priority
          />
        </div>

        {/* Info bar below photo */}
        <div
          style={{
            padding: "14px 20px",
            borderTop: `1px solid ${c.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 16,
                fontStyle: "italic",
                color: c.text,
                letterSpacing: -0.3,
              }}
            >
              {content.hero.avatar.displayName}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: c.muted,
                letterSpacing: 2,
                marginTop: 3,
              }}
            >
              {content.hero.avatar.tagline}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: c.green,
                animation: "glow 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: c.green,
                letterSpacing: 1,
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
      {/* Avatar circle */}
      <div
        onClick={openModal}
        role="button"
        tabIndex={0}
        aria-label="View full photo"
        onKeyDown={(e) => {
          if (e.key === "Enter") openModal();
        }}
        style={{
          position: "relative",
          width: size,
          height: size,
          flexShrink: 0,
          borderRadius: "50%",
          animation: "avatarPulse 4s ease-in-out infinite",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {/* Gradient ring */}
        <div
          style={{
            position: "absolute",
            inset: -3,
            borderRadius: "50%",
            background: `conic-gradient(from 0deg,${c.cyan},${c.purple},${c.cyan})`,
            padding: 3,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: c.bg,
            }}
          />
        </div>

        {/* Photo */}
        <div
          style={{
            position: "absolute",
            inset: 3,
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
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            priority
          />
        </div>

        {/* Online status dot */}
        <div
          style={{
            position: "absolute",
            bottom: Math.round(size * 0.03),
            right: Math.round(size * 0.03),
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: c.green,
            border: `2.5px solid ${c.bg}`,
            animation: "glow 2s ease-in-out infinite",
            zIndex: 2,
            boxShadow: `0 0 10px ${c.green}80`,
          }}
        />
      </div>

      {/* Portal: render lightbox in document.body to escape transform parents */}
      {isBrowser && lightbox && createPortal(lightbox, document.body)}
    </>
  );
}
