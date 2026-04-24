/**
 * @file CaseStudyCTA.tsx
 * @description Closing CTA section for the case study page.
 */
"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import type { Theme } from "@/tokens/themes";

interface CaseStudyCTAProps {
  cta: string;
  color: string;
  C: Theme;
  isMobile: boolean;
}

export function CaseStudyCTA({ cta, color, C, isMobile }: CaseStudyCTAProps) {
  return (
    <section
      style={{
        paddingTop: isMobile ? 56 : 80,
        paddingBottom: isMobile ? 56 : 80,
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}10, transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <Container>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: 3,
            color: C.faint,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          What&apos;s next?
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: isMobile ? 22 : 32,
            color: C.text,
            letterSpacing: -1,
            lineHeight: 1.35,
            maxWidth: 520,
            margin: "0 auto 36px",
          }}
        >
          {cta}
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/#work"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: 2,
              padding: "11px 28px",
              borderRadius: 8,
              border: `1px solid ${C.line}`,
              color: C.muted,
              textDecoration: "none",
              transition: "all .25s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = C.border2;
              e.currentTarget.style.color = C.sub;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = C.line;
              e.currentTarget.style.color = C.muted;
            }}
          >
            ← ALL PROJECTS
          </Link>
          <Link
            href="/#contact"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: 2,
              padding: "11px 28px",
              borderRadius: 8,
              background: color,
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all .25s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 8px 28px ${color}40`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            START A CONVERSATION →
          </Link>
        </div>
      </Container>
    </section>
  );
}
