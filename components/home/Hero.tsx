"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { HeroData } from "@/lib/interfaces";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroDataExtended extends HeroData {
  heroSubText1?: string;
  heroSubText2?: string;
  heroDescription?: string;
  heroCtaLabel?: string;
  heroCtaUrl?: string;
  img?: {
    asset: { _ref: string; _type: string };
    imgAlt?: string;
    hotspot?: { x: number; y: number; height: number; width: number };
  };
}

const Hero: React.FC = () => {
  const [projectsData, setProjectsData] = useState<HeroDataExtended | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const scrollToNextSection = () => {
    const heroSection = document.querySelector("section");
    if (heroSection) {
      const sectionBottom =
        heroSection.offsetTop + heroSection.offsetHeight;
      window.scrollTo({
        top: sectionBottom,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch<HeroDataExtended>(
          `*[_type == "home" && (pageName == "home" || !defined(pageName))][0]{
            _id,
            title,
            pageName,
            img{
              _type,
              asset,
              "imgAlt": imgAlt,
              hotspot
            },
            heroText,
            heroSubText1,
            heroSubText2,
            heroDescription,
            heroCtaLabel,
            heroCtaUrl
          }`
        );
        setProjectsData(data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full h-[600px] bg-gray-100 animate-pulse" />
    );
  }

  // Fallback when no home document or no image
  if (!projectsData?.img) {
    return (
      <section className="relative w-full flex justify-center items-center overflow-visible bg-[#18181a] min-h-[600px]">
        <div className="text-white text-center p-8">
          <h1 className="text-4xl font-bold mb-4">
            {projectsData?.heroText || "Welcome to Axiom Renovation"}
          </h1>
          <p className="text-xl opacity-90">
            {projectsData?.heroDescription ||
              "Add a Home document with pageName &quot;home&quot; and a cover image in Sanity Studio to customize this section."}
          </p>
          <a
            href="/studio"
            className="inline-block mt-6 px-6 py-3 border border-white rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors"
          >
            Open Studio
          </a>
        </div>
      </section>
    );
  }

  const imageUrl = urlFor(projectsData.img)?.url() ?? "";

  if (!imageUrl) {
    return (
      <section className="relative w-full flex justify-center items-center overflow-visible bg-[#18181a] min-h-[600px]">
        <div className="text-white text-center p-8">
          <h1 className="text-4xl font-bold mb-4">
            {projectsData.heroText || "Image URL could not be generated"}
          </h1>
          <p className="text-sm opacity-75 mt-2">
            Check that the cover image is properly uploaded and published in Sanity Studio.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full flex justify-center items-center overflow-visible">
      {/* Native img to avoid Next.js Image loader issues with Sanity CDN */}
      <img
        src={imageUrl}
        alt={projectsData.img.imgAlt || "Hero image"}
        className="w-full md:h-[700px] h-[calc(100vh)] rounded-md object-cover md:object-center object-[30%_center]"
        fetchPriority="high"
      />
      {(projectsData.heroText ||
        projectsData.heroSubText1 ||
        projectsData.heroSubText2 ||
        projectsData.heroDescription) && (
        <div className="absolute text-white text-center font-geist">
          {projectsData.heroText && (
            <h1 className="text-4xl font-bold mb-4 tracking-tight">{projectsData.heroText}</h1>
          )}
          {projectsData.heroSubText1 && (
            <p className="text-xl font-light">{projectsData.heroSubText1}</p>
          )}
          {projectsData.heroSubText2 && (
            <p className="text-xl font-light">{projectsData.heroSubText2}</p>
          )}
          {projectsData.heroDescription && (
            <p className="text-lg mt-2 font-light">{projectsData.heroDescription}</p>
          )}
          <div className="mt-8">
            <Link href={projectsData.heroCtaUrl ?? "/contact"}>
              <Button className="bg-[#f25e40] text-white hover:bg-[#f25e40] cursor-pointer rounded-lg px-8 py-6 text-lg font-medium transition-all transform hover:scale-105">
                {projectsData.heroCtaLabel ?? "Start Your Project"}
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div
        className="absolute bottom-8 animate-bounce cursor-pointer"
        onClick={scrollToNextSection}
        role="button"
        tabIndex={0}
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
};

export default Hero;
