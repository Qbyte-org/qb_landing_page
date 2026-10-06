import { pageMetadata } from "@/content/pages";
import SiteShell from "@/components/layout/SiteShell";
import PartnersExperience from "@/components/sections/brand-pages/PartnersExperience";

export const metadata = pageMetadata["partners"];

export default function PartnersPage() {
  return (
    <SiteShell>
      <PartnersExperience />
    </SiteShell>
  );
}
