import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import Categories from "@/components/sections/Categories";
import CityCoverage from "@/components/sections/CityCoverage";
import FinalCTA from "@/components/sections/FinalCTA";
import PageHeader from "@/components/sections/PageHeader";
import PopularRestaurants from "@/components/sections/PopularRestaurants";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Restaurants — QuickBite",
  description:
    "Browse verified restaurants, home kitchens and vendors delivering across Ile-Ife on QuickBite — with more Nigerian cities coming soon.",
};

export default function RestaurantsPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Order food"
        title="Find restaurants near you in Ile-Ife"
        subtitle="Verified kitchens across Ile-Ife, one app. Full ordering goes live with the QuickBite app — preview what's cooking below."
      >
        <Button href="#app" size="lg">
          Get the app
        </Button>
        <Button href="/" variant="outline" size="lg">
          Back home
        </Button>
      </PageHeader>
      <Categories />
      <PopularRestaurants />
      <CityCoverage />
      <FinalCTA />
    </SiteShell>
  );
}
