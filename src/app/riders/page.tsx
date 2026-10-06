import { pageMetadata } from "@/content/pages";
import SiteShell from "@/components/layout/SiteShell";
import RidersExperience from "@/components/sections/brand-pages/RidersExperience";

export const metadata = pageMetadata["riders"];

export default function RidersPage() {
  return (
    <SiteShell>
      <RidersExperience />
    </SiteShell>
  );
}
