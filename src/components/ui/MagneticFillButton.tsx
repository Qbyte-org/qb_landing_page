"use client";

import Link from "next/link";
import {
  useCallback,
  useRef,
  useState,
  type FocusEventHandler,
  type MouseEvent as ReactMouseEvent,
  type MouseEventHandler,
  type ReactNode,
  type RefObject,
} from "react";

export type MagneticFillVariant =
  | "brand"
  | "dark"
  | "light"
  | "white"
  | "ghost";

type MagneticElement = HTMLButtonElement | HTMLAnchorElement;

export interface MagneticFillButtonProps {
  variant?: MagneticFillVariant;
  customFillClass?: string;
  customHoverTextColor?: string;
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<MagneticElement>;
  disabled?: boolean;
  ariaLabel?: string;
  themeAware?: boolean;
  dataNavAction?: boolean;
  dataNavChip?: boolean;
  dataNavIcon?: boolean;
}

const variants: Record<
  MagneticFillVariant,
  { root: string; fill: string; hoverText: string }
> = {
  brand: {
    root: "bg-brand-dark text-white",
    fill: "bg-white",
    hoverText: "text-navy",
  },
  dark: {
    root: "bg-navy text-white",
    fill: "bg-brand-light",
    hoverText: "text-navy",
  },
  light: {
    root: "bg-white text-brand-dark",
    fill: "bg-brand-dark",
    hoverText: "text-white",
  },
  white: {
    root: "bg-white text-navy",
    fill: "bg-navy",
    hoverText: "text-white",
  },
  ghost: {
    root: "bg-transparent text-navy",
    fill: "bg-[#ff4f1f]",
    hoverText: "text-white",
  },
};

const themeAwareStyles = {
  root: "bg-[var(--magnetic-bg)] text-[var(--magnetic-text)]",
  fill: "bg-[var(--magnetic-fill)]",
  hoverText: "text-[var(--magnetic-hover-text)]",
};

const variantHoverTextColors: Record<MagneticFillVariant, string> = {
  brand: "#1a1a2e",
  dark: "#1a1a2e",
  light: "#ffffff",
  white: "#ffffff",
  ghost: "#ffffff",
};

function isExternalHref(href: string, external?: boolean) {
  return Boolean(
    external ||
      /^https?:\/\//.test(href) ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:"),
  );
}

export default function MagneticFillButton({
  variant = "brand",
  customFillClass,
  customHoverTextColor,
  children,
  className = "",
  href,
  external,
  target,
  rel,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
  themeAware = false,
  dataNavAction = false,
  dataNavChip = false,
  dataNavIcon = false,
}: MagneticFillButtonProps) {
  const buttonRef = useRef<MagneticElement>(null);
  const [fillOrigin, setFillOrigin] = useState({ x: 0, y: 0 });
  const [fillSize, setFillSize] = useState(480);
  const [isHovered, setIsHovered] = useState(false);
  const styles = themeAware ? themeAwareStyles : variants[variant];
  const fillClassName = customFillClass || styles.fill;
  const activeHoverTextColor =
    customHoverTextColor ||
    (themeAware
      ? "var(--magnetic-hover-text)"
      : variantHoverTextColors[variant]);
  const idleTextColor = themeAware ? "var(--magnetic-text)" : undefined;

  const setOrigin = useCallback((x: number, y: number) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const farthestX = Math.max(x, rect.width - x);
    const farthestY = Math.max(y, rect.height - y);
    setFillSize(Math.ceil(Math.hypot(farthestX, farthestY) * 2 + 24));
    setFillOrigin({ x, y });
  }, []);

  const handleMouseEnter = useCallback(
    (event: ReactMouseEvent<MagneticElement>) => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setOrigin(event.clientX - rect.left, event.clientY - rect.top);
      setIsHovered(true);
    },
    [setOrigin],
  );

  const handleMouseLeave = useCallback(
    (event: ReactMouseEvent<MagneticElement>) => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) setOrigin(event.clientX - rect.left, event.clientY - rect.top);
      setIsHovered(false);
    },
    [setOrigin],
  );

  const handleFocus: FocusEventHandler<MagneticElement> = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setOrigin(rect.width / 2, rect.height / 2);
    setIsHovered(true);
  };

  const handleBlur: FocusEventHandler<MagneticElement> = () => {
    setIsHovered(false);
  };

  const rootClassName = [
    "relative isolate inline-flex cursor-pointer items-center justify-center overflow-hidden border-0 font-semibold transition-[background-color,color,transform] duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
    styles.root,
    className,
  ].join(" ");
  const childColorClassName =
    "[&_*]:![color:inherit] [&_svg]:!text-current [&_svg]:!stroke-current";
  const hoverAccentClassName =
    "[&_[data-magnetic-accent]]:!bg-current [&_[data-magnetic-accent]]:![fill:currentColor] [&_[data-magnetic-accent]]:![stroke:currentColor]";

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute rounded-full ${fillClassName}`}
        style={{
          width: fillSize,
          height: fillSize,
          left: fillOrigin.x,
          top: fillOrigin.y,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
          transition: isHovered
            ? "transform 760ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      <span
        className={`relative z-10 flex h-full w-full items-center justify-center gap-2 transition-colors duration-300 ${
          isHovered
            ? `${styles.hoverText} ${childColorClassName} ${hoverAccentClassName}`
            : childColorClassName
        }`}
        style={{
          color: isHovered ? activeHoverTextColor : idleTextColor,
        }}
      >
        {children}
      </span>
    </>
  );

  const sharedProps = {
    className: rootClassName,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick,
    "aria-label": ariaLabel,
    "data-nav-action": dataNavAction ? "" : undefined,
    "data-nav-chip": dataNavChip ? "" : undefined,
    "data-nav-icon": dataNavIcon ? "" : undefined,
  };

  if (href) {
    if (isExternalHref(href, external)) {
      return (
        <a
          {...sharedProps}
          ref={buttonRef as RefObject<HTMLAnchorElement>}
          href={href}
          target={target ?? (external ? "_blank" : undefined)}
          rel={rel ?? (external ? "noopener noreferrer" : undefined)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        {...sharedProps}
        ref={buttonRef as RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      {...sharedProps}
      ref={buttonRef as RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
