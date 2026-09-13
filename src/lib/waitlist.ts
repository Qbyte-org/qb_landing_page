export type WaitlistInput = { email: string; phone?: string };

export type WaitlistResult =
  | { status: "success"; email: string }
  | { status: "duplicate"; email: string; source: "browser" | "server" }
  | { status: "invalid"; field: "email" | "phone" }
  | { status: "unavailable" | "error" | "rate-limited" };

export type WaitlistConfig = {
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
};

type ConfirmedEntry = { email: string; confirmedAt: string };
type WaitlistStorage = Pick<Storage, "getItem" | "setItem">;
type WaitlistTransport = (
  input: Required<WaitlistInput>,
  config: Required<WaitlistConfig>,
) => Promise<{ status: number }>;

// Earlier versions saved entries even when sending was not configured. Only
// this new key can establish that this browser received an accepted response.
export const CONFIRMED_WAITLIST_KEY = "quickbiteWaitlistConfirmed:v1";

function browserStorage(): WaitlistStorage | undefined {
  try {
    return typeof window === "undefined" ? undefined : window.localStorage;
  } catch {
    return undefined;
  }
}

function readConfirmed(storage?: WaitlistStorage): ConfirmedEntry[] {
  try {
    const value: unknown = JSON.parse(storage?.getItem(CONFIRMED_WAITLIST_KEY) ?? "[]");
    return Array.isArray(value)
      ? value.filter((entry): entry is ConfirmedEntry =>
        Boolean(entry && typeof entry.email === "string" && typeof entry.confirmedAt === "string"),
      )
      : [];
  } catch {
    return [];
  }
}

async function sendWithEmailJS(
  input: Required<WaitlistInput>,
  config: Required<WaitlistConfig>,
): Promise<{ status: number }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    // The same EmailJS template contract as the page, using its documented
    // REST endpoint so a slow request can be cancelled without loading an SDK.
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        template_params: {
          email: input.email,
          phone: input.phone || "Not provided",
          name: input.email.split("@")[0],
          reply_to: "support@quickbite.ng",
          from_name: "QuickBite Team",
          title: "Welcome to the QuickBite waitlist",
        },
      }),
    });
    return { status: response.status };
  } finally {
    clearTimeout(timeout);
  }
}

export function createWaitlistSubmission({
  config = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  },
  transport = sendWithEmailJS,
  getStorage = browserStorage,
}: {
  config?: WaitlistConfig;
  transport?: WaitlistTransport;
  getStorage?: () => WaitlistStorage | undefined;
} = {}) {
  const confirmedEmails = new Set<string>();
  const pending = new Map<string, Promise<WaitlistResult>>();

  return async function submit(input: WaitlistInput): Promise<WaitlistResult> {
    const email = input.email.trim().toLowerCase();
    const phone = input.phone?.trim() ?? "";
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { status: "invalid", field: "email" };
    }
    if (phone && (!/^\+?[\d\s().-]+$/.test(phone) || !/^\d{7,15}$/.test(phone.replace(/\D/g, "")))) {
      return { status: "invalid", field: "phone" };
    }

    const storage = getStorage();
    if (confirmedEmails.has(email) || readConfirmed(storage).some((entry) => entry.email === email)) {
      return { status: "duplicate", email, source: "browser" };
    }
    const serviceId = config.serviceId?.trim();
    const templateId = config.templateId?.trim();
    const publicKey = config.publicKey?.trim();
    if (!serviceId || !templateId || !publicKey) return { status: "unavailable" };

    const current = pending.get(email);
    if (current) return current;

    const request = (async (): Promise<WaitlistResult> => {
      try {
        const response = await transport({ email, phone }, { serviceId, templateId, publicKey });
        if (response.status === 409) return { status: "duplicate", email, source: "server" };
        if (response.status === 429) return { status: "rate-limited" };
        if (response.status < 200 || response.status >= 300) return { status: "error" };

        confirmedEmails.add(email);
        try {
          const entries = readConfirmed(storage).filter((entry) => entry.email !== email);
          storage?.setItem(CONFIRMED_WAITLIST_KEY, JSON.stringify([
            ...entries,
            { email, confirmedAt: new Date().toISOString() },
          ]));
        } catch {
          // A blocked/full browser store must not turn an accepted signup into
          // an error. The in-memory set still prevents another send this visit.
        }
        return { status: "success", email };
      } catch {
        return { status: "error" };
      }
    })();
    pending.set(email, request);
    try {
      return await request;
    } finally {
      pending.delete(email);
    }
  };
}

export const submitWaitlist = createWaitlistSubmission();
