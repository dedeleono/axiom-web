import type { Metadata } from "next";
import { VisualEditing, toPlainText } from "next-sanity";
import { draftMode } from "next/headers";
import Link from "next/link";

import AlertBanner from "./alert-banner";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { blogSettingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: blogSettingsQuery,
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      {isDraftMode && <AlertBanner />}
      <Header />
      <main className="bg-white text-black min-h-screen">
        {children}
      </main>
      <Footer />
      {isDraftMode && <VisualEditing />}
    </>
  );
}
