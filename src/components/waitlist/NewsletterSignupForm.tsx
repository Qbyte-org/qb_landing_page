"use client";

import dynamic from "next/dynamic";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { waitlistCopy, waitlistFields, waitlistRetryMessage } from "@/content/waitlist";
import MagneticFillButton from "../ui/MagneticFillButton";
import useWaitlistSignup from "./useWaitlistSignup";
import WaitlistConsentFields from "./WaitlistConsentFields";
import WaitlistInputField from "./WaitlistInputField";

const WaitlistResultModal = dynamic(() => import("./WaitlistResultModal"));

export default function NewsletterSignupForm() {
  const { email, setEmail, phone, setPhone, consent, setConsent, isReady, isSubmitting, retryAfterSeconds, result, fieldErrors, formRef, handleSubmit, dismissResult, returnFocusRef } = useWaitlistSignup();
  const fields = [
    { ...waitlistFields.email, value: email, onChange: setEmail },
    { ...waitlistFields.phone, value: phone, onChange: setPhone },
  ] as const;

  return (
    <>
      <form ref={formRef} noValidate onSubmit={handleSubmit} aria-busy={!isReady || isSubmitting} className="relative mt-6 flex w-full min-w-0 flex-col gap-4 sm:mt-4">
        <p id="footer-contact-help" className="text-left text-xs leading-relaxed text-paper/80 sm:text-sm">{waitlistCopy.contactHelp}</p>
        <div className="flex w-full flex-col gap-4">
          {fields.map((field) => (
            <WaitlistInputField
              key={field.name}
              idPrefix="footer"
              field={field}
              value={field.value}
              onChange={field.onChange}
              disabled={!isReady || isSubmitting}
              error={fieldErrors[field.name]}
            />
          ))}
        </div>
        <WaitlistConsentFields idPrefix="footer" consent={consent} onConsentChange={setConsent} disabled={!isReady || isSubmitting} error={fieldErrors.consent} />
        {retryAfterSeconds > 0 ? <p role="status" className="text-sm text-paper/80">{waitlistRetryMessage(retryAfterSeconds)}</p> : null}
        <MagneticFillButton
          type="submit"
          ariaLabel={isSubmitting ? waitlistCopy.submittingAriaLabel : waitlistCopy.submitAriaLabel}
          disabled={!isReady || isSubmitting || retryAfterSeconds > 0}
          variant="brand"
          className="group mt-1 min-h-12 w-full shrink-0 rounded-full bg-brand! px-5 py-3 font-semibold text-paper! focus-visible:outline-2! focus-visible:outline-offset-4 focus-visible:outline-paper! disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <><LoaderCircle className="size-5 motion-safe:animate-spin" aria-hidden="true" />{waitlistCopy.submitting}</>
          ) : (
            <>{waitlistCopy.newsletterSubmit}<ArrowRight className="size-5 transition-transform duration-200 motion-safe:group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" /></>
          )}
        </MagneticFillButton>
      </form>
      {result ? <WaitlistResultModal result={result} onClose={dismissResult} returnFocusRef={returnFocusRef} /> : null}
    </>
  );
}
