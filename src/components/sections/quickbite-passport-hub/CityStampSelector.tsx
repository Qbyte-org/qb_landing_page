import { motion } from "motion/react";
import { MapPin } from "lucide-react";
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
          <motion.button
            key={city.id}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(city.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-[0.8rem] font-black transition-colors sm:px-3.5 sm:py-2 sm:text-sm ${
              active
                ? "bg-[#2a211d] text-white"
                : "bg-white text-[#5d4639] hover:bg-[#f5eadc]"
            }`}
          >
            {active ? (
              <MapPin className="h-3.5 w-3.5" strokeWidth={2.45} />
            ) : null}
            {city.name}
          </motion.button>
        );
      })}
    </div>
  );
}
