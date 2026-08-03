"use client";

import { useRef } from "react";
import {
  ArrowRight,
  Bike,
  ChefHat,
  Check,
  Clock3,
  Home,
  PackageCheck,
  Sparkles,
  Store,
} from "lucide-react";
import { motion } from "motion/react";
import Container from "../ui/Container";
import MagneticFillButton from "../ui/MagneticFillButton";
import { gsap, useGSAP } from "@/lib/gsap";

const ease = [0.22, 1, 0.36, 1] as const;

const journeyStages = [
  {
    key: "kitchen",
    title: "Kitchen",
    eyebrow: "Order accepted",
    stamp: "Prep cleared",
    time: "03 min",
    description:
      "Partners receive clean incoming orders with customer notes, prep time and payment status already attached.",
    icon: ChefHat,
  },
  {
    key: "packaging",
    title: "Packaging",
    eyebrow: "Packed fresh",
    stamp: "Bag sealed",
    time: "05 min",
    description:
      "Meals are grouped, labelled and checked so riders pick up the right bags without slowing the kitchen down.",
    icon: PackageCheck,
  },
  {
    key: "dispatch",
    title: "Dispatch",
    eyebrow: "Rider assigned",
    stamp: "Route live",
    time: "08 min",
    description:
      "QuickBite routes the nearest rider, updates the customer and keeps every handoff visible.",
    icon: Bike,
  },
  {
    key: "customer",
    title: "Customer",
    eyebrow: "Delivered hot",
    stamp: "Delivered",
    time: "24 min",
    description:
      "Customers track the ride, receive the meal and leave ratings that help your kitchen grow.",
    icon: Home,
  },
] as const;

type JourneyStage = (typeof journeyStages)[number];

function PassportSectionMark() {
  return (
    <motion.div
      whileHover={{ rotate: -4, scale: 1.025 }}
      transition={{ duration: 0.28, ease }}
      className="relative mx-auto w-max rotate-[-5deg] text-[#f06400]"
    >
      <div className="relative overflow-hidden rounded-[1.05rem] border-[0.18rem] border-dashed border-current px-4 py-3 text-center sm:px-5">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,rgba(240,100,0,.55)_1px,transparent_1.4px)] [background-size:12px_12px]"
        />
        <p className="relative text-[0.64rem] font-black uppercase leading-none tracking-[0.24em]">
          Route stamp
        </p>
        <p className="relative mt-1 font-serif text-xl font-black uppercase leading-none tracking-[-0.06em]">
          Partner Flow
        </p>
        <p className="relative mt-2 text-[0.7rem] font-black tracking-[0.25em]">
          QB / LIVE
        </p>
      </div>
    </motion.div>
  );
}

function StageStamp({
  stage,
  index,
}: {
  stage: JourneyStage;
  index: number;
}) {
  return (
    <motion.div
      data-stage-stamp
      variants={{
        rest: { rotate: -4, scale: 1 },
        hover: { rotate: -1, scale: 1.04 },
      }}
      transition={{ duration: 0.3, ease }}
      className="relative shrink-0 rotate-[-4deg] rounded-[1rem] border-[0.15rem] border-dashed border-[#f06400] px-3 py-2 text-center text-[#f06400]"
    >
      <p className="text-[0.54rem] font-black uppercase leading-none tracking-[0.18em]">
        Stage 0{index + 1}
      </p>
      <p className="mt-1 font-serif text-sm font-black uppercase leading-none">
        {stage.stamp}
      </p>
      <Check className="mx-auto mt-1 h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
    </motion.div>
  );
}

function StageIcon({ stage }: { stage: JourneyStage }) {
  const Icon = stage.icon;

  return (
    <span className="relative grid h-[3.8rem] w-[3.8rem] place-items-center rounded-[1.35rem] border border-dashed border-[#f06400]/55 bg-[#fffaf5] p-1 text-white">
      <span className="grid h-full w-full place-items-center rounded-[1.05rem] bg-[#f06400]">
        <Icon className="h-5 w-5" strokeWidth={2.35} aria-hidden="true" />
      </span>
    </span>
  );
}

