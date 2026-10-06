/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const TEST_API_BASE_URL = 'https://api.example.test/api/v1';

function loadModule(relativePath, globals = {}) {
  const filename = path.resolve(__dirname, '..', relativePath);
  const compiled = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  vm.runInNewContext(compiled.outputText, {
    exports, process: { env: { NEXT_PUBLIC_API_BASE_URL: TEST_API_BASE_URL } }, URL, AbortController, setTimeout, clearTimeout,
    require: (specifier) => {
      if (specifier === '@/content/waitlist-messages') return loadModule('src/content/waitlist-messages.ts', globals);
      throw new Error(`Unexpected test module: ${specifier}`);
    },
    fetch: () => { throw new Error('A test attempted an unmocked network request'); },
    ...globals,
  }, { filename });
  return exports;
}

const validInput = { email: 'person@example.test', consent: true, website: '' };
const acknowledgement = "Thanks — you're on the list. We'll let you know when we open.";
const reply = (status = 202, body = { message: acknowledgement }, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } });

test('contact, email, mobile, name and explicit consent validation happens before sending', async () => {
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts');
  let calls = 0;
  const submit = createWaitlistSubmission({ transport: async () => { calls += 1; return reply(); } });
  const cases = [
    [{ email: '', phone: '  ' }, 'contact'],
    [{ email: 'not-an-email' }, 'email'],
    [{ email: 'a'.repeat(245) + '@example.test' }, 'email'],
    [{ phone: 'wrong' }, 'phone'],
    [{ phone: '+1 202 555 0123' }, 'phone'],
    [{ phone: '+44 7700 900123' }, 'phone'],
    [{ phone: '020 1234 5678' }, 'phone'],
    [{ phone: '08031234' }, 'phone'],
    [{ name: 'n'.repeat(101) }, 'name'],
    [{ consent: false }, 'consent'],
    [{ consent: undefined }, 'consent'],
    [{ consent: 'true' }, 'consent'],
  ];
  for (const [overrides, field] of cases) {
    const result = await submit({ ...validInput, ...overrides });
    assert.equal(result.status, 'invalid');
    assert.equal(result.field, field);
    assert.ok(result.message.length > 0);
  }
  assert.equal(calls, 0);
});

test('direct browser request uses the configured API and preserves the server acknowledgement', async () => {
  let request;
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts', {
    fetch: async (url, options) => { request = { url, ...options }; return reply(); },
  });
  const result = await createWaitlistSubmission()({
    ...validInput, name: ' Ada Obi ', email: ' Ada@Example.test ', phone: ' +234 803 123 4567 ',
  });
  assert.equal(result.status, 'success');
  assert.equal(result.message, acknowledgement);
  assert.equal(request.url, `${TEST_API_BASE_URL}/waitlist`);
  assert.equal(request.method, 'POST');
  assert.equal(request.credentials, 'omit');
  assert.equal(request.cache, 'no-store');
  assert.equal(request.headers['Content-Type'], 'application/json');
  assert.equal(request.headers.Authorization, undefined);
  assert.ok(request.signal instanceof AbortSignal);
  assert.deepEqual(JSON.parse(request.body), {
    name: 'Ada Obi', email: 'Ada@Example.test', phone: '+234 803 123 4567', consent: true, website: '',
  });
});

test('email-only submission omits blank optional fields but always sends the honeypot', async () => {
  let received;
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts');
  const submit = createWaitlistSubmission({ transport: async (_url, options) => {
    received = JSON.parse(options.body);
    return reply();
  } });
  assert.equal((await submit({ ...validInput, name: '  ', phone: '  ' })).status, 'success');
  assert.deepEqual(received, validInput);
});

test('phone-only submissions accept Nigerian local, international and national formats unchanged', async () => {
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts');
  const received = [];
  const submit = createWaitlistSubmission({ transport: async (_url, options) => {
    received.push(JSON.parse(options.body));
    return reply();
  } });
  for (const phone of ['0803 123 4567', '+234 803 123 4567', '8031234567', '0701-234-5678', '(0901) 234 5678']) {
    const result = await submit({ name: '', email: ' ', phone, consent: true, website: '' });
    assert.equal(result.status, 'success', phone);
    assert.deepEqual(received.at(-1), { phone, consent: true, website: '' });
  }
});

