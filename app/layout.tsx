import type { Metadata } from "next";
import { geist, geistMono } from "./fonts";
import "./globals.css";
import ScrollToTop from "@/components/scroll-to-top";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Axiom Renovation | Bay Area Home Remodeling Experts",
  description:
    "Transform your home with Axiom Renovation. Licensed Bay Area contractors specializing in kitchen remodeling, bathroom renovation, ADUs, and full home renovations. Free consultations available.",
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
      <body className="font-geist antialiased">{children}</body>
      <ScrollToTop />
      <Toaster />
    </html>
  );
}