function StageIllustration({ stage }: { stage: JourneyStage["key"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 10,
  };

  if (stage === "kitchen") {
    return (
      <svg viewBox="0 0 220 150" className="h-full w-full text-[#241813]" aria-hidden="true">
        <path {...common} d="M54 80H166L154 126H66L54 80Z" />
        <path {...common} d="M73 80C68 52 84 34 105 43C117 26 146 31 147 58C163 60 171 68 166 80" />
        <path data-food-bounce {...common} d="M84 23C74 12 75 8 86 5" />
        <path data-food-bounce {...common} d="M113 27C106 14 108 9 122 5" />
        <path data-food-bounce {...common} d="M144 25C136 14 139 8 151 5" />
      </svg>
    );
  }

  if (stage === "packaging") {
    return (
      <svg viewBox="0 0 220 150" className="h-full w-full text-[#241813]" aria-hidden="true">
        <path {...common} d="M55 50L110 24L165 50V120L110 142L55 120V50Z" />
        <path {...common} d="M55 50L110 76L165 50" />
        <path {...common} d="M110 76V142" />
        <path data-food-bounce {...common} d="M82 98H112" />
        <path data-food-bounce {...common} d="M82 116H102" />
        <path {...common} d="M132 94L148 108L172 78" />
      </svg>
    );
  }

  if (stage === "dispatch") {
    return (
      <svg viewBox="0 0 220 150" className="h-full w-full text-[#241813]" aria-hidden="true">
        <path {...common} d="M52 112C52 95 65 82 82 82C99 82 112 95 112 112" />
        <path {...common} d="M133 112C133 95 146 82 163 82C180 82 193 95 193 112" />
        <circle cx="82" cy="112" r="20" {...common} />
        <circle cx="163" cy="112" r="20" {...common} />
        <path {...common} d="M84 112L120 72H146L163 112" />
        <path {...common} d="M111 112H137L120 72" />
        <path {...common} d="M91 62H130" />
        <path data-food-bounce {...common} d="M54 55H90V82H54V55Z" />
        <path data-food-bounce {...common} d="M61 70H82" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 150" className="h-full w-full text-[#241813]" aria-hidden="true">
      <path {...common} d="M58 72L110 28L162 72V132H58V72Z" />
      <path {...common} d="M94 132V94H126V132" />
      <path data-food-bounce {...common} d="M138 40C157 33 177 41 184 60" />
      <path data-food-bounce {...common} d="M147 62C158 58 170 63 174 74" />
      <path {...common} d="M41 102H70" />
      <path {...common} d="M150 102H180" />
    </svg>
  );
}

function JourneyConnector() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-[8.25rem] z-0 hidden h-40 w-full overflow-visible lg:block"
      viewBox="0 0 1180 180"
      preserveAspectRatio="none"
    >
      <path
        d="M70 92C198 38 322 142 440 88C562 32 675 146 806 90C922 40 1015 58 1110 92"
        fill="none"
        stroke="#2a211d"
        strokeDasharray="10 15"
        strokeLinecap="round"
        strokeOpacity=".14"
        strokeWidth="4"
      />
      <path
        data-journey-path
        d="M70 92C198 38 322 142 440 88C562 32 675 146 806 90C922 40 1015 58 1110 92"
        fill="none"
        stroke="#f06400"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <image
        data-journey-bike
        href="/quickbite-delivery-bike.svg"
        width="132"
        height="78"
      />
      {[70, 440, 806, 1110].map((x) => (
        <g key={x}>
          <circle cx={x} cy="92" r="10" fill="#fffaf5" stroke="#f06400" strokeWidth="4" />
          <circle data-journey-pulse cx={x} cy="92" r="16" fill="none" stroke="#f06400" strokeWidth="3" opacity=".28" />
        </g>
      ))}
    </svg>
  );
}

function StageCard({
  stage,
  index,
}: {
  stage: JourneyStage;
  index: number;
}) {
  return (
    <motion.article
      data-journey-card
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="group relative z-10 flex min-h-[23rem] flex-col overflow-hidden rounded-[2rem] bg-[#fffaf5] p-5 text-[#241813] ring-1 ring-[#2a211d]/10 sm:min-h-[24rem] sm:p-6"
      transition={{ duration: 0.32, ease }}
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,rgba(42,33,29,.42)_1px,transparent_1.4px)] [background-size:13px_13px]" />

      <div className="relative flex items-start justify-between gap-4">
        <StageIcon stage={stage} />
        <StageStamp stage={stage} index={index} />
      </div>

      <div className="relative mt-5 h-32 overflow-hidden rounded-[1.4rem] bg-[#f4dfcc]/70 p-2 text-[#241813] sm:h-36">
        <StageIllustration stage={stage.key} />
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-3">
        <p className="text-[0.66rem] font-black uppercase tracking-[0.18em] text-[#f06400]">
          {stage.eyebrow}
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a211d]/6 px-3 py-1.5 text-[0.68rem] font-black text-[#2a211d]">
          <Clock3 className="h-3.5 w-3.5 text-[#f06400]" strokeWidth={2.35} aria-hidden="true" />
          {stage.time}
        </span>
      </div>

      <h3 className="relative mt-2 font-display text-3xl font-black leading-none tracking-[-0.055em]">
        {stage.title}
      </h3>
      <p className="relative mt-4 text-sm font-semibold leading-relaxed text-[#6d5c52]">
        {stage.description}
      </p>

      <motion.span
        variants={{
          rest: { x: 0 },
          hover: { x: 10 },
        }}
        className="relative mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black uppercase tracking-[0.14em] text-[#f06400]"
      >
        Move order
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
      </motion.span>
    </motion.article>
  );
}