test('a filled honeypot reaches the backend unchanged and never receives a special disclosure', async () => {
  let received;
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts');
  const submit = createWaitlistSubmission({ transport: async (_url, options) => {
    received = JSON.parse(options.body);
    return reply();
  } });
  const result = await submit({ ...validInput, website: ' https://bot.example.test/ ' });
  assert.equal(received.website, ' https://bot.example.test/ ');
  assert.equal(result.status, 'success');
  assert.equal(result.message, acknowledgement);
});

test('repeated submissions always use the API and never read or save browser personal data', async () => {
  const storage = new Proxy({}, {
    get() { throw new Error('The waitlist must not read browser storage'); },
    set() { throw new Error('The waitlist must not write browser storage'); },
  });
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts', {
    window: { localStorage: storage, sessionStorage: storage },
  });
  let calls = 0;
  const submit = createWaitlistSubmission({ transport: async () => { calls += 1; return reply(); } });
  for (let index = 0; index < 2; index += 1) {
    const result = await submit(validInput);
    assert.equal(result.status, 'success');
    assert.equal(result.message, acknowledgement);
    assert.equal('email' in result, false);
    assert.equal('source' in result, false);
  }
  assert.equal(calls, 2);
});

test('identical in-flight payloads coalesce but different phone or honeypot values do not', async () => {
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts');
  const releases = [];
  const submit = createWaitlistSubmission({ transport: () => new Promise(resolve => releases.push(resolve)) });
  const first = submit(validInput);
  const same = submit({ ...validInput, email: ' person@example.test ' });
  const withPhone = submit({ ...validInput, phone: '08031234567' });
  const withHoneypot = submit({ ...validInput, website: 'bot' });
  assert.equal(releases.length, 3);
  for (const release of releases) release(reply());
  for (const result of await Promise.all([first, same, withPhone, withHoneypot])) {
    assert.equal(result.status, 'success');
  }
  const repeated = submit(validInput);
  assert.equal(releases.length, 4);
  releases.at(-1)(reply());
  assert.equal((await repeated).status, 'success');
});

test('backend failures preserve message, stable code and support request ID without word matching', async () => {
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts');
  for (const [status, code, message] of [
    [400, 'VALIDATION_FAILED', 'Check the number you entered.'],
    [400, 'VALIDATION_FAILED', 'An entirely revised validation message.'],
    [409, 'CONFLICT', 'Please try again later.'],
    [500, 'INTERNAL_SERVER_ERROR', 'We are having trouble right now.'],
  ]) {
    const submit = createWaitlistSubmission({ transport: async () => reply(status, {
      message, code, requestId: 'support-request-123',
    }) });
    const result = await submit(validInput);
    assert.equal(result.status, 'error');
    assert.equal(result.message, message);
    assert.equal(result.code, code);
    assert.equal(result.requestId, 'support-request-123');
  }
});

test('429 stays distinct and obeys Retry-After seconds, HTTP dates and inaccessible headers', async () => {
  const now = Date.parse('2026-09-23T10:14:00Z');
  class FixedDate extends Date { static now() { return now; } }
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts', { Date: FixedDate });
  for (const [header, expected] of [
    ['45', 45], ['Wed, 23 Sep 2026 10:15:30 GMT', 90], ['Wed, 23 Sep 2026 10:13:30 GMT', 0],
    [undefined, 60], ['unreadable', 60], ['-1', 60], ['0.5', 60],
  ]) {
    const submit = createWaitlistSubmission({ transport: async () => reply(429, {
      message: 'Please slow down.', code: 'RATE_LIMITED', requestId: 'rate-limit-request',
    }, header === undefined ? {} : { 'Retry-After': header }) });
    const result = await submit(validInput);
    assert.equal(result.status, 'rate-limited');
    assert.equal(result.retryAfterSeconds, expected, String(header));
    assert.equal(result.message, 'Please slow down.');
    assert.equal(result.code, 'RATE_LIMITED');
    assert.equal(result.requestId, 'rate-limit-request');
  }
});

test('only a 202 containing an acknowledgement confirms the submission', async () => {
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts');
  for (const response of [
    reply(200), reply(201), reply(202, {}), reply(202, { message: ['not a string'] }),
    new Response('<html>upstream failure</html>', { status: 502 }),
    new Response('not JSON', { status: 202 }),
  ]) {
    const submit = createWaitlistSubmission({ transport: async () => response });
    const result = await submit(validInput);
    assert.equal(result.status, 'error');
    assert.ok(result.message.length > 0);
  }
});

