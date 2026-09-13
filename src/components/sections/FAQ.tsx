"use client";

import { MessageCircle, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import MagneticFillButton from "../ui/MagneticFillButton";
import LinkArrow from "../ui/LinkArrow";
import SectionTag from "../ui/SectionTag";
import { faqs } from "@/content/site";

export default function FAQ() {
  const reducedMotion = useReducedMotion();
  return (
    <section
      id="faq"
      data-nav-theme="neutral"
      aria-labelledby="faq-title"
      className="scroll-mt-24 bg-paper text-ink"
    >
        <div className="grid lg:grid-cols-2">
          <div data-faq-surface="cream" className="bg-cream-200 px-6 py-14 sm:px-10 sm:py-16 lg:px-[5vw] lg:py-20">
          <motion.div initial={false} whileInView={reducedMotion === false ? { opacity: [0.7, 1], y: [14, 0] } : undefined} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="mx-auto max-w-[46rem]">
            <SectionTag>FAQ</SectionTag>
            <h2
              id="faq-title"
              className="section-heading mt-5 max-w-lg leading-[1.08]!"
            >
              <span className="block">Good questions.</span>
              <span className="mt-3 block text-[#6d5c52]">Clear answers.</span>
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-[#6d5c52] sm:text-lg">
              From your first order to your next opportunity, here&apos;s what
              you need to know about QuickBite.
            </p>

            <div className="mt-8 flex max-w-sm items-start gap-4 border-t border-dashed border-[#2a211d]/20 pt-6 lg:mt-12">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#ffe7d7]">
                <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-sm text-[#6d5c52]">Still have something on your mind?</p>
                <LinkArrow
                  href="mailto:support@quickbite.ng"
                  variant="light"
                  className="mt-3 min-h-11 text-base! normal-case! [--link-arrow-spacing:0em]"
                >
                  Talk to our team
                </LinkArrow>
              </div>
            </div>
          </motion.div>
          </div>

          <div data-faq-surface="paper" className="min-w-0 bg-paper px-6 py-14 sm:px-10 sm:py-16 lg:px-[5vw] lg:py-20">
          <motion.div initial={false} whileInView={reducedMotion === false ? { opacity: [0.7, 1], y: [14, 0] } : undefined} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5, delay: 0.08 }} className="mx-auto max-w-[46rem] border-t border-ink/20">
            {faqs.map((faq, i) => (
              <details
                key={faq.question}
                name="quickbite-faq"
                open={i === 0}
                className="group border-b border-[#2a211d]/20 transition-colors duration-200 open:bg-cream-200 motion-reduce:transition-none [&_summary::-webkit-details-marker]:hidden"
              >
                <MagneticFillButton
                  as="summary"
                  variant="white"
                  ariaLabel={faq.question}
                  customFillClass="bg-cream-200"
                  customHoverTextColor="#2a211d"
                  className="block! min-h-24 w-full list-none bg-transparent! px-2 py-6 text-left text-ink! focus-visible:outline-2! focus-visible:outline-ink! focus-visible:outline-offset-[-3px] sm:px-5"
                  contentClassName="grid! w-full grid-cols-[1.25rem_minmax(0,1fr)_2rem] items-center gap-3! sm:grid-cols-[1.5rem_minmax(0,1fr)_2.5rem] sm:gap-5!"
                >
                  <span aria-hidden="true" className="self-start pt-1 text-xs font-medium tabular-nums text-[#6d5c52]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-semibold leading-snug sm:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#2a211d]/20 transition-colors duration-200 group-open:border-[#2a211d] group-open:bg-peach motion-reduce:transition-none sm:size-10"
                    aria-hidden="true"
                  >
                    <Plus className="size-4 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none sm:size-5" strokeWidth={1.7} />
                  </span>
                </MagneticFillButton>
                <div
                  className="invisible grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out group-open:visible group-open:grid-rows-[1fr] group-open:opacity-100 motion-reduce:transition-none"
                >
                  <div className="min-h-0 overflow-hidden pb-7 pl-10 pr-4 sm:pl-16 sm:pr-20">
                    <p className="max-w-xl text-sm leading-7 text-[#6d5c52] sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </motion.div>
          </div>
        </div>
    </section>
  );
}
