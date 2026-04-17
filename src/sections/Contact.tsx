/**
 * @file Contact.tsx
 * @description Contact section with direct CTA, email copy, and real social links.
 */
"use client";

import { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { useLocale } from "@/hooks/useLocale";
import { Label } from "@/components/ui/Label";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { getContent } from "@/data/content";

export function Contact() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const { locale } = useLocale();
  const content = getContent(locale);

  const EMAIL = content.contact.email;
  const SOCIALS = content.contact.socials;
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

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

          <p
            className="rv d2"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              color: C.muted,
              lineHeight: 1.85,
              marginBottom: 36,
              fontWeight: 300,
              maxWidth: 460,
            }}
          >
            {content.contact.paragraphLine1}
            <br />
            <br />
            {content.contact.paragraphLine2}
          </p>

          <button
            onClick={copy}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: 460,
              padding: "16px 20px",
              borderRadius: 12,
              background: C.bg,
              border: `1px solid ${copied ? C.green + "50" : C.border}`,
              color: C.text,
              marginBottom: 24,
              transition: "all .25s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = C.border2;
              e.currentTarget.style.background = C.bg3;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = copied
                ? C.green + "50"
                : C.border;
              e.currentTarget.style.background = C.bg;
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

          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {SOCIALS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
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
                  textDecoration: "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = C.cyan;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = C.muted;
                }}
              >
                {social.label} <span style={{ fontSize: 12 }}>↗</span>
              </a>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
