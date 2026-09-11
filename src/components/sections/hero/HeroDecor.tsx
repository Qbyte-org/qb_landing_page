import Image from "next/image";
import { floatingFoods } from "./hero.data";

export default function HeroDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        data-hero-map-detail
        className="absolute inset-x-0 top-0 h-full opacity-50 [background-image:linear-gradient(rgba(255,250,245,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,250,245,0.035)_1px,transparent_1px)] [background-size:4.25rem_4.25rem] sm:[background-size:5rem_5rem]"
      />
      <div
        data-hero-map-detail
        className="absolute right-[8%] top-[22%] hidden h-24 w-24 rounded-[2rem] md:block"
      >
        <Image
          src="/images/food/pinterest/puff-puff.webp"
          alt=""
          width={130}
          height={130}
          sizes="80px"
          className="absolute -right-5 -top-6 aspect-square w-20 rotate-12 rounded-full object-cover opacity-80"
        />
        <span className="absolute bottom-5 left-5 h-3 w-3 rounded-full bg-brand" />
      </div>
      {floatingFoods.map((food, index) => (
        <Image
          key={food.src}
          data-hero-float
          src={food.src}
          alt={food.alt}
          width={150}
          height={150}
          sizes="(min-width: 1280px) 96px, 80px"
          className={`absolute aspect-square select-none animate-float rounded-full object-cover ${food.className}`}
          style={{ animationDelay: `${index * 0.85}s` }}
        />
      ))}
    </div>
  );
}
