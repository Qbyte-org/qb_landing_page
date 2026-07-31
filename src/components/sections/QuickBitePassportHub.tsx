"use client";

import dynamic from "next/dynamic";
import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Clock3,
  MapPin,
  Star,
  Store,
} from "lucide-react";
import AnimatedStamp from "./quickbite-passport-hub/AnimatedStamp";
import CityStampSelector from "./quickbite-passport-hub/CityStampSelector";
import { keepPassportCardScroll } from "./quickbite-passport-hub/passportScroll";
import {
  getCityRestaurants,
  passportCities,
  type PassportRestaurant,
} from "./quickbite-passport-hub/passportHub.data";
import { gsap, useGSAP } from "@/lib/gsap";
import Container from "../ui/Container";
import LinkArrow from "../ui/LinkArrow";
import MagneticFillButton from "../ui/MagneticFillButton";

const PassportLeafletMap = dynamic(() => import("./PassportLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-[18rem] place-items-center rounded-[1.6rem] bg-[#f4e3d0] text-xs font-black uppercase tracking-[0.22em] text-[#8f6a57]">
      Preparing destination map
    </div>
  ),
});

const qrCells = new Set([
  0, 1, 2, 3, 5, 6, 7, 8, 10, 13, 15, 18, 20, 22, 24, 26, 27, 28, 29, 31,
  33, 35, 36, 38, 41, 42, 44, 46, 48, 49, 51, 53, 55, 57, 59, 60, 62, 64,
  66, 68, 69, 71, 73, 75, 76, 77, 78, 80,
]);

function BurgerLineArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 200" fill="none" aria-hidden="true" className={className}>
      <path d="M34 91C42 34 92 14 146 24C194 33 222 59 230 96" stroke="currentColor" strokeLinecap="round" strokeWidth="15" />
      <path d="M42 109H232" stroke="currentColor" strokeLinecap="round" strokeWidth="16" />
      <path d="M48 132C68 150 89 111 111 130C133 149 151 113 175 131C193 146 211 126 232 135" stroke="currentColor" strokeLinecap="round" strokeWidth="15" />
      <path d="M44 158H231" stroke="currentColor" strokeLinecap="round" strokeWidth="16" />
      <path d="M70 174C98 190 171 190 207 172" stroke="currentColor" strokeLinecap="round" strokeWidth="15" />
      <path d="M101 124L141 154L175 124" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
      <circle cx="99" cy="62" r="5.5" stroke="currentColor" strokeWidth="10" />
      <circle cx="139" cy="51" r="5.5" stroke="currentColor" strokeWidth="10" />
      <circle cx="174" cy="73" r="5.5" stroke="currentColor" strokeWidth="10" />
    </svg>
  );
}

function LocalMealBowlLineArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Bowl */}
      <path
        d="M36 92C70 70 190 70 224 92"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      <path
        d="M42 102C54 152 88 182 130 182C172 182 206 152 218 102"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Food */}
      <circle
        cx="94"
        cy="94"
        r="14"
        stroke="currentColor"
        strokeWidth="12"
      />

      <circle
        cx="132"
        cy="82"
        r="16"
        stroke="currentColor"
        strokeWidth="12"
      />

      <circle
        cx="172"
        cy="96"
        r="12"
        stroke="currentColor"
        strokeWidth="12"
      />

      <path
        d="M92 52C82 68 98 76 90 90"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M134 36C122 54 140 66 130 82"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M174 50C164 66 180 76 172 92"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SwallowSoupLineArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Bowl */}
      <path
        d="M36 92C70 70 190 70 224 92"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      <path
        d="M42 102C54 152 88 182 130 182C172 182 206 152 218 102"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Soup */}
      <path
        d="M68 118C88 104 108 129 132 116C152 104 176 112 194 126"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Swallow */}
      <path
        d="M120 70C134 56 154 56 168 70C180 84 174 102 156 108C142 112 126 104 120 90"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Spoon */}
      <path
        d="M194 36L168 78"
        stroke="currentColor"
        strokeWidth="13"
        strokeLinecap="round"
      />

      <circle
        cx="204"
        cy="28"
        r="10"
        stroke="currentColor"
        strokeWidth="12"
      />

      {/* Steam */}
      <path
        d="M84 42C72 58 90 68 80 84"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M122 28C110 46 128 58 118 74"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M160 40C148 58 166 70 156 86"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SuyaSkewerLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* skewer */}
      <path
        d="M28 158L236 54"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* meat */}
      <path
        d="M74 114L106 95L126 122L92 140Z"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinejoin="round"
      />

      <path
        d="M126 88L162 71L183 100L146 118Z"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinejoin="round"
      />

      <path
        d="M184 60L222 44L244 74L204 90Z"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinejoin="round"
      />

      {/* grill */}
      <path
        d="M78 46L58 66"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M146 24L126 46"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M212 14L192 38"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RamenBowlLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Bowl */}
      <path
        d="M58 84H202C198 148 176 178 130 178C84 178 62 148 58 84Z"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinejoin="round"
      />

      {/* Rim */}
      <path
        d="M48 84H212"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Noodles */}
      <path
        d="M82 104C98 94 114 116 130 104C146 92 162 116 180 104"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M84 126C102 114 116 136 134 126C152 116 168 136 182 124"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Chopsticks */}
      <path
        d="M168 22L214 70"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M188 14L232 62"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MeatPieLineArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Pie */}
      <path
        d="M48 120C58 66 98 38 150 38C202 38 240 66 250 120"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M54 126C90 160 208 160 244 126"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Crimp */}
      <path
        d="M70 136L82 148"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M94 136L106 148"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M118 136L130 148"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M142 136L154 148"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M166 136L178 148"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M190 136L202 148"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Top scoring */}
      <path
        d="M118 66L104 94"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />

      <path
        d="M152 58L138 90"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />

      <path
        d="M186 68L172 98"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PizzaSliceLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M40 42C90 18 171 20 224 62"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      <path
        d="M50 50L132 184L224 68"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* cheese */}
      <path
        d="M78 86C112 68 162 72 205 101"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* toppings */}
      <circle
        cx="103"
        cy="88"
        r="8"
        stroke="currentColor"
        strokeWidth="12"
      />

      <circle
        cx="150"
        cy="98"
        r="8"
        stroke="currentColor"
        strokeWidth="12"
      />

      <circle
        cx="136"
        cy="138"
        r="8"
        stroke="currentColor"
        strokeWidth="12"
      />
    </svg>
  );
}

function DrinksCupLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* lid */}
      <path
        d="M72 58H198"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* cup */}
      <path
        d="M84 58H186L172 178H98L84 58Z"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinejoin="round"
      />

      {/* drink */}
      <path
        d="M102 114C122 98 140 128 160 112C172 102 184 104 194 114"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* straw */}
      <path
        d="M128 58L112 18"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M112 18H60"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* bubbles */}
      <circle
        cx="206"
        cy="126"
        r="7"
        stroke="currentColor"
        strokeWidth="10"
      />

      <circle
        cx="50"
        cy="136"
        r="9"
        stroke="currentColor"
        strokeWidth="10"
      />
    </svg>
  );
}

function ShawarmaWrapLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* wrap */}
      <path
        d="M86 28C118 16 166 30 198 62C231 96 234 146 206 170C176 192 126 178 92 142C58 106 56 44 86 28Z"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinejoin="round"
      />

      {/* fold */}
      <path
        d="M72 58C112 96 146 122 196 160"
        stroke="currentColor"
        strokeWidth="13"
        strokeLinecap="round"
      />

      {/* filling */}
      <path
        d="M94 108C116 94 144 94 170 112"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M112 46C122 60 138 64 158 62"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <circle
        cx="176"
        cy="78"
        r="7"
        stroke="currentColor"
        strokeWidth="10"
      />
    </svg>
  );
}

function CoffeeCupLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Cup */}
      <path
        d="M72 82H172V148C172 167 158 180 132 180H112C86 180 72 167 72 148V82Z"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinejoin="round"
      />

      {/* Handle */}
      <path
        d="M172 100H194C212 100 220 114 217 130C214 146 199 154 176 150"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Rim */}
      <path
        d="M66 82H178"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Steam */}
      <path
        d="M96 46C82 30 104 22 92 10"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M132 48C118 32 142 24 130 10"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M166 46C154 30 176 22 166 8"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Saucer */}
      <path
        d="M88 180H168"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CroissantLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Body */}
      <path
        d="M52 126C68 68 116 44 162 60C205 74 228 120 214 160"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left horn */}
      <path
        d="M52 126C36 150 52 178 82 166"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinecap="round"
      />

      {/* Right horn */}
      <path
        d="M214 160C234 174 248 154 236 128"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinecap="round"
      />

      {/* Layers */}
      <path
        d="M82 116C100 84 126 72 154 78"
        stroke="currentColor"
        strokeWidth="13"
        strokeLinecap="round"
      />

      <path
        d="M128 136C142 104 164 90 190 94"
        stroke="currentColor"
        strokeWidth="13"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PancakesLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Pancake 1 */}
      <path
        d="M60 84C84 70 182 70 208 84"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Pancake 2 */}
      <path
        d="M56 108C88 122 182 122 214 108"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Pancake 3 */}
      <path
        d="M58 132C90 148 182 148 214 132"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Syrup */}
      <path
        d="M128 90C142 106 138 120 122 132"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Steam */}
      <path
        d="M110 42C98 58 122 64 108 80"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M150 46C138 60 160 66 148 82"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IceCreamLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Scoop */}
      <path
        d="M116 86C98 74 98 48 116 34C132 20 156 24 170 42C190 40 206 54 206 74C206 92 190 104 168 102"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cone */}
      <path
        d="M104 108L148 186L194 108"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Cone lines */}
      <path
        d="M130 142H176"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M142 164H166"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Rim */}
      <path
        d="M88 102H206"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SushiRollLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Left roll */}
      <circle
        cx="92"
        cy="104"
        r="42"
        stroke="currentColor"
        strokeWidth="16"
      />

      <circle
        cx="92"
        cy="104"
        r="18"
        stroke="currentColor"
        strokeWidth="12"
      />

      {/* Right roll */}
      <circle
        cx="170"
        cy="104"
        r="42"
        stroke="currentColor"
        strokeWidth="16"
      />

      <circle
        cx="170"
        cy="104"
        r="18"
        stroke="currentColor"
        strokeWidth="12"
      />

      {/* Plate */}
      <path
        d="M48 166H214"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </svg>
  );
}

function JollofRiceLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Bowl */}
      <path
        d="M56 96H204C198 150 174 180 130 180C86 180 62 150 56 96Z"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinejoin="round"
      />

      {/* Rice mound */}
      <path
        d="M70 96C86 60 174 60 190 96"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Rice texture */}
      <path
        d="M92 84L102 92"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M126 74L136 84"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M160 82L170 92"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GrilledChickenLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Chicken */}
      <path
        d="M72 114C72 62 118 34 162 46C204 58 222 104 198 144C178 178 130 182 94 160C80 152 72 136 72 114Z"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinejoin="round"
      />

      {/* Bone */}
      <path
        d="M192 92L232 66"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      <circle
        cx="238"
        cy="60"
        r="8"
        stroke="currentColor"
        strokeWidth="10"
      />

      <circle
        cx="226"
        cy="74"
        r="8"
        stroke="currentColor"
        strokeWidth="10"
      />

      {/* Grill marks */}
      <path
        d="M110 82L146 118"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M134 70L170 106"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TacoLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Shell */}
      <path
        d="M56 144C56 88 92 52 130 52C170 52 204 88 204 144"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Filling */}
      <path
        d="M76 116C92 94 108 120 126 102C142 84 160 120 182 102"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M86 134C102 122 120 144 138 130C156 116 172 140 188 128"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Base */}
      <path
        d="M54 144H206"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SaladBowlLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Bowl */}
      <path
        d="M56 92H204C198 150 174 178 130 178C86 178 62 150 56 92Z"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinejoin="round"
      />

      {/* Leaves */}
      <path
        d="M94 88C84 62 110 52 122 76"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M132 82C130 56 154 56 156 82"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path
        d="M168 88C180 62 200 70 190 92"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Tomato */}
      <circle
        cx="128"
        cy="104"
        r="8"
        stroke="currentColor"
        strokeWidth="10"
      />
    </svg>
  );
}

function SeafoodLineArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Shrimp */}
      <path
        d="M82 120C82 74 126 52 166 68C196 80 204 114 184 140C164 164 124 164 98 146"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tail */}
      <path
        d="M176 68L204 46"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
      />

      <path
        d="M190 82L220 62"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Segments */}
      <path
        d="M108 86L120 98"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M132 96L144 110"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M154 108L166 122"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Eye */}
      <circle
        cx="100"
        cy="94"
        r="4"
        fill="currentColor"
      />
    </svg>
  );
}

type RestaurantLineArtKind =
  | "bakery"
  | "breakfast"
  | "cafe"
  | "dessert"
  | "grilled-chicken"
  | "jollof"
  | "local-meal"
  | "meat-pie"
  | "noodles"
  | "pizza"
  | "salad"
  | "seafood"
  | "shawarma"
  | "swallow"
  | "suya"
  | "sushi"
  | "taco"
  | "drinks"
  | "burger";

