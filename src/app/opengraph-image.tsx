/**
 * @file opengraph-image.tsx
 * @description Dynamic OG image generator for social sharing (WhatsApp, Facebook, Twitter).
 * Layout: Left = brand info | Right = full-bleed photo with AW monogram ring overlay.
 * Note: ImageResponse generates a static PNG — animations are not supported.
 * The rotating ring is rendered as a static decorative element at a fixed angle.
 */

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND } from "@/lib/brand";
import { OG_STYLES } from "@/lib/brandStyles";

export const alt = "Product Engineer Portfolio — Real Systems in Production";
export const size = OG_STYLES.dimensions; // { width: 1200, height: 630 }
export const contentType = "image/png";

export default async function Image() {
  let photoSrc = "";
  try {
    const photoBuffer = await readFile(
      join(process.cwd(), "public", BRAND.profilePhoto),
    );
    photoSrc = `data:image/png;base64,${photoBuffer.toString("base64")}`;
  } catch (error) {
    console.error("Failed to load photo for OG image:", error);
  }

  // Accent color — pull from your brand or hardcode
  const accent = "#38bdf8";
  const accentDim = "rgba(56,189,248,0.25)";
  const accentFaint = "rgba(56,189,248,0.10)";

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#060810",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Grid texture ─────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          display: "none",
        }}
      />

      {/* ── Glow blob — top-left ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: -160,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.13) 0%, transparent 70%)",
          display: "none",
        }}
      />

      {/* ── Top gradient bar ─────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${accent} 30%, #818cf8 70%, transparent)`,
          display: "none",
        }}
      />

      {/* ── Corner accents ───────────────────────────────────────── */}
      {/* TL */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: 22,
          height: 22,
          borderTop: `1.5px solid ${accentDim}`,
          borderLeft: `1.5px solid ${accentDim}`,
          display: "none",
        }}
      />
      {/* BL */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          width: 22,
          height: 22,
          borderBottom: `1.5px solid ${accentDim}`,
          borderLeft: `1.5px solid ${accentDim}`,
          display: "none",
        }}
      />
      {/* TR — stop before photo area */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 22,
          height: 22,
          borderTop: `1.5px solid ${accentDim}`,
          borderRight: `1.5px solid ${accentDim}`,
          display: "none",
        }}
      />
      {/* BR */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          width: 22,
          height: 22,
          borderBottom: `1.5px solid ${accentDim}`,
          borderRight: `1.5px solid ${accentDim}`,
          display: "none",
        }}
      />

      {/* ════════════════════════════════════════════════════════════
          LEFT PANEL — Brand info  (580px wide)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 580,
          height: "100%",
          padding: "0 72px",
          position: "relative",
          zIndex: 2,
          gap: 0,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: accentFaint,
            border: `1px solid ${accentDim}`,
            borderRadius: 100,
            padding: "6px 18px",
            marginBottom: 32,
          }}
        >
          {/* Dot */}
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 0 10px ${accent}`,
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: accent,
              letterSpacing: "0.1em",
              fontWeight: 500,
            }}
          >
            PRODUCT ENGINEER
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 80,
            fontWeight: 800,
            color: "#f0f4ff",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: 28,
          }}
        >
          {BRAND.name.split(" ").map((word, i) => (
            <span
              key={i}
              style={{
                color: i === 1 ? accent : "#f0f4ff",
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 21,
            color: "rgba(200,210,240,0.5)",
            fontWeight: 300,
            letterSpacing: "0.01em",
            lineHeight: 1.4,
            marginBottom: 32,
          }}
        >
          Turning chaos into reliable systems.
        </div>

        {/* URL + Location */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              color: "rgba(56,189,248,0.6)",
              letterSpacing: "0.05em",
            }}
          >
            kanata-system.vercel.app
          </span>
          <div
            style={{
              width: 1,
              height: 14,
              background: "rgba(255,255,255,0.12)",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              color: "rgba(200,210,240,0.28)",
              letterSpacing: "0.05em",
            }}
          >
            {BRAND.location}
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          RIGHT PANEL — Full-bleed photo  (620px wide)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 620,
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Left fade so photo blends into dark left panel */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 180,
            height: "100%",
            background: "linear-gradient(90deg, #060810 0%, transparent 100%)",
            zIndex: 3,
            display: "none",
          }}
        />

        {/* Photo */}
        {photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoSrc}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              filter: "brightness(0.85) contrast(1.05)",
            }}
          />
        ) : (
          /* Fallback gradient if no photo */
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, #0f2132 0%, #0a0f2e 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 80,
              fontWeight: 800,
              color: accent,
            }}
          >
            {BRAND.monogram}
          </div>
        )}

        {/* ── AW Monogram + Ring — overlaid bottom-left of photo ── */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: 36,
            width: 120,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `1px solid ${accentDim}`,
              /* Static "rotation" — dot at ~30deg position */
              transform: "rotate(30deg)",
              display: "none",
            }}
          >
            {/* Ring dot */}
            <div
              style={{
                position: "absolute",
                top: -4,
                left: "50%",
                transform: "translateX(-50%)",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: accent,
                boxShadow: `0 0 14px ${accent}`,
              }}
            />
          </div>

          {/* Inner ring */}
          <div
            style={{
              position: "absolute",
              inset: 14,
              borderRadius: "50%",
              border: "1px solid rgba(129,140,248,0.15)",
              transform: "rotate(-20deg)",
              display: "none",
            }}
          />

          {/* Monogram tile */}
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 14,
              background: "rgba(56,189,248,0.08)",
              border: `1px solid ${accentDim}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              style={{
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "#f0f4ff",
              }}
            >
              A<span style={{ color: accent }}>W</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 38,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 72px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.14)",
            letterSpacing: "0.1em",
          }}
        >
          PORTFOLIO · 2025
        </span>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.14)",
            letterSpacing: "0.1em",
          }}
        >
          CASE-STUDY DRIVEN · SYSTEM THINKING
        </span>
      </div>
    </div>,
    OG_STYLES.dimensions,
  );
}
