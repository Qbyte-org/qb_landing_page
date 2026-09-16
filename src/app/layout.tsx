import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
