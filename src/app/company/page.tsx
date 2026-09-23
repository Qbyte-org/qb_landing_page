import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import CompanyExperience from "@/components/sections/brand-pages/CompanyExperience";

export const metadata: Metadata = {
  title: "About QuickBite",
  description:
    "Get to know the thinking behind QuickBite, our local beginnings in Ile-Ife, and the values bringing food lovers, kitchens and riders together.",
};

export default function CompanyPage() {
  return (
    <SiteShell>
      <CompanyExperience />
    </SiteShell>
  );
}
