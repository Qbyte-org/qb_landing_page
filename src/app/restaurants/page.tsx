import { pageMetadata } from "@/content/pages";
import SiteShell from "@/components/layout/SiteShell";
import RestaurantsExperience from "@/components/sections/RestaurantsExperience";

export const metadata = pageMetadata["restaurants"];

export default function RestaurantsPage() {
  return (
    <SiteShell>
      <RestaurantsExperience />
    </SiteShell>
  );
}
