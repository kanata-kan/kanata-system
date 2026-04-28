import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { BRAND } from "@/lib/brand";

export const alt = "Abdelilah Wajid — Product Engineer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* ── Shared palette ── */
const C = {
  bg: "#060810",
  accent: "#22d3ee",
  violet: "#a855f7",
  green: "#34d399",
  text: "#f0f4ff",
  sub: "rgba(200,210,240,0.78)",
  faint: "rgba(200,210,240,0.30)",
  glass: "rgba(14,18,32,0.72)",
  glassBorder: "rgba(34,211,238,0.14)",
};

/* Tiny tech-stack pills data */
const TECH = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"];

export default async function Image() {
  /* Load profile photo as base64 */
  let photoSrc = "";
  try {
    const buf = await readFile(
      join(process.cwd(), "public", BRAND.profilePhoto),
    );
    photoSrc = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    /* graceful fallback — monogram renders instead */
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: C.bg,
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background layers ── */}

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(34,211,238,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.035) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          display: "flex",
        }}
      />

      {/* Blob — top-left cyan */}
      <div
        style={{
          position: "absolute",
          top: -180,
          left: -80,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.13) 0%, transparent 65%)",
          display: "flex",
        }}
      />
      {/* Blob — centre-right violet */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: -40,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.11) 0%, transparent 65%)",
          display: "flex",
        }}
      />
      {/* Blob — bottom-left warm */}
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: 300,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,113,133,0.06) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Top accent stripe */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent 5%, ${C.accent} 30%, ${C.violet} 70%, transparent 95%)`,
          display: "flex",
        }}
      />

      {/* Corner brackets */}
      {[
        {
          top: 16,
          left: 16,
          borderTop: `1.5px solid rgba(34,211,238,0.18)`,
          borderLeft: `1.5px solid rgba(34,211,238,0.18)`,
        },
        {
          top: 16,
          right: 16,
          borderTop: `1.5px solid rgba(34,211,238,0.18)`,
          borderRight: `1.5px solid rgba(34,211,238,0.18)`,
        },
        {
          bottom: 16,
          left: 16,
          borderBottom: `1.5px solid rgba(34,211,238,0.18)`,
          borderLeft: `1.5px solid rgba(34,211,238,0.18)`,
        },
        {
          bottom: 16,
          right: 16,
          borderBottom: `1.5px solid rgba(34,211,238,0.18)`,
          borderRight: `1.5px solid rgba(34,211,238,0.18)`,
        },
      ].map((s, i) => (
        <div
          key={i}
          style={
            {
              position: "absolute",
              width: 22,
              height: 22,
              display: "flex",
              ...s,
            } as React.CSSProperties
          }
        />
      ))}

      {/* ── Main content row ── */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          padding: "0 80px",
          gap: 64,
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* ▸ LEFT PANEL — text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {/* Badge pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(34,211,238,0.08)",
              border: `1px solid rgba(34,211,238,0.22)`,
              borderRadius: 100,
              padding: "6px 16px",
              marginBottom: 24,
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.green,
                boxShadow: `0 0 10px ${C.green}`,
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: C.green,
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              AVAILABLE FOR WORK
            </span>
          </div>

          {/* Name — large editorial type */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              marginBottom: 18,
            }}
          >
            <span style={{ color: C.text }}>Abdelilah</span>
            <span
              style={{
                background: `linear-gradient(135deg, ${C.accent}, ${C.violet})`,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Wajid
            </span>
          </div>

          {/* Role */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 28,
                height: 2,
                background: `linear-gradient(90deg, ${C.accent}, ${C.violet})`,
                borderRadius: 2,
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 14,
                color: C.accent,
                letterSpacing: "0.12em",
                fontWeight: 600,
              }}
            >
              {BRAND.role}
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              fontSize: 23,
              fontWeight: 400,
              color: C.sub,
              lineHeight: 1.45,
              maxWidth: 460,
              marginBottom: 24,
            }}
          >
            Turning chaos into reliable systems.
          </div>

          {/* Tech stack pills */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            {TECH.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 12px",
                  borderRadius: 6,
                  background: "rgba(34,211,238,0.06)",
                  border: "1px solid rgba(34,211,238,0.12)",
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: C.accent,
                    display: "flex",
                  }}
                />
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "rgba(200,210,240,0.55)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {t}
                </span>
              </div>
            ))}
          </div>

          {/* URL + location */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                color: `rgba(34,211,238,0.75)`,
                letterSpacing: "0.04em",
                fontWeight: 500,
              }}
            >
              abdelilahwajid.com
            </span>
            <div
              style={{
                width: 1,
                height: 12,
                background: "rgba(255,255,255,0.10)",
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: C.faint,
                letterSpacing: "0.04em",
              }}
            >
              {BRAND.location}
            </span>
          </div>
        </div>

        {/* ▸ RIGHT PANEL — photo + floating cards */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: 340,
            height: 400,
            flexShrink: 0,
          }}
        >
          {/* Large glow behind photo */}
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(34,211,238,0.10) 0%, rgba(168,85,247,0.06) 50%, transparent 70%)`,
              display: "flex",
            }}
          />

          {/* Outer orbital ring */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 0,
              width: 340,
              height: 340,
              borderRadius: "50%",
              border: "1px solid rgba(34,211,238,0.10)",
              display: "flex",
            }}
          />

          {/* Orbital dot — top */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 166,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: C.accent,
              boxShadow: `0 0 14px ${C.accent}, 0 0 5px ${C.accent}`,
              display: "flex",
            }}
          />
          {/* Orbital dot — bottom-left */}
          <div
            style={{
              position: "absolute",
              bottom: 62,
              left: -4,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: C.violet,
              boxShadow: `0 0 10px ${C.violet}`,
              display: "flex",
            }}
          />

          {/* ── Photo container with gradient border ── */}
          <div
            style={{
              display: "flex",
              borderRadius: 32,
              padding: 2,
              background: `linear-gradient(145deg, ${C.accent}80, ${C.violet}60, ${C.accent}40)`,
              boxShadow: `0 0 50px -10px rgba(34,211,238,0.20), 0 0 80px -20px rgba(168,85,247,0.15)`,
              position: "relative",
              zIndex: 2,
            }}
          >
            {photoSrc ? (
              <div
                style={{
                  display: "flex",
                  width: 220,
                  height: 260,
                  borderRadius: 30,
                  overflow: "hidden",
                  background: C.bg,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={BRAND.name}
                  src={photoSrc}
                  width={220}
                  height={260}
                  style={{ objectFit: "cover", width: 220, height: 260 }}
                />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 220,
                  height: 260,
                  borderRadius: 30,
                  background: "rgba(14,18,32,0.9)",
                }}
              >
                <span
                  style={{
                    fontSize: 72,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: C.text,
                    lineHeight: 1,
                  }}
                >
                  A<span style={{ color: C.accent }}>W</span>
                </span>
              </div>
            )}
          </div>

          {/* ── Floating glass card: SYSTEM ONLINE ── */}
          <div
            style={{
              position: "absolute",
              top: 28,
              right: -10,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: 10,
              background: C.glass,
              border: `1px solid ${C.glassBorder}`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              zIndex: 4,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.green,
                boxShadow: `0 0 8px ${C.green}`,
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: C.green,
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              SYSTEM ONLINE
            </span>
          </div>

          {/* ── Floating glass card: Metrics ── */}
          <div
            style={{
              position: "absolute",
              bottom: 38,
              left: -30,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 16px",
              borderRadius: 10,
              background: C.glass,
              border: `1px solid ${C.glassBorder}`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              zIndex: 4,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 16,
                  fontWeight: 800,
                  color: C.accent,
                  lineHeight: 1,
                }}
              >
                2+
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 8,
                  color: C.faint,
                  letterSpacing: "0.06em",
                }}
              >
                YRS EXP
              </span>
            </div>
            <div
              style={{
                width: 1,
                height: 24,
                background: "rgba(255,255,255,0.06)",
                display: "flex",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 16,
                  fontWeight: 800,
                  color: C.violet,
                  lineHeight: 1,
                }}
              >
                10+
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 8,
                  color: C.faint,
                  letterSpacing: "0.06em",
                }}
              >
                PROJECTS
              </span>
            </div>
          </div>

          {/* ── Floating glass card: Code snippet ── */}
          <div
            style={{
              position: "absolute",
              bottom: 90,
              right: -24,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              padding: "8px 14px",
              borderRadius: 10,
              background: C.glass,
              border: `1px solid ${C.glassBorder}`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              zIndex: 4,
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 9,
                color: C.faint,
                letterSpacing: "0.03em",
              }}
            >
              <span style={{ color: C.violet }}>const</span>{" "}
              <span style={{ color: C.accent }}>system</span>{" "}
              <span style={{ color: C.faint }}>=</span>
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 9,
                color: C.faint,
                letterSpacing: "0.03em",
              }}
            >
              {"  "}
              <span style={{ color: C.green }}>build</span>
              <span style={{ color: "rgba(200,210,240,0.45)" }}>(chaos)</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
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
          padding: "0 80px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          zIndex: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              fontWeight: 800,
              color: "rgba(240,244,255,0.25)",
              letterSpacing: "-0.02em",
            }}
          >
            A<span style={{ color: `rgba(34,211,238,0.35)` }}>W</span>
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.14)",
              letterSpacing: "0.10em",
            }}
          >
            PORTFOLIO · 2025
          </span>
        </div>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.14)",
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
