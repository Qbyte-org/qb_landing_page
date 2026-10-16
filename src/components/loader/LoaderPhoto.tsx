import { loaderImageSizes, loaderPreviewSrc } from "./loaderImageSizing";

// True pixel widths from scripts/prepare-loader-photos.mjs, including zoom exports.
const widths = [640, 960, 1600, 2400, 3200, 3840];

export default function LoaderPhoto({
  src, alt, width, height, first, maxWidth = 3840,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  first: boolean;
  maxWidth?: number;
}) {
  const name = src.slice(src.lastIndexOf("/") + 1).replace(/\.webp$/, "");
  const source = (size: number) => `/images/food/loader/${name}-${size}.webp`;
  const srcSet = widths.filter((size) => size <= maxWidth).map((size) => `${source(size)} ${size}w`).join(", ");
  const preview = loaderPreviewSrc(src);

  // These files are already optimized. Native srcset preserves their exact
  // width descriptors and avoids a second lossy encode through Next Image.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={first ? source(1600) : preview}
      srcSet={first ? srcSet : undefined}
      data-loader-source={source(1600)}
      data-loader-srcset={srcSet}
      data-loader-preview={preview}
      sizes={loaderImageSizes(width, height)}
      width={width}
      height={height}
      alt={alt}
      loading="eager"
      fetchPriority={first ? "high" : "low"}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
