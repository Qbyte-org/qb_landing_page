/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const filename = path.resolve(__dirname, "../src/lib/nested-scroll.ts");
const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});

function gesture({ top = 100, height = 300, total = 900, delta = 120, smooth = true } = {}) {
  let stopped = false;
  const resets = [];
  const window = { scrollY: 1500, quickBiteLenis: smooth ? {
    isScrolling: "smooth",
    scrollTo(top, options) { resets.push({ top, immediate: options.immediate }); },
  } : undefined };
  const exports = {};
  vm.runInNewContext(compiled.outputText, { exports, window }, { filename });
  exports.keepNestedWheelScroll({
    currentTarget: { scrollTop: top, clientHeight: height, scrollHeight: total },
    deltaY: delta,
    stopPropagation() { stopped = true; },
    preventDefault() { assert.fail("The inner list must scroll natively"); },
  });
  return { stopped, resets };
}

test("inner movement keeps the wheel in the list and cancels old page momentum", () => {
  for (const delta of [-120, 120]) {
    assert.deepEqual(gesture({ delta }), { stopped: true, resets: [{ top: 1500, immediate: true }] });
    assert.deepEqual(gesture({ delta, smooth: false }), { stopped: true, resets: [] });
  }
});

test("the page takes over at either list boundary, including fractional bottom positions", () => {
  for (const options of [
    { top: 0, delta: -120 },
    { top: 600, delta: 120 },
    { top: 599.75, delta: 120 },
    { top: 0, total: 300, delta: 120 },
    { top: 0, total: 300, delta: -120 },
  ]) assert.deepEqual(gesture(options), { stopped: false, resets: [] });
});

test("inward input at a boundary still moves the list", () => {
  assert.equal(gesture({ top: 0, delta: 120 }).stopped, true);
  assert.equal(gesture({ top: 600, delta: -120 }).stopped, true);
});

test("horizontal-only input does not interfere with the page scroll owner", () => {
  assert.deepEqual(gesture({ delta: 0 }), { stopped: false, resets: [] });
});
