import FoodImage from "../../ui/FoodImage";
import { Star } from "lucide-react";
import type { Category } from "@/content/site";
import LinkArrow from "../../ui/LinkArrow";

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <article className="relative w-[min(86vw,22rem)] shrink-0 px-3 text-ink sm:w-[31rem] sm:px-4 lg:w-[36rem]">
      <div className="h-full overflow-hidden rounded-[2rem] border border-ink/10 bg-cream sm:rounded-[2.5rem]">
        <div className="relative h-24 overflow-hidden sm:h-64" style={{ backgroundColor: category.tint }}>
          <FoodImage
            src={category.image}
            alt={category.imageAlt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 512px, (min-width: 640px) 464px, (min-width: 410px) 328px, 80vw"
            className={category.imageKind === "brand" ? "object-contain p-14 opacity-80 sm:p-16" : "object-cover"}
          />
          <div className="absolute right-4 top-4 z-10 grid size-[4.75rem] place-items-center rounded-full bg-cream text-center text-[0.6rem] font-semibold uppercase leading-tight text-ink shadow-sm sm:right-5 sm:bottom-5 sm:size-[5.5rem] sm:text-[0.65rem]">
            <span>
              <span className="block text-cocoa">Ready</span>
              <span className="mt-1 block text-lg leading-none text-brand-dark sm:text-xl">
                {category.time}
              </span>
            </span>
          </div>
        </div>
        <div className="relative p-5 sm:p-7">
          <div className="mb-4 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-cocoa sm:text-[0.68rem]">
            <span className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-brand" strokeWidth={2.4} />
              {category.meta}
            </span>
            <span className="flex items-center gap-1">
              <Star
                className="h-3 w-3 fill-brand text-brand"
                strokeWidth={2.2}
              />
              {category.rating}
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="font-serif text-lg font-semibold italic leading-none text-cocoa sm:text-xl">
                QuickBite
              </p>
              <h3 className="mt-2 font-display text-[2.05rem] font-bold leading-none text-ink sm:text-[2.55rem]">
                {category.name}
              </h3>
            </div>
            <LinkArrow
              href="/restaurants"
              variant="dark"
              className="min-h-11 w-max shrink-0 rounded-pill border-0 bg-brand! px-5 py-3! text-base! font-semibold normal-case! text-white! [--link-arrow-min-width:0px] [--link-arrow-spacing:0em] sm:mb-1 sm:h-14 sm:px-6 sm:text-md!"
            >
              Order now
            </LinkArrow>
          </div>
          <p className="mt-5 min-h-[3.8rem] max-w-[27rem] text-[0.88rem] leading-snug text-cocoa sm:text-[0.94rem]">
            {category.description}
          </p>
        </div>
      </div>
    </article>
  );
}
