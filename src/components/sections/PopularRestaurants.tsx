import Image from "next/image";
import Link from "next/link";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import LinkArrow from "../ui/LinkArrow";
import Reveal from "../ui/Reveal";
import { restaurants } from "@/content/site";

export default function PopularRestaurants() {
  return (
    <section id="restaurants" data-nav-theme="light" className="bg-white py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            title="Trending restaurants"
            subtitle="Verified kitchens loved by thousands of QuickBite customers."
          />
          <LinkArrow href="/restaurants" variant="accent">
            See all restaurants
          </LinkArrow>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.08} mode="image">
              <Link
                href="/restaurants"
                className="block h-full overflow-hidden rounded-card border border-border bg-white"
              >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={r.image}
                  alt={`Food from ${r.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-navy">{r.name}</h3>
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
