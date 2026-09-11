import Image from "next/image";
import { Star } from "lucide-react";
import type { Category } from "@/content/site";
import MagneticFillButton from "../../ui/MagneticFillButton";

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <article className="relative w-[min(86vw,22rem)] shrink-0 overflow-visible px-3 pt-16 text-ink sm:w-[31rem] sm:px-4 sm:pt-[4.5rem] lg:w-[34rem]">
      <div
        className="absolute inset-x-3 bottom-0 top-[5.9rem] rounded-[2.4rem] border border-ink/10 bg-cream-200 sm:inset-x-4 sm:top-[6.5rem] sm:rounded-[2.9rem]"
        style={{ backgroundColor: category.tint }}
      />

      <svg
        className="pointer-events-none absolute left-3 right-3 top-[5.9rem] h-24 w-[calc(100%-1.5rem)] text-paper sm:left-4 sm:right-4 sm:top-[6.5rem] sm:h-28 sm:w-[calc(100%-2rem)]"
        viewBox="0 0 532 148"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 0H532V89C459 69 424 116 357 108C278 99 260 48 181 70C111 89 82 130 0 101V0Z"
          fill="currentColor"
        />
        <path
          d="M0 101C82 130 111 89 181 70C260 48 278 99 357 108C424 116 459 69 532 89"
          fill="none"
          stroke="var(--color-cocoa)"
          strokeDasharray="8 12"
          strokeLinecap="round"
          strokeOpacity=".62"
          strokeWidth="2.4"
        />
      </svg>

      <Image
        src={category.image}
        alt={`${category.name} cutout`}
        width={410}
        height={310}
        className="absolute -top-2 left-5 z-10 h-40 w-60 rotate-[-5deg] object-contain sm:left-8 sm:h-52 sm:w-[19rem] lg:w-[21rem]"
      />

      <div className="absolute right-6 top-20 z-20 grid h-[4.3rem] w-[4.3rem] place-items-center rounded-full border border-ink/10 bg-paper text-center text-[0.55rem] font-semibold uppercase leading-tight text-ink sm:right-8 sm:top-[5.5rem] sm:h-[4.85rem] sm:w-[4.85rem]">
        <span>
          <span className="block text-cocoa">Ready</span>
          <span className="block text-base leading-none text-brand sm:text-lg">
            {category.time}
          </span>
        </span>
      </div>

      <div className="relative z-10 mt-32 px-5 sm:mt-[9.5rem] sm:px-8">
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
            <h3 className="mt-1 font-display text-[2.05rem] font-bold leading-none text-ink sm:text-[2.55rem] lg:text-[2.8rem]">
              {category.name}
            </h3>
          </div>
          <MagneticFillButton
            href="/restaurants"
            variant="brand"
            customFillClass="bg-paper"
            customHoverTextColor="#2a211d"
            className="h-11 w-max shrink-0 rounded-pill border-0 !bg-brand px-5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] !text-white sm:mb-1 sm:h-12 sm:px-6 sm:text-[0.84rem]"
          >
            Order now
          </MagneticFillButton>
        </div>
        <p className="mt-5 min-h-[3.8rem] max-w-[27rem] text-[0.88rem] leading-snug text-cocoa sm:text-[0.94rem]">
          {category.description}
        </p>
      </div>
    </article>
  );
}
