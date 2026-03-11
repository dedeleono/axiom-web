"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

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
      <div className="relative w-full">
        {homeData.img?.asset ? (
          <Image
            src={urlFor(homeData.img)?.url() ?? ""}
            alt={homeData.img.imgAlt || "Hero image"}
            width={1200}
            height={600}
            className="w-full md:h-[700px] h-[900px] rounded-md object-cover md:object-center object-[30%_center]"
            priority
          />
        ) : (
          <div className="w-full md:h-[700px] h-[900px] bg-[#18181a]" />
        )}
      </div>
    </section>
  );
};

export default Hero;
