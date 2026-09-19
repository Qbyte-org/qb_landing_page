import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import RestaurantsExperience from "@/components/sections/RestaurantsExperience";

export const metadata: Metadata = {
  title: "Restaurants — QuickBite",
  description:
    "Preview local meals and kitchens around Ile-Ife, explore your next craving, and get updates when ordering opens on the QuickBite app.",
};

export default function RestaurantsPage() {
  return (
    <SiteShell>
      <RestaurantsExperience />
    </SiteShell>
  );
}
