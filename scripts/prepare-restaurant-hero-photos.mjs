import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const directory = new URL("../public/images/food/restaurant-hero/", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("sources.json", directory), "utf8"));

const results = await Promise.allSettled(manifest.photos.map(async photo => {
  const response = await fetch(photo.sourceImageUrl, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${photo.file}: HTTP ${response.status}`);
  await sharp(Buffer.from(await response.arrayBuffer()))
    .rotate()
    .resize({ width: 2048, withoutEnlargement: true })
    .sharpen({ sigma: 0.4, m1: 0.5, m2: 1 })
    .webp({ quality: 90, effort: 5 })
    .toFile(fileURLToPath(new URL(photo.file, directory)));
  console.log(photo.file);
}));
for (const result of results) if (result.status === "rejected") throw result.reason;
