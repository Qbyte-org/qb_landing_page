import React, { forwardRef } from "react";
import Image from "next/image";
import { BentoTileData } from "./loaderData";


interface BentoTileProps {
  data: BentoTileData;
  className?: string;
  style?: React.CSSProperties;
}

const BentoTile = forwardRef<HTMLDivElement, BentoTileProps>(
  ({ data, className, style }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl${className ? " " + className : ""}`}
        style={{
          backgroundColor: data.backgroundColor || "transparent",
          color: data.textColor || "inherit",
          ...style,
        }}
      >
        <div data-bento-inner className="absolute inset-0 h-full w-full">
          {data.type === "brand" && (
            <div className="flex h-full w-full items-center justify-center p-6">
              <div data-brand-mark className="flex flex-col items-center gap-3 sm:flex-row">
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                  <Image
                    src="/quickbite-logo-light.svg"
                    alt="QuickBite"
                    fill
                    className="object-contain"
                  />
                </div>
                <div data-brand-wordmark className="overflow-hidden">
                  <span className="block font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    QuickBite
                  </span>
                </div>
              </div>
            </div>
          )}

          {(data.type === "food" ||
            data.type === "restaurant" ||
            data.type === "rider") &&
            data.content.imageSrc && (
              <div
                data-bento-image-wrapper
                className="relative h-full w-full overflow-hidden"
              >
                <Image
                  src={data.content.imageSrc}
                  alt={data.type}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
                />
              </div>
            )}

          {data.type === "app" && data.content.imageSrc && (
            <div className="flex h-full w-full items-center justify-center p-4">
              <div data-bento-app-mockup className="relative h-full w-full">
                <Image
                  src={data.content.imageSrc}
                  alt="App Mockup"
                  fill
                  className="object-contain object-bottom drop-shadow-2xl"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              </div>
            </div>
          )}

          {data.type === "order" && (
            <div className="flex h-full flex-col justify-center p-4 sm:p-6">
              <span className="mb-3 text-xs font-bold tracking-widest text-[#F15F00] sm:text-sm">
                {data.content.text}
              </span>
              <ul className="flex flex-col gap-2 text-xs font-medium sm:text-sm">
                <li className="flex items-center justify-between opacity-50">
                  <span>Preparing</span>
                  <span>✓</span>
                </li>
                <li className="flex items-center justify-between opacity-50">
                  <span>Picked up</span>
                  <span>✓</span>
                </li>
                <li data-bento-status-active className="flex items-center justify-between font-bold text-[#F15F00]">
                  <span>On the way</span>
                  <span className="animate-pulse">●</span>
                </li>
              </ul>
            </div>
          )}

          {data.type === "text" && (
            <div className="flex h-full items-center justify-center p-6 text-center">
              <span className="font-display text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
                {data.content.text}
              </span>
            </div>
          )}

          {data.type === "map" && (
            <div className="relative flex h-full items-center justify-center p-4">
              <div className="absolute inset-0 bg-[#fffaf5] opacity-50 [background-image:linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:2rem_2rem]"></div>
              <div className="relative flex w-full flex-col items-center gap-2">
                <div className="flex w-full items-center justify-between">
                  <div className="h-2 w-2 rounded-full bg-[#2a211d]"></div>
                  <div className="h-[2px] flex-1 overflow-hidden">
                    <div data-bento-route className="h-full w-full bg-[#F15F00] [transform-origin:left]"></div>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-[#F15F00]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

BentoTile.displayName = "BentoTile";

export default BentoTile;
