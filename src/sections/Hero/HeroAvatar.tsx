/**
 * @file HeroAvatar.tsx
 * @description Hero right-side code card (desktop) — IDE-style developer info.
 * Shows developer data as code syntax with social links.
 * Uses inline SVG icons — no external icon library.
 */
"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/data/content";
import { WindowDots } from "@/components/ui/WindowDots";

/* ── Inline SVG Icons ── */

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

const SOCIAL_ICONS = [
  (c: string) => <IconGitHub color={c} />,
  (c: string) => <IconLinkedIn color={c} />,
  (c: string) => <IconX color={c} />,
];

/** Code lines for the IDE-style card */
interface CodeToken {
  text: string;
  colorKey: "keyword" | "key" | "string" | "boolean" | "punct" | "comment";
}

function getCodeLines(): CodeToken[][] {
  return [
    [{ text: "// developer.ts", colorKey: "comment" }],
    [
      { text: "const ", colorKey: "keyword" },
      { text: "dev", colorKey: "key" },
      { text: " = {", colorKey: "punct" },
    ],
    [
      { text: "  name", colorKey: "key" },
      { text: ": ", colorKey: "punct" },
      { text: '"Abdelilah Wajid"', colorKey: "string" },
      { text: ",", colorKey: "punct" },
    ],
    [
      { text: "  role", colorKey: "key" },
      { text: ": ", colorKey: "punct" },
      { text: '"Full-Stack Engineer"', colorKey: "string" },
      { text: ",", colorKey: "punct" },
    ],
    [
      { text: "  location", colorKey: "key" },
      { text: ": ", colorKey: "punct" },
      { text: '"Marrakech, Morocco"', colorKey: "string" },
      { text: ",", colorKey: "punct" },
    ],
    [
      { text: "  timezone", colorKey: "key" },
      { text: ": ", colorKey: "punct" },
      { text: '"UTC+1"', colorKey: "string" },
      { text: ",", colorKey: "punct" },
    ],
    [
      { text: "  available", colorKey: "key" },
      { text: ": ", colorKey: "punct" },
      { text: "true", colorKey: "boolean" },
      { text: ",", colorKey: "punct" },
    ],
    [
      { text: "  remote", colorKey: "key" },
      { text: ": ", colorKey: "punct" },
      { text: "true", colorKey: "boolean" },
      { text: ",", colorKey: "punct" },
    ],
    [
      { text: "  approach", colorKey: "key" },
      { text: ": ", colorKey: "punct" },
      { text: '"understand-first"', colorKey: "string" },
      { text: ",", colorKey: "punct" },
    ],
    [{ text: "}", colorKey: "punct" }],
  ];
}

export function HeroAvatar() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const { locale } = useLocale();
  const content = getContent(locale);

  const SOCIALS = content.hero.avatar.socials.map((s, i) => ({
    icon: SOCIAL_ICONS[i],
    ...s,
  }));

  if (isMobile) return null;

  const colorMap: Record<CodeToken["colorKey"], string> = {
    keyword: C.purple,
    key: C.text,
    string: C.green,
    boolean: C.cyan,
    punct: C.muted,
    comment: C.faint,
  };

  const codeLines = getCodeLines();

  return (
    <div
      className="rv d4"
      style={{ animation: "fadeUp .5s ease .4s both", width: "100%" }}
    >
      {/* Outer gradient border */}
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          padding: 1,
          background: `linear-gradient(145deg, ${C.border2}, transparent 60%, ${C.border})`,
        }}
      >
        <div
          style={{
            background: C.bg2,
            borderRadius: 15,
            overflow: "hidden",
            boxShadow: `${C.shadow}, 0 0 60px -12px rgba(59,130,246,0.08)`,
            transition: "background .35s, box-shadow .35s",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              borderBottom: `1px solid ${C.line}`,
              background: C.bg3,
            }}
          >
            <WindowDots />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: C.muted,
                letterSpacing: 0.5,
              }}
            >
              developer.ts
            </span>
          </div>

          {/* Code body */}
          <div style={{ padding: "16px 20px" }}>
            {codeLines.map((line, li) => (
              <div
                key={li}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  lineHeight: 1.9,
                  whiteSpace: "pre",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 24,
                    color: C.faint,
                    fontSize: 10,
                    textAlign: "right",
                    marginRight: 16,
                    userSelect: "none",
                  }}
                >
                  {li + 1}
                </span>
                {line.map((token, ti) => (
                  <span key={ti} style={{ color: colorMap[token.colorKey] }}>
                    {token.text}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Social bar */}
          <div
            style={{
              display: "flex",
              gap: 6,
              padding: "12px 20px",
              borderTop: `1px solid ${C.line}`,
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
                  height: 32,
                  borderRadius: 6,
                  background: C.bg3,
                  border: `1px solid ${C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  cursor: "pointer",
                  transition: "all .2s",
                  textDecoration: "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = C.border2;
                  e.currentTarget.style.background = C.card;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.background = C.bg3;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {icon(C.muted)}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: C.muted,
                    letterSpacing: 1,
                  }}
                >
                  {label.toUpperCase()}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
