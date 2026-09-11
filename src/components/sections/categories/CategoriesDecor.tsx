import Image from "next/image";

export default function CategoriesDecor() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(var(--color-ink)_0.65px,transparent_0.65px)] [background-size:18px_18px]"
      />
      <Image
        src="/images/food/pinterest/jollof-chicken-plantain.webp"
        alt=""
        width={150}
        height={150}
        sizes="64px"
        className="pointer-events-none absolute left-[9%] top-36 hidden aspect-square w-16 -rotate-12 rounded-full object-cover opacity-[0.065] lg:block"
      />
      <Image
        src="/images/food/pinterest/akara-bean-cakes.webp"
        alt=""
        width={140}
        height={140}
        sizes="64px"
        className="pointer-events-none absolute right-[13%] top-64 hidden aspect-square w-16 rotate-12 rounded-full object-cover opacity-[0.07] lg:block"
      />
      <Image
        src="/images/food/pinterest/puff-puff.webp"
        alt=""
        width={150}
        height={150}
        sizes="64px"
        className="pointer-events-none absolute bottom-36 left-[17%] hidden aspect-square w-16 rotate-6 rounded-full object-cover opacity-[0.06] lg:block"
      />
    </>
  );
}
