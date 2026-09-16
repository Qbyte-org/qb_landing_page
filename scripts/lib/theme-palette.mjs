import { readFile } from "node:fs/promises";

function splitArguments(value) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < value.length; index += 1) {
    if (value[index] === "(") depth += 1;
    if (value[index] === ")") depth -= 1;
    if (value[index] === "," && depth === 0) {
      parts.push(value.slice(start, index).trim());
      start = index + 1;
    }
  }
  parts.push(value.slice(start).trim());
  return parts;
}

function channels(hex) {
  let value = hex.slice(1);
  if (value.length <= 4) value = [...value].map((part) => part + part).join("");
  if (value.length === 6) value += "ff";
  return value.match(/../g).map((part) => Number.parseInt(part, 16));
}

function hexColor(values) {
  const rounded = values.map((value) => Math.max(0, Math.min(255, Math.round(value))));
  if (rounded[3] === 255) rounded.pop();
  return `#${rounded.map((value) => value.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

/** Resolve the same hex, token aliases and sRGB mixes used by globals.css for external assets. */
export function createPalette(css) {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const declarations = new Map(
    [...source.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)].map((match) => [match[1], match[2].trim()]),
  );
  const resolved = new Map();

  function evaluate(value, trail) {
    if (/^#[\da-f]{3,4}$|^#[\da-f]{6}(?:[\da-f]{2})?$/i.test(value)) return hexColor(channels(value));
    if (value === "transparent") return "#00000000";
    const alias = value.match(/^var\((--[\w-]+)\)$/);
    if (alias) return resolve(alias[1], trail);
    const mix = value.match(/^color-mix\(in srgb,\s*([\s\S]*)\)$/);
    if (mix) {
      const parts = splitArguments(mix[1]).map((part) => {
        const weighted = part.match(/^([\s\S]+?)\s+(\d+(?:\.\d+)?)%$/);
        return { color: weighted ? weighted[1] : part, weight: weighted ? Number(weighted[2]) / 100 : null };
      });
      if (parts.length !== 2) throw new Error(`Expected two colors in ${value}`);
      const leftWeight = parts[0].weight ?? (parts[1].weight === null ? 0.5 : 1 - parts[1].weight);
      const rightWeight = parts[1].weight ?? 1 - leftWeight;
      const total = leftWeight + rightWeight;
      if (total <= 0) throw new Error(`Invalid color weights in ${value}`);
      const left = channels(evaluate(parts[0].color, trail));
      const right = channels(evaluate(parts[1].color, trail));
      const leftAlpha = (left[3] / 255) * (leftWeight / total);
      const rightAlpha = (right[3] / 255) * (rightWeight / total);
      const alpha = leftAlpha + rightAlpha;
      return hexColor([
        ...[0, 1, 2].map((index) => alpha ? (left[index] * leftAlpha + right[index] * rightAlpha) / alpha : 0),
        alpha * Math.min(1, total) * 255,
      ]);
    }
    throw new Error(`Unsupported external asset color "${value}". Use a hex color, var() alias, or color-mix(in srgb, …) in globals.css.`);
  }

  function resolve(token, trail = []) {
    if (resolved.has(token)) return resolved.get(token);
    if (trail.includes(token)) throw new Error(`Circular color token: ${[...trail, token].join(" -> ")}`);
    const value = declarations.get(token);
    if (!value) throw new Error(`Missing ${token} in globals.css`);
    const color = evaluate(value, [...trail, token]);
    resolved.set(token, color);
    return color;
  }

  return { resolve };
}

export async function readPalette(filename) {
  return createPalette(await readFile(filename, "utf8"));
}

/** External SVG documents cannot inherit the page's variables; keep their fallbacks synchronized. */
export function syncSvgColors(svg, palette) {
  return svg.replace(/var\((--color-[\w-]+),\s*#[\da-f]{3,8}\)/gi, (_, token) => `var(${token}, ${palette.resolve(token)})`);
}

/** Rasterizers do not all implement SVG custom properties. */
export function resolveSvgColors(svg, palette) {
  return svg.replace(/var\((--color-[\w-]+),\s*#[\da-f]{3,8}\)/gi, (_, token) => palette.resolve(token));
}
