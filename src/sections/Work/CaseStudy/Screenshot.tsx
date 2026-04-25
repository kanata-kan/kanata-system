/**
 * @file Screenshot.tsx
 * @description Compact screenshot card with browser chrome and lightbox on click.
 */
"use client";

import Image from "next/image";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { useLocale } from "@/hooks/useLocale";
import { getCaseStudyCopy } from "@/lib/caseStudyCopy";
import type { Theme } from "@/tokens/themes";
import type { CaseStudyScreenshot } from "@/data/content";

interface ScreenshotProps {
  screenshot: CaseStudyScreenshot;
  color: string;
  C: Theme;
  isMobile: boolean;
}

export function Screenshot({ screenshot, color, C, isMobile }: ScreenshotProps) {
  const { locale } = useLocale();
  const copy = getCaseStudyCopy(locale);

  return (
    <ImageLightbox
      src={screenshot.src}
      alt={screenshot.alt}
      caption={screenshot.caption}
      C={C}
    >
      <div
        style={{
          borderRadius: 10,
          overflow: "hidden",
          border: `1px solid ${C.line}`,
          background: C.bg2,
          transition: "all .3s",
          maxWidth: isMobile ? "100%" : 540,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = `0 8px 28px ${color}10`;
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            padding: "6px 12px",
            background: C.bg3,
            borderBottom: `1px solid ${C.line}`,
            display: "flex",
            alignItems: "center",
            gap: 5,
            transition: "background .35s",
          }}
        >
          {[1, 2, 3].map((d) => (
            <div
              key={d}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background:
                  d === 1 ? "#FF5F57" : d === 2 ? "#FEBC2E" : "#28C840",
                opacity: 0.5,
              }}
            />
          ))}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              color: C.faint,
              marginLeft: 6,
              letterSpacing: 0.5,
            }}
          >
            {screenshot.alt}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              color: C.faint,
              opacity: 0.5,
            }}
          >
            {copy.screenshot.clickToExpand}
          </span>
        </div>
        {/* Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            background: `linear-gradient(135deg, ${color}06, ${color}12)`,
          }}
        >
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={800}
            height={450}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              const t = e.currentTarget;
              t.style.display = "none";
              if (t.parentElement) {
                const ph = document.createElement("div");
                ph.style.cssText =
                  "display:flex;align-items:center;justify-content:center;width:100%;height:100%;position:absolute;inset:0;";
                ph.innerHTML = `<span style="font-family:var(--font-mono);font-size:10px;color:${C.faint};letter-spacing:2px;opacity:.6">SCREENSHOT</span>`;
                t.parentElement.appendChild(ph);
              }
            }}
          />
        </div>
        {/* Caption */}
        <div
          style={{
            padding: isMobile ? "8px 12px" : "10px 14px",
            borderTop: `1px solid ${C.line}`,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: C.muted,
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            {screenshot.caption}
          </p>
        </div>
      </div>
    </ImageLightbox>
  );
}
