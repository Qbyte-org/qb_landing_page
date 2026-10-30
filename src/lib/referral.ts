/**
 * Referral codes, normalised the way the QuickBite server does it: trimmed, uppercased,
 * spaces ignored, "REF-" optional. A code is "REF-" plus 6 characters of A–Z, 0–9, "_" or "-",
 * so the body itself may contain or start with "-" (REF--A_9K2).
 */
const REFERRAL_CODE = /^REF-[A-Z0-9_-]{6}$/;

export const PLAY_STORE_APP_ID = "com.quickbiteltd.quickbite";

export function normalizeReferralCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const compact = raw.replace(/\s+/g, "").toUpperCase();
  if (!compact) return null;
  const code = compact.startsWith("REF-") ? compact : `REF-${compact}`;
  return REFERRAL_CODE.test(code) ? code : null;
}

/** Play Store listing; the referrer lets a future app version read the code after install. */
export function playStoreUrl(code?: string | null): string {
  const url = new URL("https://play.google.com/store/apps/details");
  url.searchParams.set("id", PLAY_STORE_APP_ID);
  if (code) url.searchParams.set("referrer", `ref=${code}`);
  return url.toString();
}
