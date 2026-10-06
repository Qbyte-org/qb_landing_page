import { pageMetadata } from "@/content/pages";
import SiteShell from "@/components/layout/SiteShell";
import CompanyExperience from "@/components/sections/brand-pages/CompanyExperience";

export const metadata = pageMetadata["company"];

export default function CompanyPage() {
  return (
    <SiteShell>
      <CompanyExperience />
    </SiteShell>
  );
}
