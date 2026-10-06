import { waitlistApiMessages as messages } from "@/content/waitlist-messages";

export type WaitlistInput = {
  name?: string;
  email?: string;
  phone?: string;
  consent: boolean;
  website: string;
};

export type WaitlistResult =
  | { status: "success"; message: string }
  | {
      status: "invalid";
      field: "contact" | "name" | "email" | "phone" | "consent";
      message: string;
    }
  | {
      status: "unavailable" | "error" | "rate-limited";
      message: string;
      code?: string;
      requestId?: string;
      retryAfterSeconds?: number;
    };

export type WaitlistConfig = { apiBaseUrl?: string };

type WaitlistTransport = (url: string, options: RequestInit) => Promise<Response>;
type ErrorEnvelope = { message?: string; code?: string; requestId?: string };

const REQUEST_TIMEOUT_MS = 15_000;

function isNigerianMobile(phone: string): boolean {
  if (!/^\+?[\d\s().-]+$/.test(phone)) return false;
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("234")) digits = digits.slice(3);
  else if (phone.startsWith("+")) return false;
  if (digits.startsWith("0")) digits = digits.slice(1);
  // Check the Nigerian mobile shape, not a changing list of operator prefixes.
  // The API remains responsible for canonicalization and final validation.
  return /^[789]\d{9}$/.test(digits);
}

function parseEnvelope(value: unknown): ErrorEnvelope {
  if (!value || typeof value !== "object") return {};
  const body = value as Record<string, unknown>;
  return {
    ...(typeof body.message === "string" && body.message.trim() ? { message: body.message } : {}),
    ...(typeof body.code === "string" && body.code.trim() ? { code: body.code } : {}),
    ...(typeof body.requestId === "string" && body.requestId.trim() ? { requestId: body.requestId } : {}),
  };
}

function retryAfterSeconds(value: string | null): number {
  if (!value?.trim()) return 60;
  if (/^\d+$/.test(value.trim())) {
    const seconds = Number(value);
    return Number.isSafeInteger(seconds) ? seconds : 60;
  }
  const retryAt = /[a-z]/i.test(value) ? Date.parse(value) : Number.NaN;
  return Number.isFinite(retryAt) ? Math.max(0, Math.ceil((retryAt - Date.now()) / 1000)) : 60;
}

export function createWaitlistSubmission({
  config = {},
  transport = (url, options) => fetch(url, options),
}: {
  config?: WaitlistConfig;
  transport?: WaitlistTransport;
} = {}) {
  // Keep only requests that are currently in flight. A repeat submission must
  // receive the same server acknowledgement, without revealing membership.
  const pending = new Map<string, Promise<WaitlistResult>>();

  return async function submit(input: WaitlistInput): Promise<WaitlistResult> {
    const name = input.name?.trim();
    const email = input.email?.trim();
    const phone = input.phone?.trim();
    if (!email && !phone) {
      return { status: "invalid", field: "contact", message: messages.contact };
    }
    if (name && name.length > 100) {
      return { status: "invalid", field: "name", message: messages.name };
    }
    if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return { status: "invalid", field: "email", message: messages.email };
    }
    if (phone && !isNigerianMobile(phone)) {
      return { status: "invalid", field: "phone", message: messages.phone };
    }
    if (input.consent !== true) {
      return { status: "invalid", field: "consent", message: messages.consent };
    }

    const baseUrl = (config.apiBaseUrl ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim().replace(/\/+$/, "");
    try {
      const parsed = new URL(baseUrl);
      if (!["https:", "http:"].includes(parsed.protocol) || parsed.username || parsed.password || parsed.search || parsed.hash) {
        throw new Error("Invalid API base URL");
      }
    } catch {
      return { status: "unavailable", code: "CONFIGURATION_ERROR", message: messages.configuration };
    }

    const payload = JSON.stringify({
      ...(name ? { name } : {}),
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
      consent: input.consent,
      // Never trim or silently remove a filled honeypot. The API handles it.
      website: input.website ?? "",
    });
    const current = pending.get(payload);
    if (current) return current;

    const request = (async (): Promise<WaitlistResult> => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      try {
        const response = await transport(`${baseUrl}/waitlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          credentials: "omit",
          cache: "no-store",
          signal: controller.signal,
          body: payload,
        });
        const body = parseEnvelope(await response.json().catch((error: unknown) => {
          if (controller.signal.aborted) throw error;
          return undefined;
        }));

        if (response.status === 202 && body.message) {
          return { status: "success", message: body.message };
        }
        if (response.status === 429) {
          return {
            ...body,
            status: "rate-limited",
            message: body.message ?? messages.rateLimited,
            retryAfterSeconds: retryAfterSeconds(response.headers.get("Retry-After")),
          };
        }
        if (response.ok) {
          return { status: "error", code: "INVALID_RESPONSE", message: messages.invalidResponse };
        }
        return {
          ...body,
          status: "error",
          message: body.message ?? (body.code === "VALIDATION_FAILED"
            ? messages.validationFailed
            : messages.requestFailed),
        };
      } catch {
        return controller.signal.aborted
          ? { status: "unavailable", code: "TIMEOUT", message: messages.timeout }
          : { status: "unavailable", code: "NETWORK_ERROR", message: messages.network };
      } finally {
        clearTimeout(timeout);
      }
    })();
    pending.set(payload, request);
    try {
      return await request;
    } finally {
      pending.delete(payload);
    }
  };
}

export const submitWaitlist = createWaitlistSubmission();
