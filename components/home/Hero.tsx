"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { HeroData } from "@/lib/interfaces";
import { ArrowUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScrollPastViewportFraction } from "@/lib/use-scroll-past-viewport-fraction";

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
  const showScrollUp = useScrollPastViewportFraction(0.3);

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
      <section className="w-full h-[600px] bg-brand-light-gray animate-pulse" />
    );
  }

  // Fallback when no home document or no image
  if (!projectsData?.img) {
    return (
      <section className="relative w-full flex justify-center items-center overflow-visible bg-brand-black min-h-[600px]">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="text-white text-center p-8 z-20 max-w-4xl mx-auto">
          <h2 className="text-sm md:text-base font-light tracking-widest mb-4 uppercase">
            Welcome to Axiom Renovation | License: 1105006
          </h2>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
            {projectsData?.heroText || "We turn ideas into timeless living spaces"}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 uppercase tracking-wide">
            {projectsData?.heroDescription || "HOME RENOVATION COMPANY Serving the Bay Area"}
          </p>
          <Link href={projectsData?.heroCtaUrl ?? "/contact"}>
            <Button className="bg-white px-8 py-6 text-lg font-medium text-brand-black transition-all hover:bg-brand-light-gray rounded-none">
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
      <section className="relative w-full flex justify-center items-center overflow-visible bg-brand-black min-h-[600px]">
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

  const ctaHref = projectsData.heroCtaUrl ?? "/contact";
  const ctaLabel = projectsData.heroCtaLabel ?? "Get In Touch";

  return (
    <>
      <section className="relative flex h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/40" />
        {/* Native img to avoid Next.js Image loader issues with Sanity CDN */}
        <img
          src={imageUrl}
          alt={projectsData.img.imgAlt || "Hero image"}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />

        <div className="absolute left-8 top-[25%] z-20 text-left text-white md:left-24 md:top-[30%]">
          <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-white/80 md:text-sm">
            {projectsData.heroSubText1 ||
              "Welcome to Axiom Renovation | License: 1105006"}
          </h2>
          <h1 className="mb-6 max-w-4xl text-5xl font-light uppercase leading-[0.9] tracking-tighter md:text-[6rem] lg:text-[8rem]">
            {projectsData.heroText || "We turn ideas into timeless living spaces"}
          </h1>
          <p className="text-sm font-light uppercase tracking-widest text-white/80 md:text-base">
            {projectsData.heroDescription ||
              "HOME RENOVATION COMPANY Serving the Bay Area"}
          </p>
        </div>

        {/* Mobile CTA — in-hero only */}
        <div className="absolute bottom-12 left-8 right-8 z-20 md:hidden">
          <Link href={ctaHref}>
            <Button className="w-full rounded-none border border-white bg-white px-8 py-6 text-xs font-semibold uppercase tracking-widest text-black transition-colors duration-300 hover:border-brand-orange hover:bg-brand-orange hover:text-white">
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </section>

      {/* Desktop: dock — back-to-top (left) + consultation CTA (right), aligned height */}
      <div className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 hidden md:flex md:bottom-10 md:right-16 md:items-stretch md:gap-2 lg:right-24">
        {showScrollUp ? (
          <Button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            size="icon"
            className="h-auto min-h-14 w-14 shrink-0 rounded-none border border-white/70 bg-zinc-900 text-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] transition-colors hover:bg-white hover:text-black"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2} />
          </Button>
        ) : null}
        <Link href={ctaHref} className="flex min-w-0">
          <Button className="h-14 min-h-14 cursor-pointer rounded-none border border-white bg-white px-8 text-xs font-semibold uppercase tracking-widest text-black shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:border-brand-orange hover:bg-brand-orange hover:text-white md:px-12">
            {ctaLabel}
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Hero;
