"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Bike,
  Clock3,
  LocateFixed,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useHeroParallax } from "@/hooks/use-hero-parallax";
import { tactileMotion } from "@/lib/animation";
import Container from "../ui/Container";

const proofPoints = [
  { icon: Clock3, value: "25 min", label: "average delivery" },
  { icon: Star, value: "4.8/5", label: "customer rating" },
  { icon: ShieldCheck, value: "100%", label: "verified kitchens" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useHeroParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-navy pt-28 text-white sm:pt-32 lg:pt-36"
    >
      <div data-hero-image-reveal className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          className="absolute -inset-5 will-change-transform"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -5, 0],
                  rotate: [0, 0.12, 0],
                  scale: [1.035, 1.045, 1.035],
                }
          }
          whileHover={reduceMotion ? undefined : { scale: 1.055, rotate: 0.15 }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=1800&q=88"
            alt="A colourful Nigerian meal arranged for delivery"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center]"
          />
        </motion.div>
      </div>

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#11111d]/60" />

      <div
        data-hero-decor
        aria-hidden="true"
        className="absolute right-5 top-28 hidden grid-cols-5 gap-2 sm:grid"
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-pill bg-white/45" />
        ))}
      </div>
      <span
        data-hero-decor
        aria-hidden="true"
        className="absolute right-[8%] top-[42%] hidden h-px w-28 rotate-[-18deg] bg-brand-light lg:block"
      />

      <Container className="relative flex min-h-[calc(100svh-11.5rem)] items-end pb-10 sm:pb-12 lg:pb-14">
        <div data-hero-copy className="w-full max-w-3xl will-change-transform">
          <div
            data-hero-kicker
            className="flex items-center gap-2 text-sm font-bold uppercase text-white"
          >
            <MapPin className="h-4 w-4 text-brand-light" strokeWidth={2.25} aria-hidden="true" />
            Delivering across Ile-Ife
          </div>

          <h1
            data-hero-title
            className="mt-5 font-display text-5xl font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            <span className="block">Your favourites.</span>
            <span className="block text-brand-light">Right on time.</span>
          </h1>

          <p
            data-hero-description
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl"
          >
            From smoky jollof to late-night small chops, order from trusted
            kitchens and follow every bite to your door.
          </p>

          <div data-hero-actions className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <form
              action="/restaurants"
              className="flex w-full max-w-xl flex-col gap-2 rounded-[1.25rem] bg-white p-2 shadow-[0_18px_46px_-18px_rgba(0,0,0,0.55)] sm:flex-row sm:items-center sm:rounded-pill"
            >
              <label className="flex min-h-12 flex-1 items-center gap-3 px-3">
                <LocateFixed
                  className="h-5 w-5 shrink-0 text-brand-dark"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <input
                  type="text"
                  name="address"
                  autoComplete="street-address"
                  placeholder="Enter your delivery address"
                  aria-label="Delivery address"
                  className="w-full bg-transparent text-base text-navy outline-none placeholder:text-muted"
                />
              </label>
              <motion.button
                type="submit"
                className="group flex h-12 items-center justify-center gap-2 rounded-pill bg-brand-dark px-6 text-sm font-bold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                {...tactileMotion}
              >
                Find food
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-[250ms] group-hover:translate-x-1"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
              </motion.button>
            </form>

            <motion.div className="shrink-0" {...tactileMotion}>
              <Link
                href="#app"
                className="group flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-pill border border-white bg-navy px-6 text-sm font-bold text-white shadow-[0_16px_34px_-18px_rgba(0,0,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                Get the app
                <span className="transition-transform duration-[250ms] group-hover:translate-x-0.5" aria-hidden="true">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          <div
            data-hero-proof
            className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/25 pt-5"
          >
            {proofPoints.map((point) => (
              <div key={point.label} className="flex items-center gap-2.5">
                <point.icon
                  className="h-4 w-4 text-brand-light"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <p className="text-sm text-white/70">
                  <strong className="font-bold text-white">{point.value}</strong>{" "}
                  <span className="hidden sm:inline">{point.label}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          data-hero-status
          data-hero-decor
          className="absolute bottom-20 right-4 hidden items-center gap-3 rounded-2xl border border-white/25 bg-white p-3 pr-5 text-navy shadow-[0_20px_48px_-22px_rgba(0,0,0,0.7)] lg:flex"
          whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015, rotate: -0.3 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-dark text-white">
            <Bike className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-xs font-semibold text-muted">Your order is moving</span>
            <span className="block text-sm font-extrabold text-navy">Arriving in 25 min</span>
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
