import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

export const alt = "Abdelilah Wajid — Product Engineer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const accent = BRAND.colors.cyan;
  const accent2 = BRAND.colors.violet;
  const accentDim = `rgba(34,211,238,0.2)`;
  const accentFaint = `rgba(34,211,238,0.08)`;

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
      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          display: "flex",
        }}
      />

      {/* Blob — top left (cyan) */}
      <div
        style={{
          position: "absolute",
          top: -150,
          left: -100,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
          display: "flex",
        }}
      />
      {/* Blob — bottom right (violet) */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: 160,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)",
          display: "flex",
        }}
      />
      {/* Blob — top right (rose accent) */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,113,133,0.05) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${accent} 30%, ${accent2} 70%, transparent)`,
          display: "flex",
        }}
      />

      {/* Corner TL */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          width: 20,
          height: 20,
          borderTop: `1.5px solid ${accentDim}`,
          borderLeft: `1.5px solid ${accentDim}`,
          display: "flex",
        }}
      />
      {/* Corner TR */}
      <div
        style={{
          position: "absolute",
          top: 18,
          right: 18,
          width: 20,
          height: 20,
          borderTop: `1.5px solid ${accentDim}`,
          borderRight: `1.5px solid ${accentDim}`,
          display: "flex",
        }}
      />
      {/* Corner BL */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 18,
          width: 20,
          height: 20,
          borderBottom: `1.5px solid ${accentDim}`,
          borderLeft: `1.5px solid ${accentDim}`,
          display: "flex",
        }}
      />
      {/* Corner BR */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          right: 18,
          width: 20,
          height: 20,
          borderBottom: `1.5px solid ${accentDim}`,
          borderRight: `1.5px solid ${accentDim}`,
          display: "flex",
        }}
      />

      {/* ── Content row ── */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          padding: "0 90px",
          gap: 80,
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Left panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
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
              border: `1px solid rgba(34,211,238,0.22)`,
              borderRadius: 100,
              padding: "6px 16px",
              marginBottom: 28,
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: accent,
                boxShadow: `0 0 10px ${accent}`,
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                color: accent,
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              {BRAND.role}
            </span>
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            <span style={{ color: "#f0f4ff" }}>Abdelilah</span>
            <span style={{ color: accent }}>Wajid</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              fontSize: 21,
              fontWeight: 300,
              color: "rgba(200,210,240,0.55)",
              letterSpacing: "0.01em",
              lineHeight: 1.4,
              maxWidth: 460,
              marginBottom: 32,
            }}
          >
            Turning chaos into reliable systems.
          </div>

          {/* URL + location row */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 14,
                color: `rgba(34,211,238,0.62)`,
                letterSpacing: "0.05em",
                fontWeight: 500,
              }}
            >
              abdelilahwajid.com
            </span>
            <div
              style={{
                width: 1,
                height: 14,
                background: "rgba(255,255,255,0.10)",
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: "rgba(200,210,240,0.30)",
                letterSpacing: "0.04em",
              }}
            >
              MARRAKECH, MA
            </span>
          </div>
        </div>

        {/* Right panel — monogram + rings */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: 240,
            height: 240,
            flexShrink: 0,
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "50%",
              border: "1px solid rgba(34,211,238,0.16)",
              display: "flex",
            }}
          />
          {/* Mid ring */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              right: 20,
              bottom: 20,
              borderRadius: "50%",
              border: "1px solid rgba(168,85,247,0.12)",
              display: "flex",
            }}
          />
          {/* Ring dot at top */}
          <div
            style={{
              position: "absolute",
              top: -4,
              left: 117,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 0 14px ${accent}, 0 0 6px ${accent}`,
              display: "flex",
            }}
          />

          {/* Monogram box */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 140,
              height: 140,
              borderRadius: 24,
              background: "rgba(34,211,238,0.06)",
              border: "1px solid rgba(34,211,238,0.16)",
            }}
          >
            <span
              style={{
                fontSize: 52,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#f0f4ff",
                lineHeight: 1,
              }}
            >
              A<span style={{ color: accent }}>W</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          zIndex: 6,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.10em",
          }}
        >
          PORTFOLIO · 2026
        </span>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.10em",
          }}
        >
          CASE-STUDY DRIVEN · SYSTEM THINKING
        </span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
