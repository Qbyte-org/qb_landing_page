/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

function loadModule(relativePath) {
  const filename = path.resolve(__dirname, '..', relativePath);
  const compiled = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  vm.runInNewContext(compiled.outputText, { exports, URL }, { filename });
  return exports;
}

const { normalizeReferralCode, playStoreUrl } = loadModule('src/lib/referral.ts');

test('referral codes are trimmed, uppercased and accept an optional REF- prefix', () => {
  assert.equal(normalizeReferralCode('REF-AB12CD'), 'REF-AB12CD');
  assert.equal(normalizeReferralCode('  ref-ab12cd '), 'REF-AB12CD');
  assert.equal(normalizeReferralCode('ab12cd'), 'REF-AB12CD');
  assert.equal(normalizeReferralCode('REF - AB 12 CD'), 'REF-AB12CD');
});

test('referral code bodies may contain or start with "-" and "_"', () => {
  assert.equal(normalizeReferralCode('REF-A_9-K2'), 'REF-A_9-K2');
  assert.equal(normalizeReferralCode('ref--a_9k2'), 'REF--A_9K2');
  assert.equal(normalizeReferralCode('-A_9K2'), 'REF--A_9K2');
});

test('anything else is not a referral code', () => {
  for (const value of [undefined, null, 42, '', '   ', 'REF-', 'REF-ABC', 'REF-AB12CDE', 'AB12C', 'REF-AB12C!', 'REF-ÀB12CD']) {
    assert.equal(normalizeReferralCode(value), null, String(value));
  }
});

test('the Play Store link carries the code as an encoded referrer', () => {
  assert.equal(playStoreUrl(), 'https://play.google.com/store/apps/details?id=com.quickbiteltd.quickbite');
  assert.equal(playStoreUrl('REF-A_9-K2'), 'https://play.google.com/store/apps/details?id=com.quickbiteltd.quickbite&referrer=ref%3DREF-A_9-K2');
});
