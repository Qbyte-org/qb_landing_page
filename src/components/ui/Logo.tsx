import Image from "next/image";
import LinkArrow from "./LinkArrow";

function LogoWordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={light ? "text-paper" : "text-ink"}>
      Quick<span className="text-brand">Bite</span>
    </span>
  );
}

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
  const markSrc = variant === "light" ? "/logo-mark-light.svg" : "/logo-mark.svg";
  const colorLogoState = variant === "light" ? "invisible opacity-0" : "";
  const lightLogoState = variant === "light" ? "" : "invisible opacity-0";

  return (
    <LinkArrow
      href="/"
      appearance="plain"
      aria-label="QuickBite home"
      className={`inline-flex items-center ${className}`}
    >
      {themeAware ? (
        <span className="relative flex h-7 w-[128px] items-center sm:h-8 sm:w-[145px]" style={{ maxWidth: width }}>
          <span data-logo-color className={`flex items-center gap-2 ${colorLogoState}`}>
            <Image
              src="/logo-mark.svg"
              alt=""
              width={32}
              height={32}
              priority={priority}
              className="size-7 object-contain sm:size-8"
            />
            <LogoWordmark />
          </span>
          <span data-logo-light className={`absolute left-0 flex items-center gap-2 ${lightLogoState}`}>
            <Image
              src="/logo-mark-light.svg"
              alt=""
              width={32}
              height={32}
              priority={priority}
              className="size-7 object-contain sm:size-8"
            />
            <LogoWordmark light />
          </span>
        </span>
      ) : (
        <span className="flex items-center gap-2 font-display font-black tracking-[-0.05em]" style={{ width, fontSize: Math.max(16, height * 0.62) }}>
          <Image src={markSrc} alt="" width={height} height={height} priority={priority} className="shrink-0 object-contain" />
          <LogoWordmark light={variant === "light"} />
        </span>
      )}
    </LinkArrow>
  );
}
