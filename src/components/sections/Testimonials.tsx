"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import {
  MessageCircle,
  Play,
  Quote,
  ShoppingBag,
  Star,
  Store,
} from "lucide-react";
import { testimonials } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import ScrollOdometer from "../ui/ScrollOdometer";

const extraTestimonials = [
  {
    quote:
      "Ordering from two restaurants at once used to be stressful. QuickBite makes it feel normal.",
    name: "Aisha Lawal",
    role: "Customer • OAU Campus",
    initials: "AL",
    accent: "#ffe7d7",
  },
  {
    quote:
      "The rider handoff is clearer now. We know when to pack, who is coming, and when the order leaves.",
    name: "Bola Adeyemi",
    role: "Kitchen Lead • Mayfair",
    initials: "BA",
    accent: "#f06400",
  },
  {
    quote:
      "The best part is the consistency. I can plan my routes, deliver faster and see my earnings clearly.",
    name: "David Ojo",
    role: "Dispatch Rider • Lagere",
    initials: "DO",
    accent: "#2a211d",
  },
  {
    quote:
      "My hostel address is saved, my usual order is two taps away, and the rider updates make late-night food less stressful.",
    name: "Mariam Yusuf",
    role: "Customer • Moremi Hall",
    initials: "MY",
    accent: "#f4dfcc",
  },
  {
    quote:
      "QuickBite brings us new customers without making our counter chaotic. The order notes are simple and useful.",
    name: "Kunle Ajayi",
    role: "Restaurant Owner • Sabo",
    initials: "KA",
    accent: "#22c55e",
  },
  {
    quote:
      "I can see the pickup point, customer location and payout clearly. It helps me plan routes without guessing.",
    name: "Grace Effiong",
    role: "Rider • Mayfair",
    initials: "GE",
    accent: "#ff6b00",
  },
];

const testimonialCards = [...testimonials, ...extraTestimonials];

type StoryKind = "image" | "quote" | "video";
type TestimonialSource = (typeof testimonialCards)[number];

type StoryCard = {
  kind: StoryKind;
  testimonial: TestimonialSource;
  label: string;
  image?: string;
  title?: string;
  mediaClassName?: string;
};

const storyCards: StoryCard[] = [
  {
    kind: "image",
    testimonial: testimonialCards[0],
    label: "Customer story",
    title: "Campus lunch that still arrives hot.",
    image: "/images/food/hero-local.webp",
    mediaClassName: "min-h-[16rem] sm:min-h-[18rem]",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[1],
    label: "Vendor note",
  },
  {
    kind: "video",
    testimonial: testimonialCards[2],
    label: "Rider route",
    title: "Every drop is easier to follow.",
    image: "/images/food/partner-kitchen.webp",
    mediaClassName: "min-h-[14.5rem] sm:min-h-[17rem]",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[3],
    label: "Repeat order",
  },
  {
    kind: "image",
    testimonial: testimonialCards[4],
    label: "Partner story",
    title: "Clear handoffs from kitchen to rider.",
    image: "/images/food/hero-hot.webp",
    mediaClassName: "min-h-[18rem] sm:min-h-[22rem]",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[5],
    label: "Delivery note",
  },
  {
    kind: "image",
    testimonial: testimonialCards[6],
    label: "Saved favourite",
    title: "Reorders that remember the small things.",
    image: "/images/food/hero-fresh.webp",
    mediaClassName: "min-h-[13rem] sm:min-h-[15rem]",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[7],
    label: "Kitchen log",
  },
  {
    kind: "video",
    testimonial: testimonialCards[8],
    label: "Route note",
    title: "Riders see the whole trip clearly.",
    image: "/images/food/hero-fast.webp",
    mediaClassName: "min-h-[15rem] sm:min-h-[18.5rem]",
  },
];

const masonryMotion = {
  desktop: {
    offsets: [0, 56, 22],
    travel: [-58, -132, -88],
  },
  tablet: {
    offsets: [0, 44],
    travel: [-54, -102],
  },
} as const;

