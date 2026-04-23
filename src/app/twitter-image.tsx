/**
 * @file twitter-image.tsx
 * @description Twitter card image — re-uses the same design as opengraph-image.
 * Next.js auto-injects <meta name="twitter:image"> tag.
 * Uses OG_STYLES from brandStyles.ts for consistent styling.
 */

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND } from "@/lib/brand";
import { OG_STYLES } from "@/lib/brandStyles";

export const alt = `${BRAND.name} — ${BRAND.role}`;
export const size = OG_STYLES.dimensions;
export const contentType = "image/png";

export default async function Image() {
  let photoSrc = "";
  try {
    const photoBuffer = await readFile(
      join(process.cwd(), "public", BRAND.profilePhoto),
    );
    photoSrc = `data:image/png;base64,${photoBuffer.toString("base64")}`;
  } catch (error) {
    console.error("Failed to load photo for Twitter image:", error);
    // Fallback to a solid color or gradient if image fails to load
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: `linear-gradient(${OG_STYLES.background.angle}deg, ${OG_STYLES.background.start} 0%, ${OG_STYLES.background.end} 100%)`,
        padding: `${OG_STYLES.padding.vertical}px ${OG_STYLES.padding.horizontal}px`,
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow */}
      <div
        style={{
          position: "absolute",
          top: OG_STYLES.glow.position.top,
          right: OG_STYLES.glow.position.right,
          width: OG_STYLES.glow.size,
          height: OG_STYLES.glow.size,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${OG_STYLES.glow.color}${OG_STYLES.glow.opacity} 0%, transparent 70%)`,
        }}
      />

      {/* Left — Brand info */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          gap: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: OG_STYLES.spacing.monogramMarginBottom,
          }}
        >
          <span
            style={{
              fontSize: `${OG_STYLES.monogram.fontSize}px`,
              fontWeight: OG_STYLES.monogram.fontWeight,
              color: OG_STYLES.monogram.colors.first,
              lineHeight: 1,
            }}
          >
            {BRAND.monogram[0]}
          </span>
          <span
            style={{
              fontSize: `${OG_STYLES.monogram.fontSize}px`,
              fontWeight: OG_STYLES.monogram.fontWeight,
              color: OG_STYLES.monogram.colors.second,
              lineHeight: 1,
            }}
          >
            {BRAND.monogram[1]}
          </span>
          <div
            style={{
              display: "flex",
              gap: `${OG_STYLES.dashes.gap}px`,
              marginLeft: `${OG_STYLES.dashes.marginLeft}px`,
              alignItems: "center",
            }}
          >
            {OG_STYLES.dashes.items.map((item, index) => (
              <div
                key={index}
                style={{
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                  background: OG_STYLES.dashes.color,
                  borderRadius: `${OG_STYLES.dashes.radius}px`,
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            fontSize: `${OG_STYLES.name.fontSize}px`,
            fontWeight: OG_STYLES.name.fontWeight,
            color: OG_STYLES.name.color,
            lineHeight: OG_STYLES.name.lineHeight,
            marginBottom: `${OG_STYLES.name.marginBottom}px`,
            letterSpacing: `${OG_STYLES.name.letterSpacing}px`,
          }}
        >
          {BRAND.name}
        </div>

        <div
          style={{
            fontSize: `${OG_STYLES.role.fontSize}px`,
            color: OG_STYLES.role.color,
            letterSpacing: `${OG_STYLES.role.letterSpacing}px`,
            marginBottom: `${OG_STYLES.role.marginBottom}px`,
            fontWeight: OG_STYLES.role.fontWeight,
          }}
        >
          {BRAND.role}
        </div>

        <div
          style={{
            fontSize: `${OG_STYLES.tagline.fontSize}px`,
            color: OG_STYLES.tagline.color,
            letterSpacing: `${OG_STYLES.tagline.letterSpacing}px`,
            fontWeight: OG_STYLES.tagline.fontWeight,
          }}
        >
          Turning chaos into reliable systems
        </div>

        <div
          style={{
            fontSize: `${OG_STYLES.location.fontSize}px`,
            color: OG_STYLES.location.color,
            letterSpacing: `${OG_STYLES.location.letterSpacing}px`,
            marginTop: `${OG_STYLES.location.marginTop}px`,
          }}
        >
          {BRAND.location}
        </div>
      </div>

      {/* Right — Photo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: `${OG_STYLES.spacing.photoPaddingLeft}px`,
        }}
      >
        <div
          style={{
            width: `${OG_STYLES.photo.size}px`,
            height: `${OG_STYLES.photo.size}px`,
            borderRadius: OG_STYLES.photo.border.radius,
            overflow: "hidden",
            border: `${OG_STYLES.photo.border.width}px solid ${OG_STYLES.photo.border.color}`,
            boxShadow: `0 0 ${OG_STYLES.photo.shadow.blur}px ${OG_STYLES.photo.shadow.color}${OG_STYLES.photo.shadow.opacity}`,
            display: "flex",
          }}
        >
          {photoSrc ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={photoSrc}
              width={OG_STYLES.photo.size}
              height={OG_STYLES.photo.size}
              alt=""
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(${OG_STYLES.photo.fallback.gradient.angle}deg, ${OG_STYLES.photo.fallback.gradient.start} 0%, ${OG_STYLES.photo.fallback.gradient.end} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: `${OG_STYLES.photo.fallback.text.fontSize}px`,
                fontWeight: OG_STYLES.photo.fallback.text.fontWeight,
                color: OG_STYLES.photo.fallback.text.color,
              }}
            >
              {BRAND.monogram}
            </div>
          )}
        </div>
      </div>
    </div>,
    OG_STYLES.dimensions,
  );
}
