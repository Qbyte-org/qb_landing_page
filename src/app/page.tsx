import SiteShell from "@/components/layout/SiteShell";
import AppShowcase from "@/components/sections/AppShowcase";
import Categories from "@/components/sections/Categories";
import FAQ from "@/components/sections/FAQ";
import ForPartners from "@/components/sections/ForPartners";
import ForRiders from "@/components/sections/ForRiders";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import QuickBitePassportHub from "@/components/sections/QuickBitePassportHub";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <SiteShell heroIntro>
      <Hero />
      <Categories />
      <HowItWorks />
      <QuickBitePassportHub />
      <AppShowcase />
      <ForPartners />
      <ForRiders />
      <Testimonials />
      <FAQ />
      {/* <FinalCTA /> */}
      {/* <TrustBar /> */}
    </SiteShell>
  );
}
