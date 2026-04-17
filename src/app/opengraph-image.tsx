/**
 * @file opengraph-image.tsx
 * @description Dynamic OG image generator for social sharing (WhatsApp, Facebook, Twitter).
 * Composites the brand mark + user photo into a 1200×630 card.
 * Next.js auto-injects the corresponding <meta property="og:image"> tag.
 */

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Abdelilah Wajid — Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photoBuffer = await readFile(
    join(process.cwd(), "public", "Abdelilah-Wajid .png")
  );
  const photoSrc = `data:image/png;base64,${photoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(145deg, #0D1117 0%, #161B22 100%)",
          padding: "60px 70px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Left — Brand info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: "4px",
          }}
        >
          {/* Brand mark: A. */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: "72px",
                fontWeight: 800,
                color: "#E6EDF3",
                lineHeight: 1,
              }}
            >
              A
            </span>
            <span
              style={{
                fontSize: "72px",
                fontWeight: 800,
                color: "#38BDF8",
                lineHeight: 1,
              }}
            >
              .
            </span>
            {/* Cyan dashes */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginLeft: "16px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "4px",
                  background: "#38BDF8",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  width: "24px",
                  height: "4px",
                  background: "#38BDF8",
                  borderRadius: "2px",
                }}
              />
            </div>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "54px",
              fontWeight: 700,
              color: "#E6EDF3",
              lineHeight: 1.1,
              marginBottom: "12px",
              letterSpacing: "-1px",
            }}
          >
            Abdelilah Wajid
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: "20px",
              color: "#8B949E",
              letterSpacing: "4px",
              marginBottom: "20px",
              fontWeight: 500,
            }}
          >
            PRODUCT ENGINEER
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "15px",
              color: "#38BDF8",
              letterSpacing: "5px",
              fontWeight: 400,
            }}
          >
            UNDERSTAND · DECIDE · BUILD
          </div>

          {/* Location */}
          <div
            style={{
              fontSize: "14px",
              color: "#484F58",
              letterSpacing: "2px",
              marginTop: "16px",
            }}
          >
            MARRAKECH, MOROCCO
          </div>
        </div>

        {/* Right — Photo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "40px",
          }}
        >
          <div
            style={{
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid #38BDF8",
              boxShadow: "0 0 60px rgba(56,189,248,0.15)",
              display: "flex",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              width={320}
              height={320}
              alt=""
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
