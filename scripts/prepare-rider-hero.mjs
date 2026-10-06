import { mkdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { readPalette } from "./lib/theme-palette.mjs";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));
const directory = new URL("../public/images/riders/", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("sources.json", directory), "utf8"));
const photo = manifest["quickbite-delivery-scooter-front.webp"];
const palette = await readPalette(new URL("../src/app/globals.css", import.meta.url));
const source = process.argv[2]
  ? await readFile(process.argv[2])
  : await (async () => {
      const response = await fetch(photo.source, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`Rider photo: HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    })();

const metadata = await sharp(source).metadata();
if (metadata.width !== 800 || metadata.height !== 600) {
  throw new Error(`Expected the 800 × 600 source photograph; received ${metadata.width} × ${metadata.height}.`);
}

// Work against the source photograph's exact coordinate system so this can be
// reproduced without an image editor or an image-generation service.
const { data, info } = await sharp(source).resize(800, 600).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const removed = new Uint8Array(width * height);
const queue = new Int32Array(width * height);
let tail = 0;
const visit = (x, y) => {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const index = y * width + x;
  if (removed[index]) return;
  const offset = index * 4;
  const threshold = x > 530 && x < 661 && y > 399 && y < 536 ? 232 : 243;
  if (Math.min(data[offset], data[offset + 1], data[offset + 2]) < threshold) return;
  removed[index] = 1;
  queue[tail++] = index;
};
for (let x = 0; x < width; x++) { visit(x, 0); visit(x, height - 1); }
for (let y = 0; y < height; y++) { visit(0, y); visit(width - 1, y); }
// White studio background enclosed between the chrome wheel spokes.
for (const [x, y] of [[571, 427], [607, 414], [608, 440], [630, 435], [640, 463], [634, 473], [623, 482], [608, 518], [572, 512], [558, 480], [554, 460], [227, 373], [281, 449]]) visit(x, y);
for (let cursor = 0; cursor < tail; cursor++) {
  const index = queue[cursor];
  const x = index % width;
  const y = Math.floor(index / width);
  visit(x - 1, y); visit(x + 1, y); visit(x, y - 1); visit(x, y + 1);
}

// Exclude the photograph's gray floor shadow while tracing the full lower
// wheels and stand. The website supplies its own shadow on the dark backdrop.
const groundMask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><path fill="white" d="M0 0H800V380H662C681 401 690 430 686 468C683 508 663 543 638 557C612 574 581 568 560 549C536 528 525 500 521 471C485 481 449 474 398 469L391 480L387 470L353 463L332 465L328 458L317 455C307 478 290 491 270 492C246 497 224 482 212 465C202 451 196 432 195 416H0Z"/></svg>`);
const ground = await sharp(groundMask).ensureAlpha().raw().toBuffer();
// The white paint contains highlights as bright as the studio background.
// Restore only the known painted panels, with contours following the photo.
const paintedPanels = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><g fill="white">
  <path d="M449 168L481 153L493 152L499 142L514 138L522 139L536 154L544 151Q566 149 571 169L570 180L554 191L541 203L502 205L483 201L481 190L475 186L493 179L491 173L466 165Z"/>
  <path d="M493 198L563 189Q588 192 594 228L606 280Q614 313 607 335L582 334Q541 339 511 382L469 382Q480 356 489 339L494 322L494 300L488 272L486 253L487 243L482 229Q474 210 493 198Z"/>
  <path d="M520 386Q533 348 569 337Q605 330 644 352Q659 367 665 386L650 386Q587 380 549 384Z"/>
</g></svg>`);
const painted = await sharp(paintedPanels).ensureAlpha().raw().toBuffer();
const alpha = Buffer.alloc(width * height);
for (let index = 0; index < width * height; index++) alpha[index] = Math.max(removed[index] ? 0 : ground[index * 4 + 3], painted[index * 4 + 3]);

// Remove the thin white matte only around background-connected boundaries;
// preserve the bodywork's white paint and the reflective chrome details.
const inset = await sharp(alpha, { raw: { width, height, channels: 1 } }).dilate(1).blur(0.3).toColourspace("b-w").raw().toBuffer();
// These slender mirror stalks are narrower than the matte cleanup radius.
const stalkSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><g fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"><path d="M446 84Q454 104 461 122Q469 141 469 151"/><path d="M557 98Q551 119 548 134L547 148"/></g></svg>`);
const stalks = await sharp(stalkSvg).ensureAlpha().raw().toBuffer();
for (let index = 0; index < width * height; index++) data[index * 4 + 3] = Math.max(inset[index], stalks[index * 4 + 3]);

const markSvg = await readFile(new URL("../public/logo-mark.svg", import.meta.url), "utf8");
const markPath = markSvg.match(/\bd="([^"]+)"/)?.[1];
if (!markPath) throw new Error("The QuickBite logo mark is missing its path.");
const brand = palette.resolve("--color-brand");
const paper = palette.resolve("--color-paper");
// A small printed decal follows the cargo box's right-facing plane, clear of
// its hinges and lid seam. The real logo path stays editable at its source.
const decal = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
  <g transform="matrix(1,-0.045,0,1,242,161)">
    <rect width="99" height="29" rx="3" fill="${brand}"/>
    <g transform="translate(1,1) scale(.85)"><path fill="${paper}" d="${markPath}"/></g>
    <text x="27" y="18" font-family="Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="-.6" fill="${paper}">QuickBite</text>
  </g>
</svg>`);
const cutout = await sharp(data, { raw: { width, height, channels: 4 } })
  .composite([{ input: decal }]).png().toBuffer();
const output = fileURLToPath(new URL("quickbite-delivery-scooter-front.webp", directory));
await sharp(cutout).trim({ threshold: 8 }).resize(1240, 1120, { fit: "contain", background: "#00000000" })
  .extend({ top: 40, bottom: 40, left: 40, right: 40, background: "#00000000" })
  .webp({ quality: 94, alphaQuality: 100, effort: 6 }).toFile(output);
const artifacts = new URL("../.codex-artifacts/", import.meta.url);
await mkdir(artifacts, { recursive: true });
await sharp(output).flatten({ background: palette.resolve("--color-dark-ink") }).png()
  .toFile(fileURLToPath(new URL("emco-quickbite-preview.png", artifacts)));
console.log("Prepared complete branded delivery scooter: 1320 × 1200 transparent WebP.");
