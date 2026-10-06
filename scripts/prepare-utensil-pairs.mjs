import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const directory = new URL("../public/images/food/utensils/", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("pairs.sources.json", directory), "utf8"));
const response = await fetch(manifest.sourceImageUrl, { signal: AbortSignal.timeout(30000) });
if (!response.ok) throw new Error(`Cutlery photograph: HTTP ${response.status}`);
const { data, info: { width, height } } = await sharp(Buffer.from(await response.arrayBuffer())).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

// Find each complete silhouette from its original alpha channel. Do not erase
// bright metal as if it were background: that damaged the former JPEG cutouts.
const ranges = [];
let start = null;
for (let x = 0; x <= width; x++) {
  let occupied = false;
  for (let y = 0; x < width && y < height; y++) {
    if (data[(y * width + x) * 4 + 3] > 8) { occupied = true; break; }
  }
  if (occupied && start === null) start = x;
  if (!occupied && start !== null) { ranges.push({ left: start, width: x - start }); start = null; }
}
if (ranges.length !== 3) throw new Error(`Expected three complete cutlery silhouettes, received ${ranges.length}`);

for (const pair of manifest.pairs) {
  const parts = [];
  let left = 12;
  let canvasHeight = 0;
  for (const kind of pair.utensils) {
    const range = ranges[manifest.utensilsFromLeft.indexOf(kind)];
    const isolated = await sharp(data, { raw: { width, height, channels: 4 } })
      .extract({ left: range.left, top: 0, width: range.width, height })
      .png().toBuffer();
    const { data: input, info } = await sharp(isolated)
      .trim({ threshold: 1 })
      .resize({ height: 616, withoutEnlargement: true })
      .png().toBuffer({ resolveWithObject: true });
    parts.push({ input, left, top: 12 });
    left += info.width + 24;
    canvasHeight = Math.max(canvasHeight, info.height + 24);
  }
  await sharp({ create: { width: left - 12, height: canvasHeight, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(parts).webp({ quality: 94, alphaQuality: 100 })
    .toFile(fileURLToPath(new URL(pair.file, directory)));
  console.log(pair.file);
}
