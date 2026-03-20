"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const SERVICE_SLUGS = ["bathroom-remodeling", "kitchen-remodeling", "home-addition"] as const;

interface HomeHeroData {
  _id: string;
  title: string;
  pageName: string;
  img: {
    asset: { _ref: string; _type: string };
    imgAlt?: string;
    hotspot?: { x: number; y: number; height: number; width: number };
  };
  heroText?: string;
  heroSubText1?: string;
  heroSubText2?: string;
  heroDescription?: string;
}

export default function ServiceHero() {
  const [heroData, setHeroData] = useState<HomeHeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pathSlug = pathname === "/" ? "" : pathname.slice(1).toLowerCase();

        const pageName = SERVICE_SLUGS.includes(pathSlug as (typeof SERVICE_SLUGS)[number])
          ? "innovation"
          : pathname === "/"
            ? "home"
            : pathSlug;

        const data = await client.fetch<HomeHeroData | null>(
          `*[_type == "home" && pageName == $pageName][0]{
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
          }`,
          { pageName }
        );
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
            <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-24 z-10 font-geist-mono">
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
