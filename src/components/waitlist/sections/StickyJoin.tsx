"use client";

import { useEffect, useState } from "react";
import { waitlistPage } from "@/content/waitlist";

/** Keeps the signup one tap away once both forms are off screen. */
export default function StickyJoin() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const forms = Array.from(document.querySelectorAll<HTMLElement>("[data-waitlist-form]"));
    if (!forms.length) return;
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? onScreen.add(entry.target) : onScreen.delete(entry.target)));
      // Hidden at the very top too, before the hero form has been seen.
      setVisible(onScreen.size === 0 && window.scrollY > window.innerHeight * 0.5);
    });
    forms.forEach((form) => observer.observe(form));
    return () => observer.disconnect();
  }, []);

  const goToForm = () => {
    const input = document.getElementById("hero-email");
    if (!input) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.quickBiteLenis && !reduced) {
      window.quickBiteLenis.scrollTo(0, { onComplete: () => input.focus({ preventScroll: true }) });
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      input.focus({ preventScroll: true });
    }
  };

  return (
    <div className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
      <button
        type="button"
        onClick={goToForm}
        tabIndex={visible ? 0 : -1}
        aria-hidden={visible ? undefined : true}
        className={`flex h-13 items-center gap-3 rounded-full bg-brand pr-6 pl-2 text-[1.0625rem] font-bold text-white ring-1 ring-dark-ink/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-ink ${visible ? "pointer-events-auto" : ""}`}
      >
        <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-dark-ink/15">
          <svg viewBox="0 0 269.08 174.82" className="w-5 fill-white"><path d="M229.76,160.65c-.42.26-.82.51-1.21.75-.19.12-.38.23-.57.35-12.2,7.49-47.3,21.99-120.88,5.51-33.61-7.53-55.31-11.4-69-13.38-2.37-.34-5.55-.76-5.55-.76l-12.59-35.14,146.02,4.14c10.97.31,19.890-8.78,19.37-19.74h0S0,97.43,0,97.43l11.15-28.84h132.21c10.88,0,19.7-8.82,19.7-19.7v-3.27H26.41l9.74-29.6S104.67,6.43,120.89,5.07c14.17-1.18,55.79-14.33,96.36,7.07,3.31,2.01,7.62,4.7,12.63,7.89.29.18.59.38.9.57,51.51,32.71,50.95,108.07-1.01,140.06Z" /></svg>
        </span>
        {waitlistPage.sticky}
      </button>
    </div>
  );
}
