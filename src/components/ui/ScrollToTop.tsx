/**
 * @file ScrollToTop.tsx
 * @description Floating button that scrolls to top.
 * Appears after scrolling 400px. Global — used in layout.tsx.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import type { Theme } from "@/tokens/themes";

interface Props {
  C: Theme;
}

export function ScrollToTop({ C }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollUp}
      style={{
        position: "fixed",
        bottom: 28,
        insetInlineEnd: 28,
        zIndex: 999,
        width: 42,
        height: 42,
        borderRadius: 12,
        border: `1px solid ${C.line}`,
        background: C.bg2,
        color: C.text,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "all .3s cubic-bezier(.4,0,.2,1)",
        backdropFilter: "blur(12px)",
        boxShadow: `0 4px 20px ${C.bg}80`,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = C.bg3;
        e.currentTarget.style.borderColor = C.cyan;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = C.bg2;
        e.currentTarget.style.borderColor = C.line;
        e.currentTarget.style.transform = visible
          ? "translateY(0)"
          : "translateY(12px)";
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
