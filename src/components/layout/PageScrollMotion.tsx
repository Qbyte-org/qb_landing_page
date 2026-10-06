"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

/** Shared visual motion only: SmoothScroll remains the single scrolling owner. */
export default function PageScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-route-content]");
    if (!root) return;

    let media: ReturnType<typeof gsap.matchMedia> | undefined;
    let frame = 0;
    let disposed = false;
    let initialized = false;

    const initialize = () => {
      if (disposed || initialized) return;
      const main = root.querySelector<HTMLElement>("main");
      const shell = main?.closest<HTMLElement>("[data-site-intro]");
      // Route streaming and the opening sequence must finish before measuring.
      if (!main || root.inert || (shell && shell.dataset.siteIntro !== "ready")) return;

      initialized = true;
      observer.disconnect();
      media = gsap.matchMedia();
      media.add({
        reduced: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 1024px)",
        mobile: "(max-width: 1023px)",
      }, (context) => {
        if (context.conditions?.reduced) return;
        const distance = context.conditions?.desktop ? 48 : 24;
        // Creating new triggers during GSAP's media-query refresh clears its
        // saved scroll position. Build after that pass, inside the same context
        // so preference/route cleanup still reverts every animation.
        const mediaFrame = requestAnimationFrame(() => {
          context.add(() => {
            main.querySelectorAll<HTMLElement>("[data-scroll-hero]").forEach((hero) => {
              hero.querySelectorAll<HTMLElement>("[data-scroll-hero-copy]").forEach((copy) => {
                gsap.fromTo(copy, { y: 0, opacity: 1 }, {
                  y: -distance,
                  opacity: 0.4,
                  ease: "none",
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.65,
                    invalidateOnRefresh: true,
                  },
                });
              });
              hero.querySelectorAll<HTMLElement>("[data-scroll-hero-media]").forEach((artwork) => {
                if (artwork.dataset.scrollHeroMedia === "ride") {
                  const travel = () => Math.min(context.conditions?.desktop ? 18 : 12, artwork.offsetWidth * 0.035);
                  const stage = artwork.closest<HTMLElement>("[data-rider-bike-stage]") ?? artwork;
                  // Follow the bike's forward direction and reverse with the scroll.
                  // Keep the whole vehicle inside its lane as it approaches the viewer.
                  gsap.fromTo(artwork, {
                    x: () => -travel(),
                    y: 0,
                    scale: 0.94,
                    transformOrigin: "left bottom",
                  }, {
                    x: travel,
                    y: 6,
                    scale: 0.98,
                    ease: "none",
                    immediateRender: true,
                    scrollTrigger: {
                      trigger: hero,
                      start: "top top",
                      end: () => `+=${Math.max(1, stage.getBoundingClientRect().bottom - hero.getBoundingClientRect().top)}`,
                      scrub: 0.65,
                      invalidateOnRefresh: true,
                    },
                  });
                  return;
                }
                gsap.fromTo(artwork, { y: 0 }, {
                  y: distance * 1.35,
                  ease: "none",
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                  },
                });
              });
            });

            // Move only the decorative drawing, never a section or its sticky children.
            main.querySelectorAll<SVGElement>("[data-section-wave] > svg").forEach((wave) => {
              gsap.fromTo(wave, { xPercent: -1.5, scaleX: 1.06 }, {
                xPercent: 1.5,
                scaleX: 1.06,
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                  trigger: wave.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              });
            });

            // Existing Reveal and custom hero animations keep ownership of their nodes.
            // Unwrapped headings (including the account pages) get the same soft approach.
            main.querySelectorAll<HTMLElement>("[data-section-motion-header], h2").forEach((heading) => {
              if (heading.closest("[data-scroll-reveal], [data-scroll-hero], [data-scroll-motion='off']")) return;
              if (heading.matches("h2") && heading.closest("[data-section-motion-header]")) return;
              if (heading.style.transform || getComputedStyle(heading).position === "sticky") return;

              gsap.fromTo(heading, { y: distance * 0.5 }, {
                y: 0,
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                  trigger: heading,
                  start: "top 96%",
                  end: "top 62%",
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
              });
            });
          });
        });
        return () => cancelAnimationFrame(mediaFrame);
      }, root);
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(initialize);
    };
    const observer = new MutationObserver(schedule);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-site-intro", "inert"],
    });
    schedule();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      media?.revert();
    };
  }, [pathname]);

  return null;
}
