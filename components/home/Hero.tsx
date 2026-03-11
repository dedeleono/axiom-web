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
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="text-white text-center p-8 z-20 max-w-4xl mx-auto">
          <h2 className="text-sm md:text-base font-light tracking-widest mb-4 uppercase">
            Welcome to Axiom Renovation | License: 1105006
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {projectsData?.heroText || "We turn ideas into timeless living spaces"}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 uppercase tracking-wide">
            {projectsData?.heroDescription || "HOME RENOVATION COMPANY Serving the Bay Area"}
          </p>
          <Link href={projectsData?.heroCtaUrl ?? "/contact"}>
            <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-lg font-medium transition-all">
              {projectsData?.heroCtaLabel ?? "Book a Free Consultation"}
            </Button>
          </Link>
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
    <section className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10" />
      {/* Native img to avoid Next.js Image loader issues with Sanity CDN */}
      <img
        src={imageUrl}
        alt={projectsData.img.imgAlt || "Hero image"}
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />
      <div className="relative z-20 text-white text-center px-4 max-w-5xl mx-auto mt-20">
          <h2 className="text-sm md:text-base font-medium tracking-widest mb-6 uppercase">
            {projectsData.heroSubText1 || "Welcome to Axiom Renovation | License: 1105006"}
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {projectsData.heroText || "We turn ideas into timeless living spaces"}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 uppercase tracking-wide">
            {projectsData.heroDescription || "HOME RENOVATION COMPANY Serving the Bay Area"}
          </p>
          <Link href={projectsData.heroCtaUrl ?? "/contact"}>
            <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-lg font-medium transition-all transform hover:scale-105">
              {projectsData.heroCtaLabel ?? "Book a Free Consultation"}
            </Button>
          </Link>
      </div>

      <div
        className="absolute bottom-8 z-20 animate-bounce cursor-pointer"
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
