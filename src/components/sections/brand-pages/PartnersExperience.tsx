"use client";

import { ArrowDownRight, Sparkles } from "lucide-react";
import { partnerContent } from "@/content/brand-pages";
import { partnersPageContent as content } from "@/content/partners-page";
import Container from "@/components/ui/Container";
import FoodImage from "@/components/ui/FoodImage";
import Reveal from "@/components/ui/Reveal";
import SectionWave from "@/components/ui/SectionWave";
import FinalCTA from "@/components/sections/FinalCTA";
import PartnerShowcase from "./PartnerShowcase";
import PartnerReadiness from "./PartnerReadiness";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { partnerDishes } from "@/content/partner-dishes";

export default function PartnersExperience() {
  const [selectedDish, setSelectedDish] = useState(0);
  const reducedMotion = useReducedMotion();
  const dish = partnerDishes[selectedDish];

  return (
    <>
      <PartnerShowcase selected={selectedDish} onSelect={setSelectedDish} />

      <section id="partner-benefits" aria-labelledby="partner-benefits-title" data-nav-theme="neutral" className="bg-paper pt-10 pb-4 text-ink sm:pt-14 lg:pt-16 lg:pb-10">
        <Container>
          <Reveal className="grid gap-7 md:grid-cols-[1.35fr_1fr] md:items-end md:gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
            <div>
              <p className="mb-[1.35rem] text-[.68rem] font-semibold leading-[1.6] tracking-[.15em] text-cocoa uppercase sm:text-[.7rem]">{content.benefits.chapter}</p>
              <h2 id="partner-benefits-title" className="font-display text-[clamp(2.3rem,4.7vw,4.3rem)] font-semibold leading-[1.07] tracking-[-.055em] text-balance [&>span]:text-brand">
                {content.benefits.title[0]}<br /><span>{content.benefits.title[1]}</span>
              </h2>
            </div>
            <p className="max-w-108 text-[.95rem] leading-[1.8] text-cocoa md:pb-[.2rem] lg:text-base">{content.benefits.description}</p>
          </Reveal>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-start lg:mt-16 lg:gap-20">
            <div className="relative min-w-0">
              <Reveal mode="image" className="relative aspect-[1.13] overflow-hidden rounded-[2.5rem] bg-dark-ink after:absolute after:inset-x-0 after:top-[45%] after:bottom-0 after:bg-linear-to-b after:from-transparent after:to-dark-ink/88 after:content-[''] md:aspect-[.92] lg:aspect-[1.04] border border-ink/12">
                <AnimatePresence initial={false}>
                  <motion.div key={dish.id} data-partner-benefit-dish={dish.id} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .5 }}>
                    <FoodImage src={dish.image} alt={dish.alt} fill sizes="(min-width: 1280px) 560px, (min-width: 768px) 46vw, 92vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-5 bottom-5 z-1 flex items-center justify-between gap-4 font-display text-[1.1rem] font-semibold text-paper lg:inset-x-[1.7rem] lg:bottom-[1.7rem] lg:text-xl">
                  <span>{content.benefits.imageCaption}</span>
                  <ArrowDownRight size={28} aria-hidden="true" />
                </div>
              </Reveal>
              <Reveal delay={0.12} className="relative z-2 -mt-px ml-[6%] w-[min(85%,23rem)] rounded-b-[2.5rem] border border-t-0 border-ink/12 bg-cream-200 px-[1.4rem] py-[1.2rem] sm:px-[1.8rem] sm:py-6 md:w-[85%]">
                {/* <Sparkles className="absolute top-[1.3rem] right-[1.3rem] text-brand" size={22} aria-hidden="true" /> */}
                {/* <p className="pr-[1.8rem] text-[.58rem] tracking-[.15em] text-cocoa uppercase">{content.benefits.note.eyebrow}</p> */}
                <p className="mt-[.7rem] font-display text-[1.6rem] font-semibold leading-[1.12] tracking-[-.04em] sm:text-[2rem]">{content.benefits.note.title[0]} {content.benefits.note.title[1]}</p>
                {/* <p className="mt-4 border-t border-dashed border-ink/22 pt-[.7rem] text-[.6rem] tracking-[.02em] text-cocoa">{content.benefits.note.footer}</p> */}
              </Reveal>
              <div className="mt-[1.6rem] grid gap-5 sm:grid-cols-2 md:grid-cols-1 lg:mt-8 lg:grid-cols-2">
                {content.benefits.kitchenTypes.map((type) => (
                  <Reveal key={type.title} className="flex items-start gap-[.9rem] lg:gap-[.7rem] [&>svg]:mt-[.15rem] [&>svg]:shrink-0 [&>svg]:text-brand [&_h3]:text-[.82rem] [&_h3]:font-semibold [&_p]:mt-1 [&_p]:text-[.76rem] [&_p]:leading-[1.6] [&_p]:text-cocoa">
                    <type.icon size={23} aria-hidden="true" />
                    <div><h3>{type.title}</h3><p>{type.description}</p></div>
                  </Reveal>
                ))}
              </div>
            </div>

            <ol className="border-t border-ink/15 [&>li]:border-b [&>li]:border-ink/15">
              {content.benefits.items.map((item, index) => (
                <li key={item.number}>
                  <Reveal delay={index * 0.05} className="grid grid-cols-[1.8rem_minmax(0,1fr)] gap-[.8rem] py-[1.8rem] md:gap-4 md:py-6 lg:grid-cols-[2rem_minmax(0,1fr)] lg:gap-[1.3rem] lg:py-[2.1rem] [&_h3]:max-w-[16ch] [&_h3]:font-display [&_h3]:text-[clamp(1.45rem,2.2vw,2.1rem)] [&_h3]:font-semibold [&_h3]:leading-[1.2] [&_h3]:tracking-[-.04em]">
                    <span className="pt-[.3rem] text-[.8rem] text-brand tabular-nums" aria-hidden="true">{item.number}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p className="mt-[.9rem] text-[.88rem] leading-[1.8] text-cocoa md:text-[.85rem] lg:max-w-108 lg:text-[.94rem]">{item.description}</p>
                      <p className="mt-[1.15rem] flex items-center gap-[.6rem] text-[.63rem] font-semibold tracking-[.035em] lg:text-[.69rem] [&>span]:h-px [&>span]:w-5 [&>span]:shrink-0 [&>span]:bg-brand"><span aria-hidden="true" />{item.detail}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section id="partner-process" aria-labelledby="partner-process-title" data-nav-theme="dark" className="scroll-mt-20 overflow-hidden bg-dark-ink text-paper">
        <SectionWave to="ink" from="paper" />
        <Container className="pt-8 pb-10 sm:py-12 lg:pt-14 lg:pb-16">
          <Reveal className="grid gap-7 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-24">
            <div>
              <p className="mb-[1.35rem] text-[.68rem] font-semibold leading-[1.6] tracking-[.15em] text-paper/55 uppercase sm:text-[.7rem]">{content.journey.chapter}</p>
              <h2 id="partner-process-title" className="font-display text-[clamp(2.3rem,4.7vw,4.3rem)] font-semibold leading-[1.07] tracking-[-.055em] text-balance [&>span]:text-brand">{content.journey.title[0]}<br /><span>{content.journey.title[1]}</span></h2>
            </div>
            <div className="[&>p]:max-w-md [&>p]:text-[.9rem] [&>p]:leading-[1.8] [&>p]:text-paper/65">
              <p>{content.journey.description}</p>
              <p className="mt-[1.3rem] text-[.67rem] leading-[1.6] text-paper">{content.journey.status}</p>
            </div>
          </Reveal>
          <ol className="mt-8 grid sm:mt-14 sm:grid-cols-2 sm:gap-10 lg:mt-16 lg:grid-cols-4 lg:gap-0 [&>li+li]:border-t [&>li+li]:border-paper/16 sm:[&>li+li]:border-0">
            {content.journey.steps.map((step, index) => (
              <li key={step.number} className="lg:not-first:[&>div]:pl-6 lg:not-last:[&>div]:border-r lg:not-last:[&>div]:border-paper/12">
                <Reveal delay={index * 0.07} className="grid grid-cols-[3.4rem_minmax(0,1fr)] gap-x-[1.1rem] py-6 sm:block sm:border-t sm:border-paper/25 sm:pt-5 lg:pt-8 lg:pr-6 lg:pb-0 [&>h3]:max-w-[15ch] [&>h3]:font-display [&>h3]:text-xl [&>h3]:font-medium [&>h3]:leading-[1.3] sm:[&>h3]:text-[1.45rem] lg:[&>h3]:min-h-[3.6rem] [&>p]:mt-[.8rem] [&>p]:max-w-md [&>p]:text-[.83rem] [&>p]:leading-[1.8] [&>p]:text-paper/60">
                  <div className="row-span-2 flex flex-col items-start gap-[1.2rem] sm:mb-6 sm:flex-row sm:items-center sm:justify-between lg:mb-8 [&>span]:font-display [&>span]:text-[2.3rem] [&>span]:font-medium [&>span]:leading-none [&>span]:tracking-[-.06em] [&>span]:text-brand sm:[&>span]:text-5xl lg:[&>span]:text-[3.5rem] [&>svg]:text-paper/60"><span aria-hidden="true">{step.number}</span><step.icon size={24} aria-hidden="true" /></div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
        <SectionWave to="paper" from="dark-ink" />
      </section>

      <PartnerReadiness />

      <FinalCTA
        id="partner-cta"
        {...partnerContent.cta}
        splitBackground={false}
      />
    </>
  );
}
