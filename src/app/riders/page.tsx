import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import RidersExperience from "@/components/sections/brand-pages/RidersExperience";

export const metadata: Metadata = {
  title: "Ride with QuickBite — Be part of the food run",
  description:
    "Explore QuickBite's app rider and dispatch partner paths. Join the waitlist for rider launch news in Ile-Ife, or talk to us about your delivery team.",
};

export default function RidersPage() {
  return (
    <SiteShell>
      <RidersExperience />
    </SiteShell>
  );
}
