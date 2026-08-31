// Regenerates MDORRA brand raster assets from app/icon.svg:
//   app/icon.png                      32px favicon fallback
//   app/apple-icon.png               180px iOS home-screen icon
//   public/icons/icon-192.png         PWA manifest icon
//   public/icons/icon-512.png         PWA manifest icon
//   public/icons/icon-maskable-512.png
//   public/og/og-default.png         1200x630 social sharing image
//
// Run: node scripts/generate-icons.mjs
// app/icon.svg is the single source of truth for the mark. The glyph spans
// roughly x17-47 / y22-52 in a 64 canvas — inside the 80% safe zone, so the
// same artwork is used for the maskable icon too.

import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = await readFile(join(root, 'app', 'icon.svg'));

const out = {
  'app/icon.png': 32,
  'app/apple-icon.png': 180,
  'public/icons/icon-192.png': 192,
  'public/icons/icon-512.png': 512,
  'public/icons/icon-maskable-512.png': 512,
};

for (const [file, size] of Object.entries(out)) {
  const dir = dirname(join(root, file));
  await mkdir(dir, { recursive: true });
  const buffer = await sharp(svg).resize(size, size).png().toBuffer();
  await writeFile(join(root, file), buffer);
  console.log('wrote', file, `${size}x${size}`);
}

// OG default: warm paper, mark on dark plate, wordmark + tagline.
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7f5f1"/>
  <rect x="0" y="0" width="1200" height="2" fill="#1b1a17"/>
  <g transform="translate(96,96)">
    <rect width="64" height="64" fill="#15140f"/>
    <g stroke="#f7f5f1" stroke-width="5" stroke-linecap="butt" fill="none">
      <path d="M17 22 V46 M17 22 L32 34 L47 22 M47 22 V46"/>
    </g>
    <rect x="21" y="52" width="22" height="1.5" fill="#7d5c42"/>
  </g>
  <text x="96" y="340" font-family="Georgia, 'Times New Roman', serif" font-size="72" letter-spacing="-1" fill="#1b1a17">MDORRA</text>
  <rect x="98" y="372" width="72" height="2" fill="#7d5c42"/>
  <text x="96" y="416" font-family="'Courier New', monospace" font-size="15" letter-spacing="6" fill="#6e685f">ARCHITECTURE · INTERIORS · EXECUTION</text>
  <rect x="96" y="480" width="1008" height="1" fill="#dad5cb"/>
</svg>`;

await mkdir(join(root, 'public', 'og'), { recursive: true });
await writeFile(
  join(root, 'public', 'og', 'og-default.png'),
  await sharp(Buffer.from(ogSvg)).png().toBuffer(),
);
console.log('wrote public/og/og-default.png 1200x630');
