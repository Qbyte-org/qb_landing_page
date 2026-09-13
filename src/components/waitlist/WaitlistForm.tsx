"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";
import MagneticFillButton from "../ui/MagneticFillButton";
import useWaitlistSignup from "./useWaitlistSignup";
const WaitlistResultModal = dynamic(() => import("./WaitlistResultModal"));

export default function WaitlistForm({ initialEmail = "" }: { initialEmail?: string }) {
  const { email, setEmail, phone, setPhone, isReady, isSubmitting, result, formRef, handleSubmit, dismissResult, returnFocusRef } = useWaitlistSignup(initialEmail);
  const fields = [
    { name: "email", label: "Email address", type: "email", value: email, onChange: setEmail, required: true, maxLength: 254 },
    { name: "phone", label: "Phone number (optional)", type: "tel", value: phone, onChange: setPhone, required: false, maxLength: 32 },
  ] as const;

  return (
    <>
      <form ref={formRef} noValidate onSubmit={handleSubmit} aria-busy={!isReady || isSubmitting} className="relative mb-8 flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-4">
          {fields.map((field) => (
            <div key={field.name} className="relative flex h-14 w-full items-center rounded-full border border-paper/20 bg-[#241813] px-4 transition-colors focus-within:border-brand hover:border-paper/40 motion-reduce:transition-none">
              <input
                id={`waitlist-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.type}
                inputMode={field.type}
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                placeholder=" "
                disabled={!isReady || isSubmitting}
                required={field.required}
                maxLength={field.maxLength}
                className="peer relative z-10 w-full min-w-0 appearance-none border-none bg-transparent text-base text-paper shadow-none outline-none! placeholder-transparent focus-visible:outline-none! disabled:opacity-60"
              />
              <label htmlFor={`waitlist-${field.name}`} className="pointer-events-none absolute left-4 top-0 z-20 -translate-y-1/2 rounded-full bg-[#241813] px-1 text-xs text-[#c9aa96] transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-brand motion-reduce:transition-none">
                {field.label}
              </label>
            </div>
          ))}
        </div>
        <MagneticFillButton
          disabled={!isReady || isSubmitting}
          type="submit"
          className="mt-2 min-h-12 w-full shrink-0 rounded-full bg-brand! px-8 py-3 font-semibold text-white! disabled:cursor-not-allowed disabled:opacity-50"
          customFillClass="bg-cream-200"
          customHoverTextColor="#2a211d"
        >
          {isSubmitting ? <><LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden="true" />Joining...</> : "Join Waitlist"}
        </MagneticFillButton>
      </form>
      {result ? <WaitlistResultModal result={result} onClose={dismissResult} returnFocusRef={returnFocusRef} /> : null}
    </>
  );
}
