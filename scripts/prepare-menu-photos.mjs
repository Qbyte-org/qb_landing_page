import { readFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const directory = new URL("../public/images/food/pinterest/", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("menu-additions.sources.json", directory), "utf8"));
await mkdir(new URL("responsive/", directory), { recursive: true });

for (let offset = 0; offset < manifest.photos.length; offset += 3) {
  const results = await Promise.allSettled(manifest.photos.slice(offset, offset + 3).map(async photo => {
    if (new URL(photo.sourceImageUrl).hostname !== "i.pinimg.com") throw new Error("Unexpected image host");
    const response = await fetch(photo.sourceImageUrl, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`${photo.file}: HTTP ${response.status}`);
    const source = Buffer.from(await response.arrayBuffer());
    await sharp(source).rotate().resize({ width: 2048, withoutEnlargement: true }).sharpen({ sigma: 0.4, m1: 0.5, m2: 1 }).webp({ quality: 90, effort: 5 }).toFile(fileURLToPath(new URL(photo.file, directory)));
    for (const width of [320, 640, 960, 1200, 1600, 2048]) {
      await sharp(source).rotate().resize({ width, withoutEnlargement: true }).sharpen({ sigma: 0.4, m1: 0.5, m2: 1 }).webp({ quality: 90, effort: 5 }).toFile(fileURLToPath(new URL(`responsive/${photo.file.replace(/\.webp$/, "")}-${width}.webp`, directory)));
    }
    return photo.file;
  }));
  for (const result of results) {
    if (result.status === "rejected") throw result.reason;
    console.log(result.value);
  }
}
