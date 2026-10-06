import { categoryCardCopy } from "@/content/home/sections";
import FoodImage from "../../ui/FoodImage";
import type { Category } from "@/content/site";
import MagneticFillButton from "../../ui/MagneticFillButton";

type CategoryCardProps = {
  category: Category;
  layout?: "carousel" | "grid";
  duplicate?: boolean;
  actionHref?: string;
  actionLabel?: string;
  actionAriaLabel?: string;
  timeLabel?: string;
};

export default function CategoryCard({
  category,
  layout = "carousel",
  duplicate = false,
  actionHref = categoryCardCopy.actionHref,
  actionLabel = categoryCardCopy.actionLabel,
  actionAriaLabel,
  timeLabel = categoryCardCopy.timeLabel,
}: CategoryCardProps) {
  const Icon = category.icon;
  const inGrid = layout === "grid";

  return (
    <article data-category-card={category.name} data-category-duplicate={duplicate || undefined} aria-hidden={duplicate || undefined} className={inGrid ? "relative h-full w-full min-w-0 text-ink" : "relative w-[min(86vw,22rem)] shrink-0 px-3 text-ink md:w-[31rem] md:px-4 lg:w-[36rem]"}>
      <div className={`h-full overflow-hidden rounded-[2rem] border border-ink/10 bg-cream md:rounded-[2.5rem] ${inGrid ? "flex flex-col" : ""}`}>
        <div data-category-image className={`relative shrink-0 overflow-hidden md:h-64 ${inGrid ? "h-32" : "h-36"}`} style={{ backgroundColor: category.tint }}>
          <FoodImage
            src={category.image}
            alt={duplicate ? "" : category.imageAlt}
            fill
            loading="lazy"
            sizes={inGrid ? "(min-width: 1280px) 596px, (min-width: 640px) 46vw, 92vw" : "(min-width: 1024px) 544px, (min-width: 768px) 464px, (min-width: 410px) 328px, 80vw"}
            className={category.imageKind === "brand" ? "object-contain p-14 opacity-80 md:p-16" : "object-cover object-center"}
          />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-[1] h-16 w-full md:h-24"
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
          <div data-category-time className="absolute bottom-1 right-4 z-10 grid size-16 place-items-center rounded-full bg-paper text-center text-[0.55rem] font-semibold uppercase leading-tight text-ink border border-dashed shadow-sm md:bottom-auto md:right-5 md:top-40 md:size-[5.5rem] md:text-[0.45rem]">
            <span>
              <span className="block text-cocoa">{timeLabel}</span>
              <span className={`mt-1 block text-[0.78rem] leading-none text-brand-dark ${inGrid ? "md:text-[0.85rem]" : "md:text-lg"}`}>
                {category.time}
              </span>
            </span>
          </div>
        </div>

        <div className={`relative ${inGrid ? "flex flex-1 flex-col px-4 pb-4 pt-2 md:px-7 md:pb-0 md:pt-0" : "p-4 md:px-7 md:py-0"}`}>
          <div className="mb-3 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-cocoa md:mb-4 md:text-[0.68rem]">
            <span className="flex items-center gap-1.5">
              <Icon aria-hidden="true" className="h-3.5 w-3.5 text-brand" strokeWidth={2.4} />
              {category.meta}
            </span>
          </div>

          <div data-category-title-row className={`flex items-center justify-between gap-3 md:gap-4 ${inGrid ? "md:flex-col md:items-stretch xl:flex-row xl:items-end xl:justify-between" : "md:flex-row md:items-end md:justify-between"}`}>
            <div className="min-w-0 flex-1 md:flex-initial">
              <p className="font-serif text-base font-semibold italic leading-none text-cocoa md:text-xl">{categoryCardCopy.quickBite}</p>
              <h3 className={`mt-1.5 font-display text-[1.3rem] font-bold leading-[1.08] text-ink md:mt-2 ${inGrid ? "md:text-[2.05rem]" : "md:text-[2.55rem] md:leading-none"}`}>
                {category.name}
              </h3>
            </div>
            <MagneticFillButton
              href={actionHref}
              ariaLabel={actionAriaLabel ?? categoryCardCopy.actionAriaLabel(actionLabel, category.name)}
              tabIndex={duplicate ? -1 : undefined}
              variant="dark"
              className="min-h-11 w-max shrink-0 rounded-pill bg-brand! px-3 py-2! text-xs! font-semibold normal-case! text-white! md:mb-1 md:h-14 md:px-6 md:py-3! md:text-base!"
            >
              {actionLabel}
            </MagneticFillButton>
          </div>
          <p data-category-description className="mt-3 max-w-[27rem] text-[0.8rem] leading-snug text-cocoa md:mt-5 md:min-h-[3.8rem] md:text-[0.94rem]">
            {category.description}
          </p>
        </div>
      </div>
    </article>
  );
}
