import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { BRAND } from "@/lib/brand";

export const alt = "Abdelilah Wajid — Product Engineer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const accent = BRAND.colors.cyan;
  const accent2 = BRAND.colors.violet;
  const accentDim = `rgba(34,211,238,0.2)`;
  const accentFaint = `rgba(34,211,238,0.08)`;

  /* Load profile photo as base64 */
  let photoSrc = "";
  try {
    const buf = await readFile(
      join(process.cwd(), "public", BRAND.profilePhoto),
    );
    photoSrc = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    /* graceful fallback — monogram will show instead */
  }

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
            "radial-gradient(circle, rgba(34,211,238,0.14) 0%, transparent 70%)",
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
            "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
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
            "radial-gradient(circle, rgba(251,113,133,0.06) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Top bar — gradient accent stripe */}
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
          gap: 72,
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
              border: `1px solid rgba(34,211,238,0.25)`,
              borderRadius: 100,
              padding: "7px 18px",
              marginBottom: 28,
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: accent,
                boxShadow: `0 0 12px ${accent}`,
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 14,
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
              fontSize: 80,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              marginBottom: 22,
            }}
          >
            <span style={{ color: "#f0f4ff" }}>Abdelilah</span>
            <span style={{ color: accent }}>Wajid</span>
          </div>

          {/* Tagline — higher contrast for WhatsApp */}
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 400,
              color: "rgba(200,210,240,0.72)",
              letterSpacing: "0.01em",
              lineHeight: 1.4,
              maxWidth: 480,
              marginBottom: 30,
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
                color: `rgba(34,211,238,0.72)`,
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
                background: "rgba(255,255,255,0.12)",
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: "rgba(200,210,240,0.35)",
                letterSpacing: "0.04em",
              }}
            >
              {BRAND.location}
            </span>
          </div>
        </div>

        {/* Right panel — profile photo + rings */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: 260,
            height: 260,
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
              border: "1.5px solid rgba(34,211,238,0.18)",
              display: "flex",
            }}
          />
          {/* Mid ring */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              right: 18,
              bottom: 18,
              borderRadius: "50%",
              border: "1px solid rgba(168,85,247,0.14)",
              display: "flex",
            }}
          />
          {/* Ring dot at top */}
          <div
            style={{
              position: "absolute",
              top: -4,
              left: 126,
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 0 16px ${accent}, 0 0 6px ${accent}`,
              display: "flex",
            }}
          />
          {/* Ring dot at bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 8,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: accent2,
              boxShadow: `0 0 10px ${accent2}`,
              display: "flex",
            }}
          />

          {/* Photo or monogram fallback */}
          {photoSrc ? (
            <div
              style={{
                display: "flex",
                width: 160,
                height: 160,
                borderRadius: "50%",
                overflow: "hidden",
                border: `2px solid rgba(34,211,238,0.25)`,
                boxShadow: `0 0 30px rgba(34,211,238,0.15)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={BRAND.name}
                src={photoSrc}
                width={160}
                height={160}
                style={{ objectFit: "cover", width: 160, height: 160 }}
              />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 150,
                height: 150,
                borderRadius: 28,
                background: "rgba(34,211,238,0.06)",
                border: "1px solid rgba(34,211,238,0.18)",
              }}
            >
              <span
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "#f0f4ff",
                  lineHeight: 1,
                }}
              >
                A<span style={{ color: accent }}>W</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          zIndex: 6,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.10em",
          }}
        >
          PORTFOLIO · 2025
        </span>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.18)",
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
