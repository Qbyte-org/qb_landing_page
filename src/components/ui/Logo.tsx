import Image from "next/image";
import Link from "next/link";

export default function Logo({
  variant = "color",
  priority = false,
  className = "",
  width = 160,
  height = 35,
  themeAware = false,
}: {
  variant?: "color" | "light";
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
  themeAware?: boolean;
}) {
  const src =
    variant === "light" ? "/quickbite-logo-light.svg" : "/quickbite-logo.svg";

  return (
    <Link
      href="/"
      aria-label="QuickBite home"
      className={`inline-flex items-center ${className}`}
    >
      {themeAware ? (
        <span className="relative block h-7 w-[128px] sm:h-8 sm:w-[145px]">
          <Image
            data-logo-color
            src="/quickbite-logo.svg"
            alt="QuickBite"
            fill
            priority={priority}
            sizes="145px"
            className="object-contain object-left"
          />
          <Image
            data-logo-light
            src="/quickbite-logo-light.svg"
            alt=""
            fill
            priority={priority}
            sizes="145px"
            aria-hidden="true"
            className="invisible object-contain object-left opacity-0"
          />
        </span>
      ) : (
        <Image
          src={src}
          alt="QuickBite"
          width={width}
          height={height}
          priority={priority}
        />
      )}
    </Link>
  );
}
