import FinalCTA from "@/components/sections/FinalCTA";
import CompanyPlans from "./CompanyPlans";
import CompanyTeamHero from "./CompanyTeamHero";

export default function CompanyExperience() {
  return (
    <>
      <CompanyTeamHero />
      <CompanyPlans />
      <FinalCTA
        id="company-final-cta"
        heading="A bigger table"
        supportingCopy="Pull up a chair. Find your next favourite."
        actionLabel="Explore restaurants"
        actionHref="/restaurants"
        splitBackground={false}
      />
    </>
  );
}
