/**
 * Generate additional icon sizes for PWA manifest
 */

import sharp from 'sharp';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function generateAdditionalIcons() {
  try {
    const svgBuffer = await readFile(join(process.cwd(), 'public', 'favicon.svg'));
    
    const sizes = [192, 512];
    
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(join(process.cwd(), 'public', `favicon-${size}.png`));
      console.log(`✅ favicon-${size}.png generated`);
    }
    
    console.log('✅ All additional icons generated successfully');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateAdditionalIcons();
