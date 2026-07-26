"use client";

import Link from "next/link";
import {
  useCallback,
  useRef,
  type MouseEventHandler,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export type LinkArrowVariant = "light" | "dark" | "accent";

export interface LinkArrowProps {
  href?: string;
  children: ReactNode;
  variant?: LinkArrowVariant;
  className?: string;
  textClassName?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  dataNavText?: boolean;
}

type LinkArrowRoot = HTMLAnchorElement | HTMLSpanElement;

const variantClasses: Record<LinkArrowVariant, string> = {
  light: "border-navy/20 text-navy",
  dark: "border-white/25 text-white",
  accent: "border-brand/30 text-brand-dark",
};

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function getRightEdgeShift(text: HTMLElement) {
  const root = text.closest<HTMLElement>("[data-link-arrow-root]");
  if (!root) return 18;

  const baseSpacing =
    getComputedStyle(root).getPropertyValue("--link-arrow-spacing").trim() ||
    "0.18em";
  const currentLetterSpacing = text.style.letterSpacing;
  text.style.letterSpacing = baseSpacing;

  const rootWidth = root.offsetWidth;
  const textWidth = text.offsetWidth;

  text.style.letterSpacing = currentLetterSpacing;

  return Math.max(0, rootWidth - textWidth - 18);
}

function getLinkSpacing(root: HTMLElement | null) {
  if (!root) {
    return { base: "0.18em", expanded: "0.48em" };
  }

  const styles = getComputedStyle(root);
  const base = styles.getPropertyValue("--link-arrow-spacing").trim() || "0.18em";
  const expanded =
    styles.getPropertyValue("--link-arrow-expanded-spacing").trim() ||
    (Number.parseFloat(base) === 0 ? "0.14em" : "0.48em");

  return { base, expanded };
}

export default function LinkArrow({
  href,
  children,
  variant = "light",
  className = "",
  textClassName = "",
  ariaLabel,
  onClick,
  dataNavText = false,
}: LinkArrowProps) {
  const rootRef = useRef<LinkArrowRoot>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRightRef = useRef<HTMLSpanElement>(null);
  const arrowLeftRef = useRef<HTMLSpanElement>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const labelText = typeof children === "string" ? children : null;
  const resolvedAriaLabel = ariaLabel ?? labelText ?? undefined;

  const stopActiveTimeline = useCallback(() => {
    activeTimelineRef.current?.kill();
    activeTimelineRef.current = null;
  }, []);

  useGSAP(() => stopActiveTimeline, { scope: rootRef });

  const handleMouseEnter = useCallback(() => {
    const text = textRef.current;
    const arrowRight = arrowRightRef.current;
    const arrowLeft = arrowLeftRef.current;
    const root = rootRef.current;

    if (!text || !arrowRight || !arrowLeft) return;

    const spacing = getLinkSpacing(root);
    const chars = gsap.utils.toArray<HTMLElement>(
      text.querySelectorAll("[data-link-char]"),
    );
    const targetX = getRightEdgeShift(text);

    stopActiveTimeline();
    gsap.killTweensOf([text, arrowRight, arrowLeft, ...chars]);
    gsap.set(chars, { transformOrigin: "center center" });

    const timeline = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        gsap.set(text, {
          letterSpacing: spacing.base,
          x: chars.length ? 0 : targetX,
        });
        if (chars.length) {
          gsap.set(chars, { x: targetX, scale: 1 });
        }
        gsap.set(arrowLeft, { opacity: 1, x: 0 });
        gsap.set(arrowRight, { opacity: 0, x: 8 });
      },
    });
    activeTimelineRef.current = timeline;

    timeline
      .to(text, {
        letterSpacing: spacing.expanded,
        duration: 0.28,
        ease: "power2.out",
      }, 0)
      .to(text, {
        letterSpacing: spacing.base,
        duration: 0.42,
        ease: "power2.inOut",
      }, 0.36)
      .to(arrowRight, {
        opacity: 0,
        x: 10,
        duration: 0.42,
        ease: "power2.inOut",
      }, 0.18)
      .fromTo(
        arrowLeft,
        { opacity: 0, x: -14 },
        {
          opacity: 1,
          x: 0,
          duration: 0.52,
          ease: "power3.out",
        },
        0.42,
      );

    if (chars.length) {
      timeline.to(
        chars,
        {
          keyframes: [
            {
              x: targetX,
              scale: 1.1,
              duration: 0.52,
              ease: "power3.inOut",
            },
            {
              x: targetX,
              scale: 1,
              duration: 0.28,
              ease: "power2.out",
            },
          ],
          stagger: {
            each: 0.035,
            from: "end",
          },
        },
        0.08,
      );
    } else {
      timeline.to(text, {
        x: targetX,
        duration: 0.62,
        ease: "power3.inOut",
      }, 0.08);
    }
  }, [stopActiveTimeline]);

  const handleMouseLeave = useCallback(() => {
    const text = textRef.current;
    const arrowRight = arrowRightRef.current;
    const arrowLeft = arrowLeftRef.current;
    const root = rootRef.current;

    if (!text || !arrowRight || !arrowLeft) return;

    const spacing = getLinkSpacing(root);
    const chars = gsap.utils.toArray<HTMLElement>(
      text.querySelectorAll("[data-link-char]"),
    );

    stopActiveTimeline();
    gsap.killTweensOf([text, arrowRight, arrowLeft, ...chars]);
    gsap.set(chars, { transformOrigin: "center center" });

    const timeline = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        gsap.set(text, { letterSpacing: spacing.base, x: 0 });
        gsap.set(chars, { x: 0, scale: 1 });
        gsap.set(arrowLeft, { opacity: 0, x: -8 });
        gsap.set(arrowRight, { opacity: 1, x: 0 });
      },
    });
    activeTimelineRef.current = timeline;

    timeline.to(text, {
      letterSpacing: spacing.base,
      duration: 0.42,
      ease: "power2.inOut",
    }, 0);

    if (chars.length) {
      timeline.to(
        chars,
        {
          keyframes: [
            {
              x: 0,
              scale: 1.07,
              duration: 0.42,
              ease: "power3.inOut",
            },
            {
              x: 0,
              scale: 1,
              duration: 0.22,
              ease: "power2.out",
            },
          ],
          stagger: {
            each: 0.024,
            from: "start",
          },
        },
        0,
      );
    } else {
      timeline.to(text, {
        x: 0,
        duration: 0.48,
        ease: "power3.inOut",
      }, 0);
    }

    timeline.to(arrowLeft, {
      opacity: 0,
      x: -14,
      duration: 0.38,
      ease: "power2.inOut",
    }, 0.12);
    timeline.fromTo(
      arrowRight,
      { opacity: 0, x: 10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.46,
        ease: "power3.out",
      },
      0.34,
    );
  }, [stopActiveTimeline]);

  const classNames = `relative inline-flex min-w-[var(--link-arrow-min-width,190px)] cursor-pointer items-center gap-6 overflow-hidden border-b pb-[6px] text-[11px] font-semibold uppercase no-underline transition-colors duration-200 ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      <span
        ref={arrowLeftRef}
        className="pointer-events-none absolute left-0 top-0 flex h-full items-center"
        style={{ opacity: 0, transform: "translateX(-8px)" }}
        aria-hidden="true"
      >
        -&gt;
      </span>
      <span
        ref={textRef}
        className={`min-w-0 shrink-0 whitespace-nowrap ${textClassName}`}
        style={{ letterSpacing: "var(--link-arrow-spacing, 0.18em)" }}
        aria-hidden={labelText ? "true" : undefined}
      >
        {labelText
          ? labelText.split("").map((char, index) => (
              <span
                data-link-char
                className="inline-block will-change-transform"
                key={`${char}-${index}`}
              >
                {char === " " ? "\u00a0" : char}
              </span>
            ))
          : children}
      </span>
      <span
        ref={arrowRightRef}
        className="pointer-events-none ml-auto shrink-0"
        aria-hidden="true"
      >
        -&gt;
      </span>
    </>
  );

  if (!href) {
    return (
      <span
        ref={rootRef as RefObject<HTMLSpanElement>}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick as MouseEventHandler<HTMLSpanElement>}
        className={classNames}
        aria-label={resolvedAriaLabel}
        data-link-arrow-root
        data-nav-text={dataNavText ? "" : undefined}
      >
        {content}
      </span>
    );
  }

  if (isExternalHref(href) || href.startsWith("#")) {
    return (
      <a
        ref={rootRef as RefObject<HTMLAnchorElement>}
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
        className={classNames}
        aria-label={resolvedAriaLabel}
        data-link-arrow-root
        data-nav-text={dataNavText ? "" : undefined}
        target={isExternalHref(href) ? "_blank" : undefined}
        rel={isExternalHref(href) ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      ref={rootRef as RefObject<HTMLAnchorElement>}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      className={classNames}
      aria-label={resolvedAriaLabel}
      data-link-arrow-root
      data-nav-text={dataNavText ? "" : undefined}
    >
      {content}
    </Link>
  );
}
