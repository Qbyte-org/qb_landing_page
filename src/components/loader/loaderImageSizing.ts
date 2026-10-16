export const loaderImageOverscan = 32;
export const loaderImageMaxZoom = 1.08;

export function loaderPreviewSrc(src: string) {
  const name = src.slice(src.lastIndexOf("/") + 1).replace(/\.webp$/, "");
  return `/images/food/loader/${name}-640.webp`;
}

/** Include full-screen cover, camera overscan and the largest zoom in srcset selection. */
export function loaderImageSizes(width: number, height: number) {
  const ratio = width / height;
  const viewport = 100 * loaderImageMaxZoom;
  const gutter = 2 * loaderImageOverscan * loaderImageMaxZoom;
  return `max(calc(${viewport}vw + ${gutter}px), calc(${viewport * ratio}vh + ${gutter * ratio}px))`;
}
