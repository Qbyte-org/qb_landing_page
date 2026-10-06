"use client";

import Link from "next/link";
import { waitlistCopy } from "@/content/waitlist";

type Props = {
  idPrefix: string;
  consent: boolean;
  onConsentChange: (checked: boolean) => void;
  disabled: boolean;
  error?: string;
};

export default function WaitlistConsentFields({ idPrefix, consent, onConsentChange, disabled, error }: Props) {
  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={`${idPrefix}-website`}>{waitlistCopy.honeypotLabel}</label>
        <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" disabled={disabled} />
      </div>
      <div>
        <div className="flex items-start gap-3 text-left text-xs leading-relaxed text-paper/85 sm:text-sm">
          <input
            id={`${idPrefix}-consent`}
            name="consent"
            type="checkbox"
            required
            checked={consent}
            onChange={(event) => onConsentChange(event.target.checked)}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${idPrefix}-consent-error` : undefined}
            className="mt-0.5 size-4 shrink-0 accent-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper disabled:opacity-60"
          />
          <label htmlFor={`${idPrefix}-consent`}>
            {waitlistCopy.consent.introduction}{" "}
            <Link href={waitlistCopy.consent.policyHref} className="rounded-sm underline underline-offset-4 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper">{waitlistCopy.consent.policyLabel}</Link>{waitlistCopy.consent.ending}
          </label>
        </div>
        {error ? <p id={`${idPrefix}-consent-error`} role="alert" className="mt-2 pl-7 text-left text-sm leading-relaxed text-danger-light">{error}</p> : null}
      </div>
    </>
  );
}
