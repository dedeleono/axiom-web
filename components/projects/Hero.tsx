"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

import { motion } from "framer-motion";

interface HeroData {
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

const Hero: React.FC = () => {
  const [homeData, setHomeData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageName =
          pathname === "/" ? "home" : pathname.slice(1).toLowerCase();

        const data = await client.fetch<HeroData>(
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

        setHomeData(data);
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

  if (!homeData) {
    return (
      <section className="w-full h-[600px] bg-red-100">No data found</section>
    );
  }

  return (
    <section className="w-full flex justify-center items-center overflow-visible">
      <div className="relative w-full h-[600px] md:h-[700px]">
        {homeData.img?.asset ? (
          <Image
            src={urlFor(homeData.img)?.url() ?? ""}
            alt={homeData.img.imgAlt || "Hero image"}
            fill
            className="object-cover md:object-center object-[30%_center]"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#18181a]" />
        )}

        {(homeData.heroText || homeData.heroSubText1 || homeData.heroSubText2 || homeData.heroDescription) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40">
            <motion.div 
              className="w-full max-w-screen-2xl mx-auto px-8 md:px-24 z-10 font-geist-mono"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {homeData.heroText && (
                <h1 className="text-4xl md:text-6xl font-light mb-6 text-left max-w-4xl leading-tight tracking-tight uppercase">
                  {homeData.heroText}
                </h1>
              )}
              {homeData.heroSubText1 && (
                <h2 className="text-3xl md:text-5xl font-light mb-4 w-full text-left">
                  {homeData.heroSubText1}
                </h2>
              )}
              {homeData.heroSubText2 && (
                <h2 className="text-3xl md:text-5xl font-light mb-4 w-full text-left">
                  {homeData.heroSubText2}
                </h2>
              )}
              {homeData.heroDescription && (
                <p className="text-base md:text-lg w-full md:w-1/2 text-left font-geist font-light">
                  {homeData.heroDescription}
                </p>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
