"use client";

import { ArrowUp } from "lucide-react";
import { useRef, useState, type CSSProperties } from "react";
import type { NavTheme } from "@/config/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import MagneticFillButton from "./MagneticFillButton";

const backToTopThemes: Record<
  NavTheme,
  {
    background: string;
    foreground: string;
    fill: string;
    hoverForeground: string;
  }
> = {
  hero: {
    background: "#fff7ef",
    foreground: "#24180f",
    fill: "#f15f00",
    hoverForeground: "#ffffff",
  },
  light: {
    background: "#000000",
    foreground: "#ffffff",
    fill: "#f15f00",
    hoverForeground: "#ffffff",
  },
  dark: {
    background: "#f15f00",
    foreground: "#ffffff",
    fill: "#fff7ef",
    hoverForeground: "#24180f",
  },
  accent: {
    background: "#fff7ef",
    foreground: "#24180f",
    fill: "#000000",
    hoverForeground: "#ffffff",
  },
  neutral: {
    background: "#f15f00",
    foreground: "#ffffff",
    fill: "#000000",
    hoverForeground: "#ffffff",
  },
};

const defaultThemeVariables = {
  "--magnetic-bg": backToTopThemes.hero.background,
  "--magnetic-border": "transparent",
  "--magnetic-text": backToTopThemes.hero.foreground,
  "--magnetic-fill": backToTopThemes.hero.fill,
  "--magnetic-hover-text": backToTopThemes.hero.hoverForeground,
} as CSSProperties;

function isNavTheme(value: string | undefined): value is NavTheme {
  return Boolean(value && value in backToTopThemes);
}

export default function BackToTopButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(
    () => {
      const button = buttonRef.current;
      if (!button) return;

      gsap.set(button, {
        autoAlpha: 0,
        y: 18,
        scale: 0.94,
        pointerEvents: "none",
      });

      const trigger = ScrollTrigger.create({
        start: 420,
        end: 999999,
        onEnter: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: buttonRef },
  );

  useGSAP(
    () => {
      const button = buttonRef.current;
      if (!button) return;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
      );
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const applyTheme = (name: NavTheme, immediate = false) => {
        const theme = backToTopThemes[name];

        gsap.to(button, {
          "--magnetic-bg": theme.background,
          "--magnetic-text": theme.foreground,
          "--magnetic-fill": theme.fill,
          "--magnetic-hover-text": theme.hoverForeground,
          duration: immediate || reducedMotion ? 0 : 0.48,
          ease: "power3.out",
          overwrite: "auto",
        } as gsap.TweenVars);
      };

      const viewportLine = window.innerHeight * 0.72;
      const initialSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= viewportLine && rect.bottom > viewportLine;
      });
      const initialTheme = initialSection?.dataset.navTheme;
      applyTheme(isNavTheme(initialTheme) ? initialTheme : "hero", true);

      sections.forEach((section) => {
        const themeName = section.dataset.navTheme;
        if (!isNavTheme(themeName)) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top 72%",
          end: "bottom 72%",
          onEnter: () => applyTheme(themeName),
          onEnterBack: () => applyTheme(themeName),
        });
      });
    },
    { scope: buttonRef },
  );

  useGSAP(
    () => {
      const button = buttonRef.current;
      if (!button) return;

      gsap.to(button, {
        autoAlpha: isVisible ? 1 : 0,
        y: isVisible ? 0 : 18,
        scale: isVisible ? 1 : 0.94,
        pointerEvents: isVisible ? "auto" : "none",
        duration: 0.34,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    { scope: buttonRef, dependencies: [isVisible] },
  );

  const scrollToTop = () => {
    if (window.quickBiteLenis) {
      window.quickBiteLenis.scrollTo(0, {
        duration: 1.05,
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={buttonRef}
      style={defaultThemeVariables}
      className="fixed bottom-6 right-5 z-[90] h-12 w-12 sm:bottom-7 sm:right-7 sm:h-14 sm:w-14"
    >
      <MagneticFillButton
        type="button"
        ariaLabel="Back to top"
        onClick={scrollToTop}
        themeAware
        className="h-full w-full rounded-full border-0 p-0"
      >
        <ArrowUp className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
      </MagneticFillButton>
    </div>
  );
}
