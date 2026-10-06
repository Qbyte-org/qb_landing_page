import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const project = new URL("../", import.meta.url);
const cache = new URL(".codex-artifacts/image-originals/", project);
const widths = [320, 640, 960, 1200, 1600, 2048];
const selectedGroup = process.argv[2];
const groups = [
  { directory: "food/pinterest", manifests: ["sources.json", "menu-additions.sources.json"], responsive: true },
  { directory: "food/restaurant-hero", manifests: ["sources.json"], responsive: false },
  { directory: "food/partners", manifests: ["sources.json"], responsive: false },
  { directory: "team", manifests: ["sources.json"], responsive: false },
];
await mkdir(cache, { recursive: true });

async function original(url) {
  const source = new URL(url);
  if (!["i.pinimg.com", "assets.lummi.ai"].includes(source.hostname)) throw new Error(`Unexpected source host: ${source.hostname}`);
  const local = new URL(source.pathname.split("/").at(-1), cache);
  try { return await readFile(local); } catch (error) { if (error.code !== "ENOENT") throw error; }
  const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await sharp(bytes).metadata();
  await writeFile(local, bytes);
  return bytes;
}

for (const group of groups.filter((group) => !selectedGroup || group.directory.endsWith(selectedGroup))) {
  const directory = new URL(`public/images/${group.directory}/`, project);
  const photos = (await Promise.all(group.manifests.map(async (name) => {
    const manifest = JSON.parse(await readFile(new URL(name, directory), "utf8"));
    if (manifest.photos) return manifest.photos;
    // The white ninja has an intentional crop whose original bounds were not recorded.
    // Retain that source asset rather than change its framing while improving sharpness.
    return Object.entries(manifest).filter(([file]) => file !== "white-ninja.webp")
      .map(([file, source]) => ({ file, sourceImageUrl: source.source }));
  }))).flat();
  if (group.responsive) await mkdir(new URL("responsive/", directory), { recursive: true });
  for (let offset = 0; offset < photos.length; offset += 3) {
    const results = await Promise.allSettled(photos.slice(offset, offset + 3).map(async (photo) => {
      const source = await original(photo.sourceImageUrl);
      const pipeline = () => {
        const image = sharp(source).rotate();
        return photo.crop ? image.extract(photo.crop) : image;
      };
      // Restore detail from the original, never by enlarging a compressed derivative.
      // A small output sharpening pass compensates for resampling without hard halos.
      const encode = (width, target) => pipeline()
        .resize({ width, withoutEnlargement: true })
        .sharpen({ sigma: 0.4, m1: 0.5, m2: 1 })
        .webp({ quality: 90, effort: 5 })
        .toFile(fileURLToPath(new URL(target, directory)));
      const result = await encode(2048, photo.file);
      if (group.responsive) {
        for (const width of widths) await encode(width, `responsive/${photo.file.replace(/\.webp$/, "")}-${width}.webp`);
      }
      return `${group.directory}/${photo.file}: ${result.width}×${result.height}`;
    }));
    for (const result of results) {
      if (result.status === "rejected") throw result.reason;
      console.log(result.value);
    }
  }
}
