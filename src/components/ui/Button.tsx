import type { MouseEventHandler, ReactNode } from "react";
import MagneticFillButton, {
  type MagneticFillVariant,
} from "./MagneticFillButton";
import LinkArrow from "./LinkArrow";

type Variant = "solid" | "outline" | "ghost" | "dark" | "white";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, MagneticFillVariant> = {
  solid: "brand",
  outline: "light",
  ghost: "ghost",
  dark: "dark",
  white: "white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

const linkVariants: Record<Variant, string> = {
  solid: "bg-brand-dark text-white",
  outline: "bg-white text-brand-dark",
  ghost: "bg-ink text-paper",
  dark: "bg-navy text-white",
  white: "bg-white text-navy",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

type NativeButtonProps = CommonProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button(props: LinkProps | NativeButtonProps) {
  const {
    children,
    variant = "solid",
    size = "md",
    className = "",
  } = props;
  const classes = `rounded-pill ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <LinkArrow
        href={props.href}
        appearance="plain"
        target={props.external ? "_blank" : undefined}
        className={`justify-center gap-2 font-semibold ${linkVariants[variant]} ${classes}`}
      >
        {children}
      </LinkArrow>
    );
  }

  const nativeProps = props as NativeButtonProps;

  return (
    <MagneticFillButton
      type={nativeProps.type}
      disabled={nativeProps.disabled}
      onClick={nativeProps.onClick as MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>}
      variant={variants[variant]}
      className={classes}
    >
      {children}
    </MagneticFillButton>
  );
}
