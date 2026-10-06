import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const ts = require("typescript");
const root = fileURLToPath(new URL("../", import.meta.url));
const rasterPattern = /\.(?:png|jpe?g|webp|avif)$/i;
const imagePattern = /\.(?:png|jpe?g|webp|avif|svg)$/i;
const posix = (value) => value.replaceAll("\\", "/");

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? files(join(directory, entry.name)) : join(directory, entry.name)))).flat();
}

const publicFiles = await files(join(root, "public"));
const publicPaths = new Set(publicFiles.map((file) => `/${posix(relative(join(root, "public"), file))}`));
const references = new Map();
const add = (asset, file) => {
  if (!references.has(asset)) references.set(asset, new Set());
  references.get(asset).add(posix(relative(root, file)));
};

for (const file of (await files(join(root, "src"))).filter((file) => /\.(?:tsx?|css)$/.test(file))) {
  const text = await readFile(file, "utf8");
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const constants = new Map();
  function constantsVisitor(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && ts.isStringLiteral(node.initializer)) constants.set(node.name.text, node.initializer.text);
    ts.forEachChild(node, constantsVisitor);
  }
  constantsVisitor(source);
  function visitor(node) {
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && node.text.startsWith("/") && imagePattern.test(node.text)) add(node.text, file);
    if (ts.isTemplateExpression(node)) {
      const pieces = [node.head.text];
      for (const span of node.templateSpans) pieces.push(constants.get(span.expression.getText(source)) ?? "*", span.literal.text);
      const template = pieces.join("");
      if (template.startsWith("/") && imagePattern.test(template)) {
        if (!template.includes("*")) add(template, file);
        else {
          const pattern = new RegExp(`^${template.split("*").map((piece) => piece.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("[^/]+")}$`);
          for (const asset of publicPaths) if (pattern.test(asset)) add(asset, file);
        }
      }
    }
    ts.forEachChild(node, visitor);
  }
  visitor(source);
}

const rasters = [];
for (const file of publicFiles.filter((file) => rasterPattern.test(file))) {
  const asset = `/${posix(relative(join(root, "public"), file))}`;
  const metadata = await sharp(file).metadata();
  rasters.push({ asset, width: metadata.width, height: metadata.height, bytes: (await stat(file)).size, references: [...(references.get(asset) ?? [])] });
}
rasters.sort((a, b) => a.asset.localeCompare(b.asset));
const missing = [...references.keys()].filter((asset) => !publicPaths.has(asset));
const masters = rasters.filter((image) => !image.asset.includes("/responsive/"));
const referenced = masters.filter((image) => image.references.length);
const variants = rasters.filter((image) => image.asset.includes("/responsive/"));
const verifiedVariants = [];
for (const image of masters.filter((image) => image.asset.startsWith("/images/food/pinterest/"))) {
  for (const width of [320, 640, 960, 1200, 1600, 2048]) {
    const asset = image.asset.replace(/\/([^/]+)\.webp$/, `/responsive/$1-${width}.webp`);
    if (!publicPaths.has(asset)) missing.push(asset);
    else verifiedVariants.push(asset);
  }
}
const report = {
  referencedRasterCount: referenced.length,
  rasterCount: rasters.length,
  masterCount: masters.length,
  vectorCount: publicFiles.filter((file) => /\.svg$/i.test(file)).length,
  responsiveVariantCount: variants.length,
  verifiedVariantCount: verifiedVariants.length,
  missing,
  images: rasters,
};
const output = join(root, process.argv[2] ?? ".codex-artifacts/image-quality-audit.json");
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ ...report, images: undefined }, null, 2));
console.log("Referenced source assets (code references include components not currently mounted):");
for (const image of referenced) console.log(`${image.asset} | ${image.width} × ${image.height} | ${Math.round(image.bytes / 1024)} KiB`);
if (missing.length) process.exitCode = 1;
