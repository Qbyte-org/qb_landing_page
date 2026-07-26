import type { MouseEventHandler, ReactNode } from "react";
import MagneticFillButton, {
  type MagneticFillVariant,
} from "./MagneticFillButton";

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
      <MagneticFillButton
        href={props.href}
        external={props.external}
        variant={variants[variant]}
        className={classes}
      >
        {children}
      </MagneticFillButton>
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