function getRestaurantLineArtKind(restaurant: PassportRestaurant): RestaurantLineArtKind {
  const text = `${restaurant.name} ${restaurant.cuisine}`.toLowerCase();

  if (text.includes("swallow") || text.includes("soup")) return "swallow";
  if (text.includes("mama put")) return "local-meal";
  if (text.includes("jollof") || text.includes("nigerian")) return "jollof";
  if (text.includes("suya") || text.includes("asun")) return "suya";
  if (text.includes("chicken") || text.includes("wings")) return "grilled-chicken";
  if (text.includes("shawarma") || text.includes("wrap")) return "shawarma";
  if (text.includes("taco")) return "taco";
  if (text.includes("pizza")) return "pizza";
  if (text.includes("sushi")) return "sushi";
  if (text.includes("seafood") || text.includes("fish") || text.includes("shrimp")) return "seafood";
  if (text.includes("salad")) return "salad";
  if (text.includes("burger")) return "burger";
  if (text.includes("noodle") || text.includes("ramen")) return "noodles";
  if (text.includes("coffee") || text.includes("cafe")) return "cafe";
  if (text.includes("dessert") || text.includes("sweet") || text.includes("ice cream")) return "dessert";
  if (text.includes("breakfast") || text.includes("pancake")) return "breakfast";
  if (text.includes("bakery") || text.includes("croissant")) return "bakery";
  if (text.includes("drink") || text.includes("smoothie") || text.includes("juice")) {
    return "drinks";
  }
  if (text.includes("small chop") || text.includes("pastr") || text.includes("snack") || text.includes("bites")) {
    return "meat-pie";
  }
  if (text.includes("grill")) {
    return "suya";
  }

  return "burger";
}

function RestaurantFoodLineArt({
  restaurant,
  className = "",
}: {
  restaurant: PassportRestaurant;
  className?: string;
}) {
  const kind = getRestaurantLineArtKind(restaurant);

  if (kind === "bakery") return <CroissantLineArt className={className} />;
  if (kind === "breakfast") return <PancakesLineArt className={className} />;
  if (kind === "cafe") return <CoffeeCupLineArt className={className} />;
  if (kind === "dessert") return <IceCreamLineArt className={className} />;
  if (kind === "grilled-chicken") return <GrilledChickenLineArt className={className} />;
  if (kind === "jollof") return <JollofRiceLineArt className={className} />;
  if (kind === "local-meal") return <LocalMealBowlLineArt className={className} />;
  if (kind === "meat-pie") return <MeatPieLineArt className={className} />;
  if (kind === "noodles") return <RamenBowlLineArt className={className} />;
  if (kind === "pizza") return <PizzaSliceLineArt className={className} />;
  if (kind === "salad") return <SaladBowlLineArt className={className} />;
  if (kind === "seafood") return <SeafoodLineArt className={className} />;
  if (kind === "shawarma") return <ShawarmaWrapLineArt className={className} />;
  if (kind === "swallow") return <SwallowSoupLineArt className={className} />;
  if (kind === "suya") return <SuyaSkewerLineArt className={className} />;
  if (kind === "sushi") return <SushiRollLineArt className={className} />;
  if (kind === "taco") return <TacoLineArt className={className} />;
  if (kind === "drinks") return <DrinksCupLineArt className={className} />;

  return <BurgerLineArt className={className} />;
}

function QrCodeMark() {
  return (
    <div className="grid h-[5.75rem] w-[5.75rem] grid-cols-9 gap-[0.15rem] rounded-[0.25rem] bg-[#17100d] p-1.5">
      {Array.from({ length: 81 }).map((_, index) => (
        <span
          key={index}
          className={qrCells.has(index) ? "bg-[#cfa982]" : "bg-[#17100d]"}
        />
      ))}
    </div>
  );
}

