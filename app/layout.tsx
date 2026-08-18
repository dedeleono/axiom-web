import type { Metadata } from "next";
import { geist, geistMono } from "./fonts";
import "./globals.css";
import ScrollToTop from "@/components/scroll-to-top";
import { Toaster } from "sonner";
import SmoothScrolling from "@/components/smooth-scrolling";
import { GoogleTagManager } from "@next/third-parties/google";
import JsonLd from "@/components/json-ld";
import { localBusinessJsonLd } from "@/lib/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.axiom-remodel.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Axiom Renovation | Bay Area Home Remodeling Experts",
    template: "%s | Axiom Renovation",
  },
  description:
    "Transform your Bay Area home with Axiom Renovation. Licensed contractors specializing in kitchen remodeling, bathroom renovation, ADUs, and full home renovations. Free consultations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Axiom Renovation",
    title: "Axiom Renovation | Bay Area Home Remodeling Experts",
    description:
      "Transform your Bay Area home with Axiom Renovation. Licensed contractors specializing in kitchen remodeling, bathroom renovation, ADUs, and full home renovations. Free consultations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axiom Renovation | Bay Area Home Remodeling Experts",
    description:
      "Transform your Bay Area home with Axiom Renovation. Licensed contractors specializing in kitchen remodeling, bathroom renovation, ADUs, and full home renovations.",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <GoogleTagManager gtmId="GTM-P8S2X875" />
      <body className="font-geist antialiased">
        <JsonLd data={localBusinessJsonLd} />
        <SmoothScrolling>{children}</SmoothScrolling>
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}
