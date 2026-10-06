"use client";

import { testimonialsCopy } from "@/content/home/sections";

import { type TestimonialSource, type StoryCard, storyCards, communityDetails } from "@/content/home/testimonials";

import Image from "../ui/FoodImage";
import { useSyncExternalStore, type ReactNode } from "react";
import { MapPin, Quote } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Container from "../ui/Container";
import SectionTag from "../ui/SectionTag";
import BackgroundGrainTexture from "../ui/BackgroundGrainTexture";
import MagneticFillButton from "../ui/MagneticFillButton";

// Only regroup at the two layout breakpoints; cards keep their natural height.
// A stable server snapshot keeps the first client render hydration-safe.
function subscribeToColumns(onChange: () => void) {
  const queries = ["(min-width: 768px)", "(min-width: 1280px)"].map((query) => window.matchMedia(query));
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

function getColumnCount() {
  return window.matchMedia("(min-width: 1280px)").matches ? 3 : window.matchMedia("(min-width: 768px)").matches ? 2 : 1;
}

function getServerColumnCount() {
  return 1;
}

function CommunityPanel() {
  return (
    <ul aria-label={testimonialsCopy.ariaLabelTheQuickBiteCommunity} className="mt-7 flex flex-wrap gap-x-7 gap-y-3 sm:gap-x-10">
      {communityDetails.map(({ title, icon: Icon }) => (
        <li key={title} className="flex items-center gap-2.5 text-sm font-medium text-cocoa">
          <span className="grid size-8 place-items-center rounded-full border border-ink/10 bg-cream-200 text-brand-dark">
            <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </span>
          {title}
        </li>
      ))}
    </ul>
  );
}

function StoryCardShell({ children, expandable = false }: { children: ReactNode; expandable?: boolean }) {
  return (
    <MagneticFillButton
      as="div"
      variant="cream_200"
      className={`group flex! min-w-0 shrink-0 cursor-default! flex-col rounded-[2.35rem] border! border-dashed!
          border-ink/40 p-0 font-normal! hover:border-ink/30 text-ink! ${expandable ? "grow" : ""}`}
      contentClassName="flex w-full grow flex-col items-stretch text-left"
    >
      <figure className="relative flex min-w-0 grow flex-col p-5 sm:p-6">
        <BackgroundGrainTexture className="opacity-24! transition-opacity duration-300 group-hover:opacity-15! motion-reduce:transition-none" />
        {children}
      </figure>
    </MagneticFillButton>
  );
}

function AuthorRow({
  testimonial,
  withDivider = false,
}: {
  testimonial: TestimonialSource;
  withDivider?: boolean;
}) {
  const [role, location] = testimonial.role.split(" • ");

  return (
    <figcaption className={`relative flex shrink-0 items-center gap-3 ${withDivider ? "border-t border-dashed border-ink/20 pt-5" : ""}`}>
      <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/10 bg-paper font-display text-sm font-semibold text-ink">
        {testimonial.initials}
      </span>
      <span className="min-w-0">
        <span className="block text-base font-semibold leading-snug sm:text-lg">
          {testimonial.name}
        </span>
        <span className="mt-1 block text-xs text-cocoa transition-colors duration-300 motion-reduce:transition-none sm:text-sm">
          {role}
        </span>
        {location ? (
          <span className="mt-1 flex items-center gap-1 text-xs text-cocoa transition-colors duration-300 motion-reduce:transition-none">
            <MapPin aria-hidden="true" className="size-3 shrink-0" />
            {location}
          </span>
        ) : null}
      </span>
    </figcaption>
  );
}

function MediaStoryCard({ story }: { story: StoryCard }) {
  const isIllustration = story.kind === "illustration";

  return (
    <StoryCardShell expandable>
      <AuthorRow testimonial={story.testimonial} />
      <div className={`relative mt-5 grow shrink-0 overflow-hidden rounded-[2.35rem] ${isIllustration ? "bg-cream-200 border border-dashed border-ink/30" : "bg-ink"} ${story.mediaClassName ?? "min-h-[16rem]"}`}>
        {story.image ? (
          <Image
            src={story.image}
            alt={story.imageAlt ?? ""}
            fill
            loading="lazy"
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 44vw, 88vw"
            className={`transition-transform duration-500 motion-safe:group-hover:scale-[1.025] ${isIllustration ? "object-contain px-5 pb-20 pt-12" : "object-cover"}`}
          />
        ) : null}
        {!isIllustration ? (
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/95 via-ink/10 to-transparent" />
        ) : null}
        {story.title ? (
          <p className={`absolute bottom-4 left-4 right-4 font-display text-xl font-semibold leading-tight sm:text-2xl ${isIllustration ? "text-ink" : "text-paper"}`}>
            {story.title}
          </p>
        ) : null}
      </div>
      <blockquote className="mt-5 shrink-0 border-t border-dashed border-ink/20 pt-5 text-base leading-relaxed">{"“"}{story.testimonial.quote}{"”"}</blockquote>
    </StoryCardShell>
  );
}

function QuoteStoryCard({ story, index }: { story: StoryCard; index: number }) {
  return (
    <StoryCardShell>
      <div className="relative flex flex-col">
        <div className="flex items-end justify-between gap-3">
          {/* <StoryLabel label={story.label} /> */}
          <Quote aria-hidden="true" className="mt-7 size-8 text-brand" strokeWidth={1.5} />
          <span aria-hidden="true" className="font-mono text-xs text-cocoa transition-colors duration-300 motion-reduce:transition-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <blockquote className="mb-7 mt-3 font-display text-[1.4rem] font-semibold leading-[1.35] sm:text-2xl xl:text-[1.65rem]">
          {story.testimonial.quote}
        </blockquote>
      </div>
      <AuthorRow testimonial={story.testimonial} withDivider />
    </StoryCardShell>
  );
}

export default function Testimonials() {
  const reducedMotion = useReducedMotion();
  const columnCount = useSyncExternalStore(subscribeToColumns, getColumnCount, getServerColumnCount);
  // Mix media and quote cards in both tablet columns. Flexible media panels
  // absorb the remaining height difference while card gaps and full quotes stay fixed.
  const columnIndexes = columnCount === 2
    ? [[0, 3, 4, 6], [1, 2, 5, 7, 8]]
    : Array.from({ length: columnCount }, (_, columnIndex) =>
      storyCards.map((_, index) => index).filter((index) => index % columnCount === columnIndex),
    );
  const columns = columnIndexes.map((indexes) => indexes.map((index) => ({ story: storyCards[index], index })));

  return (
    <section
      id="testimonials"
      data-nav-theme="neutral"
      aria-labelledby="testimonials-title"
      className="scroll-mt-24 overflow-hidden bg-paper py-16 text-ink sm:py-24"
    >
      <Container>
        <motion.div
          initial={false}
          whileInView={reducedMotion === false ? { opacity: [0.75, 1], y: [16, 0] } : undefined}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-ink/15 pb-7 sm:pb-8"
        >
          <SectionTag>{testimonialsCopy.community}</SectionTag>
          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <h2 id="testimonials-title" className="section-heading leading-[1.05]!">{testimonialsCopy.goodFood}<span className="block text-brand-dark">{testimonialsCopy.betterTogether}</span>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-cocoa sm:text-lg lg:max-w-sm">{testimonialsCopy.fromCampusCravingsToTheKitchenCounter}</p>
          </div>
          <CommunityPanel />
        </motion.div>

        <div data-testimonial-grid className={`mt-7 grid items-stretch gap-4 sm:mt-8 sm:gap-5 ${columnCount === 3 ? "grid-cols-3" : columnCount === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} data-testimonial-column className="flex min-w-0 flex-col gap-4 sm:gap-5">
              {column.map(({ story, index }) => story.kind === "quote" ? (
                <QuoteStoryCard key={story.testimonial.name} story={story} index={index} />
              ) : (
                <MediaStoryCard key={story.testimonial.name} story={story} />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
