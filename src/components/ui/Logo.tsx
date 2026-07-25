import Image from "next/image";
import Link from "next/link";

export default function Logo({
  variant = "color",
  priority = false,
  className = "",
  width = 160,
  height = 35,
}: {
  variant?: "color" | "light";
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
}) {
  const src =
    variant === "light" ? "/quickbite-logo-light.svg" : "/quickbite-logo.svg";

  return (
    <Link
      href="/"
      aria-label="QuickBite home"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src={src}
        alt="QuickBite"
        width={width}
        height={height}
        priority={priority}
      />
    </Link>
  );
}
