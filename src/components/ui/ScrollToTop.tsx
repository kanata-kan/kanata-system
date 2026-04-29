/**
 * @file ScrollToTop.tsx
 * @description Floating button with scroll-progress ring.
 * Appears after 10 % scroll. Ring fills with the brand cyan→purple gradient.
 */
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Theme } from "@/tokens/themes";

interface Props {
  C: Theme;
}

const SIZE = 44;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollToTop({ C }: Props) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      setProgress(pct);
      setVisible(pct > 0.05);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollUp = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const dashOffset = CIRCUMFERENCE * (1 - progress);

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
        width: SIZE,
        height: SIZE,
        padding: 0,
        borderRadius: "50%",
        border: "none",
        background: `${C.bg2}e6`,
        color: C.text,
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(12px) scale(0.85)",
        transition: "opacity .3s, transform .3s cubic-bezier(.4,0,.2,1)",
        backdropFilter: "blur(12px)",
        boxShadow: `0 4px 24px ${C.bg}60`,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1.08)";
        e.currentTarget.style.boxShadow = `0 6px 28px ${C.bg}90, 0 0 0 1px ${C.cyan}40`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = visible
          ? "translateY(0) scale(1)"
          : "translateY(12px) scale(0.85)";
        e.currentTarget.style.boxShadow = `0 4px 24px ${C.bg}60`;
      }}
    >
      {/* Progress ring */}
      <svg
        width={SIZE}
        height={SIZE}
        style={{
          position: "absolute",
          inset: 0,
          transform: "rotate(-90deg)",
        }}
      >
        <defs>
          <linearGradient id="scrollGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={C.cyan} />
            <stop offset="100%" stopColor={C.purple} />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={C.line}
          strokeWidth={STROKE}
          opacity={0.3}
        />
        {/* Progress */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="url(#scrollGrad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.1s" }}
        />
      </svg>

      {/* Arrow icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: "relative", zIndex: 1 }}
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
