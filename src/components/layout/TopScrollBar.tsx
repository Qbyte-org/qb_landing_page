"use client";

import { uiCopy } from "@/content/ui";

import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import { usePathname } from "next/navigation";

/** Page progress that also supports pointer seeking and keyboard scrolling. */
export default function TopScrollBar() {
  const pathname = usePathname();
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const maxScrollRef = useRef(0);
  const activePointer = useRef<number | null>(null);

  function isLocked() {
    const rail = railRef.current;
    return Boolean(
      rail?.closest("[inert]") ||
      document.querySelector('[data-site-intro]:not([data-site-intro="ready"])') ||
      document.body.style.overflow === "hidden" ||
      document.documentElement.style.overflow === "hidden" ||
      window.quickBiteLenis?.isStopped,
    );
  }

  useEffect(() => {
    const rail = railRef.current;
    const fill = fillRef.current;
    if (!rail || !fill) return;
    let frame = 0;
    let layoutDirty = true;
    let previousLocked: boolean | undefined;
    let previousPercent = -1;
    let previousRatio = -1;

    const update = () => {
      frame = 0;
      if (layoutDirty) {
        layoutDirty = false;
        maxScrollRef.current = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      }
      const locked = isLocked();
      if (locked !== previousLocked) {
        rail.setAttribute("aria-disabled", String(locked));
        rail.tabIndex = locked ? -1 : 0;
        previousLocked = locked;
      }
      // Fixed-body dialogs must not reset the displayed page position.
      if (locked) return;
      const max = maxScrollRef.current;
      if (rail.hidden !== (max <= 1)) rail.hidden = max <= 1;
      const ratio = max ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const percent = Math.round(ratio * 100);
      if (percent !== previousPercent) {
        rail.setAttribute("aria-valuenow", String(percent));
        rail.setAttribute("aria-valuetext", uiCopy.scrollValue(percent));
        previousPercent = percent;
      }
      if (ratio !== previousRatio) {
        fill.style.transform = `scaleX(${ratio})`;
        previousRatio = ratio;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => { layoutDirty = true; schedule(); };
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    resize.observe(document.documentElement);
    const changes = new MutationObserver(schedule);
    changes.observe(document.body, { attributes: true, attributeFilter: ["style", "inert"] });
    changes.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    const route = document.querySelector("[data-route-content]");
    if (route) changes.observe(route, { childList: true, subtree: true, attributes: true, attributeFilter: ["inert", "data-site-intro"] });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      changes.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", measure);
      activePointer.current = null;
    };
  }, [pathname]);

  function scrollTo(top: number) {
    if (isLocked()) return;
    const destination = Math.max(0, Math.min(maxScrollRef.current, top));
    const lenis = window.quickBiteLenis;
    if (lenis) lenis.scrollTo(destination, { immediate: true });
    else window.scrollTo({ top: destination, behavior: "instant" });
  }

  function movePointer(event: PointerEvent<HTMLDivElement>) {
    if (activePointer.current !== event.pointerId) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width > 0) scrollTo((event.clientX - bounds.left) / bounds.width * maxScrollRef.current);
  }

  function startPointer(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || activePointer.current !== null || isLocked()) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    activePointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    movePointer(event);
  }

  function stopPointer(event: PointerEvent<HTMLDivElement>) {
    if (activePointer.current !== event.pointerId) return;
    activePointer.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    const destinations: Record<string, number> = {
      ArrowLeft: window.scrollY - 80, ArrowUp: window.scrollY - 80,
      ArrowRight: window.scrollY + 80, ArrowDown: window.scrollY + 80,
      PageUp: window.scrollY - window.innerHeight * .9,
      PageDown: window.scrollY + window.innerHeight * .9,
      Home: 0, End: maxScrollRef.current,
    };
    if (!(event.key in destinations) || isLocked()) return;
    event.preventDefault();
    scrollTo(destinations[event.key]);
  }

  return (
    <div
      ref={railRef}
      data-page-scrollbar
      role="scrollbar"
      aria-label={uiCopy.scrollProgress}
      aria-controls="page-content"
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      tabIndex={0}
      hidden
      onPointerDown={startPointer}
      onPointerMove={movePointer}
      onPointerUp={stopPointer}
      onPointerCancel={stopPointer}
      onLostPointerCapture={stopPointer}
      onKeyDown={handleKey}
      className="page-scrollbar"
    >
      <span aria-hidden="true" className="page-scrollbar-track"><span ref={fillRef} className="page-scrollbar-fill" /></span>
    </div>
  );
}
