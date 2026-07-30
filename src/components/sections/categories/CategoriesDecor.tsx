import Image from "next/image";

export default function CategoriesDecor() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.24] [background-image:radial-gradient(#3a2418_0.65px,transparent_0.65px)] [background-size:18px_18px]"
      />
      <Image
        src="/food/jollof.svg"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute left-[9%] top-36 hidden w-16 -rotate-12 opacity-[0.065] lg:block"
      />
      <Image
        src="/food/drinks.svg"
        alt=""
        width={140}
        height={140}
        className="pointer-events-none absolute right-[13%] top-64 hidden w-16 rotate-12 opacity-[0.07] lg:block"
      />
      <Image
        src="/food/pastries.svg"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute bottom-36 left-[17%] hidden w-16 rotate-6 opacity-[0.06] lg:block"
      />
    </>
  );
}
