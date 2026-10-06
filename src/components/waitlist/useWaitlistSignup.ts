"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { submitWaitlist, type WaitlistResult } from "@/lib/waitlist";

const subscribeToHydration = () => () => {};
const getClientReady = () => true;
const getServerReady = () => false;

type ValidationError = Extract<WaitlistResult, { status: "invalid" }>;
type InputField = Exclude<ValidationError["field"], "contact">;

export default function useWaitlistSignup(initialEmail = "") {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [retryAfterSeconds, setRetryAfterSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<Exclude<WaitlistResult, ValidationError> | null>(null);
  const [validationError, setValidationError] = useState<ValidationError | null>(null);
  // A native submit before hydration would navigate away instead of sending.
  // Enable the controls as soon as React attaches the shared form handler.
  const isReady = useSyncExternalStore(subscribeToHydration, getClientReady, getServerReady);
  const submittingRef = useRef(false);
  const mountedRef = useRef(false);
  const retryUntilRef = useRef(0);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const formElementRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (!validationError) return;
    const field = validationError.field === "contact" ? "email" : validationError.field;
    formElementRef.current?.querySelector<HTMLInputElement>(`[name="${field}"]`)?.focus();
  }, [validationError]);

  useEffect(() => {
    if (retryAfterSeconds <= 0) return;
    const timer = window.setTimeout(() => {
      setRetryAfterSeconds(Math.max(0, Math.ceil((retryUntilRef.current - Date.now()) / 1000)));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [retryAfterSeconds]);

  const formRef = useCallback((form: HTMLFormElement | null) => {
    formElementRef.current = form;
    mountedRef.current = Boolean(form);
    return () => {
      formElementRef.current = null;
      mountedRef.current = false;
    };
  }, []);

  const clearFieldError = (field: InputField) => {
    setValidationError((current) => {
      const correctsContact = current?.field === "contact" && (field === "email" || field === "phone");
      return current?.field === field || correctsContact ? null : current;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current || Date.now() < retryUntilRef.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    returnFocusRef.current = submitter instanceof HTMLElement
      ? submitter
      : form.querySelector<HTMLElement>('button[type="submit"]');
    submittingRef.current = true;
    setIsSubmitting(true);
    setValidationError(null);
    setResult(null);
    const nextResult = await submitWaitlist({
      name: String(fields.get("name") ?? ""),
      email: String(fields.get("email") ?? ""),
      phone: String(fields.get("phone") ?? ""),
      consent: fields.get("consent") === "on",
      website: String(fields.get("website") ?? ""),
    });
    submittingRef.current = false;
    if (!mountedRef.current) return;
    setIsSubmitting(false);
    if (nextResult.status === "invalid") {
      setValidationError(nextResult);
      return;
    }
    setResult(nextResult);
    if (nextResult.status === "rate-limited") {
      const seconds = nextResult.retryAfterSeconds ?? 60;
      retryUntilRef.current = Date.now() + seconds * 1000;
      setRetryAfterSeconds(seconds);
    }
    if (nextResult.status === "success") {
      form.reset();
      setName("");
      setEmail("");
      setPhone("");
      setConsent(false);
    }
  };

  const dismissResult = useCallback(() => setResult(null), []);
  const fieldErrors: Partial<Record<InputField, string>> = validationError
    ? { [validationError.field === "contact" ? "email" : validationError.field]: validationError.message }
    : {};

  return {
    name, setName: (value: string) => { setName(value); clearFieldError("name"); },
    email, setEmail: (value: string) => { setEmail(value); clearFieldError("email"); },
    phone, setPhone: (value: string) => { setPhone(value); clearFieldError("phone"); },
    consent, setConsent: (value: boolean) => { setConsent(value); clearFieldError("consent"); },
    isReady, isSubmitting, retryAfterSeconds, result, fieldErrors,
    formRef, handleSubmit, dismissResult, returnFocusRef,
  };
}
