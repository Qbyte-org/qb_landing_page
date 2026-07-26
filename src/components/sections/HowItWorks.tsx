import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin, Sparkle } from "lucide-react";
import { steps } from "@/content/site";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";

export default function HowItWorks() {
  return (
    <section
      id="how"
      data-nav-theme="dark"
      className="overflow-hidden bg-[#0c5b47] py-16 sm:py-24"
    >
      <Container>
        <div className="relative overflow-hidden rounded-[2.2rem] bg-[#ff8248] px-5 py-7 text-[#24180f] sm:rounded-[3rem] sm:px-8 sm:py-10 lg:px-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-25 [background-image:radial-gradient(#24180f_0.8px,transparent_0.8px)] [background-size:22px_22px]"
          />
          <div
            aria-hidden="true"
            className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#fff1b8]/45 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#0c5b47]/20 blur-3xl"
          />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <Reveal direction="left" className="max-w-xl">
              <p className="font-display text-sm font-black uppercase tracking-[0.18em] text-[#642a10]">
                From craving to doorstep
              </p>
              <h2 className="mt-5 font-display text-4xl font-black leading-[0.96] tracking-[-0.055em] text-[#160d08] sm:text-6xl xl:text-[5.8rem]">
                Unpack and enjoy
              </h2>
              <p className="mt-6 max-w-md text-base font-semibold leading-relaxed text-[#4b2618]/78 sm:text-lg">
                Choose the food, pay securely, then watch your rider bring it in
                hot. QuickBite keeps the flow simple while the experience feels
                considered.
              </p>
            </Reveal>

            <Reveal
              direction="right"
              className="relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-[#ffefb1] sm:min-h-[34rem] sm:rounded-[2.5rem]"
            >
              <div className="absolute inset-x-8 top-10 text-center">
                <p className="font-display text-3xl font-black tracking-[-0.04em] text-[#160d08] sm:text-5xl">
                  Track every bite
                </p>
              </div>

              <Image
                src="/menu/delivery-bag.svg"
                alt=""
                width={460}
                height={460}
                className="absolute left-1/2 top-[31%] w-[18rem] -translate-x-1/2 sm:w-[25rem]"
              />
              <Image
                src="/food/jollof.svg"
                alt=""
                width={210}
                height={170}
                className="absolute left-[7%] top-[53%] w-28 -rotate-12 opacity-80 sm:w-40"
              />
              <Image
                src="/food/drinks.svg"
                alt=""
                width={170}
                height={140}
                className="absolute right-[8%] top-[52%] w-24 rotate-12 opacity-75 sm:w-36"
              />
              <Image
                src="/quickbite-delivery-bike.svg"
                alt=""
                width={220}
                height={132}
                className="absolute bottom-7 right-8 w-36 sm:w-48"
              />
            </Reveal>
          </div>

          <div className="relative z-10 mt-7 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="grid gap-3 md:grid-cols-3">
              {steps.map((step, index) => (
                <Reveal
                  key={step.title}
                  delay={index * 0.08}
                  className="rounded-[1.45rem] bg-white/82 p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-sm font-black text-[#0c5b47]">
                      0{index + 1}
                    </span>
                    <step.icon
                      className="h-5 w-5 text-[#f06400]"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-black tracking-[-0.03em]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-snug text-[#5e3a2c]/75">
                    {step.description}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="flex items-center gap-3 justify-self-start lg:justify-self-end">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#0c5b47] text-[#ffcfaa]">
                <MapPin className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#0c5b47] text-[#ffcfaa]">
                <ArrowLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#0c5b47] text-[#0c5b47]">
                <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#0c5b47] text-[#ffcfaa]">
                <Sparkle className="h-5 w-5 fill-current" strokeWidth={2.25} aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
