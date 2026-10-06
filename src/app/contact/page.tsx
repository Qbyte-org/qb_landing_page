import { pageMetadata } from "@/content/pages";
import SiteShell from "@/components/layout/SiteShell";
import ContactExperience from "@/components/sections/brand-pages/ContactExperience";

export const metadata = pageMetadata["contact"];

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactExperience />
    </SiteShell>
  );
}
