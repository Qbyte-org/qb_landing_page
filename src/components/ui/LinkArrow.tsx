"use client";

import Link from "next/link";
import FoodImage from "./FoodImage";
import {
  useCallback,
  useRef,
  type AnchorHTMLAttributes,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export type LinkArrowVariant = "light" | "dark" | "accent";

type LinkArrowRoot = HTMLAnchorElement | HTMLSpanElement;

export interface LinkArrowProps extends Omit<AnchorHTMLAttributes<LinkArrowRoot>, "children" | "href"> {
  href?: string;
  children: ReactNode;
  appearance?: "arrow" | "plain";
  variant?: LinkArrowVariant;
  className?: string;
  textClassName?: string;
  ariaLabel?: string;
  dataNavText?: boolean;
  dataNavChip?: boolean;
  dataNavAction?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
}

const variantClasses: Record<LinkArrowVariant, string> = {
  light: "border-navy/20 text-navy",
  dark: "border-white/25 text-white",
  accent: "border-brand/30 text-brand-dark",
};

function isExternalHref(href: string) {
  return /^(?:https?:)?\/\//i.test(href);
}

function getRightEdgeShift(text: HTMLElement) {
  const root = text.closest<HTMLElement>("[data-link-arrow-root]");
  if (!root) return 18;

  const baseSpacing =
    getComputedStyle(root).getPropertyValue("--link-arrow-spacing").trim() ||
    "0.18em";
  const currentLetterSpacing = text.style.letterSpacing;
  text.style.letterSpacing = baseSpacing;

  const rootStyles = getComputedStyle(root);
  const rootWidth = root.clientWidth - (Number.parseFloat(rootStyles.paddingLeft) || 0) - (Number.parseFloat(rootStyles.paddingRight) || 0);
  const textWidth = text.offsetWidth;
  const mediaWidth =
    root.querySelector<HTMLElement>("[data-link-arrow-media='trailing']")
      ?.offsetWidth ?? 18;

  text.style.letterSpacing = currentLetterSpacing;

  const available = rootWidth - textWidth - mediaWidth;
  // Compact links (for example footer legal links) can otherwise collapse
  // the leading arrow into the first character. Reserve a small, stable lane
  // for the animated arrow before calculating the character travel distance.
  if (available < 12) {
    const padding =
      (Number.parseFloat(rootStyles.paddingLeft) || 0) +
      (Number.parseFloat(rootStyles.paddingRight) || 0);
    root.style.setProperty(
      "min-width",
      `${Math.ceil(textWidth + mediaWidth + 12 + padding)}px`,
      "important",
    );
    return 12;
  }

  return available;
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
  appearance = "arrow",
  variant = "light",
  className = "",
  textClassName = "",
  ariaLabel,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  target,
  rel,
  prefetch,
  replace,
  scroll,
  dataNavText = false,
  dataNavChip = false,
  dataNavAction = false,
  imageSrc,
  imageAlt = "",
  imageClassName = "",
  ...rest
}: LinkArrowProps) {
  const rootRef = useRef<LinkArrowRoot>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRightRef = useRef<HTMLSpanElement>(null);
  const arrowLeftRef = useRef<HTMLSpanElement>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const labelText = typeof children === "string" ? children : null;
  const resolvedAriaLabel = ariaLabel ?? rest["aria-label"] ?? labelText ?? undefined;

  const stopActiveTimeline = useCallback(() => {
    activeTimelineRef.current?.kill();
    activeTimelineRef.current = null;
  }, []);

  const { contextSafe } = useGSAP(() => {
    const root = rootRef.current;
    return () => {
      stopActiveTimeline();
      if (root) gsap.killTweensOf(root.querySelectorAll("[data-link-char], [data-link-arrow-text], [data-link-arrow-media]"));
    };
  }, { scope: rootRef });

  const handleMouseEnter = useCallback(() => {
    const text = textRef.current;
    const arrowRight = arrowRightRef.current;
    const arrowLeft = arrowLeftRef.current;
    const root = rootRef.current;

    if (!text || !arrowRight || !arrowLeft || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

    if (!text || !arrowRight || !arrowLeft || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

  const classNames = [
    "relative cursor-pointer no-underline transition-colors duration-200 motion-reduce:transition-none! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    appearance === "arrow"
      ? `inline-flex min-w-[var(--link-arrow-min-width,190px)] items-center gap-6 overflow-hidden border-b pb-[6px] text-[11px] font-semibold uppercase ${variantClasses[variant]}`
      : "inline-flex items-center",
    className,
  ].join(" ");

  const content = appearance === "plain" ? children : (
    <>
      <span
        ref={arrowLeftRef}
        className="pointer-events-none absolute left-0 top-0 flex h-full items-center"
        style={{ opacity: 0, transform: "translateX(-8px)" }}
        data-link-arrow-media="leading"
        aria-hidden="true"
      >
        {imageSrc ? (
          <FoodImage
            src={imageSrc}
            alt={imageAlt}
            width={48}
            height={48}
            sizes="48px"
            className={`object-contain ${imageClassName}`}
            style={{
              width: "var(--link-arrow-image-size, 2rem)",
              height: "var(--link-arrow-image-size, 2rem)",
            }}
          />
        ) : (
          "→"
        )}
      </span>
      <span
        ref={textRef}
        data-link-arrow-text
        className={`min-w-0 shrink-0 whitespace-nowrap ${textClassName}`}
        style={{ letterSpacing: "var(--link-arrow-spacing, 0.18em)" }}
        aria-hidden={labelText ? "true" : undefined}
      >
        {labelText
          ? labelText.split("").map((char, index) => (
              <span
                data-link-char
                className="inline-block"
                key={`${char}-${index}`}
              >
                {char === " " ? "\u00a0" : char}
              </span>
            ))
          : children}
      </span>
      <span
        ref={arrowRightRef}
        className="pointer-events-none ml-auto flex shrink-0 items-center"
        data-link-arrow-media="trailing"
        aria-hidden="true"
      >
        {imageSrc ? (
          <FoodImage
            src={imageSrc}
            alt={imageAlt}
            width={48}
            height={48}
            sizes="48px"
            className={`object-contain ${imageClassName}`}
            style={{
              width: "var(--link-arrow-image-size, 2rem)",
              height: "var(--link-arrow-image-size, 2rem)",
            }}
          />
        ) : (
          "→"
        )}
      </span>
    </>
  );

  const sharedProps = {
    ...rest,
    className: classNames,
    "aria-label": resolvedAriaLabel,
    "data-link-arrow-root": "",
    "data-link-arrow-appearance": appearance,
    ...(dataNavText ? { "data-nav-text": "" } : {}),
    ...(dataNavChip ? { "data-nav-chip": "" } : {}),
    ...(dataNavAction ? { "data-nav-action": "" } : {}),
    onMouseEnter: (event: MouseEvent<LinkArrowRoot>) => {
      contextSafe(handleMouseEnter)();
      onMouseEnter?.(event);
    },
    onMouseLeave: (event: MouseEvent<LinkArrowRoot>) => {
      if (!event.currentTarget.matches(":focus-visible")) contextSafe(handleMouseLeave)();
      onMouseLeave?.(event);
    },
    onFocus: (event: FocusEvent<LinkArrowRoot>) => {
      contextSafe(handleMouseEnter)();
      onFocus?.(event);
    },
    onBlur: (event: FocusEvent<LinkArrowRoot>) => {
      if (!event.currentTarget.matches(":hover")) contextSafe(handleMouseLeave)();
      onBlur?.(event);
    },
  };

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

  const resolvedTarget = target ?? (isExternalHref(href) ? "_blank" : undefined);
  const resolvedRel = rel ?? (resolvedTarget === "_blank" ? "noopener noreferrer" : undefined);

  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href) || rest.download !== undefined) {
    return (
      <a
        {...sharedProps}
        ref={rootRef as RefObject<HTMLAnchorElement>}
        href={href}
        target={resolvedTarget}
        rel={resolvedRel}
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
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      target={resolvedTarget}
      rel={resolvedRel}
    >
      {content}
    </Link>
  );
}
