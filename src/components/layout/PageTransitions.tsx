"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import PageScrollMotion from "./PageScrollMotion";
import FoodImage from "../ui/FoodImage";

const NavigationContext = createContext(false);
export const useHasNavigated = () => useContext(NavigationContext);

/** A brief edition of the opening photo/grid story for internal navigation. */
export default function PageTransitions({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const pendingRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    const stage = overlay.querySelector("[data-transition-stage]");
    const photo = overlay.querySelector("[data-transition-photo]");
    const reset = () => {
      animationRef.current?.kill();
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(stage, { "--tile-left": "46%", "--tile-right": "54%", "--tile-top": "44%", "--tile-bottom": "56%" });
      gsap.set(photo, { opacity: 0 });
      content.inert = false;
      pendingRef.current = null;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.composedPath().find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
      if (!link || link.hasAttribute("download") || link.hasAttribute("data-no-transition") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      setHasNavigated(true);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      if (pendingRef.current) return;
      pendingRef.current = url.pathname;
      router.prefetch(`${url.pathname}${url.search}`);
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: "auto" });
      gsap.set(stage, { "--tile-left": "46%", "--tile-right": "54%", "--tile-top": "44%", "--tile-bottom": "56%" });
      gsap.set(photo, { opacity: 0 });
      // Let the clicked menu item finish closing before making the old page inert.
      queueMicrotask(() => { content.inert = true; });
      animationRef.current = gsap.timeline({
        onComplete: () => {
          router.push(`${url.pathname}${url.search}${url.hash}`);
          // A failed or slow navigation must never trap the page behind an overlay.
          timeoutRef.current = setTimeout(reset, 5000);
        },
      })
        .to(overlay, { autoAlpha: 1, duration: 0.16 })
        .to(stage, { "--tile-left": "22%", "--tile-right": "78%", "--tile-top": "25%", "--tile-bottom": "75%", duration: 0.52, ease: "power3.inOut" }, 0.08)
        .to(photo, { opacity: 1, duration: 0.32 }, 0.24);
    };
    const historyChange = () => { setHasNavigated(true); reset(); };
    document.addEventListener("click", navigate, true);
    window.addEventListener("popstate", historyChange);
    window.addEventListener("pageshow", reset);
    return () => {
      document.removeEventListener("click", navigate, true);
      window.removeEventListener("popstate", historyChange);
      window.removeEventListener("pageshow", reset);
      reset();
    };
  }, [router]);

  useGSAP(() => {
    if (!pendingRef.current || pendingRef.current !== pathname) return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    animationRef.current?.kill();
    animationRef.current = gsap.timeline({
      delay: 0.08,
      onComplete: () => {
        gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
        if (contentRef.current) contentRef.current.inert = false;
        pendingRef.current = null;
      },
    })
      .to(overlay.querySelector("[data-transition-photo]"), { opacity: 0, duration: 0.25 })
      .to(overlay.querySelector("[data-transition-stage]"), { "--tile-left": "46%", "--tile-right": "54%", "--tile-top": "44%", "--tile-bottom": "56%", duration: 0.5, ease: "power3.inOut" }, 0)
      .to(overlay, { autoAlpha: 0, duration: 0.18 }, 0.5);
  }, { dependencies: [pathname], scope: overlayRef });

  return (
    <NavigationContext.Provider value={hasNavigated}>
      <div ref={contentRef} className="contents" data-route-content>{children}</div>
      <PageScrollMotion />
      <div ref={overlayRef} data-page-transition aria-hidden="true" className="pointer-events-none invisible fixed inset-0 z-[10000] overflow-hidden bg-paper p-5 text-ink sm:p-10">
        <span className="absolute left-5 top-5 font-display text-lg font-semibold sm:left-10 sm:top-8">QuickBite.</span>
        <span className="absolute bottom-5 right-5 text-xs text-cocoa sm:bottom-8 sm:right-10">A little local goodness.</span>
        <div data-transition-stage className="relative h-full w-full [--tile-bottom:56%] [--tile-left:46%] [--tile-right:54%] [--tile-top:44%]">
          <div className="absolute inset-y-0 left-[var(--tile-left)] w-px bg-brand/40" />
          <div className="absolute inset-y-0 left-[var(--tile-right)] w-px bg-brand/40" />
          <div className="absolute inset-x-0 top-[var(--tile-top)] h-px bg-brand/40" />
          <div className="absolute inset-x-0 top-[var(--tile-bottom)] h-px bg-brand/40" />
          <div className="absolute left-[var(--tile-left)] top-[var(--tile-top)] flex h-[calc(var(--tile-bottom)-var(--tile-top))] w-[calc(var(--tile-right)-var(--tile-left))] items-center justify-center overflow-hidden bg-brand">
            <Image src="/logo-mark-light.svg" alt="" width={80} height={80} className="size-[clamp(1.5rem,7vw,5rem)]" />
            <div data-transition-photo className="absolute inset-0 opacity-0">
              <FoodImage src="/images/food/pinterest/jollof-chicken-plantain.webp" alt="" fill priority sizes="60vw" className="object-cover" />
            </div>
          </div>
          <span className="absolute left-[var(--tile-left)] top-[var(--tile-top)] -translate-y-full pb-1 font-display text-[clamp(1.5rem,5vw,4.5rem)] font-bold leading-none tracking-tight text-brand">GOOD</span>
          <span className="absolute right-[calc(100%-var(--tile-right))] top-[var(--tile-bottom)] pt-1 font-display text-[clamp(1.5rem,5vw,4.5rem)] font-bold leading-none tracking-tight text-brand">FOOD.</span>
        </div>
      </div>
    </NavigationContext.Provider>
  );
}
