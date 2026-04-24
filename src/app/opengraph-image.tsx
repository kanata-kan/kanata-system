import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND } from "@/lib/brand";
import { OG_STYLES } from "@/lib/brandStyles";

export const alt = "Product Engineer Portfolio — Real Systems in Production";
export const size = OG_STYLES.dimensions;
export const contentType = "image/png";

export default async function Image() {
  let photoSrc = "";
  try {
    const photoBuffer = await readFile(
      join(process.cwd(), "public", BRAND.profilePhoto),
    );
    photoSrc = `data:image/png;base64,${photoBuffer.toString("base64")}`;
  } catch {
    // fallback gradient shown below
  }

  const accent = "#22d3ee";
  const accent2 = "#a855f7";
  const accentDim = "rgba(34,211,238,0.28)";
  const accentFaint = "rgba(34,211,238,0.10)";

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
            linear-gradient(rgba(99,179,237,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          display: "flex",
        }}
      />

      {/* ── Glow blob — top-left ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: -160,
          left: -80,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.14) 0%, transparent 68%)",
          display: "flex",
        }}
      />

      {/* ── Glow blob — bottom-right (behind photo) ──────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: -120,
          right: -80,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 68%)",
          display: "flex",
        }}
      />

      {/* ── Top gradient bar ─────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent 0%, ${accent} 25%, ${accent2} 65%, transparent 100%)`,
          display: "flex",
        }}
      />

      {/* ── Corner accents — TL ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 22,
          left: 22,
          width: 24,
          height: 24,
          borderTop: `1.5px solid ${accentDim}`,
          borderLeft: `1.5px solid ${accentDim}`,
          display: "flex",
        }}
      />
      {/* BL */}
      <div
        style={{
          position: "absolute",
          bottom: 22,
          left: 22,
          width: 24,
          height: 24,
          borderBottom: `1.5px solid ${accentDim}`,
          borderLeft: `1.5px solid ${accentDim}`,
          display: "flex",
        }}
      />
      {/* TR */}
      <div
        style={{
          position: "absolute",
          top: 22,
          right: 22,
          width: 24,
          height: 24,
          borderTop: `1.5px solid ${accentDim}`,
          borderRight: `1.5px solid ${accentDim}`,
          display: "flex",
        }}
      />
      {/* BR */}
      <div
        style={{
          position: "absolute",
          bottom: 22,
          right: 22,
          width: 24,
          height: 24,
          borderBottom: `1.5px solid ${accentDim}`,
          borderRight: `1.5px solid ${accentDim}`,
          display: "flex",
        }}
      />

      {/* ════════════════════════════════════════════════════════════
          RIGHT PANEL — Full-bleed photo  (600px)
          Rendered first so left panel text sits above
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 600,
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
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
              filter: "brightness(0.80) contrast(1.08) saturate(0.95)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, #0f2132 0%, #0a0f2e 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 90,
              fontWeight: 800,
              color: accent,
            }}
          >
            {BRAND.monogram}
          </div>
        )}

        {/* Left fade — blends photo into dark left panel */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 240,
            height: "100%",
            background:
              "linear-gradient(90deg, #060810 0%, rgba(6,8,16,0.55) 55%, transparent 100%)",
            zIndex: 3,
            display: "flex",
          }}
        />

        {/* Bottom vignette on photo */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 160,
            background:
              "linear-gradient(0deg, rgba(6,8,16,0.70) 0%, transparent 100%)",
            zIndex: 3,
            display: "flex",
          }}
        />

        {/* ── AW Monogram tile — bottom-left of photo ── */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            left: 44,
            width: 64,
            height: 64,
            borderRadius: 13,
            background: "rgba(6,8,16,0.65)",
            border: `1px solid ${accentDim}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontSize: 22,
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

      {/* ════════════════════════════════════════════════════════════
          LEFT PANEL — Brand info  (600px)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 600,
          height: "100%",
          padding: "0 68px 0 72px",
          position: "relative",
          zIndex: 5,
          gap: 0,
        }}
      >
        {/* Role badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            background: accentFaint,
            border: `1px solid ${accentDim}`,
            borderRadius: 100,
            padding: "7px 20px",
            marginBottom: 30,
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 0 12px ${accent}, 0 0 4px ${accent}`,
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: accent,
              letterSpacing: "0.12em",
              fontWeight: 600,
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
            fontSize: 82,
            fontWeight: 800,
            color: "#f0f4ff",
            lineHeight: 0.93,
            letterSpacing: "-0.03em",
            marginBottom: 24,
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

        {/* Thin separator */}
        <div
          style={{
            display: "flex",
            width: 56,
            height: 2,
            background: `linear-gradient(90deg, ${accent}, transparent)`,
            borderRadius: 2,
            marginBottom: 24,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "rgba(200,215,245,0.72)",
            fontWeight: 300,
            letterSpacing: "0.01em",
            lineHeight: 1.45,
            marginBottom: 36,
          }}
        >
          Turning chaos into reliable systems.
        </div>

        {/* Skill pills */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 36,
          }}
        >
          {["Full-Stack", "SaaS", "Systems Design"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "5px 14px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                fontSize: 12,
                color: "rgba(200,215,245,0.55)",
                letterSpacing: "0.06em",
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* URL + Location */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              color: "rgba(56,189,248,0.70)",
              letterSpacing: "0.06em",
              fontWeight: 500,
            }}
          >
            abdelilahwajid.com
          </span>
          <div
            style={{
              width: 1,
              height: 14,
              background: "rgba(255,255,255,0.14)",
              display: "flex",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "rgba(200,210,240,0.35)",
              letterSpacing: "0.06em",
            }}
          >
            {BRAND.location}
          </span>
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
          borderTop: "1px solid rgba(255,255,255,0.05)",
          zIndex: 6,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.16)",
            letterSpacing: "0.10em",
          }}
        >
          PORTFOLIO · 2026
        </span>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.16)",
            letterSpacing: "0.10em",
          }}
        >
          CASE-STUDY DRIVEN · SYSTEM THINKING
        </span>
      </div>
    </div>,
    OG_STYLES.dimensions,
  );
}
