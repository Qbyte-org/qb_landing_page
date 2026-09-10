import MagneticFillButton from "../../ui/MagneticFillButton";
import BiteRouteIcon from "./BiteRouteIcon";

export default function ProcessControls({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="relative z-20 mt-7 inline-flex items-center gap-2 rounded-[1.35rem] bg-ink p-1.5 outline outline-paper/15 sm:mt-8 sm:p-2">
      <MagneticFillButton
        type="button"
        ariaLabel="Previous process step"
        onClick={onPrevious}
        variant="ghost"
        customFillClass="bg-brand"
        customHoverTextColor="#2a211d"
        className="flex h-[3.25rem] w-[3.25rem] cursor-pointer items-center justify-center rounded-[1rem] border-0 !bg-paper !text-ink sm:h-[3.65rem] sm:w-[3.65rem]"
      >
        <BiteRouteIcon direction="left" className="h-7 w-7" />
      </MagneticFillButton>
      <MagneticFillButton
        type="button"
        ariaLabel="Next process step"
        onClick={onNext}
        variant="ghost"
        customFillClass="bg-paper"
        customHoverTextColor="#2a211d"
        className="flex h-[3.25rem] w-[3.25rem] cursor-pointer items-center justify-center rounded-[1rem] border-0 !bg-brand !text-ink sm:h-[3.65rem] sm:w-[3.65rem]"
      >
        <BiteRouteIcon className="h-7 w-7" />
      </MagneticFillButton>
    </div>
  );
}
