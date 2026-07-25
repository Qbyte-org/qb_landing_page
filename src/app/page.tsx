import SiteShell from "@/components/layout/SiteShell";
import AppShowcase from "@/components/sections/AppShowcase";
import Categories from "@/components/sections/Categories";
import CityCoverage from "@/components/sections/CityCoverage";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import ForPartners from "@/components/sections/ForPartners";
import ForRiders from "@/components/sections/ForRiders";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import PopularRestaurants from "@/components/sections/PopularRestaurants";
import Testimonials from "@/components/sections/Testimonials";
import TrustBar from "@/components/sections/TrustBar";

export default function Home() {
  return (
    <SiteShell heroIntro>
      <Hero />
      <TrustBar />
      <Categories />
      <HowItWorks />
      <PopularRestaurants />
      <AppShowcase />
      <ForPartners />
      <ForRiders />
      <CityCoverage />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </SiteShell>
  );
}
