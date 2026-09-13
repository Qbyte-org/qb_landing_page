/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

function loadModule(relativePath, globals = {}) {
  const filename = path.resolve(__dirname, '..', relativePath);
  const compiled = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  vm.runInNewContext(compiled.outputText, {
    exports, process: { env: {} }, AbortController, setTimeout, clearTimeout,
    fetch: () => { throw new Error('A test attempted an unmocked network request'); },
    ...globals,
  }, { filename });
  return exports;
}

function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
}

const config = { serviceId: 'test-service', templateId: 'test-template', publicKey: 'test-public-key' };

test('invalid email/phone and missing configuration never send or store a signup', async () => {
  const { createWaitlistSubmission, CONFIRMED_WAITLIST_KEY } = loadModule('src/lib/waitlist.ts');
  const storage = memoryStorage();
  let calls = 0;
  const submit = createWaitlistSubmission({ getStorage: () => storage, transport: async () => { calls += 1; return { status: 200 }; } });
  assert.equal((await submit({ email: 'not-an-email' })).status, 'invalid');
  assert.equal((await submit({ email: 'person@example.test', phone: 'wrong' })).field, 'phone');
  assert.equal((await submit({ email: 'person@example.test' })).status, 'unavailable');
  assert.equal(calls, 0);
  assert.equal(storage.getItem(CONFIRMED_WAITLIST_KEY), null);
});

test('only backend acceptance confirms a normalized signup; legacy local records are not trusted', async () => {
  const { createWaitlistSubmission, CONFIRMED_WAITLIST_KEY } = loadModule('src/lib/waitlist.ts');
  const storage = memoryStorage({ quickbiteWaitlistEmails: JSON.stringify([{ email: 'person@example.test', date: '2026-01-01' }]) });
  let accept;
  let received;
  const submit = createWaitlistSubmission({ config, getStorage: () => storage, transport: input => {
    received = input;
    return new Promise(resolve => { accept = resolve; });
  } });
  const request = submit({ email: ' Person@Example.Test ', phone: ' +234 801 234 5678 ' });
  assert.equal(storage.getItem(CONFIRMED_WAITLIST_KEY), null);
  assert.equal(received.email, 'person@example.test');
  assert.equal(received.phone, '+234 801 234 5678');
  accept({ status: 200 });
  assert.equal((await request).status, 'success');
  const confirmed = JSON.parse(storage.getItem(CONFIRMED_WAITLIST_KEY));
  assert.equal(confirmed.length, 1);
  assert.equal(confirmed[0].email, 'person@example.test');
  assert.ok(Number.isFinite(Date.parse(confirmed[0].confirmedAt)));
  assert.equal(confirmed[0].phone, undefined, 'Optional phone is not retained in browser storage');
  const duplicate = await submit({ email: 'PERSON@EXAMPLE.TEST' });
  assert.equal(duplicate.status, 'duplicate');
  assert.equal(duplicate.source, 'browser');
});

test('simultaneous page/footer submissions coalesce into one request', async () => {
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts');
  let accept;
  let calls = 0;
  const submit = createWaitlistSubmission({ config, transport: () => {
    calls += 1;
    return new Promise(resolve => { accept = resolve; });
  } });
  const first = submit({ email: 'person@example.test' });
  const second = submit({ email: 'PERSON@example.test' });
  assert.equal(calls, 1);
  accept({ status: 202 });
  assert.equal((await first).status, 'success');
  assert.equal((await second).status, 'success');
});

