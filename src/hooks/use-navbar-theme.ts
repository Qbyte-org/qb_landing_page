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

        const animate = (
          selector: string,
          vars: gsap.TweenVars,
        ) => {
          const targets = nav.querySelectorAll(selector);
          if (!targets.length) return;
          gsap.to(targets, vars);
        };

        gsap.to(document.documentElement, {
          "--background": theme.pageBackground,
          "--foreground": theme.pageForeground,
          duration,
          ease: animation.ease.smooth,
          overwrite: "auto",
        });

        gsap.to(nav, {
          "--nav-surface": theme.surface,
          "--nav-foreground": theme.foreground,
          "--nav-muted": theme.muted,
          "--nav-icon": theme.icon,
          "--nav-chip": theme.chip,
          "--nav-chip-text": theme.chipText,
          "--nav-action": theme.action,
          "--nav-action-text": theme.actionText,
          "--nav-action-fill": theme.surface === "#fffaf5" ? "#ff6b00" : "#fffaf5",
          "--nav-action-hover-text": theme.surface === "#fffaf5" ? "#ffffff" : "#2a211d",
          "--magnetic-bg": theme.chip,
          "--magnetic-border": theme.chip,
          "--magnetic-text": theme.chipText,
          "--magnetic-fill": "#ff6b00",
          "--magnetic-hover-text": "#ffffff",
          duration,
          ease: animation.ease.smooth,
          overwrite: "auto",
        } as gsap.TweenVars);

        animate("[data-nav-surface]", {
          backgroundColor: theme.surface,
          color: theme.foreground,
          ...tween,
        });
        animate("[data-nav-text]", {
          color: theme.foreground,
          ...tween,
        });
        animate("[data-nav-muted]", {
          color: theme.muted,
          ...tween,
        });
        animate("[data-nav-icon]", {
          color: theme.icon,
          ...tween,
        });
        animate("[data-nav-underline]", {
          backgroundColor: theme.underline,
          ...tween,
        });
        animate("[data-nav-chip]", {
          "--magnetic-bg": theme.chip,
          "--magnetic-border": theme.chip,
          "--magnetic-text": theme.chipText,
          "--magnetic-fill": "#ff6b00",
          "--magnetic-hover-text": "#ffffff",
          backgroundColor: theme.chip,
          color: theme.chipText,
          ...tween,
        } as gsap.TweenVars);
        animate("[data-nav-action]", {
          "--magnetic-bg": theme.action,
          "--magnetic-text": theme.actionText,
          "--magnetic-fill": theme.surface === "#fffaf5" ? "#ff6b00" : "#fffaf5",
          "--magnetic-hover-text": theme.surface === "#fffaf5" ? "#ffffff" : "#2a211d",
          backgroundColor: theme.action,
          color: theme.actionText,
          ...tween,
        });
        animate("[data-logo-color]", {
          autoAlpha: theme.logo === "color" ? 1 : 0,
          ...tween,
        });
        animate("[data-logo-light]", {
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
