import type { MetadataRoute } from "next";
import themeColors from "@/generated/theme-colors.json";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QuickBite",
    short_name: "QuickBite",
    description: "Fast, fresh food delivery in Ile-Ife.",
    start_url: "/",
    display: "standalone",
    background_color: themeColors.paper,
    theme_color: themeColors.brand,
    icons: [
      {
        src: "/favicon/PNG/192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/PNG/512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
