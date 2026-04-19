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

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${content.contact.whatsapp.phone.replace(/\+/g, "")}?text=${encodeURIComponent(content.contact.whatsapp.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rv d4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              width: "100%",
              maxWidth: 460,
              padding: "14px 20px",
              borderRadius: 12,
              background: "#25D366",
              color: "#fff",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 2,
              textDecoration: "none",
              marginBottom: 24,
              transition: "all .25s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#1EBE5A";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(37,211,102,.35)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#25D366";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {content.contact.whatsapp.label}
          </a>

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