export default function ForPartners() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const path = section.querySelector<SVGPathElement>("[data-journey-path]");
      const bike = section.querySelector<SVGImageElement>("[data-journey-bike]");
      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-journey-card]"),
      );
      const stamps = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-stage-stamp]"),
      );
      const pulses = gsap.utils.toArray<SVGCircleElement>(
        section.querySelectorAll("[data-journey-pulse]"),
      );
      const bounceItems = gsap.utils.toArray<SVGElement>(
        section.querySelectorAll("[data-food-bounce]"),
      );

      if (reducedMotion) {
        gsap.set([path, bike, ...cards, ...stamps, ...pulses, ...bounceItems], {
          clearProps: "all",
        });
        return;
      }

      // Preserve the original scroll-linked path draw. The drawn orange route
      // now works with the passport-style stage stamps instead of numbered chips.
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        });
      }

      // Keep the looping bike motion on the same GSAP MotionPath contract.
      if (bike && path) {
        gsap.set(bike, { autoAlpha: 0 });
        gsap.to(bike, {
          autoAlpha: 1,
          duration: 0.35,
          delay: 0.35,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        });
        gsap.to(bike, {
          duration: 9,
          repeat: -1,
          ease: "power1.inOut",
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.82],
            autoRotate: false,
          },
        });
      }

      gsap.from(cards, {
        autoAlpha: 0,
        y: 42,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 68%",
        },
      });

      // Stamps land with a tiny rotation so they feel connected to the Cities
      // entry-stamp language without changing the card-grid structure.
      gsap.from(stamps, {
        autoAlpha: 0,
        rotate: -16,
        scale: 0.86,
        duration: 0.58,
        stagger: 0.08,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: section,
          start: "top 64%",
        },
      });

      gsap.to(pulses, {
        scale: 1.8,
        autoAlpha: 0,
        transformOrigin: "center",
        duration: 1.6,
        repeat: -1,
        stagger: 0.25,
        ease: "sine.out",
      });

      gsap.to(bounceItems, {
        y: -7,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.12,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="partners"
      data-nav-theme="neutral"
      className="relative isolate overflow-hidden bg-[#fffaf5] py-16 text-[#241813] sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#fffaf5]" />
        <div className="absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle,rgba(42,33,29,.38)_1px,transparent_1.3px)] [background-size:18px_18px]" />
        <div className="absolute -right-24 top-24 rotate-[-8deg] rounded-[1.4rem] border-[0.2rem] border-dashed border-[#f06400]/20 px-12 py-8 font-serif text-4xl font-black uppercase text-[#f06400]/10">
          Route approved
        </div>
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <PassportSectionMark />
          <h2 className="mt-5 font-display text-4xl font-black leading-[0.96] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
            From prep table
            <br />
            to <span className="text-[#f06400]">front door.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-[#6f5f55] sm:text-lg">
            QuickBite turns every partner order into a clean operational flow:
            prep, pack, dispatch and deliver without losing visibility.
          </p>
        </div>

        <div className="relative mt-12 rounded-[2.5rem] bg-white/45 p-3 ring-1 ring-[#2a211d]/10 sm:p-5 lg:p-7">
          <JourneyConnector />
          <div className="grid gap-4 lg:grid-cols-4">
            {journeyStages.map((stage, index) => (
              <StageCard key={stage.key} stage={stage} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[2rem] bg-[#2a211d] p-4 text-[#fffaf5] sm:flex-row sm:p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-dashed border-[#f06400]/55 bg-[#f06400] text-white">
              <Sparkles className="h-5 w-5" strokeWidth={2.35} aria-hidden="true" />
            </span>
            <p className="max-w-xl text-center text-sm font-semibold leading-relaxed text-[#fffaf5]/72 sm:text-left">
              Built for restaurants that want faster handoffs, clearer order
              status and customers who know exactly when food is arriving.
            </p>
          </div>

          <MagneticFillButton
            href="/partners"
            variant="brand"
            className="h-[3.25rem] shrink-0 rounded-pill bg-[#f06400] px-6 text-sm font-black text-white sm:h-14 sm:px-8 sm:text-base"
          >
            Become partner
            <Store className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
          </MagneticFillButton>
        </div>
      </Container>
    </section>
  );
}
