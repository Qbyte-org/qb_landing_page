"use client";

import dynamic from "next/dynamic";
import { ArrowRight, LoaderCircle } from "lucide-react";
import MagneticFillButton from "../ui/MagneticFillButton";
import useWaitlistSignup from "./useWaitlistSignup";

const WaitlistResultModal = dynamic(() => import("./WaitlistResultModal"));

export default function NewsletterSignupForm() {
  const { email, setEmail, phone, setPhone, isReady, isSubmitting, result, formRef, handleSubmit, dismissResult, returnFocusRef } = useWaitlistSignup();
  return (
    <>
      <form ref={formRef} noValidate onSubmit={handleSubmit} aria-busy={!isReady || isSubmitting} className="mt-6 max-w-md sm:mt-7">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <div className="border-b border-paper/25 pb-2 transition-colors focus-within:border-paper">
            <input
              id="footer-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={!isReady || isSubmitting}
              maxLength={254}
              placeholder="Email address"
              className="min-w-0 w-full bg-transparent px-3 py-3 text-base text-paper placeholder:text-peach/75 focus-visible:outline-paper! autofill:[-webkit-box-shadow:0_0_0_9999px_#382c26_inset]! autofill:[-webkit-text-fill-color:#fffaf5]! sm:px-4 sm:text-lg min-[1800px]:text-xl rounded-4xl"
            />
          </div>
          <label htmlFor="footer-phone" className="sr-only">
            Phone number (optional)
          </label>
          <div className="mt-2 flex items-center gap-3 border-b border-paper/40 pb-3 transition-colors focus-within:border-paper">
            <input
              id="footer-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              disabled={!isReady || isSubmitting}
              maxLength={32}
              placeholder="Phone (optional)"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-paper placeholder:text-peach/75 focus-visible:outline-paper! autofill:[-webkit-box-shadow:0_0_0_9999px_#382c26_inset]! autofill:[-webkit-text-fill-color:#fffaf5]! sm:px-4 sm:text-lg min-[1800px]:text-xl rounded-4xl"
            />
            <MagneticFillButton
              type="submit"
              ariaLabel={isSubmitting ? "Joining the QuickBite waitlist" : "Join the QuickBite waitlist"}
              title="Join the waitlist"
              disabled={!isReady || isSubmitting}
              variant="dark"
              customFillClass="bg-cream-200"
              customHoverTextColor="#2a211d"
              className="group h-11 w-11 shrink-0 rounded-full bg-transparent! text-paper! focus-visible:outline-2! focus-visible:outline-offset-2 focus-visible:outline-paper!"
            >
              {isSubmitting ? <LoaderCircle className="size-5 motion-safe:animate-spin" aria-hidden="true" /> : <ArrowRight
                className="h-6 w-6 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                strokeWidth={1.75}
                aria-hidden="true"
              />}
            </MagneticFillButton>
          </div>
        </form>
      {result ? <WaitlistResultModal result={result} onClose={dismissResult} returnFocusRef={returnFocusRef} /> : null}
    </>
  );
}
