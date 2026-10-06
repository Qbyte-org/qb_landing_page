import type { Metadata, MetadataRoute } from "next";
import themeColors from "@/generated/theme-colors.json";

export const documentLanguage = "en";

export const pageMetadata = {
  "layout": {
    metadataBase: new URL("https://www.quickbiteltd.org/"),
    title: "QuickBite — Fast. Fresh. Delivered. in Ile-Ife",
    description:
      "Order jollof, grills, swallow and more from top restaurants in Ile-Ife, Osun State. Fast delivery, live tracking, and easy payments with Paystack — launching across Nigeria next.",
    keywords: [
      "food delivery Ile-Ife",
      "order food Ile-Ife",
      "OAU food delivery",
      "food delivery Nigeria",
      "QuickBite",
      "jollof delivery",
      "restaurant delivery",
    ],
    icons: {
      icon: [
        { url: "/favicon/SVG/16.svg", sizes: "16x16", type: "image/svg+xml" },
        { url: "/favicon/SVG/32.svg", sizes: "32x32", type: "image/svg+xml" },
        { url: "/favicon/SVG/48.svg", sizes: "48x48", type: "image/svg+xml" },
        { url: "/favicon/PNG/192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon/PNG/512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/favicon/PNG/180.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      title: "QuickBite — Fast. Fresh. Delivered. in Ile-Ife",
      description:
        "Order from your favourite spots in Ile-Ife, delivered to your door in minutes. Pay easily with Paystack. Nigeria next.",
      type: "website",
      locale: "en_NG",
      siteName: "QuickBite",
    },
    twitter: {
      card: "summary_large_image",
      title: "QuickBite — Fast. Fresh. Delivered. in Ile-Ife",
      description:
        "Order from your favourite spots in Ile-Ife, delivered to your door in minutes. Nigeria next.",
    },
  },
  "company": {
    title: "About QuickBite",
    description:
      "Get to know the thinking behind QuickBite, our local beginnings in Ile-Ife, and the values bringing food lovers, kitchens and riders together.",
  },
  "contact": {
    title: "Contact QuickBite",
    description:
      "Get in touch with QuickBite. Ask about our Ile-Ife launch, share an idea, or start a conversation about restaurant partnerships and riding with us.",
  },
  "partners": {
    title: "Become a Partner — QuickBite",
    description:
      "Bring your restaurant or home kitchen to QuickBite. Discover how partnership works and join the waitlist for updates when partner applications open.",
  },
  "restaurants": {
    title: "Restaurants — QuickBite",
    description:
      "Explore menu previews, upcoming special offers and local kitchens around Ile-Ife. Find your next craving and get updates when QuickBite launches.",
  },
  "riders": {
    title: "Ride with QuickBite — Be part of the food run",
    description:
      "Explore QuickBite's app rider and dispatch partner paths. Join the waitlist for rider launch news in Ile-Ife, or talk to us about your delivery team.",
  },
  "waitlist": {
    title: "Join the Waitlist | QuickBite",
    description:
      "Join the QuickBite waitlist for launch updates and the first look at restaurants delivering across Ile-Ife.",
    alternates: {
      canonical: "/waitlist",
    },
  },
  "delete-account": {
    title: "Delete Your Account — QuickBite",
    description: "Request the permanent deletion of your QuickBite account and all associated data. Learn what happens when you delete your account.",
    robots: { index: false, follow: false },
  },
} satisfies Record<string, Metadata>;

export const siteManifest: MetadataRoute.Manifest = {
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

export function legalPageMetadata(title: string, description: string): Metadata {
  return { title: `${title} — QuickBite`, description };
}
