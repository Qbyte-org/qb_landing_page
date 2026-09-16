import { spawn } from "node:child_process";
import { watch } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readPalette, resolveSvgColors, syncSvgColors } from "./lib/theme-palette.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const cssPath = path.join(root, "src/app/globals.css");
const require = createRequire(import.meta.url);
// Use the same rasterizer Next already installs for its image pipeline.
const requireNext = createRequire(require.resolve("next/package.json"));
const sharp = requireNext("sharp");

async function writeChanged(filename, content) {
  const next = Buffer.isBuffer(content) ? content : Buffer.from(content);
  const current = await readFile(filename).catch((error) => {
    if (error.code !== "ENOENT") throw error;
    return null;
  });
  if (current?.equals(next)) return;
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, next);
}

async function svgFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? svgFiles(filename) : entry.name.endsWith(".svg") ? [filename] : [];
  }));
  return groups.flat();
}

function iconContainer(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, index) => {
    const start = 6 + index * 16;
    header[start] = size >= 256 ? 0 : size;
    header[start + 1] = size >= 256 ? 0 : size;
    header.writeUInt16LE(1, start + 4);
    header.writeUInt16LE(32, start + 6);
    header.writeUInt32LE(data.length, start + 8);
    header.writeUInt32LE(offset, start + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map(({ data }) => data)]);
}

async function syncAssets() {
  const palette = await readPalette(cssPath);
  const files = [...await svgFiles(path.join(root, "public")), path.join(root, "src/app/icon.svg")];
  await Promise.all(files.map(async (filename) => {
    const svg = await readFile(filename, "utf8");
    await writeChanged(filename, syncSvgColors(svg, palette));
  }));

  const icons = await Promise.all([16, 32, 48, 180, 192, 512].map(async (size) => {
    const svg = await readFile(path.join(root, `public/favicon/SVG/${size}.svg`), "utf8");
    const data = await sharp(Buffer.from(resolveSvgColors(svg, palette))).resize(size, size).png().toBuffer();
    await writeChanged(path.join(root, `public/favicon/PNG/${size}.png`), data);
    return { size, data };
  }));
  await writeChanged(path.join(root, "src/app/apple-icon.png"), icons.find(({ size }) => size === 180).data);
  await writeChanged(path.join(root, "src/app/favicon.ico"), iconContainer(icons.filter(({ size }) => size <= 48)));
  await writeChanged(path.join(root, "src/generated/theme-colors.json"), `${JSON.stringify({
    brand: palette.resolve("--color-brand"),
    paper: palette.resolve("--color-paper"),
  }, null, 2)}\n`);
}

await syncAssets();

const [command, ...args] = process.argv.slice(2);
if (command) {
  if (command !== "dev" && command !== "build") throw new Error(`Unsupported Next command: ${command}`);
  let timer;
  let pending = Promise.resolve();
  const watcher = command === "dev" ? watch(path.dirname(cssPath), (_, filename) => {
    if (filename?.toString() !== "globals.css") return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      pending = pending.then(syncAssets).catch((error) => console.error("Theme asset sync failed:", error));
    }, 150);
  }) : null;
  const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), command, ...args], { cwd: root, stdio: "inherit" });
  const cleanup = () => {
    clearTimeout(timer);
    watcher?.close();
  };
  process.on("SIGINT", () => { cleanup(); child.kill("SIGINT"); });
  process.on("SIGTERM", () => { cleanup(); child.kill("SIGTERM"); });
  child.on("error", (error) => { cleanup(); console.error(error); process.exitCode = 1; });
  child.on("exit", (code, signal) => { cleanup(); process.exitCode = code ?? (signal ? 1 : 0); });
}
