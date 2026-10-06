import { mkdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { readPalette } from "./lib/theme-palette.mjs";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));
const directory = new URL("../public/images/riders/", import.meta.url);
const filename = "quickbite-delivery-scooter-wordmark.webp";
const manifest = JSON.parse(await readFile(new URL("sources.json", directory), "utf8"));
const palette = await readPalette(new URL("../src/app/globals.css", import.meta.url));
const source = process.argv[2]
  ? await readFile(process.argv[2])
  : await (async () => {
      const response = await fetch(manifest[filename].source, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`Rider photo: HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    })();

const metadata = await sharp(source).metadata();
if (metadata.width !== 5760 || metadata.height !== 3840 || !metadata.hasAlpha) {
  throw new Error("Expected the original transparent 5760 by 3840 Tinbot photograph.");
}

// Keep the manufacturer's native cutout and its fine wheel/mirror details.
// Orient the front wheel to the right before applying readable brand artwork.
const facingRight = await sharp(source).flop().png().toBuffer();
const markSvg = await readFile(new URL("../public/logo-mark.svg", import.meta.url), "utf8");
const markPath = markSvg.match(/\bd="([^"]+)"/)?.[1];
if (!markPath) throw new Error("The QuickBite logo mark is missing its path.");
const brand = palette.resolve("--color-brand");
const ink = palette.resolve("--color-ink");

// The horizontal company logo is printed directly on the white cargo box.
// Render the original mark and two-color wordmark with a transparent surround.
const logo = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="400" viewBox="0 0 450 100">
  <svg x="3" y="24" width="78" height="52" viewBox="4 8 24 16"><path fill="${brand}" d="${markPath}"/></svg>
  <text x="97" y="72" font-family="Arial, sans-serif" font-size="68" font-weight="900" letter-spacing="-3"><tspan fill="${ink}">Quick</tspan><tspan fill="${brand}">Bite</tspan></text>
</svg>`)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

function invertMatrix(matrix) {
  const [a, b, c, d, e, f, g, h, i] = matrix;
  const cofactors = [e * i - f * h, c * h - b * i, b * f - c * e, f * g - d * i, a * i - c * g, c * d - a * f, d * h - e * g, b * g - a * h, a * e - b * d];
  const determinant = a * cofactors[0] + b * cofactors[3] + c * cofactors[6];
  if (Math.abs(determinant) < 1e-8) throw new Error("Cargo-box logo has an invalid perspective plane.");
  return cofactors.map((value) => value / determinant);
}

async function printLogo(corners) {
  // Coordinates are authored at quarter size, then mapped to the native photo.
  const [p0, p1, p2, p3] = corners.map(([x, y]) => [x * 4, y * 4]);
  const dx1 = p1[0] - p2[0], dx2 = p3[0] - p2[0], dx3 = p0[0] - p1[0] + p2[0] - p3[0];
  const dy1 = p1[1] - p2[1], dy2 = p3[1] - p2[1], dy3 = p0[1] - p1[1] + p2[1] - p3[1];
  const denominator = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / denominator;
  const h = (dx1 * dy3 - dx3 * dy1) / denominator;
  const inverse = invertMatrix([
    p1[0] - p0[0] + g * p1[0], p3[0] - p0[0] + h * p3[0], p0[0],
    p1[1] - p0[1] + g * p1[1], p3[1] - p0[1] + h * p3[1], p0[1],
    g, h, 1,
  ]);
  const points = [p0, p1, p2, p3];
  const left = Math.floor(Math.min(...points.map(([x]) => x)));
  const top = Math.floor(Math.min(...points.map(([, y]) => y)));
  const width = Math.ceil(Math.max(...points.map(([x]) => x))) - left;
  const height = Math.ceil(Math.max(...points.map(([, y]) => y))) - top;
  const data = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = left + x + 0.5, py = top + y + 0.5;
      const divisor = inverse[6] * px + inverse[7] * py + inverse[8];
      const u = (inverse[0] * px + inverse[1] * py + inverse[2]) / divisor;
      const v = (inverse[3] * px + inverse[4] * py + inverse[5]) / divisor;
      if (u < 0 || u > 1 || v < 0 || v > 1) continue;
      const sx = u * (logo.info.width - 1), sy = v * (logo.info.height - 1);
      const ix = Math.floor(sx), iy = Math.floor(sy), fx = sx - ix, fy = sy - iy;
      let alpha = 0;
      const color = [0, 0, 0];
      for (let row = 0; row < 2; row++) {
        for (let column = 0; column < 2; column++) {
          const sample = (Math.min(iy + row, logo.info.height - 1) * logo.info.width + Math.min(ix + column, logo.info.width - 1)) * 4;
          const weight = (column ? fx : 1 - fx) * (row ? fy : 1 - fy);
          const coverage = logo.data[sample + 3] * weight;
          alpha += coverage;
          for (let channel = 0; channel < 3; channel++) color[channel] += logo.data[sample + channel] * coverage;
        }
      }
      const target = (y * width + x) * 4;
      data[target + 3] = Math.round(alpha);
      if (alpha) for (let channel = 0; channel < 3; channel++) data[target + channel] = Math.round(color[channel] / alpha);
    }
  }
  return { input: await sharp(data, { raw: { width, height, channels: 4 } }).png().toBuffer(), left, top };
}

