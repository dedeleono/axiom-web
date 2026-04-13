"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { LocationGridItem } from "@/lib/location-page";

type AreasHubProps = {
  locations: LocationGridItem[];
};

type GroupedLocations = Record<string, LocationGridItem[]>;

function groupByCounty(items: LocationGridItem[]): GroupedLocations {
  const groups: GroupedLocations = {};
  const noCounty: LocationGridItem[] = [];

  for (const item of items) {
    const county = item.county?.trim();
    if (county) {
      if (!groups[county]) groups[county] = [];
      groups[county].push(item);
    } else {
      noCounty.push(item);
    }
  }

  if (noCounty.length > 0) {
    groups["Other Areas"] = noCounty;
  }

  return groups;
}

export default function AreasHub({ locations }: AreasHubProps) {
  const grouped = groupByCounty(locations);
  const counties = Object.keys(grouped).sort((a, b) => {
    if (a === "Other Areas") return 1;
    if (b === "Other Areas") return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-[95%] px-8 pb-24 pt-4 md:px-16 md:pb-32 md:pt-8 lg:px-24 xl:max-w-screen-2xl">
        <motion.div
          className="mb-16 max-w-3xl md:mb-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
            Areas We Serve
          </p>
          <h1 className="mb-8 text-4xl font-light leading-[1.05] tracking-tight text-brand-black md:text-6xl lg:text-7xl">
            Local expertise, Bay Area wide.
          </h1>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-brand-dark-gray md:text-xl">
            From Santa Clara to Alameda County, we bring the same precision and
            care to every neighborhood. Select your area to see how we can help.
          </p>
        </motion.div>

        {locations.length === 0 ? (
          <p className="text-brand-dark-gray">Service areas coming soon.</p>
        ) : (
          <div className="space-y-16 md:space-y-20">
            {counties.map((county, countyIndex) => (
              <motion.div
                key={county}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: countyIndex * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray md:mb-8">
                  {county}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                  {grouped[county].map((item, index) => (
                    <motion.div
                      key={item.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={`/areas/${item.slug}`}
                        className="group flex min-h-[120px] flex-col justify-between rounded-none border border-brand-light-gray bg-white p-6 transition-all duration-500 hover:border-brand-black/20 hover:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.12)] md:min-h-[140px] md:p-8"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-xl font-light tracking-tight text-brand-black transition-colors duration-300 group-hover:text-brand-orange md:text-2xl">
                            {item.title}, CA
                          </h3>
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none border border-brand-light-gray text-brand-black transition-all duration-300 group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white">
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                          </span>
                        </div>
                        <span className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark-gray transition-colors group-hover:text-brand-black">
                          View area
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="mt-20 border-t border-brand-light-gray pt-12 md:mt-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="max-w-xl text-sm font-light text-brand-dark-gray">
            Don&apos;t see your city?{" "}
            <Link
              href="/contact"
              className="font-medium text-brand-black underline decoration-brand-orange/50 underline-offset-4 transition-colors hover:decoration-brand-orange"
            >
              Reach out
            </Link>{" "}
            — we may still be able to help with your project.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
