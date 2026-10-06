"use client";

import Image from "@/components/ui/SiteImage";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { companyContent, companyProfiles as profiles } from "@/content/company";
import Container from "@/components/ui/Container";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import SectionWave from "@/components/ui/SectionWave";
import { keepNestedWheelScroll } from "@/lib/nested-scroll";

/** A full-height arched profile selector inspired by the coffee-card reference. */
export default function CompanyTeamHero() {
  const [selection, setSelection] = useState({ index: 0, direction: 1 });
  const listRef = useRef<HTMLDivElement>(null);
  const profileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const profile = profiles[selection.index];
  const shouldAnimate = reducedMotion === false;

  useEffect(() => {
    const list = listRef.current;
    const active = profileRefs.current[selection.index];
    if (!list || !active) return;

    // Scroll only this panel; scrollIntoView would also move the whole page.
    const listBox = list.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    const top = list.scrollTop + activeBox.top - listBox.top;
    const bottom = top + activeBox.height;
    const padding = 6;
    const nextTop = top < list.scrollTop + padding
      ? top - padding
      : bottom > list.scrollTop + list.clientHeight - padding
        ? bottom - list.clientHeight + padding
        : list.scrollTop;
    if (Math.abs(nextTop - list.scrollTop) > 1) {
      list.scrollTo({ top: nextTop, behavior: shouldAnimate ? "smooth" : "auto" });
    }
  }, [selection.index, shouldAnimate]);

  function selectProfile(index: number) {
    setSelection((current) => index === current.index ? current : {
      index,
      direction: index > current.index ? 1 : -1,
    });
  }

  function stepProfile(direction: -1 | 1) {
    setSelection((current) => ({
      index: (current.index + direction + profiles.length) % profiles.length,
      direction,
    }));
  }

  function handleProfileKeys(event: KeyboardEvent<HTMLDivElement>) {
    let next: number;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (selection.index + 1) % profiles.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (selection.index - 1 + profiles.length) % profiles.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = profiles.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    selectProfile(next);
    profileRefs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <>
      <section id="company-hero" aria-labelledby="company-hero-title" data-nav-theme="hero" data-scroll-hero className="relative isolate overflow-hidden bg-dark-ink pt-36 text-paper sm:pt-40 lg:min-h-svh lg:pt-32">
        <Container className="max-w-[1600px]! lg:px-12 xl:px-16">
          <div id="company-team" data-header-hero-rail className="grid gap-9 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.25fr)_minmax(0,.9fr)] lg:items-stretch lg:gap-10 lg:py-12 xl:gap-14">
            <div data-scroll-hero-copy className="order-1 min-w-0 pb-2 lg:flex lg:flex-col lg:justify-center lg:pb-0">
              <motion.div
                data-company-reveal="copy"
                initial={false}
                whileInView={shouldAnimate ? { opacity: [0.35, 1], y: [20, 0] } : undefined}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand sm:text-sm">
                <span aria-hidden="true" className="h-px w-8 bg-brand" />
                {companyContent.hero.eyebrow}
              </p>
              <h1 id="company-hero-title" className="mt-4 font-display text-[2.5rem] font-semibold leading-[1.03] tracking-[0.01em]! sm:text-5xl lg:text-[clamp(2.3rem,3.1vw,3.3rem)]">
                {companyContent.hero.title[0]}<br /><span className="text-brand">{companyContent.hero.title[1]}</span>
              </h1>
              <div className="mt-8 flex items-center gap-3 border-t border-paper/15 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-paper/55 lg:mt-9">
                <span className="tabular-nums text-brand-light">0{selection.index + 1} / 0{profiles.length}</span>
                {companyContent.hero.sharedPurpose}
              </div>
              <div id="company-profile-description" className="relative mt-5 min-h-[13rem] sm:min-h-[11rem] lg:min-h-[14rem]" aria-live="polite" aria-atomic="true">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={profile.id}
                    initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldAnimate ? { opacity: 0, y: -12 } : { opacity: 0 }}
                    transition={{ duration: shouldAnimate ? 0.24 : 0 }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-light">{profile.label}</p>
                    <h2 className="mt-3 max-w-[14ch] font-display text-[1.8rem] font-semibold leading-[1.08] tracking-[0.01em]! sm:text-3xl">{profile.title}</h2>
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/70 sm:text-base">{profile.description}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                <MagneticFillButton href={companyContent.hero.primaryAction.href} variant="brand" className="min-h-12 rounded-full bg-brand! px-6 py-3 text-sm">
                  {companyContent.hero.primaryAction.label}
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                </MagneticFillButton>
                {/* <a href={companyContent.hero.secondaryAction.href} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-paper/30 underline-offset-8 transition-colors hover:text-brand-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                  {companyContent.hero.secondaryAction.label}
                  <ArrowDown aria-hidden="true" size={16} />
                </a> */}
              </div>
              </motion.div>
            </div>

            <div data-scroll-hero-media className="relative order-2 mx-auto w-full max-w-[32rem] lg:flex lg:max-w-none">
              <motion.div
                data-company-portrait
                initial={false}
                whileInView={shouldAnimate ? { opacity: [0.45, 1], scale: [0.98, 1] } : undefined}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative isolate aspect-[.68] w-full overflow-hidden rounded-t-[16rem] border border-paper/20 bg-cream-200 lg:aspect-auto lg:min-h-[35rem] lg:flex-1"
              >
                <AnimatePresence initial={false} custom={selection.direction} mode="sync">
                  <motion.div
                    key={profile.id}
                    custom={selection.direction}
                    variants={{
                      enter: (direction: number) => ({ y: `${direction * 100}%`, rotate: direction * 8, opacity: 0 }),
                      present: { y: "0%", rotate: 0, opacity: 1 },
                      leave: (direction: number) => ({ y: `${direction * -100}%`, rotate: direction * -8, opacity: 0 }),
                    }}
                    initial={shouldAnimate ? "enter" : false}
                    animate="present"
                    exit={shouldAnimate ? "leave" : { opacity: 0 }}
                    transition={{ duration: shouldAnimate ? 0.72 : 0, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={profile.image}
                      alt={profile.imageAlt}
                      fill
                      preload
                      sizes="(min-width: 1600px) 540px, (min-width: 1024px) 38vw, (min-width: 640px) 512px, 90vw"
                      className={`object-cover ${profile.portraitPosition}`}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <div data-team-selector className="relative isolate order-3 flex min-w-0 flex-col justify-center pb-10 lg:pb-0">
              <motion.p
                data-company-reveal="skills-heading"
                initial={false}
                whileInView={shouldAnimate ? { opacity: [0.35, 1], y: [12, 0] } : undefined}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-paper/55"
              >{companyContent.hero.skillsTitle}</motion.p>
              <p id="company-profile-instructions" className="sr-only">{companyContent.hero.keyboardInstructions}</p>
              <div ref={listRef} data-team-profile-list data-lenis-prevent-touch onWheel={keepNestedWheelScroll} className="relative -mx-1.5 h-89 touch-pan-y overflow-x-hidden overflow-y-auto overscroll-y-auto p-1.5 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:var(--color-brand)_color-mix(in_srgb,var(--color-paper)_8%,transparent)] min-[430px]:max-lg:h-43 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-paper/8 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand" role="group" aria-label={companyContent.hero.skillsLabel} aria-describedby="company-profile-instructions" onKeyDown={handleProfileKeys}>
              <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 lg:grid-cols-1">
              {profiles.map((item, index) => {
                const active = selection.index === index;
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    data-team-skill-reveal
                    ref={(element) => { profileRefs.current[index] = element; }}
                    type="button"
                    aria-pressed={active}
                    aria-controls="company-profile-description"
                    tabIndex={active ? 0 : -1}
                    onClick={() => selectProfile(index)}
                    initial={false}
                    whileInView={shouldAnimate ? { opacity: [0.45, 1], x: [12, 0] } : undefined}
                    viewport={{ root: listRef, amount: 0.35, once: false }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`group relative flex min-h-20 items-center gap-3 rounded-full border px-3 py-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none ${active ? "border-brand bg-brand text-paper" : "border-paper/15 bg-paper/5 text-paper hover:border-paper/40 hover:bg-paper/10"}`}
                  >
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-paper/25 bg-cream-200">
                      <Image src={item.image} alt="" fill sizes="48px" className="object-cover object-[50%_30%]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${active ? "text-paper/80" : "text-paper/45"}`}>{item.shortLabel}</span>
                      <span className="mt-1 block text-sm font-semibold leading-tight">{item.label}</span>
                    </span>
                    <Icon aria-hidden="true" className="mr-1 size-4 shrink-0 opacity-65" />
                  </motion.button>
                );
              })}
              </div>
              </div>
              <motion.div
                data-team-profile-controls
                data-company-reveal="controls"
                initial={false}
                whileInView={shouldAnimate ? { opacity: [0.4, 1], y: [12, 0] } : undefined}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="mt-7 flex items-center justify-between gap-3 border-t border-paper/15 pt-5"
              >
                <span aria-hidden="true" className="font-mono text-xs tabular-nums text-paper/55">
                  <span className="text-paper">{String(selection.index + 1).padStart(2, "0")}</span> / {String(profiles.length).padStart(2, "0")}
                </span>
                <div className="flex shrink-0 gap-2">
                  <MagneticFillButton as="button" onClick={() => stepProfile(-1)} ariaLabel={companyContent.hero.previousLabel} variant="cream" className="size-11 rounded-full border! border-paper/20! bg-paper!">
                    <ArrowLeft aria-hidden="true" size={18} />
                  </MagneticFillButton>
                  <MagneticFillButton as="button" onClick={() => stepProfile(1)} ariaLabel={companyContent.hero.nextLabel} variant="cream" className="size-11 rounded-full border! border-paper/20! bg-paper!">
                    <ArrowRight aria-hidden="true" size={18} />
                  </MagneticFillButton>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
      <SectionWave to="paper" />
    </>
  );
}
