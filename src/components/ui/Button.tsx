import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost" | "dark" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-all duration-200 will-change-transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // brand-dark fill keeps white label text at AA contrast
  solid: "bg-brand-dark text-white hover:bg-brand shadow-sm hover:shadow-md",
  outline: "border-2 border-brand text-brand-dark hover:bg-brand-50",
  ghost: "text-navy hover:bg-black/5",
  dark: "bg-navy text-white hover:bg-navy-light",
  white: "bg-white text-navy hover:bg-cream-200 shadow-sm",
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

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export default function Button(props: LinkProps | NativeButtonProps) {
  const { children, variant = "solid", size = "md", className = "" } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  // Strip presentational props so only DOM-valid attributes reach <button>.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, className: _cn, children: _ch, ...rest } =
    props as NativeButtonProps;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
