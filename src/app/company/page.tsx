import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import CompanyExperience from "@/components/sections/brand-pages/CompanyExperience";

export const metadata: Metadata = {
  title: "About QuickBite",
  description:
    "Meet QuickBite: bringing food lovers, local kitchens and delivery riders together, starting in Ile-Ife. Built for Nigeria, with speed and trust at heart.",
};

export default function CompanyPage() {
  return (
    <SiteShell>
      <CompanyExperience />
    </SiteShell>
  );
}
