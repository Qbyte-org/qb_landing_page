import { MapPin } from "lucide-react";
import MagneticFillButton from "../../ui/MagneticFillButton";
import type { PassportCity } from "./passportHub.data";

export default function CityStampSelector({
  cities,
  selectedCity,
  onSelect,
}: {
  cities: PassportCity[];
  selectedCity: PassportCity;
  onSelect: (cityId: string) => void;
}) {
  return (
    <div className="flex w-full flex-wrap gap-2">
      {cities.map((city) => {
        const active = city.id === selectedCity.id;

        return (
          <MagneticFillButton
            key={city.id}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(city.id)}
            variant="light"
            customFillClass="bg-brand"
            customHoverTextColor="#ffffff"
            className={`min-h-11 rounded-full px-3 py-1.5 text-[0.8rem] font-semibold sm:px-3.5 sm:py-2 sm:text-sm ${
              active
                ? "bg-ink! text-paper!"
                : "bg-cream-200! text-cocoa!"
            }`}
          >
            {active ? (
              <MapPin className="h-3.5 w-3.5" strokeWidth={2.45} />
            ) : null}
            {city.name}
          </MagneticFillButton>
        );
      })}
    </div>
  );
}
