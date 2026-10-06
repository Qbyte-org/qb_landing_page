import Image, { type ImageProps } from "next/image";

/** Keep photographic detail consistent across the site; callers can still opt out. */
export default function SiteImage({ quality = 90, alt, ...props }: ImageProps) {
  return <Image {...props} alt={alt} quality={quality} />;
}
