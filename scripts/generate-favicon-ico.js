/**
 * Generate favicon.ico from SVG
 * Google Search prefers favicon.ico for search results
 */

import sharp from "sharp";
import toIco from "to-ico";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

async function generateFaviconIco() {
  try {
    // Read SVG file
    const svgBuffer = await readFile(
      join(process.cwd(), "public", "favicon.svg"),
    );

    // Generate multiple sizes for favicon.ico
    const sizes = [16, 32, 48];
    const pngBuffers = await Promise.all(
      sizes.map((size) => sharp(svgBuffer).resize(size, size).png().toBuffer()),
    );

    // Convert to ICO format
    const icoBuffer = await toIco(pngBuffers);

    // Save to public folder
    await writeFile(join(process.cwd(), "public", "favicon.ico"), icoBuffer);

    console.log("✅ favicon.ico generated successfully");
  } catch (error) {
    console.error("❌ Error generating favicon.ico:", error);
    process.exit(1);
  }
}

generateFaviconIco();
