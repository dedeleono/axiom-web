"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

import { motion } from "framer-motion";
import {
  isServiceDetailSlug,
  pathnameToServiceSlug,
  type ServicePageSlug,
} from "@/lib/service-path";
import {
  innovationHeroVisual,
  type InnovationHeroVisualInput,
} from "@/lib/innovation-hero";

interface SanityHeroImage {
  asset?: { _ref: string; _type: string } | null;
  imgAlt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
}

interface HomeHeroData {
  _id: string;
  title: string;
  pageName: string;
  img: SanityHeroImage;
  heroText?: string;
  heroSubText1?: string;
  heroSubText2?: string;
  heroDescription?: string;
}

type ServiceDetailHeroData = InnovationHeroVisualInput;

const innovationHeroFields = `{
  title,
  "heroImage": heroImage { asset->, hotspot, imgAlt },
  "image": image { asset->, hotspot },
  "gallery": gallery[]{asset->, hotspot}
}`;

async function fetchInnovationByServiceSlug(
  slug: ServicePageSlug
): Promise<ServiceDetailHeroData | null> {
  let row = await client.fetch<ServiceDetailHeroData | null>(
    `*[_type == "innovation" && defined(slug.current) && slug.current == $slug][0]${innovationHeroFields}`,
    { slug }
  );

  if (!row) {
    const titlesToTry: Record<ServicePageSlug, string[]> = {
      "bathroom-remodeling": ["Bathroom Remodeling", "Bathroom Remodel"],
      "kitchen-remodeling": ["Kitchen Remodeling", "Kitchen Remodel"],
      "home-addition": ["Home Addition", "Home Additions", "ADU & Home Additions"],
      "adu": ["ADU Construction", "ADU", "ADU & Home Additions"],
      "new-construction": ["New Construction", "Custom Home Construction", "Garage"],
      "outdoor-remodeling": ["Outdoor Remodeling", "Outdoor Remodel", "Outdoor Living"],
      landscaping: ["Landscaping", "Landscape Design & Build", "Outdoor Living", "Outdoor Remodeling"],
    };
    for (const title of titlesToTry[slug] ?? []) {
      row = await client.fetch<ServiceDetailHeroData | null>(
        `*[_type == "innovation" && title == $title][0]${innovationHeroFields}`,
        { title }
      );
      if (row) break;
    }
  }

  if (!row) {
    const all = await client.fetch<ServiceDetailHeroData[]>(
      `*[_type == "innovation"]${innovationHeroFields}`
    );
    const normalized = (t: string) =>
      t.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
    row =
      all?.find(
        (s) => normalized(s.title).includes(slug) || slug.includes(normalized(s.title))
      ) ?? null;
  }

  if (slug === "landscaping") {
    return row ? { ...row, title: "Bay Area Landscaping" } : { title: "Bay Area Landscaping" };
  }

  return row;
}

export default function ServiceHero() {
  const [heroData, setHeroData] = useState<HomeHeroData | null>(null);
  const [serviceHero, setServiceHero] = useState<ServiceDetailHeroData | null>(null);
  const [isServiceDetail, setIsServiceDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const rawPath = pathname === "/" ? "" : pathname.slice(1).toLowerCase();
        const serviceSlug = pathnameToServiceSlug(pathname).toLowerCase();
        const onDetail = isServiceDetailSlug(serviceSlug);
        setIsServiceDetail(onDetail);

        if (onDetail) {
          setServiceHero(null);
          const row = await fetchInnovationByServiceSlug(serviceSlug);
          setServiceHero(row);
          setHeroData(null);
          return;
        }

        setServiceHero(null);

        const pageName = pathname === "/" ? "home" : rawPath;

        const heroQuery = `*[_type == "home" && pageName == $pageName][0]{
            _id,
            title,
            pageName,
            "img": {
              "asset": img.asset->,
              "imgAlt": img.imgAlt,
              "hotspot": img.hotspot
            },
            heroText,
            heroSubText1,
            heroSubText2,
            heroDescription
          }`;

        let data = await client.fetch<HomeHeroData | null>(heroQuery, { pageName });

        if (!data && pageName === "services") {
          data = await client.fetch<HomeHeroData | null>(heroQuery, {
            pageName: "innovation",
          });
        }

        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pathname]);

  if (isLoading) {
    return (
      <section className="w-full h-[600px] bg-gray-100 animate-pulse" />
    );
  }

  if (isServiceDetail) {
    if (!serviceHero?.title) {
      return (
        <section className="w-full h-[600px] bg-[#18181a] flex items-center justify-center text-white/80 text-sm px-8">
          Service not found
        </section>
      );
    }

    const resolved = innovationHeroVisual(serviceHero);
    const hi = resolved?.image;
    const imgAlt = resolved?.alt ?? serviceHero.title;

    return (
      <section className="w-full flex justify-center items-center overflow-visible">
        <div className="relative w-full h-[600px] md:h-[700px]">
          {hi?.asset ? (
            <Image
              src={urlFor(hi)?.url() ?? ""}
              alt={imgAlt}
              fill
              className="object-cover md:object-center object-[30%_center]"
              priority
            />
          ) : (
            <div className="w-full h-full bg-[#18181a]" />
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40">
            <motion.div
              className="w-full max-w-screen-2xl mx-auto px-8 md:px-24 z-10 font-geist-mono"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl font-light text-left max-w-4xl leading-tight tracking-tight uppercase">
                {serviceHero.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  if (!heroData) {
    return (
      <section className="w-full h-[600px] bg-red-100">No data found</section>
    );
  }

  const img = heroData.img;
  const heroText = heroData.heroText;
  const heroSubText1 = heroData.heroSubText1;
  const heroSubText2 = heroData.heroSubText2;
  const heroDescription = heroData.heroDescription;
  const imgAlt = heroData.img?.imgAlt;

  return (
    <section className="w-full flex justify-center items-center overflow-visible">
      <div className="relative w-full h-[600px] md:h-[700px]">
        {img?.asset ? (
          <Image
            src={urlFor(img)?.url() ?? ""}
            alt={(imgAlt as string) || heroData.title || "Hero image"}
            fill
            className="object-cover md:object-center object-[30%_center]"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#18181a]" />
        )}

        {(heroText || heroSubText1 || heroSubText2 || heroDescription) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40">
            <motion.div 
              className="w-full max-w-screen-2xl mx-auto px-8 md:px-24 z-10 font-geist-mono"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {heroText && (
                <h1 className="text-4xl md:text-6xl font-light mb-6 text-left max-w-4xl leading-tight tracking-tight uppercase">
                  {heroText}
                </h1>
              )}
              {heroSubText1 && (
                <h2 className="text-3xl md:text-5xl font-light mb-4 w-full text-left">
                  {heroSubText1}
                </h2>
              )}
              {heroSubText2 && (
                <h2 className="text-3xl md:text-5xl font-light mb-4 w-full text-left">
                  {heroSubText2}
                </h2>
              )}
              {heroDescription && (
                <p className="text-base md:text-lg w-full md:w-1/2 text-left font-geist font-light">
                  {heroDescription}
                </p>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
