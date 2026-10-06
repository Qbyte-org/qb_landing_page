import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const directory = new URL("../public/images/food/utensils/", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("sources.json", directory), "utf8"));

for (const photo of manifest.photos) {
  const response = await fetch(photo.sourceImageUrl, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${photo.file}: HTTP ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());
  const { data, info } = await sharp(source).extract(photo.crop).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const visited = new Uint8Array(width * height);
  const queue = [];
  const visit = (x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const index = y * width + x;
    if (visited[index]) return;
    visited[index] = 1;
    const pixel = index * 4;
    if (Math.min(data[pixel], data[pixel + 1], data[pixel + 2]) < 232) return;
    data[pixel + 3] = 0;
    queue.push(index);
  };
  for (let x = 0; x < width; x++) { visit(x, 0); visit(x, height - 1); }
  for (let y = 0; y < height; y++) { visit(0, y); visit(width - 1, y); }
  for (let i = 0; i < queue.length; i++) {
    const x = queue[i] % width;
    const y = Math.floor(queue[i] / width);
    visit(x - 1, y); visit(x + 1, y); visit(x, y - 1); visit(x, y + 1);
  }
  // Discard detached JPEG flecks, retaining only the connected utensil.
  visited.fill(0);
  let largest = [];
  for (let start = 0; start < width * height; start++) {
    if (visited[start] || !data[start * 4 + 3]) continue;
    const component = [start];
    visited[start] = 1;
    for (let cursor = 0; cursor < component.length; cursor++) {
      const index = component[cursor];
      const x = index % width;
      const y = Math.floor(index / width);
      for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        const neighbour = ny * width + nx;
        if (visited[neighbour] || !data[neighbour * 4 + 3]) continue;
        visited[neighbour] = 1;
        component.push(neighbour);
      }
    }
    if (component.length > largest.length) largest = component;
  }
  const mask = Buffer.alloc(width * height);
  largest.forEach(index => { mask[index] = 255; });
  const cleanMask = await sharp(mask, { raw: { width, height, channels: 1 } }).erode(1).blur(.4).toColourspace('b-w').raw().toBuffer();
  for (let index = 0; index < width * height; index++) data[index * 4 + 3] = cleanMask[index];
  await sharp(data, { raw: { width, height, channels: 4 } }).rotate(-32, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({ width: 440, height: 440, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 94, alphaQuality: 100 }).toFile(fileURLToPath(new URL(photo.file, directory)));
  console.log(photo.file);
}
