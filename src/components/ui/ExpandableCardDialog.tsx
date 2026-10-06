"use client";

import { uiCopy } from "@/content/ui";

import { useEffect, useRef, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { lockWaitlistScroll as lockPageScroll } from "@/components/waitlist/waitlistScrollLock";

// The shell and photo share a single, non-bouncing expansion. Details reveal
// near its end, instead of flying across the changing card layout separately.
export const expandableCardTransition = { duration: .44, ease: [.22, 1, .36, 1] as const };

type Props = {
  id: string;
  layoutId: string;
  labelledBy: string;
  onClose: () => void;
  onAfterClose?: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  children: ReactNode;
};

/** Shared-layout expansion adapted from Aceternity's expandable card pattern. */
export default function ExpandableCardDialog({ id, layoutId, labelledBy, onClose, onAfterClose, returnFocusRef, children }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const returnTarget = returnFocusRef.current;
    // This lock also pauses Lenis and restores any pre-existing scroll lock.
    const releaseScroll = lockPageScroll({ preserveLayout: true });
    const background = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== overlay)
      .map(element => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      background.forEach(({ element, inert }) => { element.inert = inert; });
      releaseScroll();
      if (returnTarget?.isConnected) returnTarget.focus({ preventScroll: true });
      onAfterClose?.();
    };
  }, [onAfterClose, returnFocusRef]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onClose();
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), [tabindex="0"]'))
      .filter(element => element.getClientRects().length > 0 && element.getAttribute("aria-hidden") !== "true");
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return createPortal(
    <motion.div ref={overlayRef} layoutRoot data-expandable-card-overlay className="fixed inset-0 z-[200] grid place-items-center p-3 sm:p-6" onKeyDown={handleKeyDown}>
      <motion.div
        aria-hidden="true"
        data-expandable-card-backdrop
        className="absolute inset-0 bg-dark-ink/70 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : .25 }}
        onClick={onClose}
      />
      <motion.div
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        data-expanded-card
        data-lenis-prevent
        layoutId={reducedMotion ? undefined : layoutId}
        layoutScroll
        style={{ borderRadius: 28 }}
        transition={{ layout: reducedMotion ? { duration: 0 } : expandableCardTransition }}
        className="scrollbar-none relative max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl overflow-x-hidden overflow-y-auto overscroll-contain bg-paper text-ink shadow-2xl shadow-dark-ink/30 sm:max-h-[calc(100dvh-3rem)]"
      >
        <motion.div
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : .1, delay: 0 } }}
          transition={{ delay: reducedMotion ? 0 : .3, duration: reducedMotion ? 0 : .16 }}
          className="absolute right-3 top-3 z-30 sm:right-4 sm:top-4"
        >
          <button ref={closeRef} type="button" aria-label={uiCopy.closeDialog} onClick={onClose} className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink/15 bg-paper text-ink shadow-sm transition-colors hover:bg-dark-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            <X aria-hidden="true" className="size-5" />
          </button>
        </motion.div>
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
