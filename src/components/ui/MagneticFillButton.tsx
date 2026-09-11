"use client";

import Link from "next/link";
import {
  useCallback,
  useRef,
  useState,
  type FocusEventHandler,
  type HTMLAttributes,
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

type MagneticElement = HTMLElement;

export interface MagneticFillButtonProps extends Omit<HTMLAttributes<MagneticElement>, "children"> {
  as?: "button" | "summary";
  variant?: MagneticFillVariant;
  customFillClass?: string;
  customHoverTextColor?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  href?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  prefetch?: boolean;
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
    hoverText: "text-white",
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
    root: "bg-[#2a211d] text-navy",
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
  dark: "#ffffff",
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
  as = "button",
  variant = "brand",
  customFillClass,
  customHoverTextColor,
  children,
  className = "",
  contentClassName = "flex h-full w-full items-center justify-center gap-2",
  href,
  external,
  target,
  rel,
  prefetch,
  type = "button",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  disabled,
  ariaLabel,
  themeAware = false,
  dataNavAction = false,
  dataNavChip = false,
  dataNavIcon = false,
  ...rest
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
      if (rect) {
        setOrigin(event.clientX - rect.left, event.clientY - rect.top);
        setIsHovered(true);
      }
      onMouseEnter?.(event);
    },
    [onMouseEnter, setOrigin],
  );

  const handleMouseLeave = useCallback(
    (event: ReactMouseEvent<MagneticElement>) => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) setOrigin(event.clientX - rect.left, event.clientY - rect.top);
      setIsHovered(false);
      onMouseLeave?.(event);
    },
    [onMouseLeave, setOrigin],
  );

  const handleFocus: FocusEventHandler<MagneticElement> = (event) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setOrigin(rect.width / 2, rect.height / 2);
      setIsHovered(true);
    }
    onFocus?.(event);
  };

  const handleBlur: FocusEventHandler<MagneticElement> = (event) => {
    setIsHovered(false);
    onBlur?.(event);
  };

  const rootClassName = [
    "relative isolate inline-flex cursor-pointer items-center justify-center overflow-hidden border-0 font-semibold transition-[background-color,color,transform] duration-300 motion-reduce:transition-none! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-60",
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
        data-magnetic-fill=""
        className={`pointer-events-none absolute rounded-full transition-transform ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none! ${isHovered ? "duration-[760ms]" : "duration-[600ms]"} ${fillClassName}`}
        style={{
          width: fillSize,
          height: fillSize,
          left: fillOrigin.x,
          top: fillOrigin.y,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
        }}
      />
      <span
        data-magnetic-content=""
        className={`relative z-10 transition-colors duration-300 motion-reduce:transition-none! ${contentClassName} ${
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
    ...rest,
    className: rootClassName,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick,
    "aria-label": ariaLabel ?? rest["aria-label"],
    "data-magnetic-button": "",
    "data-nav-action": dataNavAction ? "" : undefined,
    "data-nav-chip": dataNavChip ? "" : undefined,
    "data-nav-icon": dataNavIcon ? "" : undefined,
  };

  if (as === "summary") {
    return (
      <summary {...sharedProps} ref={buttonRef}>
        {content}
      </summary>
    );
  }

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
        prefetch={prefetch}
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
