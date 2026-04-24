import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgPath = path.join(__dirname, "../public/favicon.svg");
const publicDir = path.join(__dirname, "../public");

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
];

async function generateFavicons() {
  try {
    for (const { name, size } of sizes) {
      const outputPath = path.join(publicDir, name);
      await sharp(svgPath).resize(size, size).png().toFile(outputPath);
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }
    console.log("\n✅ All favicons generated successfully!");
  } catch (error) {
    console.error("Error generating favicons:", error);
    process.exit(1);
  }
}

generateFavicons();
