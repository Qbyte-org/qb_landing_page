"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";
import { waitlistCopy, waitlistFields, waitlistRetryMessage } from "@/content/waitlist";
import MagneticFillButton from "../ui/MagneticFillButton";
import useWaitlistSignup from "./useWaitlistSignup";
import WaitlistConsentFields from "./WaitlistConsentFields";
import WaitlistInputField from "./WaitlistInputField";
const WaitlistResultModal = dynamic(() => import("./WaitlistResultModal"));

export default function WaitlistForm({ initialEmail = "" }: { initialEmail?: string }) {
  const { name, setName, email, setEmail, phone, setPhone, consent, setConsent, isReady, isSubmitting, retryAfterSeconds, result, fieldErrors, formRef, handleSubmit, dismissResult, returnFocusRef } = useWaitlistSignup(initialEmail);
  const fields = [
    { ...waitlistFields.name, value: name, onChange: setName },
    { ...waitlistFields.email, value: email, onChange: setEmail },
    { ...waitlistFields.phone, value: phone, onChange: setPhone },
  ] as const;

  return (
    <>
      <form ref={formRef} noValidate onSubmit={handleSubmit} aria-busy={!isReady || isSubmitting} className="relative flex w-full flex-col gap-4">
        <p id="waitlist-contact-help" className="sr-only">{waitlistCopy.contactHelp}</p>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className={field.name === "name" ? "min-w-0 sm:col-span-2" : "min-w-0"}>
              <WaitlistInputField
                idPrefix="waitlist"
                field={field}
                value={field.value}
                onChange={field.onChange}
                disabled={!isReady || isSubmitting}
                error={fieldErrors[field.name]}
              />
            </div>
          ))}
        </div>
        <WaitlistConsentFields idPrefix="waitlist" consent={consent} onConsentChange={setConsent} disabled={!isReady || isSubmitting} error={fieldErrors.consent} />
        {retryAfterSeconds > 0 ? <p role="status" className="text-sm text-tan">{waitlistRetryMessage(retryAfterSeconds)}</p> : null}
        <MagneticFillButton
          disabled={!isReady || isSubmitting || retryAfterSeconds > 0}
          type="submit"
          className="mt-2 min-h-12 w-full shrink-0 rounded-full bg-brand! px-8 py-3 font-semibold text-white! disabled:cursor-not-allowed disabled:opacity-50"
          customFillClass="bg-cream-200"
          customHoverTextColor="var(--color-ink)"
        >
          {isSubmitting ? <><LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden="true" />{waitlistCopy.submitting}</> : waitlistCopy.submit}
        </MagneticFillButton>
      </form>
      {result ? <WaitlistResultModal result={result} onClose={dismissResult} returnFocusRef={returnFocusRef} /> : null}
    </>
  );
}
