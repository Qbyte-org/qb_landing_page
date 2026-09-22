import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import ContactExperience from "@/components/sections/brand-pages/ContactExperience";

export const metadata: Metadata = {
  title: "Contact QuickBite",
  description:
    "Get in touch with QuickBite. Ask about our Ile-Ife launch, share an idea, or start a conversation about restaurant partnerships and riding with us.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactExperience />
    </SiteShell>
  );
}
