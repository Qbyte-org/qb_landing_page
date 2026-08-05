import Image from "next/image";
import type { ReactNode } from "react";
import {
  MessageCircle,
  Play,
  Quote,
  ShoppingBag,
  Star,
  Store,
} from "lucide-react";
import { testimonials } from "@/content/site";
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
  layout: string;
};

const storyCards: StoryCard[] = [
  {
    kind: "image",
    testimonial: testimonialCards[0],
    label: "Customer story",
    title: "Campus lunch that still arrives hot.",
    image: "/images/food/hero-local.webp",
    layout:
      "md:col-span-1 xl:col-start-1 xl:row-start-1 xl:row-span-4",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[1],
    label: "Vendor note",
    layout:
      "md:col-span-1 xl:col-start-5 xl:row-start-1 xl:row-span-3",
  },
  {
    kind: "video",
    testimonial: testimonialCards[2],
    label: "Rider route",
    title: "Every drop is easier to follow.",
    image: "/images/food/partner-kitchen.webp",
    layout:
      "md:col-span-1 xl:col-start-9 xl:row-start-1 xl:row-span-4",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[3],
    label: "Repeat order",
    layout:
      "md:col-span-1 xl:col-start-1 xl:row-start-5 xl:row-span-4",
  },
  {
    kind: "image",
    testimonial: testimonialCards[4],
    label: "Partner story",
    title: "Clear handoffs from kitchen to rider.",
    image: "/images/food/hero-hot.webp",
    layout:
      "md:col-span-2 xl:col-span-4 xl:col-start-5 xl:row-start-4 xl:row-span-5",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[5],
    label: "Delivery note",
    layout:
      "md:col-span-1 xl:col-start-9 xl:row-start-5 xl:row-span-4",
  },
];

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

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {trustMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div
                  key={metric.label}
                  className="rounded-[1.35rem] bg-[#fffaf5]/82 p-4 ring-1 ring-[#2a211d]/7"
                >
                  <Icon
                    className="mb-5 h-5 w-5 text-[#f06400]"
                    strokeWidth={2.35}
                    aria-hidden="true"
                  />
                  <div className="font-display text-2xl font-black tracking-[-0.06em]">
                    <ScrollOdometer value={metric.value} duration={1400} />
                    {metric.suffix}
                  </div>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.13em] text-[#8a6b5a]">
                    {metric.label}
                  </p>
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
  story,
  index,
  children,
}: {
  story: StoryCard;
  index: number;
  children: ReactNode;
}) {
  return (
    <Reveal delay={index * 0.06} className={story.layout}>
      <figure className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[2rem] bg-[#f4dfcc]/48 p-5 text-[#241813] ring-1 ring-[#2a211d]/8 transition duration-500 hover:-translate-y-1.5 hover:bg-[#f4dfcc]/68 hover:ring-[#f06400]/25 sm:p-6">
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
    <StoryCardShell story={story} index={index}>
      <AuthorRow testimonial={story.testimonial} />

      <div className="relative z-10 mt-6 min-h-[17rem] flex-1 overflow-hidden rounded-[1.35rem] bg-[#2a211d] sm:min-h-[20rem]">
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
    <StoryCardShell story={story} index={index}>
      <div className="relative z-10 flex items-start justify-between gap-4">
        <span className="rounded-full bg-[#fffaf5] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#f06400]">
          {story.label}
        </span>
        <Quote
          className="h-10 w-10 fill-[#2a211d]/8 text-[#2a211d]/8 transition duration-500 group-hover:fill-[#f06400]/18 group-hover:text-[#f06400]/18"
          aria-hidden="true"
        />
      </div>

      <blockquote className="relative z-10 my-8 flex flex-1 items-center text-[1.55rem] font-black leading-[1.14] tracking-[-0.055em] text-[#241813] sm:text-[1.85rem] xl:text-[2rem]">
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

export default function Testimonials() {
  return (
    <section data-nav-theme="light" className="bg-[#fffaf5] py-16 sm:py-24">
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

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:auto-rows-[5.7rem] xl:grid-cols-12 xl:gap-5">
          {storyCards.map((story, index) => (
            <TestimonialStoryCard
              key={`${story.testimonial.name}-${story.label}`}
              story={story}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