// Each quadrilateral follows its own box face; the left face recedes upward
// toward the central corner, and the wider right face recedes downward.
const branding = await Promise.all([
  printLogo([[301, 232], [403, 216], [402, 249], [300, 267]]),
  printLogo([[426, 220], [570, 230], [569, 266], [425, 255]]),
]);

// Keep the small original model badges readable after orienting the photo.
const sideBadge = { left: 1972, top: 1828, width: 204, height: 76 };
const frontBadge = { left: 3748, top: 1528, width: 228, height: 108 };
const originalBadge = await sharp(facingRight).extract(frontBadge).ensureAlpha().raw().toBuffer();
const badgeLighting = await sharp(originalBadge, { raw: { width: frontBadge.width, height: frontBadge.height, channels: 4 } })
  .blur(14).raw().toBuffer();
const correctedBadge = Buffer.from(originalBadge);
// Transfer the lettering's fine embossed detail, rather than flipping the
// surrounding painted panel. Preserve its original lighting and silhouette;
// feather the correction so no rectangular patch boundary can appear.
for (let y = 0; y < frontBadge.height; y++) {
  for (let x = 0; x < frontBadge.width; x++) {
    const index = (y * frontBadge.width + x) * 4;
    const mirrored = (y * frontBadge.width + frontBadge.width - 1 - x) * 4;
    const edge = Math.min(x, y, frontBadge.width - 1 - x, frontBadge.height - 1 - y);
    const blend = Math.min(1, edge / 18) * Math.min(originalBadge[index + 3], originalBadge[mirrored + 3]) / 255;
    for (let channel = 0; channel < 3; channel++) {
      const detail = originalBadge[mirrored + channel] - badgeLighting[mirrored + channel];
      const repaired = Math.max(0, Math.min(255, badgeLighting[index + channel] + detail));
      correctedBadge[index + channel] = Math.round(originalBadge[index + channel] * (1 - blend) + repaired * blend);
    }
  }
}
const patches = [
  { input: await sharp(facingRight).extract(sideBadge).flop().png().toBuffer(), left: sideBadge.left, top: sideBadge.top },
  { input: await sharp(correctedBadge, { raw: { width: frontBadge.width, height: frontBadge.height, channels: 4 } }).png().toBuffer(), left: frontBadge.left, top: frontBadge.top },
];
const cutout = await sharp(facingRight).composite([...patches, ...branding]).png().toBuffer();
const output = fileURLToPath(new URL(filename, directory));
await sharp(cutout).trim({ threshold: 8 })
  .resize(2480, 2240, { fit: "contain", background: "#00000000", withoutEnlargement: true })
  .sharpen({ sigma: 0.5, m1: 0.4, m2: 1.2 })
  .extend({ top: 80, bottom: 80, left: 80, right: 80, background: "#00000000" })
  .webp({ quality: 96, alphaQuality: 100, effort: 6 }).toFile(output);

const artifacts = new URL("../.codex-artifacts/", import.meta.url);
await mkdir(artifacts, { recursive: true });
await sharp(output).flatten({ background: palette.resolve("--color-dark-ink") }).resize(1320).png()
  .toFile(fileURLToPath(new URL("rider-wordmark-preview.png", artifacts)));
console.log("Prepared branded delivery scooter from the native 5760 by 3840 source.");
