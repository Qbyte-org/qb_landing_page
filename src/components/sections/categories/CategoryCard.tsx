import FoodImage from "../../ui/FoodImage";
import type { Category } from "@/content/site";
import MagneticFillButton from "../../ui/MagneticFillButton";

type CategoryCardProps = {
  category: Category;
  layout?: "carousel" | "grid";
  actionHref?: string;
  actionLabel?: string;
  actionAriaLabel?: string;
  timeLabel?: string;
};

export default function CategoryCard({
  category,
  layout = "carousel",
  actionHref = "/restaurants",
  actionLabel = "Order now",
  actionAriaLabel,
  timeLabel = "Ready",
}: CategoryCardProps) {
  const Icon = category.icon;
  const inGrid = layout === "grid";

  return (
    <article className={inGrid ? "relative h-full w-full min-w-0 text-ink" : "relative w-[min(86vw,22rem)] shrink-0 px-3 text-ink sm:w-[31rem] sm:px-4 lg:w-[36rem]"}>
      <div className={`h-full overflow-hidden rounded-[2rem] border border-ink/10 bg-cream sm:rounded-[2.5rem] ${inGrid ? "flex flex-col" : ""}`}>
        <div className={`relative shrink-0 overflow-hidden sm:h-64 ${inGrid ? "h-32" : "h-36"}`} style={{ backgroundColor: category.tint }}>
          <FoodImage
            src={category.image}
            alt={category.imageAlt}
            fill
            loading="lazy"
            sizes={inGrid ? "(min-width: 1280px) 596px, (min-width: 640px) 46vw, 92vw" : "(min-width: 1024px) 512px, (min-width: 640px) 464px, (min-width: 410px) 328px, 80vw"}
            className={category.imageKind === "brand" ? "object-contain p-14 opacity-80 sm:p-16" : "object-cover object-center"}
          />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-[1] h-16 w-full sm:h-24"
            viewBox="0 0 532 148"
            preserveAspectRatio="none"
          >
            <path
              d="M0 44C78 73 112 117 181 92C260 64 278 112 357 101C424 92 459 57 532 78V148H0V44Z"
              fill="var(--color-cream)"
            />
            <path
              d="M0 44C78 73 112 117 181 92C260 64 278 112 357 101C424 92 459 57 532 78"
              fill="none"
              stroke="var(--color-ink)"
              strokeDasharray="8 12"
              strokeLinecap="round"
              strokeOpacity=".56"
              strokeWidth="2.4"
            />
            <path
              d="M0 44C78 73 112 117 181 92C260 64 278 112 357 101C424 92 459 57 532 78"
              fill="none"
              stroke="var(--color-dark-ink)"
              strokeDasharray="8 12"
              strokeLinecap="round"
              strokeOpacity=".56"
              strokeWidth="2.4"
              transform="translate(0, 16)"
            />
          </svg>
          <div className="absolute right-4 top-4 z-10 grid size-[4.75rem] place-items-center rounded-full bg-paper text-center text-[0.6rem] font-semibold uppercase leading-tight text-ink border border-dashed shadow-sm sm:right-5 sm:top-40 sm:size-[5.5rem] sm:text-[0.45rem]">
            <span>
              <span className="block text-cocoa">{timeLabel}</span>
              <span className={`mt-1 block leading-none text-brand-dark ${inGrid ? "text-[0.85rem]" : "text-lg"}`}>
                {category.time}
              </span>
            </span>
          </div>
        </div>

        <div className={`relative ${inGrid ? "flex flex-1 flex-col px-5 pt-2 sm:px-7 sm:pt-0" : "p-5 sm:px-7 sm:py-0"}`}>
          <div className="mb-4 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-cocoa sm:text-[0.68rem]">
            <span className="flex items-center gap-1.5">
              <Icon aria-hidden="true" className="h-3.5 w-3.5 text-brand" strokeWidth={2.4} />
              {category.meta}
            </span>
          </div>

          <div className={`flex flex-col gap-4 ${inGrid ? "xl:flex-row xl:items-end xl:justify-between" : "sm:flex-row sm:items-end sm:justify-between"}`}>
            <div className="min-w-0">
              <p className="font-serif text-lg font-semibold italic leading-none text-cocoa sm:text-xl">
                QuickBite
              </p>
              <h3 className={`mt-2 font-display font-bold text-ink ${inGrid ? "text-[1.9rem] leading-[1.08] sm:text-[2.05rem]" : "text-[2.05rem] leading-none sm:text-[2.55rem]"}`}>
                {category.name}
              </h3>
            </div>
            <MagneticFillButton
              href={actionHref}
              ariaLabel={actionAriaLabel}
              variant="dark"
              className="min-h-11 w-max shrink-0 rounded-pill bg-brand! px-5 py-3! text-base! font-semibold normal-case! text-white! sm:mb-1 sm:h-14 sm:px-6 sm:text-md!"
            >
              {actionLabel}
            </MagneticFillButton>
          </div>
          <p className="mt-5 min-h-[3.8rem] max-w-[27rem] text-[0.88rem] leading-snug text-cocoa sm:text-[0.94rem]">
            {category.description}
          </p>
        </div>
      </div>
    </article>
  );
}
