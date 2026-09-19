/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const filename = path.resolve(__dirname, "../src/components/sections/restaurants/dishOrbitMotion.ts");
const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const orbit = {};
vm.runInNewContext(compiled.outputText, { exports: orbit }, { filename });
const { getDishOrbitFrame } = orbit;

function distance(first, second) {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

test("the six resting previews keep the original upper-arc layout", () => {
  const originalPositions = [
    [8.638, 55.318],
    [18.788, 30.543],
    [38.423, 15.937],
    [61.577, 15.937],
    [81.212, 30.543],
    [91.362, 55.318],
  ];
  for (const [index, [x, y]] of originalPositions.entries()) {
    const frame = getDishOrbitFrame(index, 6);
    assert.ok(Math.abs(frame.x - x) < 0.002);
    assert.ok(Math.abs(frame.y - y) < 0.002);
    assert.equal(frame.opacity, 1);
    assert.equal(frame.isWrapping, false);
  }
});

test("intermediate positions stay on the ellipse instead of taking straight shortcuts", () => {
  for (let sample = -720; sample <= 720; sample += 1) {
    const frame = getDishOrbitFrame(sample / 40, 6);
    const normalizedX = (frame.x - 50) / 42;
    const normalizedY = (frame.y - 64) / 50;
    assert.ok(Math.abs(normalizedX ** 2 + normalizedY ** 2 - 1) < 0.0001,
      `Preview left the orbit at phase ${sample / 40}`);
    assert.ok(frame.opacity >= 0 && frame.opacity <= 1);
  }

  const first = getDishOrbitFrame(2, 6);
  const second = getDishOrbitFrame(3, 6);
  const midway = getDishOrbitFrame(2.5, 6);
  assert.equal(midway.x, 50);
  assert.ok(midway.y < (first.y + second.y) / 2 - 1,
    "The central arc must curve above the straight line between its endpoints");
});

test("forward and backward wrap boundaries are continuous across multiple turns", () => {
  for (const turn of [-20, -1, 0, 1, 20]) {
    for (const boundary of [5, 6]) {
      const phase = turn * 6 + boundary;
      const before = getDishOrbitFrame(phase - 0.001, 6);
      const after = getDishOrbitFrame(phase + 0.001, 6);
      assert.ok(distance(before, after) < 0.08, `Position jumped at phase ${phase}`);
      assert.ok(Math.abs(before.opacity - after.opacity) < 0.02,
        `Visibility jumped at phase ${phase}`);
    }
  }
});

test("returning previews fade out and travel behind the featured plate", () => {
  const departure = getDishOrbitFrame(5.01, 6);
  const arrival = getDishOrbitFrame(5.99, 6);
  assert.ok(departure.opacity > 0 && departure.opacity < 1);
  assert.ok(arrival.opacity > 0 && arrival.opacity < 1);
  assert.equal(departure.isWrapping, true);
  assert.equal(arrival.isWrapping, true);

  for (const phase of [5.13, 5.25, 5.5, 5.75, 5.87]) {
    const frame = getDishOrbitFrame(phase, 6);
    assert.equal(frame.isWrapping, true);
    assert.equal(frame.opacity, 0, "The back of the orbit must not cover the featured dish");
  }
  const back = getDishOrbitFrame(5.5, 6);
  assert.equal(back.x, 50);
  assert.ok(back.y > 100, "The return leg goes around the bottom instead of across the hero plate");
});

test("an unbounded phase produces the same geometry after complete turns", () => {
  for (const phase of [0, 0.25, 2.5, 5, 5.1, 5.5, 5.9]) {
    const first = getDishOrbitFrame(phase, 6);
    for (const turns of [-100, -2, 1, 100]) {
      const repeated = getDishOrbitFrame(phase + turns * 6, 6);
      assert.deepEqual(repeated, first);
    }
  }
});
