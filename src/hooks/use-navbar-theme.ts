"use client";

import type { RefObject } from "react";
import { navThemes, type NavTheme } from "@/config/navigation";
import { animation } from "@/lib/animation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

function isNavTheme(value: string | undefined): value is NavTheme {
  return Boolean(value && value in navThemes);
}

export function useNavbarTheme(navRef: RefObject<HTMLElement | null>) {
  useGSAP(
    (_context, contextSafe) => {
      const nav = navRef.current;
      if (!nav) return;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
      );
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const colorCanvas = document.createElement("canvas");
      colorCanvas.width = colorCanvas.height = 1;
      const colorContext = colorCanvas.getContext("2d", { willReadFrequently: true });
      const resolvedColors = new Map<string, string>();

      // GSAP custom-property tweens need concrete colors. Canvas also resolves
      // derived CSS colors such as color-mix() into channels GSAP can interpolate.
      const resolveColor = (value: string) => {
        const rootStyles = getComputedStyle(document.documentElement);
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
        const theme = navThemes[name];
        const duration = immediate || reducedMotion ? 0 : animation.duration.base;
        const tween = {
          duration,
          ease: animation.ease.smooth,
          overwrite: "auto" as const,
        };

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
            gsap.fromTo(element, start, {
              ...resolved,
              ...tween,
              // Restore references after interpolation, keeping the settled
              // navigation connected to changes in the global palette.
              onComplete: () => { gsap.set(element, { ...colors }); },
            });
          });
        };

        animateColors(document.documentElement, {
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
      const sampleTheme = (immediate = false) => {
        const closedBar = nav.querySelector<HTMLElement>("[data-menu-open] [data-intro-nav-content]");
        const barBounds = (closedBar ?? nav).getBoundingClientRect();
        const navLine = Math.max(0, Math.min(window.innerHeight - 1, barBounds.top + Math.min(barBounds.height, 80) / 2));
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const atBottom = maxScroll > 0 && window.scrollY >= maxScroll - 2;
        const candidates = atBottom ? [...sections].reverse() : sections;
        const section = candidates.find((candidate) => {
          if (!candidate.isConnected || !isNavTheme(candidate.dataset.navTheme)) return false;
          const bounds = candidate.getBoundingClientRect();
          return atBottom
            ? bounds.top < window.innerHeight && bounds.bottom > 0
            : bounds.top <= navLine && bounds.bottom > navLine;
        });
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

      // Read current geometry instead of caching section starts: lazy content
      // and short final sections can move without ever crossing a trigger line.
      sampleTheme(true);
      window.addEventListener("scroll", scheduleSample, { passive: true });
      window.addEventListener("resize", scheduleSample);
      ScrollTrigger.addEventListener("refresh", scheduleSample);
      const resizeObserver = new ResizeObserver(scheduleSample);
      sections.forEach((section) => resizeObserver.observe(section));
      scheduleSample();

      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", scheduleSample);
        window.removeEventListener("resize", scheduleSample);
        ScrollTrigger.removeEventListener("refresh", scheduleSample);
        resizeObserver.disconnect();
      };
    },
    { scope: navRef },
  );
}
