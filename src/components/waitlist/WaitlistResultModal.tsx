"use client";

import { useId, useRef, type KeyboardEvent, type RefObject } from "react";
import { ArrowRight, Check, Clock3, Info, MapPin, X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { WaitlistResult } from "@/lib/waitlist";
import { waitlistCopy, waitlistResultMessages as messages, waitlistRetryMessage } from "@/content/waitlist";
import MagneticFillButton from "../ui/MagneticFillButton";
import LinkArrow from "../ui/LinkArrow";
import Logo from "../ui/Logo";
import { lockWaitlistScroll } from "./waitlistScrollLock";

export default function WaitlistResultModal({
  result,
  onClose,
  returnFocusRef,
}: {
  result: Exclude<WaitlistResult, { status: "invalid" }>;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const message = "code" in result && result.code === "VALIDATION_FAILED" ? messages.invalid : messages[result.status];
  const successful = result.status === "success";
  const needsHelp = result.status === "error" || result.status === "unavailable";
  const StatusIcon = successful ? Check : result.status === "rate-limited" ? Clock3 : Info;

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
      className="fixed inset-0 m-auto max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-[34rem] overflow-y-auto overscroll-contain rounded-[2rem] border border-paper/15 bg-dark-ink p-0 text-paper shadow-2xl backdrop:bg-dark-ink/75 backdrop:backdrop-blur-sm"
    >
      <div ref={contentRef}>
        <div className="relative isolate overflow-hidden px-6 pt-6 pb-11 sm:px-9 sm:pt-7 sm:pb-12">
          <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-24 -z-10 size-80 rounded-full border border-paper/7 before:absolute before:inset-8 before:rounded-full before:border before:border-paper/7 after:absolute after:inset-16 after:rounded-full after:border after:border-paper/7" />
          <div className="flex items-center justify-between gap-4">
            <Logo variant="light" width={145} height={28} />
            <MagneticFillButton
              type="button"
              ariaLabel={waitlistCopy.result.closeAriaLabel}
              onClick={onClose}
              variant="dark"
              className="size-11 shrink-0 rounded-full border! border-paper/20! bg-transparent! text-paper! focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
            >
              <X aria-hidden="true" className="size-4" />
            </MagneticFillButton>
          </div>
          <div className="mt-8 flex items-center gap-3 sm:mt-10">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-dark-ink">
              <StatusIcon aria-hidden="true" className="size-5 text-white" strokeWidth={2} />
            </span>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-paper/65 sm:text-xs">{waitlistCopy.result.eyebrow}</p>
          </div>
          <h2 id={titleId} className="mt-5 max-w-[12ch] font-display text-[2.05rem] font-semibold leading-[1.12] tracking-[-0.045em] sm:text-[2.65rem]">{message.title}</h2>
          <svg aria-hidden="true" viewBox="0 0 544 24" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 -bottom-px h-6 w-full fill-paper">
            <path d="M0 12C92 31 175 -4 272 9S444 30 544 9V24H0Z" />
          </svg>
        </div>
        <div className="bg-paper px-6 pt-4 pb-7 text-ink sm:px-9 sm:pt-5 sm:pb-8">
          <p id={descriptionId} className="wrap-anywhere text-base leading-relaxed text-cocoa">{result.message}</p>
          {result.status === "rate-limited" && result.retryAfterSeconds ? (
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-cream-200 px-4 py-3 text-sm leading-relaxed text-ink">
              <Clock3 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-dark" />
              {waitlistRetryMessage(result.retryAfterSeconds)}
            </p>
          ) : null}
          {"requestId" in result && result.requestId ? <p className="mt-4 wrap-anywhere text-xs leading-relaxed text-cocoa">{waitlistCopy.result.referenceLabel} {result.requestId}</p> : null}
          {successful ? (
            <>
              <div className="mt-6 [&>span]:w-full">
                <p className="mb-3 text-sm font-semibold leading-relaxed text-ink">{waitlistCopy.result.communityHeading}</p>
                <MagneticFillButton
                  href={waitlistCopy.result.communityHref}
                  external
                  rel="noopener noreferrer"
                  variant="brand"
                  className="min-h-13 w-full rounded-pill bg-brand! px-6 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                  contentClassName="flex h-full w-full items-center justify-between gap-4"
                >
                  <span className="text-sm font-semibold">{waitlistCopy.result.communityLabel}</span>
                  <ArrowRight aria-hidden="true" className="size-5 shrink-0" />
                </MagneticFillButton>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-dashed border-ink/15 pt-4">
                <p className="flex items-center gap-2 text-xs text-cocoa">
                  <MapPin aria-hidden="true" className="size-3.5 text-brand-dark" />
                  {waitlistCopy.location}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer rounded-sm py-2 text-xs font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  {message.action}
                </button>
              </div>
            </>
          ) : (
            <MagneticFillButton
              type="button"
              onClick={onClose}
              variant="brand"
              className="mt-7 min-h-13 w-full rounded-pill bg-brand! px-6 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              contentClassName="flex h-full w-full items-center justify-between gap-4"
            >
              <span className="text-sm font-semibold">{message.action}</span>
              <ArrowRight aria-hidden="true" className="size-5 shrink-0" />
            </MagneticFillButton>
          )}
          {needsHelp ? <LinkArrow href={waitlistCopy.emailHref} className="mt-6 w-full text-ink!">{waitlistCopy.result.contactLabel}</LinkArrow> : null}
        </div>
      </div>
    </dialog>
  );
}
