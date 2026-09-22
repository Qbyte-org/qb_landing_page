import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import PartnersExperience from "@/components/sections/brand-pages/PartnersExperience";

export const metadata: Metadata = {
  title: "Become a Partner — QuickBite",
  description:
    "Bring your restaurant or home kitchen to QuickBite. Discover how partnership works and join the waitlist for updates when partner applications open.",
};

export default function PartnersPage() {
  return (
    <SiteShell>
      <PartnersExperience />
    </SiteShell>
  );
}
