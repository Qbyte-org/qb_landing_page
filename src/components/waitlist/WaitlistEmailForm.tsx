"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";
import { waitlistCopy, waitlistFields, waitlistPage, waitlistRetryMessage } from "@/content/waitlist";
import MagneticFillButton from "../ui/MagneticFillButton";
import useWaitlistSignup from "./useWaitlistSignup";
import WaitlistConsentFields from "./WaitlistConsentFields";

const WaitlistResultModal = dynamic(() => import("./WaitlistResultModal"));

type Props = {
  idPrefix: string;
  initialEmail?: string;
  className?: string;
};

/** The page's one-field signup: email, consent and the shared waitlist submission. */
export default function WaitlistEmailForm({ idPrefix, initialEmail = "", className = "" }: Props) {
  const { email, setEmail, consent, setConsent, isReady, isSubmitting, retryAfterSeconds, result, fieldErrors, formRef, handleSubmit, dismissResult, returnFocusRef } = useWaitlistSignup(initialEmail);
  const inputId = `${idPrefix}-email`;
  const errorId = `${inputId}-error`;
  const disabled = !isReady || isSubmitting;

  return (
    <>
      <form ref={formRef} noValidate onSubmit={handleSubmit} aria-busy={disabled} data-waitlist-form={idPrefix} className={`relative flex w-full flex-col gap-3.5 text-left ${className}`}>
        <label htmlFor={inputId} className="text-base font-semibold text-paper">{waitlistPage.emailLabel}</label>
        <div className={`flex flex-col gap-3 transition-colors duration-200 motion-reduce:transition-none sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border-2 sm:bg-espresso sm:p-2 ${fieldErrors.email ? "sm:border-danger" : "sm:border-paper sm:focus-within:border-brand"}`}>
          <input
            id={inputId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={waitlistFields.email.maxLength}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={disabled}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? errorId : undefined}
            className={`h-14 w-full min-w-0 rounded-full border-2 sm:w-auto sm:flex-1 bg-espresso px-5 text-lg font-medium text-paper outline-none! focus:border-brand sm:border-0 sm:bg-transparent ${fieldErrors.email ? "border-danger" : "border-paper"} placeholder:text-paper/45 focus-visible:outline-none! disabled:opacity-60 autofill:[-webkit-box-shadow:0_0_0_9999px_var(--color-espresso)_inset]! autofill:[-webkit-text-fill-color:var(--color-paper)]!`}
          />
          <MagneticFillButton
            type="submit"
            variant="brand"
            ariaLabel={isSubmitting ? waitlistCopy.submittingAriaLabel : waitlistCopy.submitAriaLabel}
            disabled={disabled || retryAfterSeconds > 0}
            className="h-14 w-full shrink-0 rounded-full bg-brand! px-8 sm:w-auto text-[1.25rem] font-bold text-white! focus-visible:outline-2! focus-visible:outline-offset-4 focus-visible:outline-paper! disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? <><LoaderCircle className="size-5 motion-safe:animate-spin" aria-hidden="true" />{waitlistCopy.submitting}</> : waitlistPage.submit}
          </MagneticFillButton>
        </div>
        {fieldErrors.email ? <p id={errorId} role="alert" className="px-2 text-sm leading-relaxed text-danger-light">{fieldErrors.email}</p> : null}
        <WaitlistConsentFields idPrefix={idPrefix} consent={consent} onConsentChange={setConsent} disabled={disabled} error={fieldErrors.consent} />
        {retryAfterSeconds > 0 ? <p role="status" className="text-sm text-tan">{waitlistRetryMessage(retryAfterSeconds)}</p> : null}
      </form>
      {result ? <WaitlistResultModal result={result} onClose={dismissResult} returnFocusRef={returnFocusRef} /> : null}
    </>
  );
}
