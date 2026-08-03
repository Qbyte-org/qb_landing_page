import Image from "next/image";
import {
  Bike,
  Play,
  Quote,
  ShoppingBag,
  Star,
} from "lucide-react";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import { testimonials } from "@/content/site";

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

const cardVisuals = [
  {
    mode: "media",
    image: "/images/food/hero-local.webp",
    label: "Campus lunch",
  },
  {
    mode: "quote",
    image: "",
    label: "Customer note",
  },
  {
    mode: "media",
    image: "/images/food/partner-kitchen.webp",
    label: "Partner kitchen",
  },
  {
    mode: "quote",
    image: "",
    label: "Repeat order",
  },
  {
    mode: "media",
    image: "/images/food/hero-hot.webp",
    label: "Hot delivery",
  },
  {
    mode: "quote",
    image: "",
    label: "Rider route",
  },
] as const;

const ratingSummaries = [
  {
    label: "Food lovers",
    score: "5.0",
    icon: ShoppingBag,
  },
  {
    label: "Partners & riders",
    score: "4.9",
    icon: Bike,
  },
] as const;

function StarRow({ label = "5 out of 5 stars" }: { label?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={label}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="h-4 w-4 fill-[#f06400] text-[#f06400]"
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
      className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-sm font-black"
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

function RatingTile({
  summary,
}: {
  summary: (typeof ratingSummaries)[number];
}) {
  const Icon = summary.icon;

  return (
    <div className="flex min-h-[9rem] flex-col justify-between rounded-[1.55rem] bg-[#f4dfcc]/55 p-5 ring-1 ring-[#2a211d]/8">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fffaf5] text-[#f06400] ring-1 ring-[#2a211d]/8">
          <Icon className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />
        </span>
        <span className="rounded-full bg-[#fffaf5] px-3 py-1 text-xs font-black text-[#2a211d]">
          {summary.label}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <StarRow label={`${summary.score} out of 5 stars`} />
        <span className="font-display text-xl font-black tracking-[-0.06em] text-[#2a211d]">
          {summary.score}
        </span>
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonialCards)[number];
  index: number;
}) {
  const visual = cardVisuals[index % cardVisuals.length];
  const isMedia = visual.mode === "media";

  return (
    <Reveal delay={index * 0.06}>
      <figure className="relative flex min-h-[28rem] flex-col overflow-hidden rounded-[2rem] bg-[#f4dfcc]/45 p-5 text-[#241813] ring-1 ring-[#2a211d]/8 sm:p-6">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,rgba(42,33,29,.42)_1px,transparent_1.35px)] [background-size:14px_14px]"
        />

        <figcaption className="relative z-10 flex items-center gap-4">
          <Avatar initials={testimonial.initials} accent={testimonial.accent} />
          <span className="min-w-0">
            <span className="block text-xl font-semibold tracking-[-0.03em] text-[#241813]">
              {testimonial.name}
            </span>
            <span className="mt-1 block text-base font-medium text-[#6d5c52]">
              {testimonial.role}
            </span>
          </span>
        </figcaption>

        {isMedia ? (
          <div className="relative z-10 mt-8 overflow-hidden rounded-[1.35rem] bg-[#2a211d]">
            <Image
              src={visual.image}
              alt={`${visual.label} testimonial visual`}
              width={720}
              height={520}
              sizes="(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw"
              className="h-[20rem] w-full object-cover opacity-80"
            />
            <span className="absolute left-4 top-4 rounded-full bg-[#fffaf5] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#f06400]">
              {visual.label}
            </span>
            <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#fffaf5]/92 text-[#f06400]">
              <Play className="h-4 w-4 fill-current" strokeWidth={2.5} aria-hidden="true" />
            </span>
          </div>
        ) : (
          <blockquote className="relative z-10 mt-16 flex flex-1 items-center text-[1.65rem] font-medium leading-[1.22] tracking-[-0.045em] text-[#241813] sm:text-[1.9rem]">
            {testimonial.quote}
          </blockquote>
        )}

        {!isMedia ? (
          <Quote
            className="relative z-10 mt-auto h-12 w-12 fill-[#2a211d]/8 text-[#2a211d]/8"
            aria-hidden="true"
          />
        ) : (
          <blockquote className="relative z-10 mt-6 text-base font-semibold leading-relaxed text-[#6d5c52]">
            “{testimonial.quote}”
          </blockquote>
        )}
      </figure>
    </Reveal>
  );
}

export default function Testimonials() {
  return (
    <section data-nav-theme="light" className="bg-[#fffaf5] py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.66fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6d5c52]">
              What our community says
            </p>
            <h2 className="mt-5 max-w-5xl font-display text-[3.4rem] font-black leading-[1.02] tracking-[-0.075em] text-[#241813] sm:text-[5.5rem] lg:text-[6.6rem]">
              4.9 is our average
              <span className="block text-[#f06400]">across QuickBite.</span>
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
            {ratingSummaries.map((summary) => (
              <RatingTile key={summary.label} summary={summary} />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonialCards.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
