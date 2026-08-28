"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Send,
  ShoppingBasket,
  Crown,
  Store,
  Timer,
  Truck,
  Users,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import MagneticFillButton from "../ui/MagneticFillButton";

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
  const [phone, setPhone] = useState("");
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
            phone: phone.trim() || "Not provided",
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
        { email: normalizedEmail, phone: phone.trim(), date: new Date().toISOString() },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
      setEmail("");
      setPhone("");
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
    <main className="qb-waitlist relative isolate min-h-screen overflow-x-clip bg-[#2a211d] text-[#fffaf5]">
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
            className="fixed inset-0 z-50 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#2a211d]/90 px-6 backdrop-blur-[2px]"
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

              <div className="relative mt-7 h-px w-[min(18rem,70vw)] overflow-hidden bg-[#fffaf5]/[0.14]">
                <motion.span
                  className="qb-loader-progress block h-full origin-left bg-[#f06400]"
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
              className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6"
            >
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                <h1 className="outline-display text-center text-[20vw] font-bold leading-none tracking-wider text-transparent">
                  Coming<br />soon!
                </h1>
              </div>

              <div className="relative z-10 mx-auto w-full max-w-xl">
                <motion.div
                  {...rise}
                  transition={{ duration: reduceMotion ? 0 : 0.75 }}
                  className="hero-panel relative overflow-hidden rounded-t-[32px] bg-[#fffaf5]/[0.07] p-4 py-6 backdrop-blur-[14px] transition-colors duration-300 hover:bg-[#fffaf5]/[0.1] sm:p-8 sm:py-10"
                >
                  <div className="relative flex items-center justify-center max-sm:mt-10">
                    <h1 className="font-display mb-4 inline-block text-center text-3xl font-bold sm:text-5xl">
                      <span className="bg-gradient-to-b from-[#fffaf5] to-[#c9aa96] bg-clip-text text-transparent">
                        Join our waitlist!
                      </span>
                    </h1>
                  </div>

                  <p className="relative mb-4 px-2 text-center text-sm leading-relaxed text-[#f0d7c2] sm:mb-6 sm:px-0">
                    Be first to know when QuickBite starts delivering fast, fresh meals from local favourites near you.
                  </p>

                  <form onSubmit={handleSubmit} className="relative mb-8 flex w-full flex-col gap-4">
                    <div className="flex w-full flex-col gap-4">
                      <HoverBorderGradient className="w-full" containerClassName="relative flex h-[56px] w-full items-center px-4 rounded-[inherit]">
                        <input
                          id="waitlist-email"
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder=" "
                          disabled={isLoading}
                          required
                          className="peer relative z-10 w-full appearance-none bg-none text-base text-[#fffaf5] placeholder-transparent border-none shadow-none outline-none focus:border-none focus:ring-0 focus:!outline-none focus-visible:!outline-none disabled:opacity-60"
                        />
                        <label
                          htmlFor="waitlist-email"
                          className="pointer-events-none absolute left-4 top-0 z-20 -translate-y-1/2 bg-[#241813] px-1 text-xs text-[#c9aa96] transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#f06400] rounded-full"
                        >
                          Email address
                        </label>
                        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(32%_50%_at_24.325%_25.675%,rgb(255,250,245)_0%,rgba(255,250,245,0)_100%)] opacity-[0.05] blur-[10px]" />
                      </HoverBorderGradient>

                      <HoverBorderGradient className="w-full" containerClassName="relative flex h-[56px] w-full items-center px-4 rounded-[inherit]">
                        <input
                          id="waitlist-phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          placeholder=" "
                          disabled={isLoading}
                          className="peer relative z-10 w-full appearance-none bg-none text-base text-[#fffaf5] placeholder-transparent border-none shadow-none outline-none focus:border-none focus:ring-0 focus:!outline-none focus-visible:!outline-none disabled:opacity-60"
                        />
                        <label
                          htmlFor="waitlist-phone"
                          className="pointer-events-none absolute left-4 top-0 z-20 -translate-y-1/2 bg-[#241813] px-1 text-xs text-[#c9aa96] transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#f06400] rounded-full" 
                        >
                          Phone number (optional)
                        </label>
                        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(32%_50%_at_24.325%_25.675%,rgb(255,250,245)_0%,rgba(255,250,245,0)_100%)] opacity-[0.05] blur-[10px]" />
                      </HoverBorderGradient>
                    </div>

                    <MagneticFillButton
                      disabled={isLoading || !email.trim()}
                      type="submit"
                      className="mt-2 inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#f06400] px-8 py-3 font-semibold text-[#fffaf5] disabled:cursor-not-allowed disabled:opacity-50"
                      customFillClass="bg-[#241813] border-2 border-dashed border-[#f06400] shadow-[0_0_20px_rgba(240,100,0,0.08)]"
                      customHoverTextColor="#fffaf5"
                    >
                      {isLoading ? (
                        <>
                          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Joining...
                        </>
                      ) : (
                        "Join Waitlist"
                      )}
                    </MagneticFillButton>
                  </form>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: reduceMotion ? 0 : 0.65 }}
                    className="mt-8 flex flex-wrap justify-center gap-4"
                  >
                    <div className="relative flex w-[14rem] items-center gap-3 overflow-hidden rounded-xl border border-[#ff7a1a]/[0.28] bg-[#fffaf5]/[0.14] p-1 shadow-[0_0_20px_rgba(240,100,0,0.08)] backdrop-blur-xl">
                      <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#ff7a1a]/[0.28] bg-[#fffaf5]/[0.16] hover:bg-[#ff7a1a]/[0.25] hover:border-[#ff7a1a]">
                        <MapPin className="h-5 w-5 text-[#ffffff]" aria-hidden="true" />
                      </span>
                      <span className="relative z-10 text-sm font-semibold text-white">Launching in Ile-Ife</span>
                    </div>

                    <div className="relative flex items-center gap-1 overflow-hidden rounded-xl border border-[#ff7a1a]/[0.28] bg-[#fffaf5]/[0.14] p-1 shadow-[0_0_20px_rgba(240,100,0,0.08)] backdrop-blur-xl">
                      <span className="relative z-10 mr-2 pl-3 text-sm font-semibold text-white">Follow us</span>
                      <a href="#" className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#fffaf5]/[0.28] bg-[#fffaf5]/[0.16] transition-colors hover:bg-[#ff7a1a]/[0.25] hover:border-[#ff7a1a]">
                        <span className="sr-only">QuickBite updates</span>
                        <MessageCircle className="h-5 w-5 text-[#ffffff]" aria-hidden="true" />
                      </a>
                      <a href="#" className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#fffaf5]/[0.28] bg-[#fffaf5]/[0.16] transition-colors hover:bg-[#ff7a1a]/[0.25] hover:border-[#ff7a1a]">
                        <span className="sr-only">Send QuickBite a message</span>
                        <Send className="h-5 w-5 text-[#ffffff]" aria-hidden="true" />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.85 }}
                className="relative z-10 flex items-center justify-center gap-4.5"
              >
                <div className="relative flex items-center gap-3 overflow-hidden rounded-b-xl border border-[#fffaf51a] bg-[#fffaf5]/[0.14] p-1 pr-4 shadow-[0_0_20px_rgba(240,100,0,0.08)] backdrop-blur-xl">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-b-xl border border-[#ff7a1a]/[0.28] bg-[#fffaf5]/[0.16]">
                    <Crown className="h-5 w-5 text-[#ffffff]" aria-hidden="true" />
                  </span>
                  <span className="relative z-10 text-sm font-semibold text-white">Early bird perks</span>
                </div>

                <div className="relative flex items-center gap-3 overflow-hidden rounded-b-xl border border-[#fffaf51a] bg-[#fffaf5]/[0.14] p-1 pr-4 shadow-[0_0_20px_rgba(240,100,0,0.08)] backdrop-blur-xl">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-b-xl border border-[#ff7a1a]/[0.28] bg-[#fffaf5]/[0.16]">
                    <Timer className="h-5 w-5 text-[#ffffff]" aria-hidden="true" />
                  </span>
                  <span className="relative z-10 text-sm font-semibold text-white">Fast delivery</span>
                </div>

                <div className="relative flex items-center gap-3 overflow-hidden rounded-b-xl border border-[#fffaf51a] bg-[#fffaf5]/[0.14] p-1 pr-4 shadow-[0_0_20px_rgba(240,100,0,0.08)] backdrop-blur-xl">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-b-xl border border-[#ff7a1a]/[0.28] bg-[#fffaf5]/[0.16]">
                    <CircleDollarSign className="h-5 w-5 text-[#ffffff]" aria-hidden="true" />
                  </span>
                  <span className="relative z-10 text-sm font-semibold text-white">No hidden fees</span>
                </div>
              </motion.div>
            </section>

            {/* <section className="relative z-10 mt-12 overflow-hidden px-4 py-16 sm:mt-20 sm:px-6 sm:py-20">
              <BackgroundRipple />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#2a211d]/35 via-transparent to-[#2a211d]/35" />
              <div className="relative z-20 mx-auto max-w-5xl">
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.65 }}
                  className="mb-10 text-center sm:mb-12"
                >
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <span className="inline-block rounded-full border border-[#fffaf5]/[0.12] bg-[#fffaf5]/[0.08] px-4 py-2 text-sm text-[#f0d7c2]">
                      Built for everyone
                    </span>
                    <h2 className="font-display text-3xl font-bold sm:text-4xl">One local delivery network</h2>
                  </div>
                  <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#f0d7c2]">
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
                        <div className="absolute right-0 bottom-0 h-1/2 w-1/3 rounded-tl-3xl bg-[#f06400]/[0.18] blur-2xl" />
                        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#f06400]/[0.18]">
                          <Icon className="h-4 w-4 text-[#f06400]" aria-hidden="true" />
                        </span>
                        <span className="relative font-medium text-[#fffaf5]">{audience.name}</span>
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
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f06400] px-8 py-3 font-semibold text-[#fffaf5] transition-colors hover:bg-[#ff7a1a]"
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

                  <p className="relative mx-auto mt-5 max-w-xl text-center text-sm leading-6 text-[#f0d7c2] sm:text-base">
                    Questions about ordering, partnering, or riding with QuickBite? Our team would love to hear from you.
                  </p>

                  <div className="relative mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <a
                      href="mailto:support@quickbite.ng"
                      className="contact-item group"
                    >
                      <Mail className="h-6 w-6 text-[#c9aa96] transition-colors group-hover:text-[#f06400]" aria-hidden="true" />
                      <span className="mt-3 font-semibold text-[#fffaf5]">Email us</span>
                      <span className="mt-1 break-all text-sm text-[#f0d7c2]">support@quickbite.ng</span>
                    </a>

                    <div className="contact-item">
                      <MapPin className="h-6 w-6 text-[#c9aa96]" aria-hidden="true" />
                      <span className="mt-3 font-semibold text-[#fffaf5]">Launching in</span>
                      <span className="mt-1 text-sm text-[#f0d7c2]">Ile-Ife, Nigeria</span>
                    </div>

                    <div className="contact-item">
                      <Users className="h-6 w-6 text-[#c9aa96]" aria-hidden="true" />
                      <span className="mt-3 font-semibold text-[#fffaf5]">Built for</span>
                      <span className="mt-1 text-sm text-[#f0d7c2]">Customers, vendors & riders</span>
                    </div>
                  </div>

                  <div className="relative mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[#c9aa96]">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#f06400]" aria-hidden="true" />
                      Fast. Fresh. Delivered.
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5 text-[#f06400]" aria-hidden="true" />
                      Coming soon
                    </span>
                  </div>
                </div>
              </motion.div>

              <footer className="relative z-10 mt-16 px-6 pb-4 text-center text-sm text-[#8a6b5a]">
                Copyright 2026 QuickBite Waitlist
              </footer>
            </section> */}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

