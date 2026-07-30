import Image from "next/image";
import { Star } from "lucide-react";
import type { Category } from "@/content/site";
import MagneticFillButton from "../../ui/MagneticFillButton";

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <article className="relative w-[min(86vw,22rem)] shrink-0 overflow-visible px-3 pt-16 text-[#3a2418] sm:w-[31rem] sm:px-4 sm:pt-[4.5rem] lg:w-[34rem]">
      <div
        className="absolute inset-x-3 bottom-0 top-[5.9rem] rounded-[2.4rem] bg-[#efecf4] ring-1 ring-[#d9ced5] sm:inset-x-4 sm:top-[6.5rem] sm:rounded-[2.9rem]"
        style={{ backgroundColor: category.tint }}
      />

      <svg
        className="pointer-events-none absolute left-3 right-3 top-[5.9rem] h-24 w-[calc(100%-1.5rem)] text-[#fffaf5] sm:left-4 sm:right-4 sm:top-[6.5rem] sm:h-28 sm:w-[calc(100%-2rem)]"
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
          stroke="#8f6a57"
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

      <div className="absolute right-6 top-20 z-20 grid h-[4.3rem] w-[4.3rem] place-items-center rounded-full bg-white text-center text-[0.55rem] font-black uppercase leading-tight text-[#4a2416] ring-1 ring-[#eaded6] sm:right-8 sm:top-[5.5rem] sm:h-[4.85rem] sm:w-[4.85rem]">
        <span>
          <span className="block text-[#7a6357]">Ready</span>
          <span className="block text-base leading-none text-[#f06400] sm:text-lg">
            {category.time}
          </span>
        </span>
      </div>

      <div className="relative z-10 mt-32 px-5 sm:mt-[9.5rem] sm:px-8">
        <div className="mb-4 flex items-center justify-between text-[0.62rem] font-black uppercase tracking-[0.08em] text-[#6d554a] sm:text-[0.68rem]">
          <span className="flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5 text-[#f06400]" strokeWidth={2.4} />
            {category.meta}
          </span>
          <span className="flex items-center gap-1">
            <Star
              className="h-3 w-3 fill-[#f3a629] text-[#f3a629]"
              strokeWidth={2.2}
            />
            {category.rating}
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="font-serif text-lg font-black italic leading-none text-[#7c4f2c] sm:text-xl">
              QuickBite
            </p>
            <h3 className="mt-1 font-display text-[2.05rem] font-black leading-none text-[#4a2416] sm:text-[2.55rem] lg:text-[2.8rem]">
              {category.name}
            </h3>
          </div>
          <MagneticFillButton
            href="/restaurants"
            variant="brand"
            className="h-11 w-max shrink-0 rounded-pill border-0 bg-[#f3a629] px-5 text-[0.78rem] font-black uppercase tracking-[0.08em] text-[#3a2418] sm:mb-1 sm:h-12 sm:px-6 sm:text-[0.84rem]"
          >
            Order now
          </MagneticFillButton>
        </div>
        <p className="mt-5 min-h-[3.8rem] max-w-[27rem] text-[0.88rem] font-semibold leading-snug text-[#4a3d38]/80 sm:text-[0.94rem]">
          {category.description}
        </p>
      </div>
    </article>
  );
}
