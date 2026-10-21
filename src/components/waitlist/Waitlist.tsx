import SmoothScroll from "../layout/SmoothScroll";
import AppStorySection from "./sections/AppStorySection";
import { FinalJoin, FounderNote, WaitlistFaq, WaitlistFooter } from "./sections/ClosingSections";
import CravingSection from "./sections/CravingSection";
import PlateSection from "./sections/PlateSection";
import StickyJoin from "./sections/StickyJoin";
import WaitlistHero from "./sections/WaitlistHero";
import WavesSection from "./sections/WavesSection";

// Scroll order follows the decision a visitor makes: recognise the moment, want the food,
// believe the product, see why joining now matters, trust the people, then commit.
export default function Waitlist({ initialEmail = "" }: { initialEmail?: string }) {
  return (
    <>
      <SmoothScroll />
      <main data-scroll-motion="off" className="relative bg-dark-ink">
        <WaitlistHero initialEmail={initialEmail} />
        <CravingSection />
        <PlateSection />
        <AppStorySection />
        <WavesSection />
        <FounderNote />
        <WaitlistFaq />
        <FinalJoin />
        <WaitlistFooter />
      </main>
      <StickyJoin />
    </>
  );
}
