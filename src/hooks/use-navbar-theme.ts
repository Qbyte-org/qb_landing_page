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
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
      );
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const applyTheme = (name: NavTheme, immediate = false) => {
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

        animate("[data-nav-surface]", {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          backdropFilter: "blur(18px)",
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
          backgroundColor: theme.chip,
          color: theme.chipText,
          borderColor: theme.border,
          ...tween,
        });
        animate("[data-nav-action]", {
          backgroundColor: theme.action,
          color: theme.actionText,
          borderColor: theme.action,
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

      const navLine = 76;
      const initialSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= navLine && rect.bottom > navLine;
      });
      const initialTheme = initialSection?.dataset.navTheme;
      applyTheme(isNavTheme(initialTheme) ? initialTheme : "light", true);

      sections.forEach((section) => {
        const themeName = section.dataset.navTheme;
        if (!isNavTheme(themeName)) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top 76px",
          end: "bottom 76px",
          onEnter: () => applyTheme(themeName),
          onEnterBack: () => applyTheme(themeName),
        });
      });
    },
    { scope: navRef },
  );
}
