"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  CreditCard,
  LoaderCircle,
  Mail,
  MapPin,
  Navigation,
  ShoppingBasket,
  Store,
  Truck,
  Users,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { Toaster, toast } from "sonner";

import AnimatedBackground from "./AnimatedBackground";
import BackgroundRipple from "./BackgroundRipple";
import FeatureGrid, { type WaitlistFeature } from "./FeatureGrid";
import HoverBorderGradient from "./HoverBorderGradient";

const STORAGE_KEY = "quickbiteWaitlistEmails";
const LOADER_DURATION_MS = 2000;
const LOADER_LETTERS = Array.from("QuickBite");

type WaitlistEntry = {
  email: string;
  date: string;
};

const features: WaitlistFeature[] = [
  {
    title: "Local favourites first",
    description: "Discover trusted restaurants, food businesses, and home kitchens close to you.",
    icon: Store,
  },
  {
    title: "Live order tracking",
    description: "Follow every order from kitchen confirmation to the moment it reaches your door.",
    icon: Navigation,
  },
  {
    title: "One simple checkout",
    description: "Pay securely with card, transfer, USSD, or your QuickBite wallet through Paystack.",
    icon: CreditCard,
  },
  {
    title: "Multi-restaurant cart",
    description: "Order from more than one spot at once while QuickBite handles each delivery.",
    icon: ShoppingBasket,
  },
  {
    title: "Fast local delivery",
    description: "Get clear ETAs and reliable riders for hot meals delivered across Ile-Ife.",
    icon: Truck,
  },
  {
    title: "Priority launch access",
    description: "Be among the first customers invited when QuickBite opens ordering in your area.",
    icon: BadgeCheck,
  },
];

const audiences = [
  { name: "Food lovers", icon: UtensilsCrossed },
  { name: "Local kitchens", icon: Store },
  { name: "Delivery riders", icon: Truck },
];

