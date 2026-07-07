import type { Metadata } from "next";

import Footer from "@/components/footer";
import Header from "@/components/header";
import AreasHub from "@/components/location/AreasHub";
import type { LocationGridItem } from "@/lib/location-page";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allLocationsForGridQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "Explore the Bay Area cities and counties where Axiom Renovation provides kitchen, bathroom, and home remodeling services.",
  openGraph: {
    title: "Areas We Serve | Axiom Renovation",
    description:
      "Explore the Bay Area cities and counties where Axiom Renovation provides kitchen, bathroom, and home remodeling services.",
    type: "website",
  },
};

function isGridItem(row: unknown): row is LocationGridItem {
  if (!row || typeof row !== "object") return false;
  const r = row as Record<string, unknown>;
  return typeof r.title === "string" && typeof r.slug === "string";
}

export default async function AreasPage() {
  const rows = await sanityFetch({
    query: allLocationsForGridQuery,
    stega: false,
  });

  const locations = (Array.isArray(rows) ? rows : []).filter(isGridItem);

  return (
    <div className="min-h-screen bg-white text-brand-black">
      <Header />

      <main className="mx-auto w-full pt-24 md:pt-32">
        <AreasHub locations={locations} />
      </main>

      <section className="mask-overlap relative z-20 mt-auto bg-white pt-10">
        <Footer />
      </section>
    </div>
  );
}
