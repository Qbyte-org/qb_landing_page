import Image from "next/image";
import Link from "next/link";
import { Clock, Star } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { restaurants } from "@/content/site";

export default function PopularRestaurants() {
  return (
    <section id="restaurants" data-nav-theme="light" className="bg-white py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Popular near you"
            title="Trending restaurants"
            subtitle="Verified kitchens loved by thousands of QuickBite customers."
          />
          <Button href="/restaurants" variant="outline" size="md">
            See all restaurants
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.08} mode="image">
              <Link
                href="/restaurants"
                className="group block h-full overflow-hidden rounded-card border border-border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={r.image}
                  alt={`Food from ${r.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-white/95 px-3 py-1 text-xs font-bold text-navy shadow-sm backdrop-blur">
                  <Clock className="h-3.5 w-3.5 text-brand-dark" strokeWidth={2.25} aria-hidden="true" />
                  {r.eta}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-navy">{r.name}</h3>
                  <span className="inline-flex items-center gap-1 rounded-pill bg-brand-50 px-2.5 py-1 text-sm font-bold text-brand-dark">
                    <Star className="h-3.5 w-3.5 fill-brand text-brand" aria-hidden="true" />
                    {r.rating}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{r.cuisine}</p>
                <p className="mt-4 text-sm font-semibold text-navy">
                  Delivery from{" "}
                  <span className="text-brand-dark">{r.deliveryFrom}</span>
                </p>
              </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
