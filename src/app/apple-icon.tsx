/**
 * @file apple-icon.tsx
 * @description Apple touch icon generator — renders the "A." brand mark
 * as a 180×180 PNG for iOS home screen and Safari bookmarks.
 */

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0D1117",
          borderRadius: "38px",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        {/* A. */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: "4px",
          }}
        >
          <span
            style={{
              fontSize: "110px",
              fontWeight: 700,
              color: "#E6EDF3",
              lineHeight: 1,
            }}
          >
            A
          </span>
          <span
            style={{
              fontSize: "110px",
              fontWeight: 700,
              color: "#38BDF8",
              lineHeight: 1,
            }}
          >
            .
          </span>
        </div>
        {/* Cyan dashes */}
        <div style={{ display: "flex", gap: "6px" }}>
          <div
            style={{
              width: "36px",
              height: "6px",
              background: "#38BDF8",
              borderRadius: "3px",
            }}
          />
          <div
            style={{
              width: "22px",
              height: "6px",
              background: "#38BDF8",
              borderRadius: "3px",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
