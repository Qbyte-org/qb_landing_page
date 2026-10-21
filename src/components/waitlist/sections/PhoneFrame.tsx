import Image from "next/image";
import type { ReactNode } from "react";

// Screen area inside /images/app/iphone-frame.webp (736x1492), whose screen is 648x1404 at (44, 44):
// the same 1080x2340 ratio as the app screenshots.
const screen = {
  left: `${(44 / 736) * 100}%`,
  top: `${(44 / 1492) * 100}%`,
  width: `${(648 / 736) * 100}%`,
  height: `${(1404 / 1492) * 100}%`,
  borderRadius: "11% / 5.1%",
};

/** An iPhone mockup. Children (a screenshot) fill its screen, under the bezel and Dynamic Island. */
export default function PhoneFrame({ children, className = "", sizes = "20rem" }: { children: ReactNode; className?: string; sizes?: string }) {
  return (
    <div className={`relative aspect-[736/1492] ${className}`}>
      <div className="absolute overflow-hidden bg-[#F7F8FA]" style={screen}>{children}</div>
      <Image src="/images/app/iphone-frame.webp" alt="" aria-hidden="true" fill sizes={sizes} className="pointer-events-none select-none" />
    </div>
  );
}
