"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Container from "../ui/Container";

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      data-nav-theme="dark"
      aria-labelledby="final-cta-title"
      className="relative overflow-visible bg-[#2a211d] py-14 sm:py-20 lg:py-24"
    >
      {/* Top curved SVG (Transitions from previous section to this dark section) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -translate-y-[99%] z-20 h-40 overflow-x-clip overflow-y-visible sm:h-48 sm:overflow-visible"
      >
        <svg
          className="absolute left-1/2 top-0 h-full w-[178vw] -translate-x-1/2 overflow-visible text-[#2a211d] sm:static sm:w-full sm:translate-x-0"
          viewBox="0 0 1440 210"
          preserveAspectRatio="none"
        >
          <path
            d="M0 65C136 110 244 105 392 72C545 38 626 117 770 143C915 169 987 86 1126 59C1255 34 1328 89 1440 55V210H0V65Z"
            fill="currentColor"
          />
          <path
            d="M0 65C136 110 244 105 392 72C545 38 626 117 770 143C915 169 987 86 1126 59C1255 34 1328 89 1440 55"
            fill="none"
            stroke="#f0d7c2"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            d="M22 93C154 132 266 120 406 96C548 72 628 143 764 166C918 191 998 108 1138 87C1258 69 1322 113 1418 86"
            fill="none"
            stroke="#c9aa96"
            strokeDasharray="8 12"
            strokeLinecap="round"
            strokeOpacity=".72"
            strokeWidth="3"
          />
        </svg>
      </div>

      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate flex flex-col lg:flex-row lg:items-center justify-between overflow-hidden rounded-xl2 bg-[#1c120f] text-white shadow-sm"
        >
          {/* Decorative Background Element (Sunburst/Star motif) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none" aria-hidden="true">
            <svg width="600" height="600" viewBox="0 0 100 100" className="text-white animate-[spin_60s_linear_infinite]">
              <path fill="currentColor" d="M50 0 L53 35 L85 15 L65 47 L100 50 L65 53 L85 85 L53 65 L50 100 L47 65 L15 85 L35 53 L0 50 L35 47 L15 15 L47 35 Z" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:py-16 lg:px-14 xl:px-16">
            <div className="max-w-xl">
              <h2
                id="final-cta-title"
                className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl text-white"
              >
                Good food is just a few taps away.
              </h2>
              
              <div className="mt-6 flex flex-col items-start gap-8 sm:flex-row sm:items-center lg:mt-10">
                <p className="max-w-sm text-base leading-relaxed text-white/75 sm:text-lg">
                  Find trusted local kitchens, pick what you are craving, and follow every order from the first tap to your door.
                </p>
                
                <Link
                  href="/restaurants"
                  className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-pill bg-[#f06400] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#e25f00] hover:shadow-lg hover:shadow-[#f06400]/20 active:scale-[0.98]"
                >
                  Explore restaurants
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative z-10 w-full shrink-0 lg:w-[35%] xl:w-[38%]">
            <div className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[26rem] p-4 lg:p-6 lg:pl-0">
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#2a211d]">
                <Image
                  src="/images/food/hero-fast.webp"
                  alt="Golden samosas served with peppers and dipping sauces"
                  fill
                  loading="lazy"
                  quality={72}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
