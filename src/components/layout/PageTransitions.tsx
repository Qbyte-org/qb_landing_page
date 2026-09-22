"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";

const NavigationContext = createContext(false);
export const useHasNavigated = () => useContext(NavigationContext);

/** Keep route changes inside one short, branded curtain; native links stay native. */
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

    const panels = overlay.querySelectorAll("[data-transition-panel]");
    const reset = () => {
      animationRef.current?.kill();
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(panels, { yPercent: 100 });
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
      gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(panels, { yPercent: 100 });
      // Let the clicked menu item finish closing before making the old page inert.
      queueMicrotask(() => { content.inert = true; });
      animationRef.current = gsap.timeline().to(panels, {
        yPercent: 0,
        duration: 0.34,
        stagger: 0.045,
        ease: "power3.inOut",
        onComplete: () => {
          router.push(`${url.pathname}${url.search}${url.hash}`);
          // A failed or slow navigation must never trap the page behind an overlay.
          timeoutRef.current = setTimeout(reset, 5000);
        },
      });
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
    }).to(overlay.querySelectorAll("[data-transition-panel]"), {
      yPercent: -100,
      duration: 0.48,
      stagger: 0.045,
      ease: "power3.inOut",
    });
  }, { dependencies: [pathname], scope: overlayRef });

  return (
    <NavigationContext.Provider value={hasNavigated}>
      <div ref={contentRef} className="contents" data-route-content>{children}</div>
      <div ref={overlayRef} data-page-transition aria-hidden="true" className="pointer-events-none invisible fixed inset-0 z-[10000] grid grid-cols-3 overflow-hidden">
        {[0, 1, 2].map((panel) => (
          <div key={panel} data-transition-panel className="relative flex items-center justify-center border-r border-paper/20 bg-brand text-paper last:border-0">
            {panel === 1 ? <span className="font-display text-[clamp(1.1rem,4vw,4rem)] font-bold tracking-tight">QuickBite.</span> : null}
            <span className="absolute inset-x-0 top-[30%] h-px bg-paper/20" />
            <span className="absolute inset-x-0 bottom-[30%] h-px bg-paper/20" />
          </div>
        ))}
      </div>
    </NavigationContext.Provider>
  );
}
