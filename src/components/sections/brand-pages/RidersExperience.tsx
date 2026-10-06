import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { riderContent } from "@/content/brand-pages";
import { ridersPage } from "@/content/riders-page";
import BackgroundGrainTexture from "@/components/ui/BackgroundGrainTexture";
import Container from "@/components/ui/Container";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import Reveal from "@/components/ui/Reveal";
import SectionTag from "@/components/ui/SectionTag";
import SectionWave from "@/components/ui/SectionWave";
import FinalCTA from "../FinalCTA";
import RiderPathSelector from "./RiderPathSelector";
import RiderShowcase from "./RiderShowcase";

export default function RidersExperience() {
  const { paths, journey, essentials } = ridersPage;

  return (
    <div className="overflow-hidden bg-paper text-ink">
      <RiderShowcase />
      <SectionWave to="paper" from="dark-ink" />

      <section id="rider-paths" data-nav-theme="neutral" aria-labelledby="rider-paths-title" className="scroll-mt-28 bg-paper pb-12 pt-8 sm:pb-20 sm:pt-10 lg:pt-12">
        <Container>
          <Reveal className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <SectionTag>{paths.tag}</SectionTag>
              <h2 id="rider-paths-title" className="mt-6 font-display text-[clamp(2.4rem,5.2vw,4.6rem)] font-semibold leading-[1.06] tracking-[-0.06em]">{paths.title[0]}<br /><span className="text-brand">{paths.title[1]}</span></h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-cocoa sm:text-lg lg:pb-1">{paths.description}</p>
          </Reveal>

          <Reveal className="mt-9 sm:mt-12"><RiderPathSelector /></Reveal>
        </Container>
      </section>

      <SectionWave to="ink" from="paper" />
      <section id="rider-journey" data-nav-theme="dark" aria-labelledby="rider-journey-title" className="relative isolate bg-dark-ink py-8 text-paper sm:py-12 lg:py-16">
        {/* <BackgroundGrainTexture /> */}
        <Container className="relative">
          <Reveal className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-paper/65"><span aria-hidden="true" className="h-px w-8 bg-brand" />{journey.tag}</p>
              <h2 id="rider-journey-title" className="mt-6 font-display text-[clamp(2.35rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.06em]">{journey.title[0]}<br /><span className="text-brand">{journey.title[1]}</span></h2>
            </div>
            <div className="max-w-md lg:pb-1"><p className="text-base leading-relaxed text-paper/70 sm:text-lg">{journey.description}</p><p className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"><MapPin className="size-4 text-brand" aria-hidden="true" />{journey.location}</p></div>
          </Reveal>

          <ol className="relative mt-14 grid gap-9 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-14">
            {journey.steps.map((step, index) => (
              <li key={step.number} className="relative before:absolute before:bottom-[-2.25rem] before:left-6 before:top-6 before:border-l before:border-dashed before:border-paper/20 last:before:hidden md:before:bottom-auto md:before:left-6 md:before:top-6 md:before:w-[calc(100%+2rem)] md:before:border-l-0 md:before:border-t lg:before:w-[calc(100%+3.5rem)]">
                <Reveal delay={index * 0.08} className="grid grid-cols-[3rem_1fr] items-start gap-x-5 md:block">
                  <span className="relative flex size-12 items-center justify-center rounded-full border border-brand bg-dark-ink text-brand"><step.icon className="size-5" strokeWidth={1.6} aria-hidden="true" /></span>
                  <div className="md:mt-7">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-paper/50"><span className="mr-2 font-mono text-brand">{step.number}</span>{step.label}</p>
                    <h3 className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">{step.title}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/70 sm:text-base">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-12 border-t border-paper/15 pt-6 text-xs leading-relaxed text-paper/55 sm:mt-16">{journey.note}</p>
        </Container>
      </section>
      <SectionWave to="paper" from="dark-ink" />

      <section data-nav-theme="neutral" aria-labelledby="rider-community-title" className="bg-paper pb-14 pt-8 sm:pb-20 sm:pt-10 lg:pb-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionTag>{essentials.tag}</SectionTag>
            <h2 id="rider-community-title" className="mt-6 font-display text-[clamp(2.35rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.06em]">{essentials.title[0]}<br /><span className="text-brand">{essentials.title[1]}</span></h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cocoa sm:text-lg">{essentials.description}</p>
            <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-ink/15 py-3 pl-3 pr-6"><span className="flex size-11 items-center justify-center rounded-full bg-cream-200 text-brand"><MapPin className="size-5" aria-hidden="true" /></span><div><p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-cocoa">{essentials.locationCaption}</p><p className="mt-1 text-sm font-semibold">{essentials.location}</p></div></div>
          </Reveal>
          <Reveal className="border-t border-ink/15">
            {essentials.items.map((item) => (
              <div key={item.title} className="flex gap-4 border-b border-ink/15 py-7 sm:gap-6 sm:py-8"><item.icon className="mt-1 size-6 shrink-0 text-brand" strokeWidth={1.5} aria-hidden="true" /><div><h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-cocoa sm:text-base">{item.description}</p></div></div>
            ))}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"><MagneticFillButton href={essentials.action.href} variant="brand" className="min-h-13 rounded-full bg-brand! px-6 py-4 text-sm">{essentials.action.label}<ArrowRight className="size-4 shrink-0" aria-hidden="true" /></MagneticFillButton><a href={essentials.secondaryAction.href} className="inline-flex min-h-11 items-center gap-2 border-b border-ink/25 text-xs font-semibold transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">{essentials.secondaryAction.label}<ArrowUpRight className="size-4 shrink-0" aria-hidden="true" /></a></div>
            <p className="mt-5 text-xs leading-relaxed text-cocoa">{essentials.footnote}</p>
          </Reveal>
        </Container>
      </section>

      <FinalCTA id="rider-cta" {...riderContent.cta} splitBackground={false} />
    </div>
  );
}