test('network failures do not retry automatically and allow a later explicit attempt', async () => {
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts');
  let calls = 0;
  const submit = createWaitlistSubmission({ transport: async () => {
    calls += 1;
    if (calls === 1) throw new TypeError('Failed to fetch');
    return reply();
  } });
  const failed = await submit(validInput);
  assert.equal(failed.status, 'unavailable');
  assert.equal(failed.code, 'NETWORK_ERROR');
  assert.equal(calls, 1);
  assert.equal((await submit(validInput)).status, 'success');
  assert.equal(calls, 2);
});

test('requests abort after 15 seconds and do not keep the pending entry', async () => {
  let timeout;
  let signal;
  let calls = 0;
  let cleared = 0;
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts', {
    setTimeout: (callback, delay) => { assert.equal(delay, 15000); timeout = callback; return 1; },
    clearTimeout: () => { cleared += 1; },
    fetch: (_url, options) => {
      calls += 1;
      if (calls > 1) return Promise.resolve(reply());
      signal = options.signal;
      return new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true }));
    },
  });
  const submit = createWaitlistSubmission();
  const request = submit(validInput);
  timeout();
  assert.equal(signal.aborted, true);
  const result = await request;
  assert.equal(result.status, 'unavailable');
  assert.equal(result.code, 'TIMEOUT');
  assert.equal(calls, 1);
  assert.equal(cleared, 1);
  assert.equal((await submit(validInput)).status, 'success');
  assert.equal(cleared, 2);
});

test('environment and explicit API base URLs are supported without credentials or malformed URLs', async () => {
  const { createWaitlistSubmission } = loadModule('src/lib/waitlist.ts', {
    process: { env: { NEXT_PUBLIC_API_BASE_URL: 'https://environment.example.test/api/v1/' } },
  });
  const urls = [];
  const transport = async url => { urls.push(url); return reply(); };
  await createWaitlistSubmission({ transport })(validInput);
  await createWaitlistSubmission({ config: { apiBaseUrl: ` ${TEST_API_BASE_URL}/// ` }, transport })(validInput);
  assert.deepEqual(urls, [
    'https://environment.example.test/api/v1/waitlist',
    `${TEST_API_BASE_URL}/waitlist`,
  ]);
  for (const apiBaseUrl of ['', '/api/v1', 'not-a-url', 'https://user:pass@example.test/api/v1', 'https://example.test/?token=secret']) {
    const result = await createWaitlistSubmission({ config: { apiBaseUrl }, transport })(validInput);
    assert.equal(result.status, 'unavailable');
    assert.equal(result.code, 'CONFIGURATION_ERROR');
  }
  assert.equal(urls.length, 2);
});

test('missing or blank API environment configuration never sends a request', async () => {
  for (const apiBaseUrl of [undefined, '', '   ']) {
    const { submitWaitlist } = loadModule('src/lib/waitlist.ts', {
      process: { env: apiBaseUrl === undefined ? {} : { NEXT_PUBLIC_API_BASE_URL: apiBaseUrl } },
      fetch: () => assert.fail('An unconfigured form must not send a request'),
    });
    const result = await submitWaitlist(validInput);
    assert.equal(result.status, 'unavailable');
    assert.equal(result.code, 'CONFIGURATION_ERROR');
  }
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

test('shared-layout overlays can lock scrolling without changing document coordinates', () => {
  const body = { style: { position: '', top: '', width: '', overflow: 'auto' } };
  const html = { style: { overflow: '', scrollBehavior: 'smooth' } };
  const lenis = { isStopped: false, stop() { this.isStopped = true; }, start() { this.isStopped = false; } };
  const { lockWaitlistScroll } = loadModule('src/components/waitlist/waitlistScrollLock.ts', {
    document: { body, documentElement: html },
    window: { scrollY: 1161, quickBiteLenis: lenis, scrollTo: () => assert.fail('Shared-layout cards must keep their scroll coordinates') },
  });
  const release = lockWaitlistScroll({ preserveLayout: true });
  assert.equal(body.style.position, '');
  assert.equal(body.style.top, '');
  assert.equal(body.style.width, '');
  assert.equal(body.style.overflow, 'hidden');
  assert.equal(html.style.overflow, 'hidden');
  assert.equal(lenis.isStopped, true);
  release();
  assert.equal(body.style.overflow, 'auto');
  assert.equal(html.style.overflow, '');
  assert.equal(lenis.isStopped, false);
});
