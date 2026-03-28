"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { motion } from "framer-motion";
import {
  SERVICE_PAGE_SLUGS,
  TITLE_TO_SERVICE_SLUG,
  pathnameToServiceSlug,
  serviceDetailHref,
} from "@/lib/service-path";

interface TabService {
  slug: string;
  title: string;
  icon: SanityImage;
}

export default function ServiceTabs() {
  const pathname = usePathname();
  const [services, setServices] = useState<TabService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await client.fetch<{ slug?: string; title: string; icon: SanityImage }[]>(
          `*[_type == "innovation"]{
            "slug": slug.current,
            title,
            icon{asset->, hotspot}
          }`
        );
        const withSlug = result.map((r) => ({
          ...r,
          slug: r.slug ?? TITLE_TO_SERVICE_SLUG[r.title] ?? r.title.toLowerCase().replace(/\s+/g, "-"),
        }));
        const sorted = withSlug.sort((a, b) => {
          const idxA = SERVICE_PAGE_SLUGS.indexOf(a.slug as (typeof SERVICE_PAGE_SLUGS)[number]);
          const idxB = SERVICE_PAGE_SLUGS.indexOf(b.slug as (typeof SERVICE_PAGE_SLUGS)[number]);
          return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
        });
        setServices(sorted);
      } catch (err) {
        console.error("Error fetching services for tabs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const currentSlug = pathname ? pathnameToServiceSlug(pathname) : "";

  if (isLoading) {
    return (
      <div className="max-w-7xl pb-12 relative mx-10 font-geist min-h-[200px] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white relative z-20 pb-8">
      <motion.div 
        className="max-w-7xl mx-auto flex flex-row flex-wrap justify-center items-center gap-8 md:gap-16 pt-8 pb-12 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {services.map((service, index) => {
          const isActive = currentSlug === service.slug;
          return (
            <Link
              key={service.slug}
              href={serviceDetailHref(service.slug)}
              className="flex flex-col items-center flex-1 min-w-[100px] max-w-[150px] cursor-pointer group no-underline"
            >
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`relative w-20 h-20 md:w-24 md:h-24 p-4 transition-all duration-300 rounded-[1rem] ${
                    isActive ? "bg-brand-orange shadow-lg" : "bg-[#F5F5F5] group-hover:bg-[#EBEBEB]"
                  }`}
                >
                  {service.icon && (
                    <Image
                      src={urlFor(service.icon)?.auto("format")?.fit("max")?.url() ?? ""}
                      alt={service.title}
                      fill
                      className={`object-contain p-5 ${isActive ? "brightness-0 invert" : ""}`}
                      sizes="(max-width: 768px) 80px, 96px"
                    />
                  )}
                </div>
                <h3
                  className={`mt-6 text-center text-xs md:text-sm tracking-widest uppercase transition-colors ${
                    isActive
                      ? "text-brand-black font-semibold"
                      : "text-brand-dark-gray group-hover:text-brand-black font-medium"
                  }`}
                >
                  {service.title}
                </h3>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
