import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import FoodImage from "@/components/ui/FoodImage";

type BrandPageCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  image?: { src: string; alt: string };
  icon?: LucideIcon;
  number?: string;
  children?: ReactNode;
};

/** Photo cards share the category cards' cream surface and stitched wave edge. */
export default function BrandPageCard({ eyebrow, title, description, image, icon: Icon, number, children }: BrandPageCardProps) {
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-cream text-ink sm:rounded-[2.5rem]">
      {image ? (
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-cream-200">
          <FoodImage src={image.src} alt={image.alt} fill sizes="(min-width: 1280px) 400px, (min-width: 768px) 46vw, 92vw" className="object-cover" />
          <svg aria-hidden="true" viewBox="0 0 532 100" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-px left-0 h-16 w-full">
            <path d="M0 40C80 80 122 22 202 46S326 82 402 46S478 24 532 44V100H0Z" fill="var(--color-cream)" />
            <path d="M0 51C80 91 122 33 202 57S326 93 402 57S478 35 532 55" fill="none" stroke="var(--color-tan)" strokeWidth="2" strokeDasharray="7 10" strokeLinecap="round" />
          </svg>
        </div>
      ) : null}
      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${image ? "pt-3 sm:pt-4" : ""}`}>
        {Icon || number ? (
          <div className="mb-6 flex items-center justify-between gap-4">
            {Icon ? <span className="grid size-12 place-items-center rounded-full border border-ink/10 bg-paper text-brand"><Icon aria-hidden="true" className="size-5" strokeWidth={1.75} /></span> : null}
            {number ? <span className="font-display text-sm tabular-nums text-cocoa">{number}</span> : null}
          </div>
        ) : null}
        {eyebrow ? <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cocoa">{eyebrow}</p> : null}
        <h3 className="font-display text-[1.8rem] font-semibold leading-[1.1] tracking-[0.01em]! sm:text-[2rem]">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-cocoa">{description}</p>
        {children ? <div className="mt-auto pt-6">{children}</div> : null}
      </div>
    </article>
  );
}