test('HTTP/network failures remain retryable and never establish local confirmation', async () => {
  for (const scenario of [400, 429, 500, 'network']) {
    const { createWaitlistSubmission, CONFIRMED_WAITLIST_KEY } = loadModule('src/lib/waitlist.ts');
    const storage = memoryStorage();
    let fail = true;
    const submit = createWaitlistSubmission({ config, getStorage: () => storage, transport: async () => {
      if (!fail) return { status: 200 };
      if (scenario === 'network') throw new Error('offline');
      return { status: scenario };
    } });
    assert.equal((await submit({ email: 'person@example.test' })).status, scenario === 429 ? 'rate-limited' : 'error');
    assert.equal(storage.getItem(CONFIRMED_WAITLIST_KEY), null);
    fail = false;
    assert.equal((await submit({ email: 'person@example.test' })).status, 'success');
  }
});

test('blocked or corrupt browser storage cannot turn an accepted signup into failure', async () => {
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts');
  for (const getItem of [() => '{broken json', () => '{"unexpected":"object"}', () => { throw new Error('blocked'); }]) {
    let calls = 0;
    const submit = createWaitlistSubmission({ config, getStorage: () => ({ getItem, setItem: () => { throw new Error('quota'); } }), transport: async () => {
      calls += 1;
      return { status: 200 };
    } });
    assert.equal((await submit({ email: 'person@example.test' })).status, 'success');
    assert.equal((await submit({ email: 'person@example.test' })).status, 'duplicate');
    assert.equal(calls, 1);
  }
});

test('transport uses the EmailJS contract, optional phone, cancellation signal and accepted HTTP status', async () => {
  let request;
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts', { fetch: async (url, options) => {
    request = { url, ...options };
    return { status: 200 };
  } });
  const result = await createWaitlistSubmission({ config })({ email: 'person@example.test' });
  assert.equal(result.status, 'success');
  assert.equal(request.url, 'https://api.emailjs.com/api/v1.0/email/send');
  assert.equal(request.method, 'POST');
  assert.ok(request.signal instanceof AbortSignal);
  const body = JSON.parse(request.body);
  assert.equal(body.service_id, config.serviceId);
  assert.equal(body.template_id, config.templateId);
  assert.equal(body.user_id, config.publicKey);
  assert.equal(body.template_params.email, 'person@example.test');
  assert.equal(body.template_params.phone, 'Not provided');
});

test('timed-out transport aborts without creating a confirmation', async () => {
  let timeout;
  let signal;
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts', {
    setTimeout: callback => { timeout = callback; return 1; },
    clearTimeout: () => {},
    fetch: (_url, options) => {
      signal = options.signal;
      return new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true }));
    },
  });
  const request = createWaitlistSubmission({ config })({ email: 'person@example.test' });
  timeout();
  assert.equal(signal.aborted, true);
  assert.equal((await request).status, 'error');
});

test('modal scroll locks restore state only after the last release and preserve pre-existing locks', () => {
  for (const alreadyStopped of [false, true]) {
    const body = { style: { position: '', top: '', width: '', overflow: 'auto' } };
    const html = { style: { overflow: '', scrollBehavior: 'smooth' } };
    let starts = 0;
    let stops = 0;
    let restoredY;
    const lenis = { isStopped: alreadyStopped, stop: () => { stops += 1; }, start: () => { starts += 1; } };
    const { lockWaitlistScroll } = loadModule('src/components/waitlist/waitlistScrollLock.ts', {
      document: { body, documentElement: html }, window: { scrollY: 742, quickBiteLenis: lenis, scrollTo: options => { restoredY = options.top; } },
    });
    const first = lockWaitlistScroll();
    const second = lockWaitlistScroll();
    assert.equal(body.style.position, 'fixed');
    assert.equal(body.style.top, '-742px');
    assert.equal(stops, 1);
    first();
    first();
    assert.equal(body.style.position, 'fixed');
    assert.equal(starts, 0);
    second();
    assert.equal(body.style.position, '');
    assert.equal(body.style.overflow, 'auto');
    assert.equal(html.style.overflow, '');
    assert.equal(html.style.scrollBehavior, 'smooth');
    assert.equal(restoredY, 742);
    assert.equal(starts, alreadyStopped ? 0 : 1);
  }
});
