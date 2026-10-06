/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const filename = path.resolve(__dirname, "../src/lib/scroll-navigation.ts");
const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});

function setup() {
  const callbacks = new Map();
  const documentListeners = new Map();
  const windowListeners = new Map();
  const calls = [];
  let now = 0;
  let nextFrame = 0;
  class Element {
    isConnected = true;
    attributes = new Map();
    listeners = new Map();
    focused = false;
    hasAttribute(name) { return this.attributes.has(name); }
    setAttribute(name, value) { this.attributes.set(name, value); }
    removeAttribute(name) { this.attributes.delete(name); }
    addEventListener(name, handler) { this.listeners.set(name, handler); }
    removeEventListener(name) { this.listeners.delete(name); }
    focus() { this.focused = true; }
    closest() { return null; }
  }
  class Anchor extends Element {
    constructor(href) { super(); this.href = href; this.target = ""; }
  }
  const target = new Element();
  const window = {
    location: new URL("https://quickbite.test/"),
    history: { state: {}, pushState(_state, _unused, url) { window.location = new URL(url); } },
    addEventListener(name, handler) { windowListeners.set(name, handler); },
    removeEventListener(name) { windowListeners.delete(name); },
  };
  const document = {
    getElementById(id) { return id === "app" ? target : null; },
    addEventListener(name, handler) { documentListeners.set(name, handler); },
    removeEventListener(name) { documentListeners.delete(name); },
  };
  const lenis = {
    isStopped: true,
    isScrolling: false,
    scrollTo(element, options) { calls.push({ element, options }); },
    stop() { this.isStopped = true; },
    start() { this.isStopped = false; },
  };
  const exports = {};
  vm.runInNewContext(compiled.outputText, {
    exports, window, document, URL, Element, HTMLAnchorElement: Anchor,
    performance: { now: () => now },
    requestAnimationFrame(callback) { callbacks.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame(id) { callbacks.delete(id); },
  }, { filename });
  const unbind = exports.bindScrollNavigation(lenis);
  return {
    target, window, lenis, calls, unbind, callbacks,
    click(href = "https://quickbite.test/#app") {
      const anchor = new Anchor(href);
      const event = { button: 0, defaultPrevented: false, composedPath: () => [anchor], preventDefault() { this.defaultPrevented = true; } };
      documentListeners.get("click")(event);
      return event;
    },
    frame(elapsed = 16) {
      now += elapsed;
      const pending = [...callbacks.values()];
      callbacks.clear();
      pending.forEach(callback => callback(now));
    },
    popstate() { windowListeners.get("popstate")(); },
  };
}

test("a same-page menu link waits through the closing lock, then scrolls and focuses once", () => {
  const state = setup();
  assert.equal(state.click().defaultPrevented, true);
  for (let frame = 0; frame < 25; frame++) state.frame();
  assert.equal(state.calls.length, 0);
  assert.equal(state.window.location.hash, "");
  state.lenis.isStopped = false;
  state.frame();
  assert.equal(state.calls.length, 1);
  assert.equal(state.calls[0].element, state.target);
  assert.equal(state.window.location.hash, "#app");
  state.calls[0].options.onComplete();
  assert.equal(state.target.focused, true);
  assert.equal(state.target.attributes.get("tabindex"), "-1");
  state.unbind();
  assert.equal(state.target.hasAttribute("tabindex"), false);
});

test("a lock that never releases ends the pending request without forcing scroll or unlocking", () => {
  const state = setup();
  state.click();
  for (let frame = 0; frame < 140; frame++) state.frame();
  assert.equal(state.callbacks.size, 0);
  assert.equal(state.calls.length, 0);
  assert.equal(state.window.location.hash, "");
  assert.equal(state.lenis.isStopped, true);
  state.lenis.isStopped = false;
  state.frame();
  assert.equal(state.calls.length, 0, "A timed-out request cannot scroll later");
  state.click();
  state.frame();
  assert.equal(state.calls.length, 1, "The visitor can retry after the lock releases");
  state.unbind();
});

test("history, route changes, disconnected targets, and unbinding cancel a queued anchor", () => {
  for (const cancel of [
    state => state.popstate(),
    state => { state.window.location = new URL("https://quickbite.test/contact"); },
    state => state.click("https://quickbite.test/contact"),
    state => { state.target.isConnected = false; },
    state => state.unbind(),
  ]) {
    const state = setup();
    state.click();
    state.frame();
    cancel(state);
    state.lenis.isStopped = false;
    state.frame();
    assert.equal(state.calls.length, 0);
    assert.equal(state.callbacks.size, 0);
    state.unbind();
  }
});

test("an interrupted anchor animation cannot steal focus after history changes", () => {
  const state = setup();
  state.lenis.isStopped = false;
  state.click();
  state.frame();
  assert.equal(state.calls.length, 1);
  state.popstate();
  state.calls[0].options.onComplete();
  assert.equal(state.target.focused, false);
  state.unbind();
});
