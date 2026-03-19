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
      <div className="relative w-full">
        {img?.asset ? (
          <Image
            src={urlFor(img)?.url() ?? ""}
            alt={(imgAlt as string) || heroData.title || "Hero image"}
            width={1200}
            height={600}
            className="w-full md:h-[700px] h-[900px] rounded-md object-cover md:object-center object-[30%_center]"
            priority
          />
        ) : (
          <div className="w-full md:h-[700px] h-[900px] bg-[#18181a]" />
        )}

        {(heroText || heroSubText1 || heroSubText2 || heroDescription) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <div className="absolute inset-0 z-0 flex justify-end bg-[#18181a]/50" />
            <div className="flex flex-col items-start w-full max-w-5xl z-10 font-geist-mono">
              {heroText && (
                <h1 className="md:text-5xl text-3xl font-bold mb-4 w-full text-left pl-[10%] md:pl-[5%] pr-4 md:pr-0">
                  {heroText}
                </h1>
              )}
              {heroSubText1 && (
                <h2 className="md:text-5xl text-3xl font-bold mb-4 w-full text-left md:text-center pl-[20%] md:pl-0 pr-4 md:pr-0">
                  {heroSubText1}
                </h2>
              )}
              {heroSubText2 && (
                <h2 className="md:text-5xl text-3xl font-bold mb-4 w-full text-left md:text-right pl-[30%] md:pl-0 pr-4 md:pr-[5%]">
                  {heroSubText2}
                </h2>
              )}
              {heroDescription && (
                <p className="md:text-base text-sm w-full md:w-1/2 text-left pl-[40%] md:pl-0 pr-4 md:ml-[50%] md:pr-[10%] pt-4 font-geist">
                  {heroDescription}
                </p>
              )}
              <div className="h-12 md:hidden" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
