/**
 * @file apple-icon.tsx
 * @description Apple touch icon generator — renders the AW brand mark
 * as a 180×180 PNG for iOS home screen and Safari bookmarks.
 */

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#0e1117",
        borderRadius: "38px",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="18" fill="#0e1117" />
        <g
          fill="none"
          stroke="url(#g)"
          strokeWidth="9.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8,82 L28,16 L50,82 L63,16 L76,82 L89,16" />
          <path d="M17.5,53 L42,53" />
        </g>
      </svg>
    </div>,
    { ...size },
  );
}
