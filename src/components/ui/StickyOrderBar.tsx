"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Mobile-only persistent CTA. Slides up after the user scrolls past the hero
// so the primary action is always one tap away — a strong conversion lever.
export default function StickyOrderBar() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={reduce ? false : { y: 100 }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: 100 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-4 py-3 shadow-[0_-6px_24px_-8px_rgb(26_26_46/0.15)] backdrop-blur lg:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 leading-tight">
              <p className="text-sm font-bold text-navy">Hungry right now?</p>
              <p className="text-xs text-muted">
                Free delivery on your first order
              </p>
            </div>
            <Link
              href="/restaurants"
              className="inline-flex h-12 items-center justify-center rounded-pill bg-brand-dark px-6 text-base font-semibold text-white transition-colors hover:bg-brand"
            >
              Order now
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