function splitIntoColumns<T>(items: T[], columnCount: number) {
  return Array.from({ length: columnCount }, (_, columnIndex) =>
    items.filter((_, itemIndex) => itemIndex % columnCount === columnIndex),
  );
}

const trustMetrics = [
  {
    value: 12000,
    suffix: "+",
    label: "Reviews",
    icon: MessageCircle,
  },
  {
    value: 150000,
    suffix: "+",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    value: 98,
    suffix: "%",
    label: "Would recommend",
    icon: Store,
  },
] as const;

function StarRow({
  label = "5 out of 5 stars",
  className = "",
  starClassName = "h-4 w-4",
}: {
  label?: string;
  className?: string;
  starClassName?: string;
}) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={label}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`${starClassName} fill-[#f06400] text-[#f06400]`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function Avatar({
  initials,
  accent,
}: {
  initials: string;
  accent: string;
}) {
  const isLight = accent === "#f4dfcc" || accent === "#ffe7d7";

  return (
    <span
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-xs font-black sm:h-14 sm:w-14 sm:text-sm"
      style={{
        backgroundColor: accent,
        color: isLight ? "#241813" : "#fffaf5",
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

function TrustPanel() {
  return (
    <Reveal direction="left" delay={0.1}>
      <aside className="relative overflow-hidden rounded-[2rem] bg-[#f4dfcc]/55 p-5 text-[#241813] ring-1 ring-[#2a211d]/8 sm:p-6 lg:p-7">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,rgba(42,33,29,.48)_1px,transparent_1.35px)] [background-size:15px_15px]"
        />

        <div className="relative z-10 flex flex-col gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8a6b5a]">
              Community trust
            </p>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <StarRow
                label="4.9 average rating"
                starClassName="h-5 w-5"
              />
              <p className="font-display text-3xl font-black tracking-[-0.07em] text-[#2a211d]">
                4.9
              </p>
              <p className="pb-1 text-sm font-black text-[#6d5c52]">
                Average Rating
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.35rem] bg-[#fffaf5]/82 ring-1 ring-[#2a211d]/7">
            {trustMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div
                  key={metric.label}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-dashed border-[#2a211d]/12 px-4 py-3.5 last:border-b-0"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f4dfcc]/70 text-[#f06400]">
                    <Icon
                      className="h-4 w-4"
                      strokeWidth={2.35}
                      aria-hidden="true"
                    />
                  </span>
                  <p className="text-xs font-black uppercase tracking-[0.13em] text-[#8a6b5a]">
                    {metric.label}
                  </p>
                  <div className="text-right font-display text-xl font-black tracking-[-0.06em] text-[#241813]">
                    <ScrollOdometer value={metric.value} duration={1400} />
                    <span>{metric.suffix}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </Reveal>
  );
}

function StoryCardShell({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <Reveal delay={(index % 6) * 0.045}>
      <figure className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-[#f4dfcc]/48 p-5 text-[#241813] ring-1 ring-[#2a211d]/8 transition duration-500 hover:-translate-y-1.5 hover:bg-[#f4dfcc]/68 hover:ring-[#f06400]/25 sm:p-6">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle,rgba(42,33,29,.42)_1px,transparent_1.35px)] [background-size:14px_14px]"
        />
        {children}
      </figure>
    </Reveal>
  );
}

function AuthorRow({ testimonial }: { testimonial: TestimonialSource }) {
  return (
    <figcaption className="relative z-10 flex items-center gap-4">
      <Avatar initials={testimonial.initials} accent={testimonial.accent} />
      <span className="min-w-0">
        <span className="block text-lg font-black tracking-[-0.04em] text-[#241813] sm:text-xl">
          {testimonial.name}
        </span>
        <span className="mt-1 block text-sm font-semibold text-[#6d5c52] sm:text-base">
          {testimonial.role}
        </span>
        <span className="mt-3 flex flex-wrap items-center gap-2">
          <StarRow
            label="5 out of 5 testimonial rating"
            starClassName="h-3.5 w-3.5"
          />
          <span className="-rotate-2 rounded-full border border-dashed border-[#f06400]/45 bg-[#fffaf5]/70 px-2.5 py-1 text-[0.55rem] font-black uppercase tracking-[0.14em] text-[#f06400]">
            Verified bite
          </span>
        </span>
      </span>
    </figcaption>
  );
}

function MediaStoryCard({
  story,
  index,
}: {
  story: StoryCard;
  index: number;
}) {
  const isVideo = story.kind === "video";

  return (
    <StoryCardShell index={index}>
      <AuthorRow testimonial={story.testimonial} />

      <div className={`relative z-10 mt-6 overflow-hidden rounded-[1.35rem] bg-[#2a211d] ${story.mediaClassName ?? "min-h-[16rem] sm:min-h-[19rem]"}`}>
        {story.image ? (
          <Image
            src={story.image}
            alt={`${story.label} testimonial visual`}
            fill
            sizes="(min-width: 1280px) 31vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-[0.82] transition duration-700 group-hover:scale-[1.025]"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,33,29,0)_30%,rgba(42,33,29,.78))]" />
        <span className="absolute left-4 top-4 rounded-full bg-[#fffaf5] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#f06400]">
          {story.label}
        </span>
        {isVideo ? (
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#fffaf5]/94 text-[#f06400] motion-safe:animate-pulse">
            <Play
              className="h-4 w-4 fill-current"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </span>
        ) : null}
        {story.title ? (
          <p className="absolute bottom-4 left-4 right-4 font-display text-2xl font-black leading-[1.05] tracking-[-0.06em] text-white sm:text-3xl">
            {story.title}
          </p>
        ) : null}
      </div>

      <blockquote className="relative z-10 mt-5 text-base font-semibold leading-relaxed text-[#6d5c52]">
        “{story.testimonial.quote}”
      </blockquote>
    </StoryCardShell>
  );
}

function QuoteStoryCard({
  story,
  index,
}: {
  story: StoryCard;
  index: number;
}) {
  return (
    <StoryCardShell index={index}>
      <div className="relative z-10 flex items-start justify-between gap-4">
        <span className="rounded-full bg-[#fffaf5] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#f06400]">
          {story.label}
        </span>
        <Quote
          className="h-10 w-10 fill-[#2a211d]/8 text-[#2a211d]/8 transition duration-500 group-hover:fill-[#f06400]/18 group-hover:text-[#f06400]/18"
          aria-hidden="true"
        />
      </div>

      <blockquote className="relative z-10 my-8 text-[1.5rem] font-black leading-[1.14] tracking-[-0.055em] text-[#241813] sm:text-[1.75rem] xl:text-[1.95rem]">
        “{story.testimonial.quote}”
      </blockquote>

      <AuthorRow testimonial={story.testimonial} />
    </StoryCardShell>
  );
}

function TestimonialStoryCard({
  story,
  index,
}: {
  story: StoryCard;
  index: number;
}) {
  if (story.kind === "quote") {
    return <QuoteStoryCard story={story} index={index} />;
  }

  return <MediaStoryCard story={story} index={index} />;
}

function MasonryGrid({
  mode,
  columnCount,
  className,
}: {
  mode: "mobile" | "tablet" | "desktop";
  columnCount: number;
  className: string;
}) {
  const columns = splitIntoColumns(storyCards, columnCount);
  const preset =
    mode === "desktop"
      ? masonryMotion.desktop
      : mode === "tablet"
        ? masonryMotion.tablet
        : undefined;

  return (
    <div data-testimonial-grid={mode} className={className}>
      {columns.map((column, columnIndex) => {
        const offset = preset?.offsets[columnIndex] ?? 0;
        const travel = preset?.travel[columnIndex] ?? 0;

        return (
          <div
            key={`${mode}-column-${columnIndex}`}
            data-testimonial-column
            data-testimonial-start-offset={offset}
            data-testimonial-travel={travel}
            className="flex min-w-0 flex-col gap-4 sm:gap-5"
            style={{
              transform: offset
                ? `translate3d(0, ${offset}px, 0)`
                : undefined,
            }}
          >
            {column.map((story) => {
              const originalIndex = storyCards.indexOf(story);

              return (
                <TestimonialStoryCard
                  key={`${mode}-${story.testimonial.name}-${story.label}`}
                  story={story}
                  index={originalIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const allColumns = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-testimonial-column]"),
      );
      const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      let animationFrame = 0;

      const resetColumns = () => {
        gsap.set(allColumns, { clearProps: "transform,willChange" });
      };

      const getActiveGridSelector = () => {
        if (window.innerWidth >= 1280) {
          return "[data-testimonial-grid='desktop']";
        }

        if (window.innerWidth >= 768) {
          return "[data-testimonial-grid='tablet']";
        }

        return "[data-testimonial-grid='mobile']";
      };

      const updateColumns = () => {
        animationFrame = 0;
        const gridSelector = getActiveGridSelector();
        const grid = section.querySelector<HTMLElement>(gridSelector);

        if (!grid || gridSelector.includes("mobile") || reducedMotionQuery.matches) {
          resetColumns();
          return;
        }

        const columns = gsap.utils.toArray<HTMLElement>(
          grid.querySelectorAll("[data-testimonial-column]"),
        );
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const startPoint = viewportHeight * 0.82;
        const scrollRange = rect.height + startPoint;
        const progress = gsap.utils.clamp(
          0,
          1,
          (startPoint - rect.top) / scrollRange,
        );

        columns.forEach((column) => {
          const startOffset = Number(
            column.dataset.testimonialStartOffset ?? 0,
          );
          const requestedTravel = Number(column.dataset.testimonialTravel ?? 0);
          const gridHeight = grid.scrollHeight;
          const columnHeight = column.scrollHeight;
          const spareSpace = Math.max(
            56,
            gridHeight - columnHeight + Math.abs(startOffset) + 72,
          );
          const safeTravel = gsap.utils.clamp(
            -spareSpace,
            spareSpace,
            requestedTravel,
          );

          gsap.set(column, {
            y: startOffset + safeTravel * progress,
            willChange: "transform",
          });
        });
      };

      const requestUpdate = () => {
        if (animationFrame) return;
        animationFrame = window.requestAnimationFrame(updateColumns);
      };

      resetColumns();
      updateColumns();
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
      reducedMotionQuery.addEventListener("change", requestUpdate);

      return () => {
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
        reducedMotionQuery.removeEventListener("change", requestUpdate);
        window.cancelAnimationFrame(animationFrame);
        resetColumns();
      };
    },
    { dependencies: [] },
  );

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="bg-[#fffaf5] py-16 sm:py-24"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,30rem)] lg:items-end">
          <Reveal direction="up">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#8a6b5a]">
                Testimonials
              </p>
              <h2 className="font-display text-[3.15rem] font-black leading-[0.98] tracking-[-0.08em] text-[#241813] sm:text-[4.6rem] lg:text-[5.7rem]">
                Every order has
                <span className="block text-[#f06400]">
                  a story worth sharing.
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-[#6d5c52] sm:text-xl">
                From customers and vendors to riders, hear how QuickBite fits
                into everyday food runs.
              </p>
            </div>
          </Reveal>

          <TrustPanel />
        </div>

        <MasonryGrid
          mode="mobile"
          columnCount={1}
          className="mt-12 grid gap-4 md:hidden"
        />
        <MasonryGrid
          mode="tablet"
          columnCount={2}
          className="mt-12 hidden gap-5 pb-16 md:grid md:grid-cols-2 xl:hidden"
        />
        <MasonryGrid
          mode="desktop"
          columnCount={3}
          className="mt-14 hidden gap-5 pb-20 xl:grid xl:grid-cols-3"
        />
      </Container>
    </section>
  );
}
