"use client";

import { useState, useEffect } from "react";

const SPLASH_KEY = "aw-intro-seen";
const DURATION = 900;

function shouldShowSplash(): boolean {
  if (typeof window === "undefined") return false;
  return !localStorage.getItem(SPLASH_KEY);
}

export function IntroSplash() {
  const [show, setShow] = useState(shouldShowSplash);

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setShow(false);
      localStorage.setItem(SPLASH_KEY, "1");
    }, DURATION);

    return () => clearTimeout(timer);
  }, [show]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0e1117",
        animation: `splashFade ${DURATION}ms ease-in-out forwards`,
        pointerEvents: "none",
      }}
    >
      {/* Monogram */}
      <div
        style={{
          fontSize: 48,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "#f0f4ff",
          animation: `splashScale ${DURATION}ms ease-in-out forwards`,
        }}
      >
        A<span style={{ color: "#22d3ee" }}>W</span>
      </div>

      {/* Name */}
      <div
        style={{
          marginTop: 14,
          fontSize: 14,
          fontWeight: 400,
          letterSpacing: "0.12em",
          color: "rgba(200,215,245,0.5)",
          animation: `splashName ${DURATION}ms ease-in-out forwards`,
        }}
      >
        ABDELILAH WAJID
      </div>
    </div>
  );
}
