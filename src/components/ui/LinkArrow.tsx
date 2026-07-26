"use client";

import Link from "next/link";
import {
  useCallback,
  useRef,
  type MouseEventHandler,
  type ReactNode,
  type RefObject,
} from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

export type LinkArrowVariant = "light" | "dark" | "accent";

export interface LinkArrowProps {
  href?: string;
  children: ReactNode;
  variant?: LinkArrowVariant;
  className?: string;
  textClassName?: string;
  ariaLabel?: string;
}

const variantClasses: Record<LinkArrowVariant, string> = {
  light: "border-navy/20 text-navy hover:border-brand-dark hover:text-brand-dark",
  dark: "border-white/30 text-white hover:border-brand-light hover:text-brand-light",
  accent: "border-brand/30 text-brand-dark hover:border-navy hover:text-navy",
};

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

export default function LinkArrow({
  href,
  children,
  variant = "light",
  className = "",
  textClassName = "",
  ariaLabel,
}: LinkArrowProps) {
  const rootRef = useRef<HTMLAnchorElement | HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRightRef = useRef<HTMLSpanElement>(null);
  const arrowLeftRef = useRef<HTMLSpanElement>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const label = typeof children === "string" ? children : null;

  const stopActiveTimeline = useCallback(() => {
    activeTimelineRef.current?.kill();
    activeTimelineRef.current = null;
  }, []);

  useGSAP(() => stopActiveTimeline, { scope: rootRef });

  const handleMouseEnter = useCallback(() => {
    const root = rootRef.current;
    const text = textRef.current;
    const arrowRight = arrowRightRef.current;
    const arrowLeft = arrowLeftRef.current;
    if (!root || !text || !arrowRight || !arrowLeft) return;

    const chars = gsap.utils.toArray<HTMLElement>(
      text.querySelectorAll("[data-link-char]"),
    );
    const shift = Math.max(0, root.clientWidth - text.offsetWidth - 32);

    stopActiveTimeline();
    gsap.killTweensOf([arrowRight, arrowLeft, ...chars]);
    const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
    activeTimelineRef.current = timeline;
    timeline
      .to(arrowRight, { autoAlpha: 0, x: 12, duration: 0.28, ease: "power2.in" }, 0)
      .fromTo(
        arrowLeft,
        { autoAlpha: 0, x: -12 },
        { autoAlpha: 1, x: 0, duration: 0.38, ease: "power3.out" },
        0.12,
      )
      .to(
        chars,
        {
          x: shift,
          y: -2,
          duration: 0.48,
          ease: "power3.inOut",
          stagger: { each: 0.025, from: "end" },
        },
        0,
      );
  }, [stopActiveTimeline]);

  const handleMouseLeave = useCallback(() => {
    const text = textRef.current;
    const arrowRight = arrowRightRef.current;
    const arrowLeft = arrowLeftRef.current;
    if (!text || !arrowRight || !arrowLeft) return;

    const chars = gsap.utils.toArray<HTMLElement>(
      text.querySelectorAll("[data-link-char]"),
    );
    stopActiveTimeline();
    gsap.killTweensOf([arrowRight, arrowLeft, ...chars]);
    const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
    activeTimelineRef.current = timeline;
    timeline
      .to(chars, {
        x: 0,
        y: 0,
        duration: 0.42,
        ease: "power3.inOut",
        stagger: { each: 0.018, from: "start" },
      })
      .to(arrowLeft, { autoAlpha: 0, x: -12, duration: 0.26 }, 0.08)
      .fromTo(
        arrowRight,
        { autoAlpha: 0, x: 12 },
        { autoAlpha: 1, x: 0, duration: 0.36, ease: "power3.out" },
        0.18,
      );
  }, [stopActiveTimeline]);

  const sharedProps = {
    onMouseEnter: handleMouseEnter as MouseEventHandler<MagneticRoot>,
    onMouseLeave: handleMouseLeave as MouseEventHandler<MagneticRoot>,
    className: `relative inline-flex min-w-[var(--link-arrow-min-width,190px)] cursor-pointer items-center gap-5 overflow-hidden border-b pb-2 text-xs font-bold uppercase no-underline transition-colors duration-[250ms] ${variantClasses[variant]} ${className}`,
    "aria-label": ariaLabel ?? label ?? undefined,
  };

  const content = (
    <>
      <span
        ref={arrowLeftRef}
        data-link-arrow-left
        className="pointer-events-none absolute left-0 flex h-full items-center opacity-0"
        aria-hidden="true"
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </span>
      <span ref={textRef} className={`min-w-0 shrink-0 whitespace-nowrap ${textClassName}`}>
        {label
          ? Array.from(label).map((character, index) => (
              <span
                key={`${character}-${index}`}
                data-link-char
                className="inline-block will-change-transform"
                aria-hidden="true"
              >
                {character === " " ? "\u00a0" : character}
              </span>
            ))
          : children}
      </span>
      <span
        ref={arrowRightRef}
        data-link-arrow-right
        className="pointer-events-none ml-auto"
        aria-hidden="true"
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </span>
    </>
  );

  if (!href) {
    return (
      <span
        {...sharedProps}
        ref={rootRef as RefObject<HTMLSpanElement>}
      >
        {content}
      </span>
    );
  }

  if (isExternalHref(href)) {
    return (
      <a
        {...sharedProps}
        ref={rootRef as RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      {...sharedProps}
      ref={rootRef as RefObject<HTMLAnchorElement>}
      href={href}
    >
      {content}
    </Link>
  );
}

type MagneticRoot = HTMLAnchorElement | HTMLSpanElement;
