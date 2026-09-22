import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import RestaurantsExperience from "@/components/sections/RestaurantsExperience";

export const metadata: Metadata = {
  title: "Restaurants — QuickBite",
  description:
    "Explore menu previews, upcoming special offers and local kitchens around Ile-Ife. Find your next craving and get updates when QuickBite launches.",
};

export default function RestaurantsPage() {
  return (
    <SiteShell>
      <RestaurantsExperience />
    </SiteShell>
  );
}
