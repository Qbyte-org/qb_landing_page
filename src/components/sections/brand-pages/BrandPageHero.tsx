import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import BackgroundGrainTexture from "@/components/ui/BackgroundGrainTexture";
import LinkArrow from "@/components/ui/LinkArrow";
import MagneticFillButton from "@/components/ui/MagneticFillButton";
import SectionWave from "@/components/ui/SectionWave";

type PageAction = { label: string; href: string };

type BrandPageHeroProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  primaryAction: PageAction;
  secondaryAction?: PageAction;
  children: ReactNode;
  footer?: ReactNode;
};

/** The home hero's type, palette and controls, with room for each page's story. */
export default function BrandPageHero({
  id,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
  footer,
}: BrandPageHeroProps) {
  return (
    <>
      <section
        id={id}
        data-nav-theme="hero"
        aria-labelledby={`${id}-title`}
        className="relative isolate overflow-hidden bg-dark-ink pb-10 pt-40 text-paper sm:pb-12 sm:pt-38 lg:pt-48 xl:pt-52"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-1/4 -top-1/2 -z-10 aspect-square w-[110%] overflow-hidden rounded-full bg-ink-soft/40 sm:w-3/4">
          <BackgroundGrainTexture />
        </div>
        <Container className="lg:max-w-none lg:pl-[max(4.5rem,calc((100%-103rem)/2+4.5rem))] xl:pl-[max(10rem,calc((100%-103rem)/2+10rem))]">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-10 xl:gap-14">
            <div className="relative z-10 min-w-0">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand sm:text-sm">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-brand" />
                {eyebrow}
              </p>
              <h1 id={`${id}-title`} className="mt-5 max-w-[13ch] font-display text-[2.7rem] font-semibold leading-[1.03] tracking-[0.01em]! min-[430px]:text-[3.1rem] sm:text-5xl md:text-6xl lg:text-[5.2rem] xl:text-[5.4rem]">
                {title}
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-paper/70 sm:text-lg">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">
                <MagneticFillButton href={primaryAction.href} variant="brand" className="h-14 rounded-4xl bg-brand! px-7 text-base font-semibold sm:h-[3.75rem] sm:px-8">
                  {primaryAction.label}
                  <ArrowRight aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.35} />
                </MagneticFillButton>
                {secondaryAction ? (
                  <LinkArrow href={secondaryAction.href} variant="dark" className="min-h-11 min-w-0! gap-5! text-sm! normal-case! [--link-arrow-spacing:0em] [--link-arrow-expanded-spacing:0.03em] sm:text-base!">
                    {secondaryAction.label}
                  </LinkArrow>
                ) : null}
              </div>
            </div>
            <div className="relative mx-auto w-full min-w-0 max-w-[42rem] lg:ml-auto lg:mr-0">
              {children}
            </div>
          </div>
          {footer ? (
            <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-paper/15 pt-5 text-xs text-paper/70 sm:mt-16 sm:text-sm">
              {footer}
            </div>
          ) : null}
        </Container>
      </section>
      <SectionWave to="paper" />
    </>
  );
}
