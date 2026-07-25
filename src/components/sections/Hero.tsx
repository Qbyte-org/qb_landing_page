"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Bike, MapPin, Star, ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import AvatarStack from "../ui/AvatarStack";

export default function Hero() {
  const reduce = useReducedMotion();

  // Staggered entrance for the copy column
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };
  const item: Variants = reduce
    ? {}
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      };

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* soft animated brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-pulse-glow rounded-full bg-brand/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-brand-light/15 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-8 lg:py-24">
        {/* Copy */}
        <motion.div
          className="max-w-xl"
          variants={container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-pill bg-white px-4 py-1.5 text-sm font-semibold text-brand-dark shadow-soft ring-1 ring-border"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-pill bg-success" />
            </span>
            Live in Ile-Ife
            <span className="text-muted">· Nigeria next</span>
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-5xl font-extrabold leading-[1.02] text-navy sm:text-6xl lg:text-7xl"
          >
            Fast. Fresh.{" "}
            <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
              Delivered.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 text-lg leading-relaxed text-muted sm:text-xl"
          >
            Jollof, grills, swallow and everything in between — from your
            favourite spots across Ile-Ife, at your door in minutes.
          </motion.p>

          {/* Address pill (decorative — links to restaurants) */}
          <motion.form
            variants={item}
            action="/restaurants"
            className="mt-8 flex flex-col gap-3 rounded-card bg-white p-2 shadow-card sm:flex-row sm:items-center"
          >
            <label className="flex flex-1 items-center gap-3 px-3">
              <MapPin className="h-[1.4rem] w-[1.4rem] shrink-0 text-brand" strokeWidth={2} aria-hidden="true" />
              <input
                type="text"
                name="address"
                placeholder="Enter your delivery address"
                className="h-12 w-full bg-transparent text-base text-navy outline-none placeholder:text-muted"
                aria-label="Delivery address"
              />
            </label>
            <Button size="md" className="sm:px-8">
              Find food
            </Button>
          </motion.form>

          {/* Social proof */}
          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <AvatarStack />
            <div className="text-sm">
              <p className="flex items-center gap-1.5 font-bold text-navy">
                <Star className="h-4 w-4 fill-brand text-brand" aria-hidden="true" />
                <span className="text-brand-dark">4.8</span> · Loved by 500k+
                foodies
              </p>
              <p className="text-muted">
                Pay with Paystack · Track every order live
              </p>
            </div>
          </motion.div>

          <motion.div variants={item} className="mt-6">
            <Link
              href="/partners"
              className="group inline-flex items-center gap-1 text-base font-semibold text-brand-dark underline-offset-4 hover:underline"
            >
              Own a restaurant? Become a partner
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.21, 0.5, 0.3, 1], delay: 0.15 }}
        >
          <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-card-hover sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=900&q=80"
              alt="A fresh, colourful Nigerian meal ready for delivery"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Floating rating card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute -left-3 bottom-6 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-card ring-1 ring-border sm:-left-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
              <Star className="h-5 w-5 fill-brand text-brand" aria-hidden="true" />
            </div>
            <div>
              <p className="text-lg font-extrabold leading-none text-navy">4.8</p>
              <p className="text-xs text-muted">12k+ happy customers</p>
            </div>
          </motion.div>

          {/* Floating delivery card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="absolute -right-2 top-6 flex items-center gap-3 rounded-2xl bg-navy p-3 pr-5 text-white shadow-card sm:-right-5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand animate-float">
              <Bike className="h-5 w-5 text-white" strokeWidth={2} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Arriving in</p>
              <p className="text-xs text-white/70">25 min</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
