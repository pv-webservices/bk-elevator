/**
 * Generates the optional sector images with Google's Nano Banana 2 Lite model
 * (gemini-3.1-flash-lite-image) at 1K and saves them as optimised WebP.
 *
 *   1. Put GEMINI_API_KEY=... in a .env file at the project root (already git-ignored).
 *   2. npm run images:generate
 *   3. npm run build   — the sector cards pick the images up automatically.
 *
 * Existing files are skipped, so re-running never regenerates (or re-bills) an image.
 */
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, 'public', 'images', 'generated');
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-3.1-flash-lite-image';
const WEBP_QUALITY = 78;
const MAX_IMAGES = 8;

const STYLE =
  'Photorealistic architectural photograph, premium and modern, warm golden-hour lighting, ' +
  'subtle gold and charcoal colour palette, shallow depth of field, Indian city context, ' +
  'no people facing camera, no text, no logos, no watermarks, no brand names.';

const IMAGES = [
  ['sector-residential', 'A luxury residential apartment lobby in India with a polished gold-and-mirror passenger elevator, doors open, marble floor.'],
  ['sector-commercial', 'A contemporary glass office tower lobby with a bank of stainless-steel elevators, clean lines, evening light.'],
  ['sector-healthcare', 'A bright, spotless hospital corridor with a wide stretcher-size elevator, brushed steel doors, calm atmosphere.'],
  ['sector-hospitality', 'An elegant five-star hotel lobby with a gold-finished elevator, chandelier glow, plush interiors.'],
  ['sector-industrial', 'A large industrial goods lift with heavy-duty steel doors inside a clean modern warehouse.'],
  ['sector-retail', 'A modern shopping mall atrium with a panoramic glass capsule elevator rising between floors.'],
  ['sector-institutions', 'A modern Indian college building foyer with a sleek accessible passenger elevator, daylight.'],
].slice(0, MAX_IMAGES);

function readApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const envFile = join(ROOT, '.env');
  if (!existsSync(envFile)) return undefined;
  const line = readFileSync(envFile, 'utf8')
    .split(/\r?\n/)
    .find((l) => /^\s*(GEMINI_API_KEY|GOOGLE_API_KEY)\s*=/.test(l));
  return line?.split('=').slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
}

async function generate(apiKey, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const body = (imageSize) => ({
    contents: [{ role: 'user', parts: [{ text: `${prompt} ${STYLE}` }] }],
    generationConfig: {
      responseModalities: ['IMAGE', 'TEXT'],
      imageConfig: { aspectRatio: '1:1', ...(imageSize ? { imageSize } : {}) },
    },
  });
  // Ask for 1K explicitly; retry without the size hint if this model rejects the field.
  for (const size of ['1K', undefined]) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify(body(size)),
    });
    if (res.status === 400 && size) continue;
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const json = await res.json();
    const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
    if (!part) throw new Error('No image returned (the prompt may have been filtered).');
    return Buffer.from(part.inlineData.data, 'base64');
  }
  throw new Error('Request rejected.');
}

const apiKey = readApiKey();
if (!apiKey) {
  console.error('GEMINI_API_KEY not found. Add it to .env at the project root, then re-run.');
  process.exit(1);
}
mkdirSync(OUT_DIR, { recursive: true });

let made = 0;
for (const [name, prompt] of IMAGES) {
  const file = join(OUT_DIR, `${name}.webp`);
  if (existsSync(file)) {
    console.log(`skip  ${name} (exists)`);
    continue;
  }
  try {
    const raw = await generate(apiKey, prompt);
    await sharp(raw).resize(1024, 1024, { fit: 'cover' }).webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(file);
    made++;
    console.log(`saved ${name}.webp`);
  } catch (error) {
    console.error(`fail  ${name}: ${error instanceof Error ? error.message : error}`);
  }
}
console.log(`Done. ${made} new image(s) in public/images/generated/. Run "npm run build" to publish them.`);