function readWaitlist(): WaitlistEntry[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as WaitlistEntry[]) : [];
  } catch {
    return [];
  }
}

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setIsBooting(false),
      reduceMotion ? 180 : LOADER_DURATION_MS,
    );

    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      toast.error("Enter a valid email address.");
      return;
    }

    const entries = readWaitlist();
    if (entries.some((entry) => entry.email === normalizedEmail)) {
      toast.info("This email is already on the QuickBite waitlist.");
      return;
    }

    setIsLoading(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const { default: emailjs } = await import("@emailjs/browser");
        await emailjs.send(
          serviceId,
          templateId,
          {
            email: normalizedEmail,
            name: normalizedEmail.split("@")[0],
            reply_to: "support@quickbite.ng",
            from_name: "QuickBite Team",
            title: "Welcome to the QuickBite waitlist",
          },
          publicKey,
        );
      }

      const updatedEntries = [
        ...entries,
        { email: normalizedEmail, date: new Date().toISOString() },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
      setEmail("");
      toast.success("You are on the QuickBite waitlist. We will keep you posted.");
    } catch {
      toast.error("We could not add you right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const rise = {
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <main className="qb-waitlist relative isolate min-h-screen overflow-x-clip bg-[#050505] text-white">
      <AnimatedBackground />
      <AnimatePresence mode="wait">
        {isBooting ? (
          <motion.section
            key="quickbite-loader"
            role="status"
            aria-label="Loading QuickBite waitlist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
            className="fixed inset-0 z-50 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#050505]/88 px-6 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              className="flex w-full flex-col items-center"
            >
              <p
                aria-hidden="true"
                className="font-display inline-flex whitespace-nowrap text-center text-[clamp(3.5rem,13vw,11rem)] leading-none font-bold"
              >
                {LOADER_LETTERS.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    className="loader-letter"
                    initial={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 18 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.46,
                      delay: reduceMotion ? 0 : 0.08 + index * 0.055,
                      ease: "easeOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </p>

              <div className="relative mt-7 h-px w-[min(18rem,70vw)] overflow-hidden bg-white/10">
                <motion.span
                  className="qb-loader-progress block h-full origin-left bg-[#ff6b00]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: reduceMotion ? 0 : 1.55,
                    delay: reduceMotion ? 0 : 0.16,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.section>
        ) : (
          <motion.div
            key="waitlist-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.45 }}
            className="relative"
          >
            <Toaster position="top-center" richColors theme="dark" />

            <section
              id="waitlist-hero"
              className="relative z-10 flex min-h-[100svh] items-center justify-center px-6"
            >
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 1.8 }}
                  className="absolute inset-0 text-center text-[20vw] font-bold leading-none tracking-wider"
                >
                  <span className="outline-display absolute top-[-0.08em] left-1/2 block -translate-x-1/2">
                    Coming
                  </span>
                  <span className="outline-display absolute bottom-[-0.02em] left-1/2 block -translate-x-1/2">
                    soon!
                  </span>
                </motion.div>
              </div>

              <div className="relative z-10 mx-auto w-full max-w-2xl">
                <motion.div
                  {...rise}
                  transition={{ duration: reduceMotion ? 0 : 0.75 }}
                  className="hero-panel relative overflow-hidden rounded-[32px] bg-[#03050b51] p-4 py-6 backdrop-blur-[14px] transition-colors duration-300 hover:bg-[#03050b70] sm:p-8 sm:py-10"
                >
                  <div className="relative flex items-center justify-center max-sm:mt-10">
                    <motion.h1
                      whileHover={reduceMotion ? undefined : { rotateX: [0, 90, 0] }}
                      transition={{ duration: 0.55 }}
                      className="font-display mb-4 inline-block text-center text-3xl font-bold sm:text-5xl"
                    >
                      <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                        Join our waitlist!
                      </span>
                    </motion.h1>
                  </div>

                  <p className="relative mb-4 px-2 text-center text-sm leading-relaxed text-zinc-400 sm:mb-6 sm:px-0">
                    Be first to know when QuickBite starts delivering fast, fresh meals from local favourites near you.
                  </p>

                  <form onSubmit={handleSubmit} className="relative mb-8 flex w-full flex-col gap-3 sm:flex-row">
                    <HoverBorderGradient className="flex-1">
                      <label htmlFor="waitlist-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="waitlist-email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email address"
                        disabled={isLoading}
                        required
                        className="relative z-10 w-full bg-transparent px-4 py-2 text-base text-white outline-none placeholder:text-zinc-600 disabled:opacity-60"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(32%_50%_at_24.325%_25.675%,rgb(255,255,255)_0%,rgba(255,255,255,0)_100%)] opacity-[0.03] blur-[10px]" />
                    </HoverBorderGradient>

                    <motion.button
                      whileHover={reduceMotion || isLoading ? undefined : { scale: 1.02 }}
                      whileTap={reduceMotion || isLoading ? undefined : { scale: 0.98 }}
                      disabled={isLoading || !email.trim()}
                      type="submit"
                      className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-black transition-all hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[140px]"
                    >
                      {isLoading ? (
                        <>
                          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Joining...
                        </>
                      ) : (
                        "Join Waitlist"
                      )}
                    </motion.button>
                  </form>

                  <motion.div
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.45, duration: 0.45 }}
                    className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#03050b51] p-6 backdrop-blur-[14px]"
                  >
                    <div className="relative z-10 flex items-start justify-between">
                      <div className="flex gap-4 max-sm:flex-col">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#03050b51] backdrop-blur-[14px]">
                          <Zap className="h-5 w-5 text-orange-400" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="mb-1 text-xs text-zinc-500">QuickBite early access</p>
                          <h2 className="mb-2 text-lg font-semibold text-white">Your first order starts here</h2>
                          <p className="text-sm leading-6 text-zinc-400">
                            Get launch updates, priority access, and the first look at restaurants joining QuickBite in Ile-Ife.
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-500" aria-hidden="true" />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        "Local restaurants",
                        "Live tracking",
                        "Secure payments",
                      ].map((label) => (
                        <span key={label} className="rounded-full bg-zinc-800/55 px-3 py-1 text-xs text-zinc-300">
                          {label}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: reduceMotion ? 0 : 0.65 }}
                    className="mt-8 flex justify-center"
                  >
                    <div className="relative flex w-[14rem] items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-1 backdrop-blur-xl">
                      <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
                        <MapPin className="h-5 w-5 text-orange-400" aria-hidden="true" />
                      </span>
                      <span className="relative z-10 text-sm font-medium text-zinc-200">Launching in Ile-Ife</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            <section className="relative z-10 mt-12 overflow-hidden px-4 py-16 sm:mt-20 sm:px-6 sm:py-20">
              <BackgroundRipple />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
              <div className="relative z-20 mx-auto max-w-5xl">
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.65 }}
                  className="mb-10 text-center sm:mb-12"
                >
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <span className="inline-block rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300">
                      Built for everyone
                    </span>
                    <h2 className="font-display text-3xl font-bold sm:text-4xl">One local delivery network</h2>
                  </div>
                  <p className="mx-auto mt-5 max-w-2xl leading-7 text-zinc-400">
                    QuickBite brings customers, independent kitchens, restaurants, and riders together for a faster way to order locally.
                  </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4">
                  {audiences.map((audience, index) => {
                    const Icon = audience.icon;
                    return (
                      <motion.div
                        key={audience.name}
                        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
                        className="glass-card relative flex min-w-52 items-center gap-3 overflow-hidden rounded-2xl px-6 py-4"
                      >
                        <div className="absolute right-0 bottom-0 h-1/2 w-1/3 rounded-tl-3xl bg-orange-500/15 blur-2xl" />
                        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/15">
                          <Icon className="h-4 w-4 text-orange-400" aria-hidden="true" />
                        </span>
                        <span className="relative font-medium text-white">{audience.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="relative z-10 flex min-h-[100svh] items-center px-4 py-20 sm:px-6">
              <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden pb-16">
                <motion.p
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 130 }}
                  whileInView={{ opacity: 1, y: reduceMotion ? 0 : 55 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reduceMotion ? 0 : 1.3 }}
                  className="outline-display text-[clamp(5rem,20vw,20rem)] font-bold leading-none"
                >
                  Features
                </motion.p>
              </div>

              <div className="relative mx-auto w-full max-w-5xl">
                <FeatureGrid features={features} />
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mt-10 text-center sm:mt-12"
                >
                  <button
                    type="button"
                    onClick={() => document.getElementById("waitlist-hero")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-black transition-colors hover:bg-orange-50"
                  >
                    Join Waitlist
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </motion.div>
              </div>
            </section>

            <section className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 py-20 sm:px-6">
              <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden pb-20">
                <motion.p
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 150 }}
                  whileInView={{ opacity: 1, y: reduceMotion ? 0 : 80 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: reduceMotion ? 0 : 1.3 }}
                  className="outline-display text-[clamp(5rem,23vw,22rem)] font-bold leading-none"
                >
                  Contact
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65 }}
                className="relative mx-auto w-full max-w-3xl"
              >
                <div className="glass-panel relative overflow-hidden rounded-[32px] px-5 py-9 sm:px-10 sm:py-12">
                  <div className="relative mx-auto flex h-20 w-full items-center justify-center">
                    <Image
                      src="/quickbite-logo-light.svg"
                      alt="QuickBite"
                      width={200}
                      height={44}
                      className="h-auto w-44"
                    />
                  </div>

                  <p className="relative mx-auto mt-5 max-w-xl text-center text-sm leading-6 text-zinc-400 sm:text-base">
                    Questions about ordering, partnering, or riding with QuickBite? Our team would love to hear from you.
                  </p>

                  <div className="relative mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <a
                      href="mailto:support@quickbite.ng"
                      className="contact-item group"
                    >
                      <Mail className="h-6 w-6 text-zinc-400 transition-colors group-hover:text-orange-400" aria-hidden="true" />
                      <span className="mt-3 font-semibold text-white">Email us</span>
                      <span className="mt-1 break-all text-sm text-zinc-400">support@quickbite.ng</span>
                    </a>

                    <div className="contact-item">
                      <MapPin className="h-6 w-6 text-zinc-400" aria-hidden="true" />
                      <span className="mt-3 font-semibold text-white">Launching in</span>
                      <span className="mt-1 text-sm text-zinc-400">Ile-Ife, Nigeria</span>
                    </div>

                    <div className="contact-item">
                      <Users className="h-6 w-6 text-zinc-400" aria-hidden="true" />
                      <span className="mt-3 font-semibold text-white">Built for</span>
                      <span className="mt-1 text-sm text-zinc-400">Customers, vendors & riders</span>
                    </div>
                  </div>

                  <div className="relative mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-orange-400" aria-hidden="true" />
                      Fast. Fresh. Delivered.
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5 text-orange-400" aria-hidden="true" />
                      Coming soon
                    </span>
                  </div>
                </div>
              </motion.div>

              <footer className="relative z-10 mt-16 px-6 pb-4 text-center text-sm text-zinc-600">
                Copyright 2026 QuickBite Waitlist
              </footer>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
