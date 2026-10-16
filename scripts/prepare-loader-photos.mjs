import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const project = new URL("../", import.meta.url);
const cache = new URL(".codex-artifacts/image-originals/", project);
const directory = new URL("public/images/food/loader/", project);
const selectedPhotos = [
  { file: "ofada-egg-plantain.webp", sourceManifest: "../pinterest/menu-additions.sources.json" },
  {
    file: "rice-beans-stew.webp",
    sourceManifest: "../partners/sources.json",
    // This older manifest records source URLs but omits native dimensions.
    sourceWidth: 1280,
    sourceHeight: 1600,
    alt: "Rice and beans beside pepper stew, assorted meat and eggs on white plates",
  },
  { file: "peppered-fish-noodles.webp", sourceManifest: "../pinterest/sources.json" },
];
const widths = [640, 960, 1600, 2400, 3200, 3840];
const sharpening = { sigma: "min(2.4, 0.5 * max(1, width / sourceWidth))", m1: 0.8, m2: 2 };
const quality = 92;

await mkdir(cache, { recursive: true });
await mkdir(directory, { recursive: true });

async function original(photo) {
  const source = new URL(photo.sourceImageUrl);
  if (source.protocol !== "https:" || source.hostname !== "i.pinimg.com") {
    throw new Error(`Unexpected source URL: ${source.href}`);
  }
  const local = new URL(source.pathname.split("/").at(-1), cache);
  let bytes;
  let fetched = false;
  try {
    bytes = await readFile(local);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`${source.href}: HTTP ${response.status}`);
    bytes = Buffer.from(await response.arrayBuffer());
    fetched = true;
  }

  const metadata = await sharp(bytes).metadata();
  if (
    metadata.format !== "jpeg" ||
    metadata.width !== photo.sourceWidth ||
    metadata.height !== photo.sourceHeight
  ) {
    throw new Error(`Original dimensions or format changed for ${photo.file}`);
  }
  if (fetched) await writeFile(local, bytes);
  return { bytes, metadata };
}

const photos = [];
for (const selection of selectedPhotos) {
  const { file, sourceManifest } = selection;
  const manifest = JSON.parse(await readFile(new URL(sourceManifest, directory), "utf8"));
  const sourcePhoto = manifest.photos.find((candidate) => candidate.file === file);
  if (!sourcePhoto || sourcePhoto.crop) throw new Error(`Missing uncropped source for ${file}`);
  const photo = { ...selection, ...sourcePhoto, sourceManifest };
  const { bytes, metadata } = await original(photo);
  const variants = [];
  const maxWidth = widths.at(-1);

  // Start every export from the cached original, avoiding recompression of a
  // small WebP. Larger widths are deliberately resampled for zoom rendering;
  // they do not recover photographic detail absent from the native source.
  for (const width of widths.filter((width) => width <= maxWidth)) {
    const target = `${file.replace(/\.webp$/, "")}-${width}.webp`;
    const effectiveSharpening = {
      sigma: Math.min(2.4, 0.5 * Math.max(1, width / metadata.width)),
      m1: sharpening.m1,
      m2: sharpening.m2,
    };
    const output = await sharp(bytes)
      .rotate()
      .resize({ width, kernel: sharp.kernel.lanczos3 })
      .sharpen(effectiveSharpening)
      .webp({ quality, effort: 6 })
      .toFile(fileURLToPath(new URL(target, directory)));
    if (output.width !== width) throw new Error(`Unexpected export width for ${target}`);
    variants.push({ file: target, width: output.width, height: output.height, bytes: output.size, sharpening: effectiveSharpening });
    console.log(`${target}: ${output.width}x${output.height}, ${output.size} bytes`);
  }

  photos.push({
    basename: file.replace(/\.webp$/, ""),
    sourceManifest: photo.sourceManifest,
    pinId: photo.pinId,
    pinUrl: photo.pinUrl,
    sourceImageUrl: photo.sourceImageUrl,
    sourceWidth: metadata.width,
    sourceHeight: metadata.height,
    maxWidth,
    sourceSha256: createHash("sha256").update(bytes).digest("hex"),
    alt: photo.alt,
    variants,
  });
}

await writeFile(new URL("sources.json", directory), `${JSON.stringify({
  generator: "scripts/prepare-loader-photos.mjs",
  processing: {
    format: "webp",
    quality,
    effort: 6,
    widths,
    resizeKernel: "lanczos3",
    sharpening,
    crop: null,
    note: "Source-preserving exports from the original JPEGs with resolution-aware output sharpening. Widths above each native source size are resampled enhancements, not recovered native detail. Framing, subjects and image proportions are preserved; no generative edits or color/contrast changes are applied. All selected photos retain variants through 3840px for high-density zoom rendering.",
  },
  photos,
}, null, 2)}\n`);
