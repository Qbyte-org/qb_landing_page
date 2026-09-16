/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { readFile, readdir } = require("node:fs/promises");
const path = require("node:path");
const { test } = require("node:test");

const helpers = import("../scripts/lib/theme-palette.mjs");
const root = path.resolve(__dirname, "..");

test("asset palette follows aliases and nested brand mixes, including transparency", async () => {
  const { createPalette } = await helpers;
  const palette = createPalette(`:root {
    --color-brand: #FF4D1D;
    --color-white: #ffffff;
    --color-paper: var(--color-white);
    --color-soft: color-mix(in srgb, var(--color-brand) 50%, var(--color-paper));
    --color-faint: color-mix(in srgb, var(--color-soft) 50%, transparent);
  }`);
  assert.equal(palette.resolve("--color-paper"), "#FFFFFF");
  assert.equal(palette.resolve("--color-soft"), "#FFA68E");
  assert.equal(palette.resolve("--color-faint"), "#FFA68E80");
  assert.throws(() => palette.resolve("--color-unknown"), /Missing/);
});

test("SVG synchronization changes color fallbacks without changing IDs or geometry", async () => {
  const { createPalette, syncSvgColors, resolveSvgColors } = await helpers;
  const palette = createPalette(":root { --color-brand: #123456; }");
  const svg = '<svg><path id="abc123" d="M0 0h24" fill="var(--color-brand, #ff4d1d)" filter="url(#abc123)"/></svg>';
  const synced = syncSvgColors(svg, palette);
  assert.equal(synced, svg.replace("#ff4d1d", "#123456"));
  assert.equal(syncSvgColors(synced, palette), synced);
  assert.equal(resolveSvgColors(synced, palette), synced.replace("var(--color-brand, #123456)", "#123456"));
});

test("all artwork fallback colors and manifest colors match globals.css", async () => {
  const { readPalette, syncSvgColors } = await helpers;
  const palette = await readPalette(path.join(root, "src/app/globals.css"));
  async function checkDirectory(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) await checkDirectory(filename);
      else if (entry.name.endsWith(".svg")) {
        const svg = await readFile(filename, "utf8");
        assert.equal(svg, syncSvgColors(svg, palette), `${filename}: run pnpm theme:sync`);
      }
    }
  }
  await checkDirectory(path.join(root, "public"));
  const manifestColors = JSON.parse(await readFile(path.join(root, "src/generated/theme-colors.json"), "utf8"));
  assert.equal(manifestColors.brand, palette.resolve("--color-brand"));
  assert.equal(manifestColors.paper, palette.resolve("--color-paper"));
});
