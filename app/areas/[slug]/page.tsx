import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/footer";
import Header from "@/components/header";
import LocationPage from "@/components/location/LocationPage";
import {
  mapLocationQueryToPageProps,
  portableTextToPlain,
  trimForMetaDescription,
  type LocationBySlugQueryResult,
} from "@/lib/location-page";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import { locationBySlugQuery, locationSlugsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const rows = await client.fetch(locationSlugsQuery);
  const list = Array.isArray(rows) ? rows : [];
  return list.filter(
    (r): r is { slug: string } =>
      r != null && typeof r === "object" && typeof (r as { slug?: string }).slug === "string",
  );
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const doc = await sanityFetch({
    query: locationBySlugQuery,
    params: { slug },
    stega: false,
  });

  const data = doc as LocationBySlugQueryResult;
  const bodyPlain = portableTextToPlain(data?.body);
  if (!data?.title?.trim() || bodyPlain.length === 0) {
    notFound();
  }

  const title = `Home Remodeling in ${data.title.trim()}, CA`;
  const description = trimForMetaDescription(bodyPlain);

  const previousImages = (await parent).openGraph?.images || [];
  const ogSource = data.heroImage ?? data.projectHighlight?.afterImage ?? data.projectHighlight?.beforeImage;
  const ogImage = resolveOpenGraphImage(ogSource);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function AreaLocationPage({ params }: Props) {
  const { slug } = await params;
  const doc = await sanityFetch({
    query: locationBySlugQuery,
    params: { slug },
    stega: false,
  });

  const data = doc as LocationBySlugQueryResult;
  const pageProps = mapLocationQueryToPageProps(data);

  if (!pageProps) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-brand-black">
      <Header />
      <main className="mx-auto w-full">
        <LocationPage {...pageProps} />
      </main>
      <section className="mask-overlap relative z-20 mt-auto bg-white pt-10">
        <Footer />
      </section>
    </div>
  );
}
