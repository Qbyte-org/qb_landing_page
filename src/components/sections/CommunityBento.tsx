import { communityBentoCopy } from "@/content/home/sections";
import Image from "@/components/ui/SiteImage";
import type { ReactNode } from "react";
import { Bike, MapPin, Store } from "lucide-react";
import {
  coverageAreas,
  expansionCities,
  liveCity,
  liveCityState,
  partnerPerks,
  riderTiers,
} from "@/content/site";
import Button from "../ui/Button";
import Container from "../ui/Container";
import IconChip from "../ui/IconChip";
import LinkArrow from "../ui/LinkArrow";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const partnerHeadline = communityBentoCopy.growYourFoodBusinessWithQuickBite;
const partnerSubtext =
  communityBentoCopy.whetherYouRunABusyRestaurantOr;

const coveragePreview = coverageAreas.slice(0, 4);
const remainingAreas = Math.max(0, coverageAreas.length - coveragePreview.length);

function BentoCard({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div
      id={id}
      className={`relative h-full overflow-hidden rounded-card p-7 transition-transform duration-300 ease-out hover:-translate-y-1 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export default function CommunityBento() {
  const firstPartnerPerk = partnerPerks[0];

  return (
    <section data-nav-theme="neutral" className="overflow-hidden bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={communityBentoCopy.eyebrowJoinTheEcosystem}
          title={
            <>{communityBentoCopy.builtForPartnersRidersAnd}{" "}
              <span className="text-brand-dark">{communityBentoCopy.everyCityWeReach}</span>
            </>
          }
          subtitle={communityBentoCopy.subtitleQuickBiteConnectsRestaurantsHomeKitchensRiders}
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[12rem] lg:grid-rows-3 lg:gap-6">
          <Reveal delay={0} className="sm:col-span-2 lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:col-span-1">
            <BentoCard
              className="flex min-h-[31rem] flex-col justify-end bg-navy text-white lg:min-h-0"
              id="partners"
            >
              <Image
                src={communityBentoCopy.srcImagesFoodPartnerKitchenWebp}
                alt={communityBentoCopy.altARestaurantKitchenPreparingFreshFood}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="relative z-10">
                <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-light">{communityBentoCopy.partnerHero}</p>
                <h3 className="font-display text-3xl font-extrabold leading-[1.02] sm:text-4xl">
                  {partnerHeadline}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  {partnerSubtext}
                </p>
                <div className="mt-6">
                  <Button href={communityBentoCopy.hrefPartners} size="md" className="px-6">{communityBentoCopy.becomeAPartner}</Button>
                </div>
              </div>
            </BentoCard>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-start-1 lg:row-start-1">
            <BentoCard className="flex min-h-[13rem] flex-col justify-between bg-navy text-white lg:min-h-0">
              <div className="flex items-start justify-between gap-4">
                <IconChip icon={Store} tone="light" size="sm" />
                <span className="rounded-pill bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/60">{communityBentoCopy.partnerCTA}</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-extrabold leading-tight">
                  {firstPartnerPerk?.title ?? communityBentoCopy.defaultKitchenPrompt}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {firstPartnerPerk?.description ?? partnerSubtext}
                </p>
                <LinkArrow
                  href={communityBentoCopy.hrefPartners}
                  variant="dark"
                  className="mt-4 min-w-0! text-sm! font-extrabold normal-case! text-brand-light! [--link-arrow-spacing:0em] [--link-arrow-expanded-spacing:0.04em]"
                >{communityBentoCopy.becomeAPartner}</LinkArrow>
              </div>
            </BentoCard>
          </Reveal>

          <Reveal delay={0.16} className="lg:col-start-1 lg:row-start-2 lg:row-span-2">
            <BentoCard className="flex min-h-[20rem] flex-col justify-between bg-white text-navy lg:min-h-0">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-muted">{communityBentoCopy.rideWithUs}</p>
                <h3 className="mt-4 font-display text-2xl font-extrabold">{communityBentoCopy.twoWaysToEarn}</h3>
              </div>

              <div className="space-y-5">
                {riderTiers.map((tier, index) => (
                  <LinkArrow
                    key={tier.name}
                    href={communityBentoCopy.hrefRiders}
                    variant="light"
                    imageSrc={communityBentoCopy.riderProgramImages[index === 0 ? 0 : 1]}
                    className="w-full [--link-arrow-expanded-spacing:0.12em] [--link-arrow-image-size:2rem] [--link-arrow-min-width:100%] [--link-arrow-spacing:0.02em] border-navy/10 pb-3 text-[0.8rem]"
                    textClassName="font-extrabold"
                  >
                    {tier.name}
                  </LinkArrow>
                ))}
              </div>
            </BentoCard>
          </Reveal>

          <Reveal delay={0.24} className="lg:col-start-3 lg:row-start-1 lg:row-span-2">
            <BentoCard
              className="flex min-h-[22rem] flex-col justify-between bg-brand text-white lg:min-h-0"
              id="riders"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/70">{communityBentoCopy.riderProgram}</p>
                <Bike className="h-7 w-7 text-white/80" strokeWidth={1.7} aria-hidden="true" />
              </div>

              <div>
                <h3 className="font-display text-3xl font-extrabold leading-none">{communityBentoCopy.twoTierModel}</h3>
                <p className="mt-4 max-w-xs text-base font-semibold leading-relaxed text-white/85">{communityBentoCopy.smartphoneOrNotEveryoneCanEarnWith}</p>
              </div>

              <div className="flex items-center gap-3">
                {riderTiers.map((tier) => (
                  <span
                    key={tier.name}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-pill bg-white text-brand-dark"
                    aria-label={tier.name}
                    title={tier.name}
                  >
                    <tier.icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                ))}
              </div>

              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-pill bg-white/15" />
            </BentoCard>
          </Reveal>

          <Reveal delay={0.32} className="lg:col-start-4 lg:row-start-1">
            <BentoCard
              className="min-h-[13rem] bg-brand text-white lg:min-h-0"
              id="cities"
            >
              <Image
                src={communityBentoCopy.srcMenuCityPinSvg}
                alt=""
                width={140}
                height={140}
                className="absolute -right-5 -top-5 h-28 w-28 opacity-20"
                aria-hidden="true"
              />
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/70">{communityBentoCopy.liveCity}</p>
              <h3 className="mt-5 font-display text-3xl font-extrabold leading-none">
                {liveCity}
              </h3>
              <p className="mt-2 text-sm font-semibold text-white/75">
                {liveCityState}{communityBentoCopy.nigeria}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {coveragePreview.map((area) => (
                  <span
                    key={area}
                    className="rounded-pill bg-white/15 px-3 py-1 text-[0.7rem] font-bold text-white"
                  >
                    {area}
                  </span>
                ))}
                {remainingAreas > 0 ? (
                  <span className="rounded-pill bg-white px-3 py-1 text-[0.7rem] font-black text-brand-dark">{"+"}{remainingAreas}{communityBentoCopy.more}</span>
                ) : null}
              </div>
            </BentoCard>
          </Reveal>

          <Reveal delay={0.4} className="lg:col-start-4 lg:row-start-2">
            <BentoCard className="flex min-h-[13rem] items-end bg-white text-navy lg:min-h-0">
              <div className="absolute inset-0 bg-brand-50" />
              <Image
                src={communityBentoCopy.srcQuickbiteDeliveryBikeSvg}
                alt=""
                width={260}
                height={150}
                className="absolute left-1/2 top-2 h-36 w-64 -translate-x-1/2 object-contain"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-muted">{communityBentoCopy.ridersPhoto}</p>
                <h3 className="mt-1 font-display text-2xl font-extrabold">{communityBentoCopy.ourRiders}</h3>
              </div>
            </BentoCard>
          </Reveal>

          <Reveal delay={0.48} className="lg:col-start-3 lg:col-span-2 lg:row-start-3">
            <BentoCard className="flex min-h-[18rem] flex-col justify-between bg-navy text-white lg:min-h-0">
              <Image
                src={communityBentoCopy.srcLogoMarkLightSvg}
                alt=""
                width={220}
                height={220}
                className="absolute -right-10 -top-12 h-44 w-44 opacity-10"
                aria-hidden="true"
              />
              <div className="relative z-10 flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-light">{communityBentoCopy.expansionCities}</p>
                  <h3 className="mt-4 font-display text-2xl font-extrabold">{communityBentoCopy.rollingOutAcrossNigeria}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">{communityBentoCopy.theseCitiesAreNextOnTheQuickBite}</p>
                </div>
                <IconChip icon={MapPin} tone="light" size="sm" />
              </div>
              <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                {expansionCities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3 py-2 text-sm font-bold text-white/75"
                  >
                    <MapPin className="h-3.5 w-3.5 text-brand-light" strokeWidth={2} aria-hidden="true" />
                    {city}
                  </span>
                ))}
              </div>
            </BentoCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
