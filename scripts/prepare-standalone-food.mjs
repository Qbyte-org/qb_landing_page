import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const directory = new URL("../public/images/food/standalone-accents/", import.meta.url);
const { assets } = JSON.parse(await readFile(new URL("sources.json", directory), "utf8"));

for (const asset of assets) {
  const response = await fetch(asset.sourceImageUrl, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${asset.file}: HTTP ${response.status}`);
  const original = Buffer.from(await response.arrayBuffer());
  const { data, info: { width, height } } = await sharp(original).rotate().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const count = width * height;
  const mask = Buffer.alloc(count);

  // These sources already show complete individual foods. Remove only neutral
  // surroundings, including the published checkerboard on the PNG previews.
  // There are no hand-drawn food outlines or source-rectangle crops.
  for (let index = 0; index < count; index++) {
    const pixel = index * 4;
    const minimum = Math.min(data[pixel], data[pixel + 1], data[pixel + 2]);
    const maximum = Math.max(data[pixel], data[pixel + 1], data[pixel + 2]);
    const background = asset.backgroundMode === "dark"
      ? maximum <= asset.backgroundMaximum
      : minimum >= asset.backgroundMinimum && maximum - minimum <= asset.backgroundNeutralTolerance;
    mask[index] = background ? 0 : 255;
  }

  // Keep all substantial food components, not just a selected piece. Tiny
  // disconnected compression speckles do not belong to the photographed food.
  const visited = new Uint8Array(count);
  const components = [];
  for (let start = 0; start < count; start++) {
    if (visited[start] || !mask[start]) continue;
    const component = [start];
    visited[start] = 1;
    for (let cursor = 0; cursor < component.length; cursor++) {
      const index = component[cursor];
      const x = index % width;
      const y = Math.floor(index / width);
      for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        const neighbour = ny * width + nx;
        if (visited[neighbour] || !mask[neighbour]) continue;
        visited[neighbour] = 1;
        component.push(neighbour);
      }
    }
    components.push(component);
  }
  const largest = Math.max(...components.map(component => component.length));
  mask.fill(0);
  for (const component of components) {
    if (component.length >= largest * .02) component.forEach(index => { mask[index] = 255; });
  }

  // Fill enclosed neutral highlights inside each food silhouette. The whites
  // of the egg and glossy food highlights must not become transparent holes.
  visited.fill(0);
  const queue = [];
  const visit = index => {
    if (visited[index] || mask[index]) return;
    visited[index] = 1;
    queue.push(index);
  };
  for (let x = 0; x < width; x++) { visit(x); visit((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { visit(y * width); visit(y * width + width - 1); }
  for (let cursor = 0; cursor < queue.length; cursor++) {
    const index = queue[cursor];
    const x = index % width;
    const y = Math.floor(index / width);
    if (x > 0) visit(index - 1);
    if (x < width - 1) visit(index + 1);
    if (y > 0) visit(index - width);
    if (y < height - 1) visit(index + width);
  }
  for (let index = 0; index < count; index++) if (!visited[index]) mask[index] = 255;
  const feathered = await sharp(mask, { raw: { width, height, channels: 1 } }).blur(.45).toColourspace("b-w").raw().toBuffer();
  for (let index = 0; index < count; index++) data[index * 4 + 3] = feathered[index];

  await sharp(data, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 2 })
    .resize({ width: 440, height: 440, fit: "inside", withoutEnlargement: true })
    .extend({ top: 6, bottom: 6, left: 6, right: 6, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(fileURLToPath(new URL(asset.file, directory)));
  console.log(asset.file);
}
