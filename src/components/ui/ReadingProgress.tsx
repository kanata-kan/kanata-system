/**
 * @file ReadingProgress.tsx
 * @description Fixed reading progress bar — shows scroll progress
 * as a thin accent-colored bar at the very top of the viewport.
 * Designed for long-form pages like case studies.
 */
"use client";

import { useState, useEffect } from "react";

interface Props {
  color: string;
}

export function ReadingProgress({ color }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min((scrollTop / docHeight) * 100, 100));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 3,
        zIndex: 9999,
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${color}, ${color}90)`,
          borderRadius: "0 2px 2px 0",
          transition: "width .1s linear",
          boxShadow: `0 0 8px ${color}40`,
        }}
      />
    </div>
  );
}
