import SectionWave from "../ui/SectionWave";
import FinalCTA from "./FinalCTA";
import RestaurantDirectory from "./restaurants/RestaurantDirectory";
import RestaurantHero from "./restaurants/RestaurantHero";

export default function RestaurantsExperience() {
  return (
    <div className="overflow-hidden bg-paper text-ink">
      <RestaurantHero />
      <SectionWave to="paper" />
      <RestaurantDirectory />
      <FinalCTA
        id="restaurant-cta"
        heading="Your next food run."
        supportingCopy="Join the waitlist for launch news and a first look at QuickBite in Ile-Ife."
        actionLabel="Join the waitlist"
        actionHref="/waitlist"
        splitBackground={false}
      />
    </div>
  );
}
