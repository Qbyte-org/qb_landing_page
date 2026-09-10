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
      data-nav-theme="neutral"
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden bg-[#fffaf5] py-14 sm:py-20 lg:py-24"
    >
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate flex flex-col lg:flex-row lg:items-center justify-between overflow-hidden rounded-xl2 bg-[#fff0e4] text-[#1a1a2e] shadow-sm"
        >
          {/* Decorative Background Element (Sunburst/Star motif) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none mix-blend-multiply" aria-hidden="true">
            <svg width="600" height="600" viewBox="0 0 100 100" className="text-[#f06400] animate-[spin_60s_linear_infinite]">
              <path fill="currentColor" d="M50 0 L53 35 L85 15 L65 47 L100 50 L65 53 L85 85 L53 65 L50 100 L47 65 L15 85 L35 53 L0 50 L35 47 L15 15 L47 35 Z" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:py-16 lg:px-14 xl:px-16">
            <div className="max-w-xl">
              <h2
                id="final-cta-title"
                className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl text-[#1a1a2e]"
              >
                Good food is just a few taps away.
              </h2>
              
              <div className="mt-6 flex flex-col items-start gap-8 sm:flex-row sm:items-center lg:mt-10">
                <p className="max-w-sm text-base leading-relaxed text-[#1a1a2e]/75 sm:text-lg">
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
