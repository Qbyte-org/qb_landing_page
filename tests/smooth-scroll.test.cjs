/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

function compile(filename) {
  return ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}

const component = compile(path.resolve(__dirname, "../src/components/layout/SmoothScroll.tsx"));
const input = compile(path.resolve(__dirname, "../src/lib/scroll-input.ts"));
// Run the installed scroll engine, so these tests cover its actual input
// normalization and damping rather than a copy of our expected behaviour.
const engine = compile(require.resolve("lenis"));

function setup({ reducedMotion = false } = {}) {
  class Element {
    listeners = new Map();
    classList = new Set();
    scrollHeight = 12000;
    scrollWidth = 1440;
    constructor() { this.classList.remove = this.classList.delete.bind(this.classList); }
    addEventListener(name, listener) {
      if (!this.listeners.has(name)) this.listeners.set(name, new Set());
      this.listeners.get(name).add(listener);
    }
    removeEventListener(name, listener) { this.listeners.get(name)?.delete(listener); }
    dispatchEvent(event) {
      for (const listener of this.listeners.get(event.type) ?? []) listener(event);
    }
    hasAttribute() { return false; }
  }
  class Window extends Element {
    innerHeight = 900;
    innerWidth = 1440;
    scrollY = 1000;
    scrollX = 0;
    scrollTo({ top }) { this.scrollY = top; }
  }
  const window = new Window();
  const document = { documentElement: new Element(), body: new Element() };
  const ticks = new Set();
  const animationFrames = new Map();
  let frameId = 0;
  let time = 0;
  let cleanup;
  let mediaCleanup;
  let navigationBindings = 0;
  const modules = {};
  const context = vm.createContext({
    window, document, Window, HTMLElement: Element,
    navigator: { userAgent: "scroll-regression-test" },
    ResizeObserver: class { observe() {} disconnect() {} },
    requestAnimationFrame(callback) { animationFrames.set(++frameId, callback); return frameId; },
    cancelAnimationFrame(id) { animationFrames.delete(id); },
    setTimeout, clearTimeout,
    require(name) { return modules[name]; },
  });
  function load(source) {
    context.exports = {};
    vm.runInContext(source, context);
    return context.exports;
  }
  modules.lenis = load(engine);
  modules["@/lib/scroll-input"] = load(input);
  modules["@/lib/scroll-navigation"] = {
    bindScrollNavigation() { navigationBindings++; return () => { navigationBindings--; }; },
  };
  modules["@/lib/gsap"] = {
    useGSAP(callback) { cleanup = callback(); },
    gsap: {
      matchMedia: () => ({
        add(_query, callback) { if (!reducedMotion) mediaCleanup = callback(); },
        revert() { mediaCleanup?.(); },
      }),
      ticker: { add(callback) { ticks.add(callback); }, remove(callback) { ticks.delete(callback); }, lagSmoothing() {} },
    },
    ScrollTrigger: { update() {}, refresh() {} },
  };
  load(component).default({ enabled: true });
  const state = {
    window,
    lenis: window.quickBiteLenis,
    get navigationBindings() { return navigationBindings; },
    frame(elapsed = 1000 / 60) {
      time += elapsed;
      ticks.forEach(callback => callback(time / 1000, elapsed));
    },
    wheel(deltaY) {
      const event = {
        type: "wheel", deltaY, deltaX: 0, deltaMode: 0, ctrlKey: false,
        cancelable: true, defaultPrevented: false,
        composedPath: () => [document.body, document.documentElement, window],
        preventDefault() { this.defaultPrevented = true; },
      };
      window.dispatchEvent(event);
      return event;
    },
    cleanup() { cleanup?.(); },
  };
  state.frame();
  return state;
}

test("ordinary wheel and trackpad input retains its distance through Lenis", () => {
  for (const delta of [0.25, 2, 40, 120, -120]) {
    const state = setup();
    assert.equal(state.wheel(delta).defaultPrevented, true);
    assert.equal(state.lenis.targetScroll, 1000 + delta);
    state.cleanup();
  }
});

test("dropped frames do not turn a short scroll into a slower animation", () => {
  const positions = [];
  for (const frameDuration of [1000 / 60, 50, 100]) {
    const state = setup();
    state.wheel(240);
    for (let elapsed = 0; elapsed < 299; elapsed += frameDuration) state.frame(frameDuration);
    positions.push(state.lenis.animatedScroll);
    assert.ok(state.lenis.animatedScroll > 1210, "At least 87.5% of the gesture should render within 300ms");
    state.cleanup();
  }
  assert.ok(Math.max(...positions) - Math.min(...positions) < 0.01,
    `Equal elapsed time must produce equal progress, received ${positions}`);
});

test("resuming after a long stall does not snap to the destination", () => {
  const state = setup();
  state.wheel(240);
  state.frame(2000);
  assert.ok(state.lenis.animatedScroll > 1000 && state.lenis.animatedScroll < 1240);
  assert.equal(state.lenis.isScrolling, "smooth");
  state.cleanup();
});

test("burst input stays bounded and a reverse gesture takes effect on the next frame", () => {
  const state = setup();
  for (let i = 0; i < 30; i++) assert.equal(state.wheel(10000).defaultPrevented, true);
  assert.ok(state.lenis.targetScroll - state.lenis.animatedScroll <= 720);
  state.frame();
  const before = state.lenis.animatedScroll;
  state.wheel(-24);
  assert.equal(state.lenis.targetScroll, before - 24);
  state.frame();
  assert.ok(state.lenis.animatedScroll < before);
  state.cleanup();
});

test("touch remains native and reduced motion does not install smooth scrolling", () => {
  const state = setup();
  assert.equal(state.lenis.options.syncTouch, false);
  state.wheel(120);
  state.lenis.onVirtualScroll({ deltaX: 0, deltaY: 100, event: {
    type: "touchmove", cancelable: true,
    composedPath: () => [],
    preventDefault() { assert.fail("Native touch must not be cancelled"); },
  } });
  assert.equal(state.lenis.isScrolling, "native");
  assert.equal(state.lenis.animate.isRunning, false);
  state.cleanup();
  const reduced = setup({ reducedMotion: true });
  assert.equal(reduced.lenis, undefined);
  assert.equal(reduced.wheel(120).defaultPrevented, false);
  reduced.cleanup();
});

test("unmount removes the scroll engine, ticker, and navigation bindings", () => {
  const state = setup();
  assert.equal(state.navigationBindings, 1);
  state.wheel(120);
  state.cleanup();
  assert.equal(state.window.quickBiteLenis, undefined);
  assert.equal(state.navigationBindings, 0);
  assert.equal(state.wheel(120).defaultPrevented, false);
  state.frame(100);
  assert.equal(state.window.scrollY, 1000);
});
