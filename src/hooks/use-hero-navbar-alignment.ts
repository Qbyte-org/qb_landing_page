"use client";

import { useLayoutEffect, type RefObject } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

/** Opt-in hero rails affect horizontal placement only, never navbar themes.
 * Header transitions its padding between these measurements and its normal
 * centered rails; its grid and GSAP-managed vertical transforms stay stable.
 */
export function useHeroNavbarAlignment(navRef: RefObject<HTMLElement | null>) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const nav = navRef.current;
    const page = nav?.closest<HTMLElement>("[data-site-intro]");
    if (!nav || !page) return;

    let frame = 0;
    let rail: HTMLElement | null = null;
    let hero: HTMLElement | null = null;
    let lastPlacement = "";
    let layoutDirty = true;
    let placement: { left: number; right: number; top: number; bottom: number } | null = null;

    const reset = () => {
      if (!lastPlacement) return;
      delete nav.dataset.heroNavAligned;
      nav.style.removeProperty("--nav-hero-left");
      nav.style.removeProperty("--nav-hero-right");
      lastPlacement = "";
    };
    const placeHeader = () => {
      frame = 0;
      if (layoutDirty) {
        layoutDirty = false;
        placement = null;
        if (window.innerWidth >= 640 && rail?.isConnected && hero?.isConnected) {
          // These rails are unanimated layout wrappers. Measure them only when
          // layout changes, not on every scroll frame alongside parallax writes.
          const heroBounds = hero.getBoundingClientRect();
          const bounds = rail.getBoundingClientRect();
          const styles = getComputedStyle(rail);
          const pixels = (value: string) => Number.parseFloat(value) || 0;
          const viewportWidth = document.documentElement.clientWidth;
          const left = Math.max(0, bounds.left + pixels(styles.borderLeftWidth) + pixels(styles.paddingLeft));
          const right = Math.max(0, viewportWidth - bounds.right + pixels(styles.borderRightWidth) + pixels(styles.paddingRight));
          if (viewportWidth - left - right > 0) {
            placement = { left, right, top: heroBounds.top + window.scrollY, bottom: heroBounds.bottom + window.scrollY };
          }
        }
      }
      // The compact mobile navigation deliberately remains edge-to-edge.
      if (!placement || !rail?.isConnected || !hero?.isConnected) {
        reset();
        return;
      }

      if (placement.bottom <= window.scrollY || placement.top >= window.scrollY + window.innerHeight) {
        reset();
        return;
      }

      const { left, right } = placement;
      const nextPlacement = `${left.toFixed(2)}:${right.toFixed(2)}`;
      if (nextPlacement === lastPlacement) return;
      nav.style.setProperty("--nav-hero-left", `${left}px`);
      nav.style.setProperty("--nav-hero-right", `${right}px`);
      nav.dataset.heroNavAligned = "true";
      lastPlacement = nextPlacement;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(placeHeader);
    };
    const measure = () => {
      layoutDirty = true;
      schedule();
    };
    const resizeObserver = new ResizeObserver(measure);
    const collectRail = (immediate = false) => {
      resizeObserver.disconnect();
      rail = page.querySelector<HTMLElement>("[data-header-hero-rail]");
      hero = rail?.closest<HTMLElement>("[data-scroll-hero]") ?? null;
      layoutDirty = true;
      if (rail) resizeObserver.observe(rail);
      if (hero && hero !== rail) resizeObserver.observe(hero);
      if (immediate) placeHeader();
      else schedule();
    };
    const containsRail = (node: Node) => node instanceof Element && (
      node.matches("[data-header-hero-rail]") || Boolean(node.querySelector("[data-header-hero-rail]"))
    );
    const observer = new MutationObserver(records => {
      if (records.some(record => record.type === "attributes" ||
        [...record.addedNodes, ...record.removedNodes].some(containsRail))) collectRail();
    });

    collectRail(true);
    observer.observe(page, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-header-hero-rail"] });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    ScrollTrigger.addEventListener("refresh", measure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", measure);
      ScrollTrigger.removeEventListener("refresh", measure);
      reset();
    };
  }, [navRef, pathname]);
}
