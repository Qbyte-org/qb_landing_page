"use client";

import Image from "next/image";
import { useSyncExternalStore, type ReactNode } from "react";
import { Bike, MapPin, Quote, Store, UtensilsCrossed } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { testimonials } from "@/content/site";
import Container from "../ui/Container";

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

type TestimonialSource = (typeof testimonialCards)[number];

type StoryCard = {
  kind: "image" | "quote" | "illustration";
  testimonial: TestimonialSource;
  label: string;
  image?: string;
  imageAlt?: string;
  title?: string;
  mediaClassName?: string;
};

const storyCards: StoryCard[] = [
  {
    kind: "illustration",
    testimonial: testimonialCards[0],
    label: "Campus favourites",
    title: "A little comfort between lectures.",
    image: "/food/jollof.svg",
    imageAlt: "Illustration of jollof rice with chicken",
    mediaClassName: "min-h-[16rem] sm:min-h-[18rem]",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[1],
    label: "From the kitchen",
  },
  {
    kind: "illustration",
    testimonial: testimonialCards[2],
    label: "Life on the road",
    title: "Around Ife, one delivery at a time.",
    image: "/quickbite-delivery-bike.svg",
    imageAlt: "Illustration of a QuickBite delivery bike",
    mediaClassName: "min-h-[14.5rem] sm:min-h-[17rem]",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[3],
    label: "More to the table",
  },
  {
    kind: "image",
    testimonial: testimonialCards[4],
    label: "Behind the counter",
    title: "Good food starts with teamwork.",
    image: "/images/food/partner-kitchen.webp",
    imageAlt: "People preparing and sharing food in a kitchen",
    mediaClassName: "min-h-[18rem] sm:min-h-[22rem]",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[5],
    label: "The daily route",
  },
  {
    kind: "image",
    testimonial: testimonialCards[6],
    label: "The usual, please",
    title: "For the cravings that feel like home.",
    image: "/images/food/hero-fresh.webp",
    imageAlt: "A spread of takeaway meals with vegetables and dipping sauces",
    mediaClassName: "min-h-[13rem] sm:min-h-[15rem]",
  },
  {
    kind: "quote",
    testimonial: testimonialCards[7],
    label: "Local kitchen, big heart",
  },
  {
    kind: "illustration",
    testimonial: testimonialCards[8],
    label: "Across the neighbourhood",
    title: "Every good meal has a last mile.",
    image: "/quickbite-delivery-bike.svg",
    imageAlt: "Illustration of a QuickBite delivery bike",
    mediaClassName: "min-h-[15rem] sm:min-h-[18.5rem]",
  },
];

const communityDetails = [
  { title: "Food lovers", detail: "A seat at the table.", icon: UtensilsCrossed },
  { title: "Local kitchens", detail: "The heart of every meal.", icon: Store },
  { title: "Delivery riders", detail: "Bringing it all together.", icon: Bike },
] as const;

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
    <aside aria-labelledby="testimonial-community-title" className="relative overflow-hidden rounded-card bg-cream-200 p-6 sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/footer-grain.svg')] bg-size-[128px_128px] opacity-20 mix-blend-multiply"
      />
      <div className="relative">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6d5c52]">
          Around the table
        </p>
        <h3 id="testimonial-community-title" className="mt-3 max-w-64 font-display text-2xl font-semibold leading-tight">
          One community.<br />Many good stories.
        </h3>
        <ul className="mt-6 border-t border-dashed border-[#2a211d]/20">
          {communityDetails.map(({ title, detail, icon: Icon }) => (
            <li key={title} className="flex items-center gap-4 border-b border-dashed border-[#2a211d]/20 py-3.5 last:border-b-0 last:pb-0">
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#2a211d]/15 bg-[#fffaf5]/60 text-[#f06400]">
                <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-0.5 text-sm text-[#6d5c52]">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function StoryCardShell({ children }: { children: ReactNode }) {
  return (
    <figure className="group relative flex min-w-0 shrink-0 flex-col overflow-hidden rounded-card border border-ink/10 bg-cream p-5 text-ink transition-colors duration-300 hover:border-ink/25 sm:p-6">
      {children}
    </figure>
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
    <figcaption className={`relative flex shrink-0 items-center gap-3 ${withDivider ? "border-t border-dashed border-[#2a211d]/20 pt-5" : ""}`}>
      <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/10 bg-paper font-display text-sm font-semibold">
        {testimonial.initials}
      </span>
      <span className="min-w-0">
        <span className="block text-base font-semibold leading-snug sm:text-lg">
          {testimonial.name}
        </span>
        <span className="mt-1 block text-xs text-[#6d5c52] sm:text-sm">
          {role}
        </span>
        {location ? (
          <span className="mt-1 flex items-center gap-1 text-xs text-[#6d5c52]">
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
    <StoryCardShell>
      <AuthorRow testimonial={story.testimonial} />
      <div className={`relative mt-5 shrink-0 overflow-hidden rounded-card ${isIllustration ? "bg-cream-200" : "bg-[#2a211d]"} ${story.mediaClassName ?? "min-h-[16rem]"}`}>
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
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#2a211d]/95 via-[#2a211d]/10 to-transparent" />
        ) : null}
        {story.title ? (
          <p className={`absolute bottom-4 left-4 right-4 font-display text-xl font-semibold leading-tight sm:text-2xl ${isIllustration ? "text-[#2a211d]" : "text-[#fffaf5]"}`}>
            {story.title}
          </p>
        ) : null}
      </div>
      <blockquote className="mt-5 shrink-0 border-t border-dashed border-[#2a211d]/20 pt-5 text-base leading-relaxed">
        &ldquo;{story.testimonial.quote}&rdquo;
      </blockquote>
    </StoryCardShell>
  );
}

function QuoteStoryCard({ story, index }: { story: StoryCard; index: number }) {
  return (
    <StoryCardShell>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[url('/images/footer-grain.svg')] bg-size-[128px_128px] opacity-10 mix-blend-multiply" />
      <div className="relative flex flex-col">
        <div className="flex items-end justify-between gap-3">
          {/* <StoryLabel label={story.label} /> */}
          <Quote aria-hidden="true" className="mt-7 size-8 text-[#f06400]" strokeWidth={1.5} />
          <span aria-hidden="true" className="font-mono text-xs text-[#6d5c52]">
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
  const columns = Array.from({ length: columnCount }, (_, columnIndex) =>
    storyCards.map((story, index) => ({ story, index })).filter(({ index }) => index % columnCount === columnIndex),
  );

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
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,26rem)] lg:items-center lg:gap-12"
        >
          <div>
            <h2 id="testimonials-title" className="section-heading">
              Good food.
              <span className="block">Better together.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#6d5c52] sm:text-lg">
              From campus cravings to the kitchen counter, meet the food lovers,
              local kitchens and riders behind the everyday food run.
            </p>
          </div>
          <CommunityPanel />
        </motion.div>

        <div data-testimonial-grid className={`mt-12 grid items-start gap-4 sm:gap-5 xl:mt-14 ${columnCount === 3 ? "grid-cols-3" : columnCount === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
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
