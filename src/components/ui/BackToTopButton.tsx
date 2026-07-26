"use client";

import { ArrowUp } from "lucide-react";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function BackToTopButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(
    () => {
      const button = buttonRef.current;
      if (!button) return;

      gsap.set(button, {
        autoAlpha: 0,
        y: 18,
        scale: 0.94,
        pointerEvents: "none",
      });

      const trigger = ScrollTrigger.create({
        start: 420,
        end: 999999,
        onEnter: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: buttonRef },
  );

  useGSAP(
    () => {
      const button = buttonRef.current;
      if (!button) return;

      gsap.to(button, {
        autoAlpha: isVisible ? 1 : 0,
        y: isVisible ? 0 : 18,
        scale: isVisible ? 1 : 0.94,
        pointerEvents: isVisible ? "auto" : "none",
        duration: 0.34,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    { scope: buttonRef, dependencies: [isVisible] },
  );

  const scrollToTop = () => {
    if (window.quickBiteLenis) {
      window.quickBiteLenis.scrollTo(0, {
        duration: 1.05,
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className="fixed bottom-6 right-5 z-[90] grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-[#fff7f0] text-[#2a211d] ring-1 ring-[#2a211d]/10 transition-colors duration-300 hover:bg-[#ff6b00] hover:text-white sm:bottom-7 sm:right-7 sm:h-14 sm:w-14"
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
    </button>
  );
}
