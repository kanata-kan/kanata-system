/**
 * @file HeroAvatar.tsx
 * @description Hero avatar card (desktop) and avatar row (mobile).
 * No internal state. Uses Avatar component and theme tokens.
 * Uses inline SVG icons — no external icon library.
 */
"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { Avatar } from "@/components/ui/Avatar";

/* ── Inline SVG Icons ── */

function IconMapPin({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconClock({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconGlobe({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconGitHub({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconX({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface InfoItem {
  icon: (color: string) => React.ReactNode;
  text: string;
}

const INFO_ITEMS: InfoItem[] = [
  { icon: (c) => <IconMapPin color={c} />, text: "Marrakech, Morocco" },
  { icon: (c) => <IconClock color={c} />, text: "UTC+1 — GMT+1" },
  { icon: (c) => <IconGlobe color={c} />, text: "Open to remote" },
];

const SOCIALS = [
  {
    icon: (c: string) => <IconGitHub color={c} />,
    href: "https://github.com/abdelilah",
    label: "GitHub",
  },
  {
    icon: (c: string) => <IconLinkedIn color={c} />,
    href: "https://linkedin.com/in/abdelilahwajid",
    label: "LinkedIn",
  },
  {
    icon: (c: string) => <IconX color={c} />,
    href: "https://x.com/abdelilahwajid",
    label: "X",
  },
];

export function HeroAvatar() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();

  // Mobile avatar row
  if (isMobile) {
    return (
      <div
        className="rv d4"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: 18,
          background: C.bg2,
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          transition: "background .35s",
        }}
      >
        <Avatar size={68} c={C} />
        <div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 17,
              fontStyle: "italic",
              color: C.text,
            }}
          >
            Abdelilah W.
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              color: C.muted,
              letterSpacing: 2,
              marginTop: 2,
            }}
          >
            UNDERSTAND → DECIDE → BUILD
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: C.muted,
              marginTop: 5,
            }}
          >
            <IconMapPin color={C.muted} size={11} />
            Marrakech · Open to remote
          </div>
        </div>
      </div>
    );
  }

  // Desktop avatar card — COMPACT
  return (
    <div
      className="rv d4"
      style={{ animation: "fadeUp .5s ease .4s both", width: "100%" }}
    >
      {/* Outer gradient ring */}
      <div
        style={{
          position: "relative",
          borderRadius: 20,
          padding: 1,
          background: `linear-gradient(145deg, ${C.border2}, transparent 60%, ${C.border})`,
        }}
      >
        <div
          style={{
            background: C.bg2,
            border: `1px solid ${C.border}`,
            borderRadius: 19,
            padding: "28px 24px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: `${C.shadow}, 0 0 60px -12px rgba(59,130,246,0.1)`,
            transition: "background .35s, border-color .35s, box-shadow .35s",
          }}
        >
          {/* Avatar with ring glow */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            {/* Animated ring */}
            <div
              style={{
                position: "absolute",
                inset: -5,
                borderRadius: "50%",
                background: `conic-gradient(from 0deg, ${C.border2}, transparent 40%, ${C.border2} 100%)`,
                animation: "spin 8s linear infinite",
                opacity: 0.5,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: "50%",
                background: C.bg2,
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <Avatar size={110} c={C} />
            </div>
            {/* Online dot */}
            <div
              style={{
                position: "absolute",
                bottom: 4,
                right: 4,
                width: 13,
                height: 13,
                borderRadius: "50%",
                background: C.green,
                border: `2.5px solid ${C.bg2}`,
                zIndex: 2,
                boxShadow: `0 0 8px ${C.green}99`,
              }}
            />
          </div>

          {/* Name & title */}
          <div style={{ textAlign: "center", marginBottom: 2 }}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 21,
                fontStyle: "italic",
                color: C.text,
                letterSpacing: -0.5,
                lineHeight: 1.2,
              }}
            >
              Abdelilah W.
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                color: C.muted,
                letterSpacing: 3,
                marginTop: 5,
                textTransform: "uppercase",
              }}
            >
              UNDERSTAND → DECIDE → BUILD
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: C.line,
              margin: "16px 0",
            }}
          />

          {/* Info items */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {INFO_ITEMS.map((item) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "5px 10px",
                  borderRadius: 8,
                  background: C.bg3,
                  border: `1px solid ${C.border}`,
                }}
              >
                <span style={{ display: "flex", flexShrink: 0 }}>
                  {item.icon(C.muted)}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    color: C.muted,
                    fontWeight: 300,
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: C.line,
              margin: "16px 0",
            }}
          />

          {/* Social icons */}
          <div
            style={{
              display: "flex",
              gap: 8,
              width: "100%",
              justifyContent: "center",
            }}
          >
            {SOCIALS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  flex: 1,
                  height: 34,
                  borderRadius: 8,
                  background: C.bg3,
                  border: `1px solid ${C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all .2s",
                  textDecoration: "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = C.border2;
                  e.currentTarget.style.background = C.card;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.background = C.bg3;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {icon(C.muted)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
