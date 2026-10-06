import { pageMetadata, documentLanguage } from "@/content/pages";
import { Inter, Sora } from "next/font/google";
import PageTransitions from "@/components/layout/PageTransitions";
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

export const metadata = pageMetadata["layout"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={documentLanguage}
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><PageTransitions>{children}</PageTransitions></body>
    </html>
  );
}
