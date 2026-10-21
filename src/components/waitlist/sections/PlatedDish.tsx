import Image from "next/image";

export type Vessel = "plate" | "saucer" | "dark-bowl" | "own";

// Drawn tableware. Box shadows are switched off site-wide, so depth comes from drop-shadow filters.
const vesselClasses: Record<Vessel, string> = {
  plate: "rounded-full border border-ink/8 bg-[radial-gradient(circle,#ffffff_0_50%,#f4ece2_54%,#ffffff_60%,#efe5da_100%)] [filter:drop-shadow(0_14px_16px_rgba(42,33,29,0.16))]",
  saucer: "rounded-full border border-ink/8 bg-[radial-gradient(circle,#ffffff_0_46%,#f4ece2_51%,#ffffff_58%,#efe5da_100%)] [filter:drop-shadow(0_10px_12px_rgba(42,33,29,0.14))]",
  "dark-bowl": "rounded-full bg-[radial-gradient(circle_at_38%_32%,#4a3d36_0,#241813_45%,#120d0b_100%)] [filter:drop-shadow(0_16px_18px_rgba(42,33,29,0.24))]",
  own: "[filter:drop-shadow(0_14px_14px_rgba(42,33,29,0.14))]",
};
const foodInset: Record<Vessel, string> = { plate: "inset-[9%]", saucer: "inset-[13%]", "dark-bowl": "inset-[9%]", own: "inset-0" };

/** A dish served on drawn tableware. Size it from the parent; it stays square. */
export default function PlatedDish({ src, alt, vessel, sizes, className = "" }: { src: string; alt: string; vessel: Vessel; sizes: string; className?: string }) {
  return (
    <div className={`relative aspect-square ${vesselClasses[vessel]} ${className}`}>
      <div className={`absolute ${foodInset[vessel]}`}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" />
      </div>
    </div>
  );
}
