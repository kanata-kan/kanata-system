/**
 * @file Contact.tsx
 * @description Contact section — clarity-first, filtered communication.
 */
"use client";

import { useState, useCallback } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { Label } from "@/components/ui/Label";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { content } from "@/data/content";

const EMAIL = content.contact.email;

const SOCIALS = content.contact.socials;

export function Contact() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }, []);

  return (
    <Section
      id="contact"
      bg="alt"
      style={{
        paddingBottom: 80,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "5%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: `radial-gradient(circle,${C.glow1},transparent 68%)`,
          pointerEvents: "none",
        }}
      />

      <Container variant="narrow">
        <Stack direction="column" gap="lg" style={{ position: "relative" }}>
          <Label c={C}>{content.contact.label}</Label>

          {/* 🔥 TITLE */}
          <h2
            className="rv d1"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: isMobile
                ? "clamp(30px,8vw,50px)"
                : "clamp(42px,5vw,66px)",
              letterSpacing: -2,
              color: C.text,
              marginBottom: 16,
              lineHeight: 1.05,
            }}
          >
            {content.contact.headingLine1}
            <br />
            <span className="grad-text">
              {content.contact.headingHighlight}
            </span>
          </h2>

          {/* 🔥 PARAGRAPH */}
          <p
            className="rv d2"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              color: C.muted,
              lineHeight: 1.85,
              marginBottom: 36,
              fontWeight: 300,
              maxWidth: 420,
            }}
          >
            {content.contact.paragraphLine1}
            <br />
            <br />
            {content.contact.paragraphLine2}
          </p>

          {/* Email + Copy */}
          <button
            onClick={copy}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: 440,
              padding: "15px 20px",
              borderRadius: 10,
              background: C.bg3,
              border: `1px solid ${copied ? C.green + "50" : C.border}`,
              color: C.text,
              marginBottom: 24,
              transition: "all .25s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = C.border2;
              e.currentTarget.style.background = C.card;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = copied
                ? C.green + "50"
                : C.border;
              e.currentTarget.style.background = C.bg3;
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: isMobile ? 12 : 13,
                color: C.sub,
              }}
            >
              {EMAIL}
            </span>

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: 2,
                color: copied ? C.green : C.cyan,
                background: copied ? `${C.green}15` : `${C.cyan}12`,
                border: `1px solid ${copied ? C.green + "35" : C.cyan + "35"}`,
                padding: "4px 11px",
                borderRadius: 4,
                transition: "all .2s",
              }}
            >
              {copied ? content.contact.copiedLabel : content.contact.copyLabel}
            </span>
          </button>

          {/* Socials */}
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {SOCIALS.map((name) => (
              <button
                key={name}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: 2,
                  color: C.muted,
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "color .2s",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = C.cyan;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = C.muted;
                }}
              >
                {name} <span style={{ fontSize: 12 }}>↗</span>
              </button>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
