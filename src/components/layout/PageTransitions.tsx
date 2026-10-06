"use client";

import { brand } from "@/content/ui";
import { loaderCopy } from "@/content/loader";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "@/components/ui/SiteImage";
import { gsap, useGSAP } from "@/lib/gsap";
import PageScrollMotion from "./PageScrollMotion";
import TopScrollBar from "./TopScrollBar";
import FoodImage from "../ui/FoodImage";
import { lockWaitlistScroll } from "../waitlist/waitlistScrollLock";

const NavigationContext = createContext(false);
export const useHasNavigated = () => useContext(NavigationContext);
const RouteTransitionContext = createContext(false);
export const useRouteTransitionActive = () => useContext(RouteTransitionContext);

/** A short branded cover while internal navigation commits. */
export default function PageTransitions({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const pendingRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const routeReadyRef = useRef(false);
  const coverReadyRef = useRef(false);
  const finishRef = useRef<() => void>(() => {});
  const releaseScrollRef = useRef<(() => void) | null>(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [transitionActive, setTransitionActive] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    const stage = overlay.querySelector("[data-transition-stage]");
    const photo = overlay.querySelector("[data-transition-photo]");
    const reset = () => {
      animationRef.current?.kill();
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(stage, { clearProps: "transform,opacity" });
      gsap.set(photo, { opacity: 0 });
      gsap.set(content, { clearProps: "opacity" });
      overlay.dataset.transitionPhase = "idle";
      content.inert = false;
      pendingRef.current = null;
      routeReadyRef.current = false;
      coverReadyRef.current = false;
      releaseScrollRef.current?.();
      releaseScrollRef.current = null;
      setTransitionActive(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };

    const finishWhenReady = () => {
      if (!pendingRef.current || !routeReadyRef.current || !coverReadyRef.current || overlay.dataset.transitionPhase === "closing") return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      overlay.dataset.transitionPhase = "closing";
      animationRef.current = gsap.timeline({ onComplete: reset })
        .to(photo, { opacity: 0, duration: 0.12 })
        .to(stage, { scale: 1.015, opacity: 0, duration: 0.18, ease: "power2.in" }, 0);
      // Keep the cover opaque until the new page and its entrance are ready.
    };
    finishRef.current = finishWhenReady;

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
      routeReadyRef.current = false;
      coverReadyRef.current = false;
      releaseScrollRef.current = lockWaitlistScroll({ preserveLayout: true });
      setTransitionActive(true);
      overlay.dataset.transitionPhase = "opening";
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: "auto" });
      gsap.set(stage, { scale: 0.985, opacity: 1 });
      gsap.set(photo, { opacity: 0 });
      // Let the clicked menu item finish closing before making the old page inert.
      queueMicrotask(() => { content.inert = true; });
      animationRef.current = gsap.timeline({
        onComplete: () => {
          coverReadyRef.current = true;
          finishWhenReady();
        },
      })
        .to(overlay, { autoAlpha: 1, duration: 0.12 })
        .call(() => {
          gsap.set(content, { opacity: 0 });
          overlay.dataset.transitionPhase = "playing";
          router.push(`${url.pathname}${url.search}${url.hash}`);
          // A slow/failed route must not leave the current page trapped behind
          // a cover. Next can still complete its pending navigation afterward.
          timeoutRef.current = setTimeout(reset, 4000);
        }, [], 0.12)
        .to(stage, { scale: 1, duration: 0.24, ease: "power2.out" }, 0)
        .to(photo, { opacity: 1, duration: 0.16 }, 0.08);
    };
    const historyChange = () => { setHasNavigated(true); reset(); };
    document.addEventListener("click", navigate, true);
    window.addEventListener("popstate", historyChange);
    window.addEventListener("pageshow", reset);
    return () => {
      document.removeEventListener("click", navigate, true);
      window.removeEventListener("popstate", historyChange);
      window.removeEventListener("pageshow", reset);
      finishRef.current = () => {};
      reset();
    };
  }, [router]);

  useGSAP(() => {
    if (!pendingRef.current || pendingRef.current !== pathname) return;
    routeReadyRef.current = true;
    finishRef.current();
  }, { dependencies: [pathname], scope: overlayRef });

  return (
    <NavigationContext.Provider value={hasNavigated}>
      <RouteTransitionContext.Provider value={transitionActive}>
      <div ref={contentRef} id="page-content" className="flex min-h-full flex-1 flex-col" data-route-content><TopScrollBar />{children}</div>
      <PageScrollMotion />
      <div ref={overlayRef} data-page-transition data-transition-phase="idle" aria-hidden="true" className="pointer-events-none invisible fixed inset-0 z-[10000] overflow-hidden bg-paper p-5 text-ink sm:p-10">
        <span className="absolute left-5 top-5 font-display text-lg font-semibold sm:left-10 sm:top-8">{brand.name}.</span>
        <span className="absolute bottom-5 right-5 text-xs text-cocoa sm:bottom-8 sm:right-10">{loaderCopy.tagline}</span>
        <div data-transition-stage className="relative h-full w-full [--tile-bottom:75%] [--tile-left:22%] [--tile-right:78%] [--tile-top:25%]">
          <div className="absolute inset-y-0 left-[var(--tile-left)] w-px bg-brand/40" />
          <div className="absolute inset-y-0 left-[var(--tile-right)] w-px bg-brand/40" />
          <div className="absolute inset-x-0 top-[var(--tile-top)] h-px bg-brand/40" />
          <div className="absolute inset-x-0 top-[var(--tile-bottom)] h-px bg-brand/40" />
          <div className="absolute left-[var(--tile-left)] top-[var(--tile-top)] flex h-[calc(var(--tile-bottom)-var(--tile-top))] w-[calc(var(--tile-right)-var(--tile-left))] items-center justify-center overflow-hidden bg-brand">
            <Image src={brand.lightMark} alt="" width={80} height={80} className="size-[clamp(1.5rem,7vw,5rem)]" />
            <div data-transition-photo className="absolute inset-0 opacity-0">
              <FoodImage src={loaderCopy.transitionPhoto} alt="" fill priority sizes="60vw" className="object-cover" />
            </div>
          </div>
          <span className="absolute left-[var(--tile-left)] top-[var(--tile-top)] -translate-y-full pb-1 font-display text-[clamp(1.5rem,5vw,4.5rem)] font-bold leading-none tracking-tight text-brand">{loaderCopy.transitionHeadline[0]}</span>
          <span className="absolute right-[calc(100%-var(--tile-right))] top-[var(--tile-bottom)] pt-1 font-display text-[clamp(1.5rem,5vw,4.5rem)] font-bold leading-none tracking-tight text-brand">{loaderCopy.transitionHeadline[1]}</span>
        </div>
      </div>
      </RouteTransitionContext.Provider>
    </NavigationContext.Provider>
  );
}