function RestaurantMembershipCard({
  restaurant,
  accent,
  highlighted,
}: {
  restaurant: PassportRestaurant;
  accent: string;
  highlighted: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isOpen = flipped || hovered || highlighted;

  const toggle = () => setFlipped((value) => !value);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <motion.article
      data-passport-postcard
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-[14.85rem] w-full shrink-0 text-[#17100d] outline-none sm:h-[13.15rem]"
      style={{ "--card-accent": accent } as CSSProperties}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-[1.35rem] bg-[#cfa982] ring-1 ring-[#17100d]/16 transition-colors duration-300 ${highlighted ? "ring-2 ring-[var(--card-accent)]" : ""
          }`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(255,255,255,.2) 0 1px, transparent 1.4px), radial-gradient(circle at 80% 58%, rgba(23,16,13,.11) 0 1px, transparent 1.5px), linear-gradient(105deg, rgba(255,255,255,.14), transparent 42%)",
          backgroundSize: "13px 13px, 17px 17px, 100% 100%",
        }}
      >
        <motion.div
          initial={false}
          animate={{ opacity: isOpen ? 0.08 : 0.5 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -right-[6.9rem] top-6 h-[10.4rem] w-[14.2rem] text-[#151515] sm:-right-[4.8rem] sm:top-2 sm:h-[12.4rem] sm:w-[15.5rem] lg:-right-[3.75rem]"
        >
          <RestaurantFoodLineArt
            restaurant={restaurant}
            className="h-full w-full"
          />
        </motion.div>
        <motion.div
          initial={false}
          animate={
            isOpen
              ? { x: "-30%", opacity: 0 }
              : { x: "0%", opacity: 1 }
          }
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-10 px-5 py-5 will-change-transform sm:px-6 sm:py-6 lg:px-7"
        >
          <div className="relative z-10 flex h-full max-w-[68%] flex-col justify-center sm:max-w-[60%]">
            <p className="text-[0.68rem] font-black tracking-[0.08em] text-[var(--card-accent)]">
              {restaurant.eta} • {restaurant.rating}★
            </p>
            <h3 className="mt-2 line-clamp-2 font-display text-[1.42rem] font-black leading-[0.92] tracking-[-0.055em] text-[#151515] sm:mt-3 sm:text-[1.65rem]">
              {restaurant.name}
            </h3>
            <p className="mt-2 line-clamp-1 text-[0.78rem] font-semibold text-[#5f5148] sm:text-[0.82rem]">
              {restaurant.cuisine}
            </p>
            <LinkArrow
              href="/restaurants"
              variant="light"
              ariaLabel={`View ${restaurant.name}`}
              onClick={(event) => event.stopPropagation()}
              className="mt-4 [--link-arrow-min-width:7.2rem] border-[#2a211d]/18 pb-1 text-[0.62rem] font-black text-[#2a211d] sm:mt-5"
            >
              View
            </LinkArrow>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={
            isOpen
              ? { x: "0%", opacity: 1 }
              : { x: "42%", opacity: 0 }
          }
          transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-20 bg-[#cfa982] px-6 py-5 will-change-transform"
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <div className="h-full pr-16">
            <div className="min-w-0">
              <h3 className="line-clamp-2 font-display text-[1.55rem] font-black leading-[0.92] tracking-[-0.06em] text-[#151515]">
                {restaurant.name}
              </h3>
              <p className="mt-2 line-clamp-2 max-w-[16rem] text-[0.75rem] font-semibold leading-relaxed text-[#5f5148]">
                {restaurant.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-[0.68rem] font-black text-[#2a211d]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a211d]/7 px-2.5 py-1">
                  <Clock3 className="h-3.5 w-3.5" strokeWidth={2.3} />
                  {restaurant.eta}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a211d]/7 px-2.5 py-1">
                  <Star className="h-3.5 w-3.5 text-[var(--card-accent)]" strokeWidth={2.3} />
                  {restaurant.rating}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a211d]/7 px-2.5 py-1">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={2.3} />
                  {restaurant.deliveryFrom}
                </span>
              </div>
            </div>
            <div className="hidden">
              <QrCodeMark />
            </div>
          </div>

          <div className="absolute inset-x-6 bottom-[3.5rem] h-px bg-[#17100d]/12" />
          <div className="absolute inset-x-6 bottom-4 flex items-center justify-between gap-3">
            <p className="line-clamp-1 text-[0.68rem] font-black text-[#2a211d]">
              {restaurant.avgOrder} avg order
            </p>
            <LinkArrow
              href="/restaurants"
              onClick={(event) => event.stopPropagation()}
              variant="light"
              ariaLabel={`Open ${restaurant.name}`}
              className="[--link-arrow-min-width:6.8rem] border-[#2a211d]/18 pb-1 text-[0.62rem] font-black text-[#2a211d]"
            >
              Open
            </LinkArrow>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function QuickBitePassportHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const rightPageRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const [activeCityId, setActiveCityId] = useState(passportCities[0].id);
  const [selectedCityId, setSelectedCityId] = useState(passportCities[0].id);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [highlightedRestaurant, setHighlightedRestaurant] = useState<string | null>(null);

  const activeCity =
    passportCities.find((city) => city.id === activeCityId) ?? passportCities[0];
  const selectedCity =
    passportCities.find((city) => city.id === selectedCityId) ?? activeCity;
  const selectedNode =
    activeCity.nodes.find((node) => node.name === selectedArea) ?? null;

  const cityRestaurants = useMemo(
    () => getCityRestaurants(activeCity, selectedNode),
    [activeCity, selectedNode],
  );

  const handleCityChange = (nextCityId: string) => {
    if (
      nextCityId === selectedCityId ||
      isAnimatingRef.current ||
      !passportCities.some((city) => city.id === nextCityId)
    ) {
      return;
    }

    setSelectedCityId(nextCityId);

    const leftPage = leftPageRef.current;
    const rightPage = rightPageRef.current;
    const spread = spreadRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!leftPage || !rightPage || !spread || reducedMotion) {
      setActiveCityId(nextCityId);
      setSelectedArea(null);
      return;
    }

    isAnimatingRef.current = true;
    const postcards = spread.querySelectorAll("[data-passport-postcard]");
    const spine = spread.querySelector("[data-passport-spine]");
    const underlay = spread.querySelector("[data-page-underlay]");
    const stamp = stampRef.current;

    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setActiveCityId(nextCityId);
        setSelectedArea(null);
        setHighlightedRestaurant(null);
        isAnimatingRef.current = false;
      },
    });

    timeline
      .to(spine, { scaleX: 0.72, duration: 0.48 }, 0)
      .to(
        leftPage,
        {
          rotateY: -34,
          skewY: 1.2,
          x: -18,
          scaleX: 0.985,
          filter: "drop-shadow(24px 28px 32px rgba(58,36,24,.22))",
          transformOrigin: "right center",
          duration: 0.9,
        },
        0,
      )
      .to(
        rightPage,
        {
          rotateY: 5,
          x: 22,
          y: 6,
          filter: "drop-shadow(-18px 18px 28px rgba(58,36,24,.16))",
          transformOrigin: "left center",
          duration: 0.76,
        },
        0.05,
      )
      .fromTo(
        underlay,
        { x: 34, autoAlpha: 0 },
        { x: 0, autoAlpha: 0.75, duration: 0.7 },
        0.12,
      )
      .to(
        postcards,
        {
          x: 42,
          y: 18,
          scale: 0.98,
          autoAlpha: 0,
          stagger: 0.04,
          duration: 0.42,
        },
        0,
      );

    if (stamp) {
      timeline.to(
        stamp,
        {
          y: 20,
          rotate: 8,
          scale: 0.9,
          autoAlpha: 0,
          duration: 0.42,
        },
        0.04,
      );
    }
  };

  useGSAP(
    () => {
      const leftPage = leftPageRef.current;
      const rightPage = rightPageRef.current;
      const stamp = stampRef.current;
      const ink = inkRef.current;
      const spread = spreadRef.current;
      if (!leftPage || !rightPage || !spread) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set([leftPage, rightPage, stamp], {
          autoAlpha: 1,
          clearProps: "transform,filter",
        });
        return;
      }

      const spine = spread.querySelector("[data-passport-spine]");
      const underlay = spread.querySelector("[data-page-underlay]");
      const postcards = spread.querySelectorAll("[data-passport-postcard]");

      gsap.set([leftPage, rightPage], {
        transformPerspective: 1300,
        transformStyle: "preserve-3d",
      });
      gsap.set(underlay, { autoAlpha: 0 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .fromTo(
          leftPage,
          {
            rotateY: 20,
            skewY: -0.7,
            x: 18,
            autoAlpha: 0.7,
            filter: "drop-shadow(18px 22px 30px rgba(58,36,24,.22))",
          },
          {
            rotateY: 0,
            skewY: 0,
            x: 0,
            autoAlpha: 1,
            filter: "drop-shadow(0 0 0 rgba(58,36,24,0))",
            duration: 0.82,
          },
          0,
        )
        .fromTo(
          rightPage,
          {
            rotateY: -8,
            x: 20,
            y: 4,
            autoAlpha: 0.78,
          },
          {
            rotateY: 0,
            x: 0,
            y: 0,
            autoAlpha: 1,
            duration: 0.82,
          },
          0.06,
        )
        .to(spine, { scaleX: 1, duration: 0.62 }, 0.1)
        .fromTo(
          postcards,
          { x: 30, y: 22, scale: 0.98, autoAlpha: 0 },
          {
            x: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.18,
        );

      if (stamp) {
        timeline.fromTo(
          stamp,
          { y: -62, rotate: -20, scale: 1.14, scaleY: 1.08, autoAlpha: 0 },
          {
            keyframes: [
              { y: 6, rotate: -7, scaleY: 0.9, autoAlpha: 1, duration: 0.45 },
              { y: -8, scaleY: 1.04, duration: 0.16 },
              { y: 0, scaleY: 1, duration: 0.22 },
            ],
            ease: "power3.out",
          },
          0.2,
        );
      }

      if (ink) {
        timeline.fromTo(
          ink,
          { scale: 0.2, opacity: 0.24 },
          {
            scale: 1.65,
            opacity: 0,
            duration: 0.95,
            ease: "power2.out",
          },
          0.48,
        );
      }
    },
    { scope: spreadRef, dependencies: [activeCityId, selectedArea] },
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const path = section.querySelector<SVGPathElement>(
        "[data-passport-app-bike-path]",
      );
      const bike = section.querySelector<SVGElement>(
        "[data-passport-app-wave-bike]",
      );
      if (!path || !bike) return;

      gsap.set(bike, {
        xPercent: -50,
        yPercent: -62,
        transformOrigin: "50% 66%",
        autoAlpha: 1,
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(bike, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.66],
            autoRotate: true,
            start: 0.12,
            end: 0.12,
          },
        });
        return;
      }

      const tween = gsap.to(bike, {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.66],
          autoRotate: true,
          start: 0,
          end: 1,
        },
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      return () => {
        tween.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="restaurants"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#2a211d] pb-[7rem] pt-10 text-[#fffaf3] sm:pb-[9rem] sm:pt-14 lg:pb-[14rem] lg:pt-32"
      style={
        {
          "--passport-accent": activeCity.accent,
          "--passport-paper": activeCity.paper,
        } as CSSProperties
      }
    >
      <span id="cities" className="absolute top-0" aria-hidden="true" />

      <Container className="relative z-10">
        <div
          data-section-motion-header
          className="mx-auto mb-10 flex max-w-[60rem] flex-col items-center text-center md:text-left md:flex-row md:items-center md:justify-between"
        >
          <div className="flex w-full flex-col items-center text-center gap-6 md:flex-row md:text-left md:items-center md:justify-between">
            <div className="contents">
              <h2 className="font-display text-[2.85rem] font-black leading-[0.9] tracking-[-0.07em] sm:text-[4rem]">
                <span className="block sm:hidden">
                  Food
                  <span className="block text-[var(--passport-accent)]">
                    by city.
                  </span>
                </span>
                <span className="hidden sm:block">
                  Discover food
                  <span className="block text-[var(--passport-accent)]">
                    by destination.
                  </span>
                </span>
              </h2>
              <MagneticFillButton
                href="/restaurants"
                ariaLabel="Explore kitchens"
                variant="brand"
                customFillClass="bg-[#fffaf3]"
                customHoverTextColor="#2a211d"
                className="h-12 w-max rounded-pill !bg-[var(--passport-accent)] px-7 text-sm font-black text-white sm:h-14 sm:px-9"
              >
                Explore kitchens →
              </MagneticFillButton>
            </div>
          </div>
        </div>

        <div
          ref={spreadRef}
          className="relative z-20 mt-8 sm:rounded-[2.35rem] bg-[#3a2418] p-1.5 max-sm:-m-4 [perspective:1400px] h-full"
        >
          <div
            data-page-underlay
            aria-hidden="true"
            className="absolute inset-3 sm:rounded-[2rem] bg-[#2a211d]"
          />
          <div className="relative grid overflow-hidden sm:rounded-[2rem] bg-[#f8efe3]  lg:grid-cols-2">
            <div
              data-passport-spine
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 top-0 z-30 hidden w-10 -translate-x-1/2 origin-center rounded-full bg-[linear-gradient(90deg,transparent,rgba(58,36,24,.18),rgba(255,255,255,.28),rgba(58,36,24,.12),transparent)] lg:block"
            />

            <div
              ref={leftPageRef}
              className="group relative overflow-hidden bg-[var(--passport-paper)] p-4 sm:p-6 lg:h-[40rem] lg:p-7"
            >
              <div className="relative z-10 flex h-full min-h-0 flex-col">
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <h3 className="text-[2.7rem] font-black leading-[0.82] text-[#2a211d] sm:text-[3.55rem] lg:text-[3.85rem]">
                    {activeCity.name}
                  </h3>

                  <AnimatedStamp city={activeCity} stampRef={stampRef} inkRef={inkRef} />
                </div>

                <div className="relative mt-5 max-h-[30rem] flex-1 overflow-hidden rounded-[1.55rem] bg-[#f4e3d0] ring-1 ring-[#3a2418]/10">
                  <PassportLeafletMap
                    city={activeCity}
                    neighbourhoods={activeCity.nodes}
                    restaurants={cityRestaurants}
                    selectedNode={selectedNode}
                    onSelectNode={(node) =>
                      setSelectedArea(selectedNode?.name === node.name ? null : node.name)
                    }
                    onHoverRestaurant={setHighlightedRestaurant}
                  />
                </div>

                <div className="pointer-events-none mt-4 flex w-full justify-center">
                  <div className="flex max-w-[92%] items-center gap-2 rounded-pill bg-[#fffaf3]/94 px-4 py-2 text-[0.72rem] font-bold text-[#2a211d] ring-1 ring-[#2a211d]/12 backdrop-blur">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--passport-accent)] text-white">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                        <path
                          d="M12 21S5.8 15.9 5.8 10.6A6.2 6.2 0 0 1 12 4.4a6.2 6.2 0 0 1 6.2 6.2C18.2 15.9 12 21 12 21Z"
                          fill="currentColor"
                        />
                        <circle cx="12" cy="10.6" r="2.1" fill="#fffaf3" />
                      </svg>
                    </span>
                    Click a live food stop to filter nearby kitchens
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={rightPageRef}
              className="group relative overflow-hidden bg-[#fffaf3] p-4 sm:p-6 lg:flex lg:h-[40rem] lg:flex-col lg:p-7"
            >
              <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                <div className="relative rounded-[1.45rem] bg-[#fffaf3] p-4 text-[#2a211d] ring-1 ring-[#2a211d]/10 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-display text-[2.25rem] font-black leading-[0.86] tracking-[-0.075em] text-[#2a211d] sm:text-[2.85rem]">
                        Kitchen Guide
                      </h3>
                    </div>

                    {/* <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#2a211d] text-[#fffaf3]">
                      <MapPin className="h-5 w-5 text-[var(--passport-accent)]" strokeWidth={2.35} />
                    </span> */}
                  </div>

                  <div className="my-2 h-px bg-[#2a211d]/10" />

                  <div className="mt-4 flex flex-wrap items-end gap-2 text-[0.76rem] font-black text-[#2a211d]">
                    <div>
                      <p className="mb-3 text-[0.64rem] font-black uppercase tracking-[0.14em] text-[#9a7a66]">
                        Destinations
                      </p>
                      <CityStampSelector
                        cities={passportCities}
                        selectedCity={selectedCity}
                        onSelect={handleCityChange}
                      />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a211d]/6 px-3 py-1.5">
                      <Clock3 className="h-3.5 w-3.5 text-[var(--passport-accent)]" strokeWidth={2.35} />
                      {activeCity.avgEta}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a211d]/6 px-3 py-1.5">
                      <Store className="h-3.5 w-3.5 text-[var(--passport-accent)]" strokeWidth={2.35} />
                      {activeCity.restaurantCount} Restaurants
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a211d]/6 px-3 py-1.5">
                      <Star className="h-3.5 w-3.5 text-[var(--passport-accent)]" strokeWidth={2.35} />
                      {activeCity.avgRating}
                    </span>
                  </div>
                </div>

                <div
                  className="passport-card-scroll mt-4 h-[23rem] min-h-0 space-y-3 overflow-y-auto overscroll-contain pb-2 pr-3 sm:h-[25rem] lg:h-auto lg:flex-1"
                  data-lenis-prevent
                  data-lenis-prevent-touch
                  data-lenis-prevent-wheel
                  onWheel={keepPassportCardScroll}
                  tabIndex={0}
                >
                  <AnimatePresence mode="popLayout">
                    {cityRestaurants.map((restaurant) => (
                      <RestaurantMembershipCard
                        key={`${activeCity.id}-${selectedNode?.name ?? "all"}-${restaurant.name}`}
                        restaurant={restaurant}
                        accent={activeCity.accent}
                        highlighted={highlightedRestaurant === restaurant.name}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="hidden sm:block mx-auto mt-5 max-w-xl text-center text-xs font-semibold leading-relaxed text-[#f5eadc]/68">
          Select a destination, pan the map, then tap a neighbourhood marker to
          filter the restaurant membership cards.
        </p>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-0 h-20 overflow-x-clip overflow-y-visible min-[480px]:h-28 sm:h-52 sm:overflow-visible"
      >
        <svg
          className="absolute left-1/2 top-0 h-full w-[178vw] -translate-x-1/2 overflow-visible text-[#fffaf5] sm:static sm:w-full sm:translate-x-0"
          viewBox="0 0 1440 210"
          preserveAspectRatio="none"
        >
          <path
            d="M0 65C136 110 244 105 392 72C545 38 626 117 770 143C915 169 987 86 1126 59C1255 34 1328 89 1440 55V210H0V65Z"
            fill="currentColor"
          />
          <path
            data-passport-app-bike-path
            d="M0 65C136 110 244 105 392 72C545 38 626 117 770 143C915 169 987 86 1126 59C1255 34 1328 89 1440 55"
            fill="none"
            stroke="#f0d7c2"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            d="M22 93C154 132 266 120 406 96C548 72 628 143 764 166C918 191 998 108 1138 87C1258 69 1322 113 1418 86"
            fill="none"
            stroke="#c9aa96"
            strokeDasharray="8 12"
            strokeLinecap="round"
            strokeOpacity=".72"
            strokeWidth="3"
          />
          <image
            data-passport-app-wave-bike
            href="/quickbite-delivery-bike.svg"
            width="238"
            height="140"
          />
        </svg>
      </div>
    </section>
  );
}
