/**
 * Composes clean, minimal App Store screenshots from raw in-app captures.
 * Each output is a 1284x2778 (6.5") image: a short caption on a light
 * background with the real screenshot framed below. No AI imagery.
 *
 * Usage: node scripts/make-store-screenshots.js
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const SRC_DIR =
  '/Users/saratout/Library/Application Support/Cursor/User/workspaceStorage/adc8b767e1bbb5077162c8df23076107/images';
const OUT_DIR = path.join(__dirname, '..', 'store', 'screenshots');

const CANVAS_W = 1284;
const CANVAS_H = 2778;
const BG = '#EEF1F5';
const NAVY = '#1B2A6B';
const ACCENT = '#4A90D9';

// Larger screenshot = less downscaling from the 1284px-wide source = crisper UI.
const SHOT_W = 1120;
const SHOT_H = Math.round((SHOT_W * CANVAS_H) / CANVAS_W); // keep device aspect
const SHOT_X = Math.round((CANVAS_W - SHOT_W) / 2);
const SHOT_Y = 320;
const RADIUS = 44;

// App Store order. Filenames are the originals shared from the device.
const SHOTS = [
  // Cover the local "Playing as <name>" line so no badge name shows on the hero shot.
  { file: 'IMG_4710', lines: ['Clock in.', 'Survive to Friday.'], cover: [{ top: 2075, height: 95 }] },
  { file: 'IMG_4707', lines: ['Pick your fighter', 'and your perk.'] },
  { file: 'IMG_4709', lines: ['Every choice', 'has a cost.'] },
  { file: 'IMG_4708', lines: ['Walk the floor', 'between crises.'] },
  { file: 'IMG_4711', lines: ['See how your', 'week held up.'] },
  { file: 'IMG_4712', lines: ['Balance beats', 'blind hustle.'] },
];

function resolveSource(prefix) {
  const match = fs.readdirSync(SRC_DIR).find((f) => f.startsWith(prefix) && f.endsWith('.png'));
  if (!match) throw new Error(`Source screenshot not found for ${prefix}`);
  return path.join(SRC_DIR, match);
}

function captionSvg(lines) {
  const fontSize = 76;
  const lineHeight = 92;
  const startY = 120;
  const cx = CANVAS_W / 2;
  const tspans = lines
    .map((line, i) => `<text x="${cx}" y="${startY + i * lineHeight}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="800" font-size="${fontSize}" fill="${NAVY}">${line}</text>`)
    .join('');
  const underlineY = startY + lines.length * lineHeight - 30;
  const underline = `<rect x="${cx - 60}" y="${underlineY}" width="120" height="8" rx="4" fill="${ACCENT}" />`;
  return Buffer.from(
    `<svg width="${CANVAS_W}" height="${SHOT_Y}" xmlns="http://www.w3.org/2000/svg">${tspans}${underline}</svg>`,
  );
}

// Reads one pixel from the source so cover patches blend invisibly into the bg.
async function sampleColor(srcPath, x, y) {
  const { data } = await sharp(srcPath)
    .extract({ left: x, top: y, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return `rgb(${data[0]},${data[1]},${data[2]})`;
}

// Paints background-colored rectangles over the given full-res regions
// (used to hide the local "Playing as <name>" line on the hero shot).
async function applyCover(srcPath, cover) {
  if (!cover || cover.length === 0) return srcPath;
  const meta = await sharp(srcPath).metadata();
  const fill = await sampleColor(srcPath, 40, cover[0].top + Math.floor(cover[0].height / 2));
  const overlays = cover.map((c) => ({
    input: Buffer.from(
      `<svg width="${meta.width}" height="${c.height}"><rect width="100%" height="100%" fill="${fill}"/></svg>`,
    ),
    top: c.top,
    left: 0,
  }));
  return sharp(srcPath).composite(overlays).png().toBuffer();
}

async function roundedShot(srcPath, cover) {
  const base = await applyCover(srcPath, cover);
  const resized = await sharp(base)
    .resize(SHOT_W, SHOT_H, { fit: 'cover', kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8 })
    .toBuffer();
  const mask = Buffer.from(
    `<svg width="${SHOT_W}" height="${SHOT_H}"><rect width="${SHOT_W}" height="${SHOT_H}" rx="${RADIUS}" ry="${RADIUS}"/></svg>`,
  );
  const border = Buffer.from(
    `<svg width="${SHOT_W}" height="${SHOT_H}"><rect x="1" y="1" width="${SHOT_W - 2}" height="${SHOT_H - 2}" rx="${RADIUS}" ry="${RADIUS}" fill="none" stroke="#D7DEE8" stroke-width="2"/></svg>`,
  );
  return sharp(resized)
    .composite([
      { input: mask, blend: 'dest-in' },
      { input: border, blend: 'over' },
    ])
    .png()
    .toBuffer();
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let index = 1;
  for (const shot of SHOTS) {
    const src = resolveSource(shot.file);
    const framedShot = await roundedShot(src, shot.cover);
    const out = path.join(OUT_DIR, `${String(index).padStart(2, '0')}-${shot.file}.png`);
    await sharp({
      create: { width: CANVAS_W, height: CANVAS_H, channels: 4, background: BG },
    })
      .composite([
        { input: captionSvg(shot.lines), top: 0, left: 0 },
        { input: framedShot, top: SHOT_Y, left: SHOT_X },
      ])
      .png()
      .toFile(out);
    console.log(`wrote ${out}`);
    index += 1;
  }
  console.log(`\nDone. ${SHOTS.length} screenshots in ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
