"use client";

import { type ImageLoaderProps, type ImageProps } from "next/image";
import Image from "./SiteImage";

const foodRoot = "/images/food/pinterest/";
const responsiveWidths = [320, 640, 960, 1200, 1600, 2048] as const;

function localFoodLoader({ src, width }: ImageLoaderProps) {
  const selectedWidth = responsiveWidths.find((candidate) => candidate >= width) ?? 2048;
  const name = src.slice(foodRoot.length).replace(/\.webp$/, "");
  return `${foodRoot}responsive/${name}-${selectedWidth}.webp`;
}

/** Source-based, quality-90 variants retain detail without a second lossy encode. */
export default function FoodImage({ alt, ...props }: ImageProps) {
  const isBoardPhoto = typeof props.src === "string" && props.src.startsWith(foodRoot) && props.src.endsWith(".webp") && !props.src.includes("/responsive/");
  return <Image {...props} alt={alt} loader={isBoardPhoto ? localFoodLoader : props.loader} />;
}
