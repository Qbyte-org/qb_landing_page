import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const directory = new URL("../public/images/food/utensils/", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("water.sources.json", directory), "utf8"));
let source;
if (process.argv[2]) {
  source = await readFile(process.argv[2]);
} else {
  const response = await fetch(manifest.sourceImageUrl, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Water photograph: HTTP ${response.status}`);
  source = Buffer.from(await response.arrayBuffer());
}
const metadata = await sharp(source).metadata();
if (metadata.width !== 1024 || metadata.height !== 1024) {
  throw new Error("The water photograph changed; review the complete glass rim before regenerating.");
}
const size = 396;
const { data } = await sharp(source)
  .extract({ left: 314, top: 312, width: size, height: size })
  .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const radius = Math.hypot(x - 198, y - 198);
    data[(y * size + x) * 4 + 3] = Math.round(255 * Math.max(0, Math.min(1, (185 - radius) / 1.5)));
  }
}
await sharp(data, { raw: { width: size, height: size, channels: 4 } })
  .webp({ quality: 95, alphaQuality: 100 })
  .toFile(fileURLToPath(new URL(manifest.file, directory)));
console.log(manifest.file);
