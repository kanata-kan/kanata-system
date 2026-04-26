/**
 * @file [locale]/work/[slug]/opengraph-image.tsx
 * @description Dynamic OG image per case study — uses project color, name, subtitle, tags.
 */

import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/data/projects";
import { BRAND } from "@/lib/brand";
import type { Locale } from "@/data/content/types";

export const alt = "Case Study — Abdelilah Wajid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const project =
    getProjectBySlug(slug, locale as Locale) ?? getProjectBySlug(slug, "en");

  /* ── Color palette ── */
  const accent = project?.color ?? BRAND.colors.cyan;
  const violet = BRAND.colors.violet;
  const accentDim = `${accent}38`;

  /* ── Text content ── */
  const projectName = project?.name ?? "Case Study";
  const subtitle = project?.caseStudy?.subtitle ?? project?.desc ?? "";
  const tags = (project?.caseStudy?.tags ?? []).slice(0, 3);
  const projectType = project?.type ?? "Product Engineering";

  /* ── Responsive font size for long project names ── */
  const nameFontSize =
    projectName.length > 30 ? 44 : projectName.length > 22 ? 54 : 64;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#060810",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${accent}08 1px, transparent 1px), linear-gradient(90deg, ${accent}08 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          display: "flex",
        }}
      />

      {/* Blob — top left (project color) */}
      <div
        style={{
          position: "absolute",
          top: -140,
          left: -80,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}18 0%, transparent 68%)`,
          display: "flex",
        }}
      />
      {/* Blob — bottom right (violet) */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: 100,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${violet}12 0%, transparent 68%)`,
          display: "flex",
        }}
      />

      {/* Top bar — project color */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${accent} 30%, ${violet} 75%, transparent)`,
          display: "flex",
        }}
      />

      {/* Corner TL */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          width: 20,
          height: 20,
          borderTop: `1.5px solid ${accentDim}`,
          borderLeft: `1.5px solid ${accentDim}`,
          display: "flex",
        }}
      />
      {/* Corner TR */}
      <div
        style={{
          position: "absolute",
          top: 18,
          right: 18,
          width: 20,
          height: 20,
          borderTop: `1.5px solid ${accentDim}`,
          borderRight: `1.5px solid ${accentDim}`,
          display: "flex",
        }}
      />
      {/* Corner BL */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 18,
          width: 20,
          height: 20,
          borderBottom: `1.5px solid ${accentDim}`,
          borderLeft: `1.5px solid ${accentDim}`,
          display: "flex",
        }}
      />
      {/* Corner BR */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          right: 18,
          width: 20,
          height: 20,
          borderBottom: `1.5px solid ${accentDim}`,
          borderRight: `1.5px solid ${accentDim}`,
          display: "flex",
        }}
      />

      {/* ── Content row ── */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          padding: "0 90px",
          gap: 64,
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Left panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 0,
          }}
        >
          {/* "CASE STUDY" badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: `${accent}10`,
              border: `1px solid ${accent}30`,
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 24,
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: accent,
                boxShadow: `0 0 8px ${accent}`,
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: accent,
                letterSpacing: "0.10em",
                fontWeight: 600,
              }}
            >
              CASE STUDY
            </span>
          </div>

          {/* Project name */}
          <div
            style={{
              display: "flex",
              fontSize: nameFontSize,
              fontWeight: 800,
              color: "#f0f4ff",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 20,
              maxWidth: 700,
            }}
          >
            {projectName}
          </div>

          {/* Subtitle */}
          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 17,
                fontWeight: 300,
                color: "rgba(200,210,240,0.52)",
                letterSpacing: "0.01em",
                lineHeight: 1.45,
                maxWidth: 600,
                marginBottom: 28,
              }}
            >
              {subtitle.length > 110 ? subtitle.slice(0, 110) + "…" : subtitle}
            </div>
          ) : null}

          {/* Tags */}
          {tags.length > 0 ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "nowrap" }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "4px 12px",
                    borderRadius: 6,
                    background: `${accent}08`,
                    border: `1px solid ${accent}22`,
                    fontSize: 11,
                    color: `${accent}CC`,
                    letterSpacing: "0.06em",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Right panel — AW mark + author */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            flexShrink: 0,
          }}
        >
          {/* Monogram container */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              width: 180,
              height: 180,
            }}
          >
            {/* Outer ring */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "50%",
                border: `1px solid ${accent}20`,
                display: "flex",
              }}
            />
            {/* Mid ring */}
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                right: 16,
                bottom: 16,
                borderRadius: "50%",
                border: `1px solid ${violet}15`,
                display: "flex",
              }}
            />
            {/* Ring dot */}
            <div
              style={{
                position: "absolute",
                top: -3,
                left: 87,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: accent,
                boxShadow: `0 0 10px ${accent}`,
                display: "flex",
              }}
            />
            {/* Monogram box */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 100,
                height: 100,
                borderRadius: 18,
                background: `${accent}08`,
                border: `1px solid ${accent}20`,
              }}
            >
              <span
                style={{
                  fontSize: 38,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "#f0f4ff",
                  lineHeight: 1,
                }}
              >
                A<span style={{ color: accent }}>W</span>
              </span>
            </div>
          </div>

          {/* Author */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: "rgba(200,210,240,0.55)",
                letterSpacing: "0.04em",
                fontWeight: 500,
              }}
            >
              Abdelilah Wajid
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: `${accent}80`,
                letterSpacing: "0.08em",
              }}
            >
              {BRAND.role}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          zIndex: 6,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.10em",
          }}
        >
          ABDELILAH WAJID · PORTFOLIO
        </span>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: `${accent}55`,
            letterSpacing: "0.08em",
          }}
        >
          {projectType.toUpperCase()}
        </span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
