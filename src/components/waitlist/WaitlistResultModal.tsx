"use client";

import { useId, useRef, type KeyboardEvent, type RefObject } from "react";
import { Check, Info, Mail, X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { WaitlistResult } from "@/lib/waitlist";
import MagneticFillButton from "../ui/MagneticFillButton";
import LinkArrow from "../ui/LinkArrow";
import { lockWaitlistScroll } from "./waitlistScrollLock";

const messages = {
  success: { title: "You’re on the list!", description: "Your signup was accepted. We’ll send QuickBite launch updates to your inbox.", action: "Lovely, thank you" },
  duplicate: { title: "You’ve signed up already.", description: "A signup for this email has already been confirmed. Keep an eye on your inbox for QuickBite updates.", action: "Got it" },
  unavailable: { title: "We can’t take signups just yet.", description: "Please try again later. You can also contact our team and we’ll help you stay in the loop.", action: "Close" },
  error: { title: "We couldn’t confirm your signup.", description: "Please try again. If this keeps happening, our team is here to help.", action: "Try again" },
  "rate-limited": { title: "Give it a moment.", description: "Too many requests arrived at once. Please wait a little before trying again.", action: "Got it" },
};

export default function WaitlistResultModal({
  result,
  onClose,
  returnFocusRef,
}: {
  result: WaitlistResult;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const message = result.status === "invalid"
    ? {
      title: "Let’s check those details.",
      description: result.field === "email"
        ? "Enter a valid email address so we know where to send your QuickBite updates."
        : "Enter a phone number with 7–15 digits, or leave the optional phone field blank.",
      action: "Back to the form",
    }
    : result.status === "duplicate" && result.source === "browser"
      ? { ...messages.duplicate, description: "This browser already has a confirmed signup for this email. Keep an eye on your inbox for QuickBite updates." }
      : messages[result.status];
  const successful = result.status === "success";
  const needsHelp = result.status === "error" || result.status === "unavailable";

  useGSAP(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const fallbackFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const releaseScroll = lockWaitlistScroll();
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, duration: 0.28, ease: "power2.out", clearProps: "opacity,transform",
      });
    }
    return () => {
      dialog.close();
      releaseScroll();
      const target = returnFocusRef.current ?? fallbackFocus;
      if (target?.isConnected) target.focus({ preventScroll: true });
    };
  }, { scope: dialogRef });

  const trapFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const targets = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]')]
      .filter((element) => element.getClientRects().length > 0);
    const first = targets[0];
    const last = targets.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-modal="true"
      data-waitlist-result={result.status}
      data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={trapFocus}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl border border-ink/10 bg-paper p-0 text-ink backdrop:bg-ink/75 backdrop:backdrop-blur-sm"
    >
      <div ref={contentRef} className="relative p-6 sm:p-9">
        <div className="flex items-center justify-between gap-4">
          <p className="font-display text-lg font-bold tracking-[0.01em]">QuickBite<span className="text-brand">.</span></p>
          <MagneticFillButton
            type="button"
            ariaLabel="Close waitlist result"
            onClick={onClose}
            variant="white"
            customFillClass="bg-cream-200"
            customHoverTextColor="#2a211d"
            className="size-10 rounded-full border! border-ink/15! bg-transparent! text-ink!"
          >
            <X aria-hidden="true" className="size-4" />
          </MagneticFillButton>
        </div>
        <span className={`mt-8 grid size-14 place-items-center rounded-2xl ${successful ? "bg-brand text-white" : "bg-cream-200 text-ink"}`}>
          {successful ? <Check aria-hidden="true" className="size-7" /> : <Info aria-hidden="true" className="size-7" />}
        </span>
        <h2 id={titleId} className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[0.01em] sm:text-4xl">{message.title}</h2>
        <p id={descriptionId} className="mt-4 text-base leading-relaxed text-ink/75">{message.description}</p>
        {"email" in result ? (
          <p className="mt-5 flex items-start gap-3 rounded-xl bg-cream-200 px-4 py-3 text-sm">
            <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span className="min-w-0 break-all">{result.email}</span>
          </p>
        ) : null}
        <MagneticFillButton
          type="button"
          onClick={onClose}
          variant="dark"
          customFillClass="bg-cream-200"
          customHoverTextColor="#2a211d"
          className="mt-7 min-h-12 w-full rounded-pill bg-ink! px-5 py-3 text-paper!"
        >
          {message.action}
        </MagneticFillButton>
        {needsHelp ? <LinkArrow href="mailto:support@quickbite.ng" className="mt-6 w-full text-ink!">Contact our team</LinkArrow> : null}
      </div>
    </dialog>
  );
}
