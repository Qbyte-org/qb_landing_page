import SiteShell from "@/components/layout/SiteShell";
import AppShowcase from "@/components/sections/AppShowcase";
import Categories from "@/components/sections/Categories";
import CommunityBento from "@/components/sections/CommunityBento";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import PopularRestaurants from "@/components/sections/PopularRestaurants";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <SiteShell heroIntro>
      <Hero />
      {/* <TrustBar /> */}
      <Categories />
      <HowItWorks />
      <PopularRestaurants />
      <AppShowcase />
      <CommunityBento />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </SiteShell>
  );
}
