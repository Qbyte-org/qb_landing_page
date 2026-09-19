/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const filename = path.resolve(__dirname, "../src/lib/scroll-input.ts");
const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const scrollInput = {};
vm.runInNewContext(compiled.outputText, { exports: scrollInput }, { filename });
const { limitWheelDelta } = scrollInput;

test("small wheel and trackpad gestures retain their distance and direction", () => {
  for (const viewportHeight of [320, 768, 1440]) {
    for (const delta of [-40, -2, -0.25, 0.25, 2, 40]) {
      assert.equal(limitWheelDelta(delta, 0, viewportHeight), delta);
      assert.equal(limitWheelDelta(delta, Math.sign(delta) * 60, viewportHeight), delta);
    }
  }
});

test("a large wheel spike cannot skip an entire viewport", () => {
  for (const viewportHeight of [320, 768, 1440]) {
    for (const delta of [-100000, 100000]) {
      const bounded = limitWheelDelta(delta, 0, viewportHeight);
      assert.equal(Math.sign(bounded), Math.sign(delta));
      assert.ok(Math.abs(bounded) < viewportHeight / 2);
      assert.ok(Math.abs(bounded) <= 240);
    }
  }
});

test("repeated wheel events cannot accumulate several screens of pending travel", () => {
  for (const viewportHeight of [480, 900, 1440]) {
    for (const direction of [-1, 1]) {
      let pending = 0;
      for (let event = 0; event < 1000; event += 1) {
        pending += limitWheelDelta(direction * 900, pending, viewportHeight);
        assert.equal(Math.sign(pending), direction);
        assert.ok(Math.abs(pending) <= viewportHeight);
        assert.ok(Math.abs(pending) <= 800);
      }
      assert.equal(limitWheelDelta(direction * 900, pending, viewportHeight), 0,
        "Once the queue is full, further input must not extend the destination");

      // A rendered frame frees queue space; the next wheel input can use it.
      const afterFrame = pending - direction * 80;
      const nextDelta = limitWheelDelta(direction * 40, afterFrame, viewportHeight);
      assert.equal(nextDelta, direction * 40);
    }
  }
});

test("reversing the wheel puts the next destination on the new side immediately", () => {
  for (const direction of [-1, 1]) {
    const currentPosition = 1200;
    const pending = direction * 600;
    const previousDestination = currentPosition + pending;
    const reversedGesture = -direction * 24;
    const nextDestination = previousDestination + limitWheelDelta(reversedGesture, pending, 900);
    assert.equal(nextDestination, currentPosition + reversedGesture,
      "A reverse gesture must cancel the old backlog before setting its destination");
  }
});
