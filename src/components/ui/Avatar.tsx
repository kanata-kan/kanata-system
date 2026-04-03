/**
 * @file Avatar.tsx
 * @description Illustration SVG personnalisée pour le profil.
 * SVG inline — zéro requête réseau.
 * Inclut : gradient ring conic, visage détaillé, cheveux, épaules,
 * et pastille verte "online" avec animation glow.
 * Reçoit le thème via prop `c: Theme`.
 */

import type { Theme } from "@/tokens/themes";

interface AvatarProps {
  c: Theme;
  size?: number;
}

export function Avatar({ c, size = 110 }: AvatarProps) {
  return (
    <div
      style={{ position: "relative", width: size, height: size, flexShrink: 0 }}
    >
      {/* Gradient ring */}
      <div
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: "50%",
          background: `conic-gradient(from 0deg,${c.cyan},${c.purple},${c.cyan})`,
          padding: 2,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: c.bg,
          }}
        />
      </div>

      {/* Face */}
      <div
        style={{
          position: "absolute",
          inset: 3,
          borderRadius: "50%",
          overflow: "hidden",
          background: `linear-gradient(145deg,${c.bg3},${c.card})`,
          border: `1px solid ${c.border}`,
        }}
      >
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <defs>
            <linearGradient id="bg_g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={c.bg3} />
              <stop offset="100%" stopColor={c.card} />
            </linearGradient>
            <linearGradient id="skin_g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8B98A" />
              <stop offset="100%" stopColor="#C8916A" />
            </linearGradient>
            <linearGradient id="shirt_g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c.cyan} stopOpacity=".9" />
              <stop offset="100%" stopColor={c.purple} stopOpacity=".9" />
            </linearGradient>
            <clipPath id="cc">
              <circle cx="60" cy="60" r="57" />
            </clipPath>
          </defs>
          <circle cx="60" cy="60" r="60" fill="url(#bg_g)" />
          {/* Body */}
          <ellipse
            cx="60"
            cy="105"
            rx="40"
            ry="28"
            fill="url(#shirt_g)"
            clipPath="url(#cc)"
          />
          <polygon
            points="52,88 60,96 68,88 64,105 56,105"
            fill="rgba(255,255,255,0.12)"
          />
          {/* Neck */}
          <rect
            x="54"
            y="74"
            width="12"
            height="16"
            rx="6"
            fill="url(#skin_g)"
          />
          {/* Head */}
          <ellipse cx="60" cy="60" rx="22" ry="24" fill="url(#skin_g)" />
          {/* Hair */}
          <ellipse cx="60" cy="37" rx="22" ry="10" fill="#2C1810" />
          <rect x="38" y="37" width="44" height="8" fill="#2C1810" />
          {/* Eyes */}
          <ellipse cx="52" cy="60" rx="4" ry="4.5" fill="white" />
          <ellipse cx="68" cy="60" rx="4" ry="4.5" fill="white" />
          <circle cx="53" cy="61" r="2.5" fill="#1a1a2e" />
          <circle cx="69" cy="61" r="2.5" fill="#1a1a2e" />
          <circle cx="54" cy="60" r="1" fill="white" />
          <circle cx="70" cy="60" r="1" fill="white" />
          {/* Eyebrows */}
          <path
            d="M47,54 Q52,51 57,54"
            stroke="#2C1810"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M63,54 Q68,51 73,54"
            stroke="#2C1810"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Nose */}
          <path
            d="M59,64 Q57,70 60,72 Q63,70 61,64"
            stroke="#C8916A"
            strokeWidth="1"
            fill="none"
          />
          {/* Mouth */}
          <path
            d="M53,77 Q60,83 67,77"
            stroke="#C8916A"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Beard shadow */}
          <ellipse cx="60" cy="80" rx="13" ry="5" fill="rgba(44,24,16,0.25)" />
        </svg>
      </div>

      {/* Online status dot */}
      <div
        style={{
          position: "absolute",
          bottom: 4,
          right: 4,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: c.green,
          border: `2px solid ${c.bg}`,
          animation: "glow 2s ease-in-out infinite",
          zIndex: 2,
        }}
      />
    </div>
  );
}
