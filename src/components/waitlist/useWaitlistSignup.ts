"use client";

import { useCallback, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { submitWaitlist, type WaitlistResult } from "@/lib/waitlist";

const subscribeToHydration = () => () => {};
const getClientReady = () => true;
const getServerReady = () => false;

export default function useWaitlistSignup(initialEmail = "") {
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<WaitlistResult | null>(null);
  // A native submit before hydration would navigate away instead of sending.
  // Enable the controls as soon as React attaches the shared form handler.
  const isReady = useSyncExternalStore(subscribeToHydration, getClientReady, getServerReady);
  const submittingRef = useRef(false);
  const mountedRef = useRef(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const formRef = useCallback((form: HTMLFormElement | null) => {
    mountedRef.current = Boolean(form);
    return () => { mountedRef.current = false; };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    returnFocusRef.current = submitter instanceof HTMLElement
      ? submitter
      : event.currentTarget.querySelector<HTMLElement>('button[type="submit"]');
    submittingRef.current = true;
    setIsSubmitting(true);
    const nextResult = await submitWaitlist({ email, phone });
    submittingRef.current = false;
    if (!mountedRef.current) return;
    setIsSubmitting(false);
    setResult(nextResult);
    if (nextResult.status === "success") {
      setEmail("");
      setPhone("");
    }
  };

  const dismissResult = useCallback(() => setResult(null), []);

  return {
    email, setEmail, phone, setPhone, isReady, isSubmitting, result,
    formRef, handleSubmit, dismissResult, returnFocusRef,
  };
}
