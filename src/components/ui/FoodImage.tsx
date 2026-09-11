"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

const foodRoot = "/images/food/pinterest/";
const responsiveWidths = [320, 640, 960, 1200] as const;

function localFoodLoader({ src, width }: ImageLoaderProps) {
  const selectedWidth = responsiveWidths.find((candidate) => candidate >= width) ?? 1200;
  const name = src.slice(foodRoot.length).replace(/\.webp$/, "");
  return `${foodRoot}responsive/${name}-${selectedWidth}.webp`;
}

/** Board photos have prebuilt responsive files, so image delivery never waits for an optimizer. */
export default function FoodImage({ alt, ...props }: ImageProps) {
  const isBoardPhoto = typeof props.src === "string" && props.src.startsWith(foodRoot) && props.src.endsWith(".webp") && !props.src.includes("/responsive/");
  return <Image {...props} alt={alt} loader={isBoardPhoto ? localFoodLoader : props.loader} />;
}
