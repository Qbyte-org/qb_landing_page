import FinalCTA from "@/components/sections/FinalCTA";
import { companyContent } from "@/content/company";
import CompanyPlans from "./CompanyPlans";
import CompanyTeamHero from "./CompanyTeamHero";

export default function CompanyExperience() {
  return (
    <>
      <CompanyTeamHero />
      <CompanyPlans />
      <FinalCTA
        id="company-final-cta"
        {...companyContent.cta}
        splitBackground={false}
        waveFrom="cream-200"
      />
    </>
  );
}
