"use client";

import type { waitlistFields } from "@/content/waitlist";

type Props = {
  idPrefix: string;
  field: (typeof waitlistFields)[keyof typeof waitlistFields];
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  error?: string;
};

export default function WaitlistInputField({ idPrefix, field, value, onChange, disabled, error }: Props) {
  const inputId = `${idPrefix}-${field.name}`;
  const errorId = `${inputId}-error`;
  const describedBy = [field.name !== "name" && `${idPrefix}-contact-help`, error && errorId]
    .filter(Boolean).join(" ") || undefined;

  return (
    <div className="w-full min-w-0">
      <div className={`relative flex h-14 w-full items-center rounded-full border bg-espresso px-4 transition-colors motion-reduce:transition-none ${error ? "border-danger focus-within:border-danger-light" : "border-paper/20 focus-within:border-brand hover:border-paper/40"}`}>
        <input
          id={inputId}
          name={field.name}
          type={field.type}
          inputMode={field.type}
          autoComplete={field.autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder=" "
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          maxLength={field.maxLength}
          className="peer relative z-10 w-full min-w-0 appearance-none border-none bg-transparent text-base text-paper shadow-none outline-none! placeholder-transparent focus-visible:outline-none! disabled:opacity-60 autofill:[-webkit-box-shadow:0_0_0_9999px_var(--color-espresso)_inset]! autofill:[-webkit-text-fill-color:var(--color-paper)]!"
        />
        <label htmlFor={inputId} className={`pointer-events-none absolute left-4 top-0 z-20 -translate-y-1/2 rounded-full bg-espresso px-1 text-xs transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs motion-reduce:transition-none ${error ? "text-danger-light" : "text-tan peer-focus:text-brand"}`}>
          {field.label}
        </label>
      </div>
      {error ? <p id={errorId} role="alert" className="mt-2 px-4 text-left text-sm leading-relaxed text-danger-light">{error}</p> : null}
    </div>
  );
}
