"use client";

import type { RefObject } from "react";
import { usePathname } from "next/navigation";
import { navThemes, type NavTheme } from "@/config/navigation";
import { animation } from "@/lib/animation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

function isNavTheme(value: string | undefined): value is NavTheme {
  return Boolean(value && value in navThemes);
}

export function useNavbarTheme(navRef: RefObject<HTMLElement | null>) {
  const pathname = usePathname();

  useGSAP(
    (_context, contextSafe) => {
      const nav = navRef.current;
      if (!nav) return;

      const page = nav.closest<HTMLElement>("[data-site-intro]") ?? document.body;
      let sections: HTMLElement[] = [];
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const colorCanvas = document.createElement("canvas");
      colorCanvas.width = colorCanvas.height = 1;
      const colorContext = colorCanvas.getContext("2d", { willReadFrequently: true });
      const resolvedColors = new Map<string, string>();
      let rootStyles = getComputedStyle(document.documentElement);

      // GSAP custom-property tweens need concrete colors. Canvas also resolves
      // derived CSS colors such as color-mix() into channels GSAP can interpolate.
      const resolveColor = (value: string) => {
        const resolved = value.replace(/var\((--[\w-]+)\)/g, (_match, token: string) =>
          rootStyles.getPropertyValue(token).trim(),
        );
        const cached = resolvedColors.get(resolved);
        if (cached) return cached;
        if (!colorContext) return resolved;

        colorContext.clearRect(0, 0, 1, 1);
        colorContext.fillStyle = resolved;
        colorContext.fillRect(0, 0, 1, 1);
        const [red, green, blue, alpha] = colorContext.getImageData(0, 0, 1, 1).data;
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
        resolvedColors.set(resolved, color);
        return color;
      };
      let activeTheme: NavTheme | undefined;

      const updateTheme = (name: NavTheme, immediate = false) => {
        if (name === activeTheme && !immediate) return;
        activeTheme = name;
        nav.dataset.activeNavTheme = name;
        rootStyles = getComputedStyle(document.documentElement);
        const theme = navThemes[name];
        const duration = immediate || reducedMotion ? 0 : animation.duration.base;
        const tween = {
          duration,
          ease: animation.ease.smooth,
          overwrite: "auto" as const,
        };
        const colorTweens: Array<() => void> = [];

        const animateColors = (
          target: HTMLElement | string,
          colors: Record<string, string>,
        ) => {
          const targets = typeof target === "string"
            ? nav.querySelectorAll<HTMLElement>(target)
            : [target];
          // GSAP mutates vars objects while installing plugins. Snapshot the
          // string values before creating any tween so a zero-duration tween
          // cannot corrupt the values used by the following target.
          const colorEntries = Object.entries(colors).map(([property, value]) =>
            [property, String(value)] as const,
          );
          const resolved = Object.fromEntries(
            colorEntries.map(([property, value]) => [property, resolveColor(value)]),
          );

          targets.forEach((element) => {
            const currentStyles = getComputedStyle(element);
            const start = Object.fromEntries(colorEntries.map(([property, value]) => {
              const cssProperty = property.startsWith("--")
                ? property
                : property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
              return [property, resolveColor(currentStyles.getPropertyValue(cssProperty).trim() || value)];
            }));
            // Finish all style reads before starting any tween. Alternating
            // reads and writes across the controls forces repeated layouts.
            colorTweens.push(() => {
              gsap.fromTo(element, start, {
                ...resolved,
                ...tween,
                // Keep settled colors linked to the global palette.
                onComplete: () => { gsap.set(element, { ...colors }); },
              });
            });
          });
        };

        // Interpolating inherited root variables invalidates the entire page
        // every frame. Only the visible navigation needs the color transition.
        gsap.set(document.documentElement, {
          "--background": theme.pageBackground,
          "--foreground": theme.pageForeground,
        });

        animateColors(nav, {
          "--nav-surface": theme.surface,
          "--nav-foreground": theme.foreground,
          "--nav-muted": theme.muted,
          "--nav-icon": theme.icon,
          "--nav-chip": theme.chip,
          "--nav-chip-text": theme.chipText,
          "--nav-action": theme.action,
          "--nav-action-text": theme.actionText,
          "--nav-action-fill": "var(--color-cream-200)",
          "--nav-action-hover-text": "var(--color-ink)",
          "--magnetic-bg": theme.chip,
          "--magnetic-border": theme.chip,
          "--magnetic-text": theme.chipText,
          "--magnetic-fill": "var(--color-cream-200)",
          "--magnetic-hover-text": "var(--color-ink)",
          // The menu control is transparent, so its reveal needs contrast
          // against the active navigation surface: ink on paper, cream on ink.
          "--nav-menu-fill": theme.surfaceTone === "light" ? "var(--color-dark-ink)" : "var(--color-cream-200)",
          "--nav-menu-hover-text": theme.surfaceTone === "light" ? "var(--color-paper)" : "var(--color-ink)",
        });

        animateColors("[data-nav-surface]", {
          backgroundColor: theme.surface,
          color: theme.foreground,
        });
        animateColors("[data-nav-text]", {
          color: theme.foreground,
        });
        animateColors("[data-nav-muted]", {
          color: theme.muted,
        });
        animateColors("[data-nav-icon]", {
          color: theme.icon,
        });
        animateColors("[data-nav-underline]", {
          backgroundColor: theme.underline,
        });
        animateColors("[data-nav-chip]", {
          "--magnetic-bg": theme.chip,
          "--magnetic-border": theme.chip,
          "--magnetic-text": theme.chipText,
          "--magnetic-fill": "var(--color-dark-ink)",
          "--magnetic-hover-text": "var(--color-paper)",
          backgroundColor: theme.chip,
          color: theme.chipText,
        });
        animateColors("[data-nav-action]", {
          "--magnetic-bg": theme.action,
          "--magnetic-text": theme.actionText,
          "--magnetic-fill": "var(--color-cream-200)",
          "--magnetic-hover-text": "var(--color-ink)",
          backgroundColor: theme.action,
          color: theme.actionText,
        });
        colorTweens.forEach(start => start());
        const colorLogos = nav.querySelectorAll("[data-logo-color]");
        const lightLogos = nav.querySelectorAll("[data-logo-light]");
        if (colorLogos.length) gsap.to(colorLogos, {
          autoAlpha: theme.logo === "color" ? 1 : 0,
          ...tween,
        });
        if (lightLogos.length) gsap.to(lightLogos, {
          autoAlpha: theme.logo === "light" ? 1 : 0,
          ...tween,
        });
      };
      const applyTheme = contextSafe ? contextSafe(updateTheme) : updateTheme;

      let frame = 0;
      let layoutDirty = true;
      let maxScroll = 0;
      let navTop = 0;
      let halfBarHeight = 0;
      let bounds: Array<{ element: HTMLElement; top: number; bottom: number }> = [];
      const sampleTheme = (immediate = false) => {
        const scroll = window.scrollY;
        if (layoutDirty) {
          layoutDirty = false;
          maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
          const closedBar = nav.querySelector<HTMLElement>("[data-menu-open] [data-intro-nav-content]");
          navTop = Number.parseFloat(getComputedStyle(nav).top) || 0;
          halfBarHeight = Math.min((closedBar ?? nav).offsetHeight, 80) / 2;
          bounds = sections.map(element => {
            const rect = element.getBoundingClientRect();
            return { element, top: rect.top + scroll, bottom: rect.bottom + scroll };
          }).reverse();
        }
        // GSAP owns the navbar's vertical transform; read its cached value
        // instead of asking the browser to lay out every section during scroll.
        const navOffset = Number(gsap.getProperty(nav, "y")) || 0;
        const navLine = Math.max(0, Math.min(window.innerHeight - 1, navTop + navOffset + halfBarHeight)) + scroll;
        const atBottom = maxScroll > 0 && scroll >= maxScroll - 2;
        // A nested section (for example, a dark CTA inside a light document)
        // owns its theme instead of inheriting the outer document's theme.
        const section = bounds.find(({ element, top, bottom }) => {
          if (!element.isConnected || !isNavTheme(element.dataset.navTheme)) return false;
          return atBottom
            ? top < scroll + window.innerHeight && bottom > scroll
            : top <= navLine && bottom > navLine;
        })?.element;
        const name = section?.dataset.navTheme;
        applyTheme(isNavTheme(name) ? name : activeTheme ?? "hero", immediate);
      };
      const scheduleSample = () => {
        if (frame) return;
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          sampleTheme();
        });
      };
      const scheduleMeasure = () => {
        layoutDirty = true;
        scheduleSample();
      };

      // Resize and refresh keep cached bounds current when lazy content,
      // accordions, fonts, or streamed sections change the page's geometry.
      window.addEventListener("scroll", scheduleSample, { passive: true });
      window.addEventListener("resize", scheduleMeasure);
      window.addEventListener("pageshow", scheduleMeasure);
      ScrollTrigger.addEventListener("refresh", scheduleMeasure);
      const resizeObserver = new ResizeObserver(scheduleMeasure);
      const collectSections = () => {
        resizeObserver.disconnect();
        sections = Array.from(page.querySelectorAll<HTMLElement>("[data-nav-theme]"));
        sections.forEach((section) => resizeObserver.observe(section));
        resizeObserver.observe(page);
        layoutDirty = true;
      };
      const containsTheme = (node: Node) => node instanceof Element && (
        node.matches("[data-nav-theme]") || Boolean(node.querySelector("[data-nav-theme]"))
      );
      const mutationObserver = new MutationObserver((records) => {
        const themesChanged = records.some(record => record.type === "attributes" ||
          [...record.addedNodes, ...record.removedNodes].some(containsTheme));
        if (!themesChanged) return;
        collectSections();
        scheduleSample();
      });
      collectSections();
      sampleTheme(true);
      mutationObserver.observe(page, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-nav-theme"],
      });
      scheduleSample();

      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", scheduleSample);
        window.removeEventListener("resize", scheduleMeasure);
        window.removeEventListener("pageshow", scheduleMeasure);
        ScrollTrigger.removeEventListener("refresh", scheduleMeasure);
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    },
    { scope: navRef, dependencies: [pathname], revertOnUpdate: true },
  );
}
