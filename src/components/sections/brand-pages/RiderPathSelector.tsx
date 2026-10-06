"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Bike, Check, House, Navigation, Store, UsersRound } from "lucide-react";
import { ridersPage } from "@/content/riders-page";
import MagneticFillButton from "@/components/ui/MagneticFillButton";

function RouteDrawing({ dispatch }: { dispatch: boolean }) {
  const reducedMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 620 260" fill="none" aria-hidden="true" focusable="false" className="h-auto max-h-64 w-full overflow-visible">
      <g stroke="currentColor" strokeOpacity="0.09" strokeWidth="1.5">
        <path d="M0 52H620M0 130H620M0 208H620M77 0V260M232 0V260M387 0V260M542 0V260" />
        <rect x="94" y="68" width="120" height="46" rx="12" />
        <rect x="249" y="146" width="120" height="46" rx="12" />
        <rect x="405" y="68" width="120" height="46" rx="12" />
        <rect x="405" y="226" width="120" height="34" rx="12" />
        <rect x="94" y="226" width="120" height="34" rx="12" />
      </g>
      <motion.g key={dispatch ? "team" : "rider"} initial={false} animate={{ opacity: 1 }} whileInView={reducedMotion === false ? { opacity: [0, 1] } : undefined} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.3 }}>
        {dispatch ? (
          <>
            <motion.path d="M94 130H268Q290 130 290 108V78Q290 52 316 52H510M94 130H510M290 130V183Q290 208 316 208H510" stroke="var(--color-brand)" strokeWidth="5" strokeLinecap="round" initial={false} animate={{ pathLength: 1 }} whileInView={reducedMotion === false ? { pathLength: [0, 1] } : undefined} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.65 }} />
            {[52, 130, 208].map((y) => (
              <g key={y}>
                <circle cx="514" cy={y} r="29" fill="var(--color-paper)" />
                <Bike x="492" y={y - 22} width="44" height="44" stroke="var(--color-brand)" strokeWidth="1.9" />
              </g>
            ))}
            <circle cx="94" cy="130" r="40" fill="var(--color-brand)" />
            <UsersRound x="75" y="111" width="38" height="38" stroke="var(--color-paper)" strokeWidth="1.5" />
          </>
        ) : (
          <>
            <motion.path d="M78 173H203Q226 173 226 150V111Q226 88 249 88H394Q416 88 416 110V150Q416 173 440 173H542" stroke="var(--color-brand)" strokeWidth="6" strokeLinecap="round" initial={false} animate={{ pathLength: 1 }} whileInView={reducedMotion === false ? { pathLength: [0, 1] } : undefined} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.65 }} />
            <circle cx="78" cy="173" r="29" fill="var(--color-paper)" />
            <Store x="62" y="157" width="32" height="32" stroke="var(--color-ink)" strokeWidth="1.5" />
            <circle cx="542" cy="173" r="29" fill="var(--color-paper)" />
            <House x="526" y="157" width="32" height="32" stroke="var(--color-ink)" strokeWidth="1.5" />
            <circle cx="321" cy="88" r="44" fill="var(--color-dark-ink)" stroke="var(--color-brand)" strokeOpacity="0.3" />
            <circle cx="321" cy="88" r="34" fill="var(--color-brand)" />
            <Bike x="293" y="60" width="56" height="56" stroke="var(--color-paper)" strokeWidth="1.8" />
          </>
        )}
      </motion.g>
    </svg>
  );
}

export default function RiderPathSelector() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const { paths } = ridersPage;
  const pathway = paths.pathways[selected];

  return (
    <div className="grid items-stretch gap-8 md:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-16">
      <div className="min-w-0">
        <div role="group" aria-label={paths.selectorLabel} className="border-t border-ink/20">
          {paths.pathways.map((path, index) => (
            <button
              key={path.number}
              id={`${id}-choice-${index}`}
              type="button"
              aria-pressed={selected === index}
              aria-controls={`${id}-details ${id}-route`}
              onClick={() => setSelected(index)}
              className={`group flex w-full cursor-pointer items-center gap-3 border-b border-ink/20 py-5 text-left transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:gap-4 ${selected === index ? "text-brand" : "text-ink hover:text-brand"}`}
            >
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors motion-reduce:transition-none ${selected === index ? "border-brand bg-brand text-paper" : "border-ink/20 text-cocoa"}`}><path.icon className="size-5" strokeWidth={1.65} aria-hidden="true" /></span>
              <span className="min-w-0 flex-1"><span className="block font-display text-lg font-semibold tracking-tight sm:text-xl">{path.label}</span><span className="mt-1 block text-xs leading-relaxed text-cocoa sm:text-sm">{path.subtitle}</span></span>
              <ArrowUpRight aria-hidden="true" className={`size-5 shrink-0 transition-transform motion-reduce:transition-none ${selected === index ? "rotate-45" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`} />
            </button>
          ))}
        </div>

        <div id={`${id}-details`} role="region" aria-labelledby={`${id}-choice-${selected}`} className="pt-7 sm:pt-8">
          <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-[1.65rem]">{pathway.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-cocoa sm:text-base">{pathway.description}</p>
          <ul className="my-5 space-y-2.5">
            {pathway.points.map((point) => <li key={point} className="flex items-start gap-2.5 text-xs leading-relaxed sm:text-sm"><Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />{point}</li>)}
          </ul>
          <MagneticFillButton href={pathway.href} variant="brand" className="min-h-12 rounded-full bg-brand! px-5 py-3.5 text-sm sm:px-6">{pathway.action}<ArrowRight className="size-4 shrink-0" aria-hidden="true" /></MagneticFillButton>
        </div>
      </div>

      <div id={`${id}-route`} aria-labelledby={`${id}-route-title`} className="relative flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] bg-dark-ink p-5 text-paper sm:rounded-[2.5rem] sm:p-7">
        <div className="flex items-center justify-between gap-4 border-b border-paper/15 pb-5">
          <p className="flex items-center gap-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-paper/65 sm:text-[0.65rem]">
            {paths.boardLabel}
          </p>
          <span aria-hidden="true" className="font-mono text-xs text-paper/50">0{selected + 1}<span className="ml-1.5 text-paper/30">/ 02</span></span>
        </div>
        <h3 id={`${id}-route-title`} className="mt-6 max-w-sm font-display text-[clamp(1.6rem,2.5vw,2rem)] font-semibold leading-[1.12] tracking-[-0.045em]">{pathway.route.title}</h3>
        <div className="my-3 flex min-h-64 flex-1 items-center"><RouteDrawing dispatch={selected === 1} /></div>
        <div className="flex items-center justify-between gap-3 text-xs font-semibold sm:text-sm"><span>{pathway.route.start}</span><ArrowRight className="size-4 shrink-0 text-brand" aria-hidden="true" /><span className="text-right">{pathway.route.end}</span></div>
        <div className="mt-5 flex items-center gap-3 border-t
        border-paper/15 pt-4"><Navigation className="size-5 shrink-0 text-brand" aria-hidden="true" /><div><p className="text-xs font-medium sm:text-sm">{pathway.route.caption}</p><p className="mt-1 text-[0.65rem] text-paper/50">{paths.previewLabel}</p></div></div>
      </div>
    </div>
  );
}
