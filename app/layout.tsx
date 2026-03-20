import type { Metadata } from "next";
import { geist, geistMono } from "./fonts";
import "./globals.css";
import ScrollToTop from "@/components/scroll-to-top";
import { Toaster } from "sonner";
import SmoothScrolling from "@/components/smooth-scrolling";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://axiom-web-six.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Axiom Renovation | Bay Area Home Remodeling Experts",
    template: "%s | Axiom Renovation",
  },
  description:
    "Transform your Bay Area home with Axiom Renovation. Licensed contractors specializing in kitchen remodeling, bathroom renovation, ADUs, and full home renovations. Free consultations.",
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
      <body className="font-geist antialiased">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
      <ScrollToTop />
      <Toaster />
    </html>
  );
}
