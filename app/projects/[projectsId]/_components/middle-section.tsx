"use client";

import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageObject } from "@/lib/interfaces";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface MiddleSectionProps {
  title: string;
  services: string;
  lengthOfProject: string;
  budget: string;
  description1: string;
  description2?: string;
  images?: SanityImageObject[];
  highlghtImages: SanityImageObject[];
}

const metaValue = (value: string) =>
  value.trim().length > 0 ? value : "—";

function ProjectMetaStat({
  label,
  value,
  showDivider,
  tabularFigures,
}: {
  label: string;
  value: string;
  showDivider: boolean;
  tabularFigures?: boolean;
}) {
  const useCompactValue =
    value.length > 26 || (value.match(/,/g)?.length ?? 0) >= 2;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 md:gap-2.5 px-5 sm:px-8 py-7 sm:py-8 md:py-10 text-center min-w-0",
        "border-b border-black/6 last:border-b-0 md:border-b-0",
        showDivider &&
          "md:relative md:after:pointer-events-none md:after:absolute md:after:right-0 md:after:top-[12%] md:after:bottom-[12%] md:after:w-px md:after:content-[''] md:after:bg-linear-to-b md:after:from-transparent md:after:via-neutral-200/90 md:after:to-transparent"
      )}
    >
      <p
        className={cn(
          "text-brand-black wrap-break-word text-balance antialiased max-w-[min(100%,20rem)]",
          tabularFigures && "tabular-nums",
          useCompactValue
            ? "text-lg sm:text-xl md:text-2xl lg:text-[1.625rem] font-medium tracking-tight leading-snug"
            : "text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.5rem] font-medium tracking-[-0.02em] leading-[1.08]"
        )}
      >
        {value}
      </p>
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 max-w-[16rem] leading-normal mt-0.5">
        {label}
      </p>
    </div>
  );
}

/**
 * Sanity `urlFor` throws if `asset` is null/undefined (reads `_ref` internally).
 * Arrays from GROQ may also contain null entries.
 */
function getSanityImageUrl(
  img: SanityImageObject | null | undefined
): string | null {
  if (img == null || img.asset == null) return null;
  try {
    const url = urlFor(img)?.url();
    return url && url.length > 0 ? url : null;
  } catch {
    return null;
  }
}

const MobileImages = ({ images }: { images?: SanityImageObject[] }) => {
  const validImages =
    images?.filter((img) => img != null && getSanityImageUrl(img) != null) ??
    [];
  if (validImages.length === 0) return null;
  return (
    <div className="flex flex-col gap-4 md:hidden">
      {validImages.map((image, index) => {
        const src = getSanityImageUrl(image) ?? "";
        if (!src) return null;
        return (
          <div key={index} className="relative h-[300px] w-full">
            <Image
              src={src}
              alt={`Project image ${index + 1}`}
              fill
              className="object-cover rounded-none"
              priority={index < 2}
            />
          </div>
        );
      })}
    </div>
  );
};

const DesktopCarousel = ({ images }: { images?: SanityImageObject[] }) => {
  const validImages =
    images?.filter((img) => img != null && getSanityImageUrl(img) != null) ??
    [];
  if (validImages.length === 0) return null;
  return (
    <div className="hidden md:block w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {validImages.map((image, index) => {
            const src = getSanityImageUrl(image) ?? "";
            if (!src) return null;
            return (
              <CarouselItem
                key={index}
                className={cn(
                  "pl-2",
                  {
                    "basis-[50%]": index === 0,
                    "basis-[25%]": index === 1 || index >= 2,
                  }
                )}
              >
                <div className="relative h-[300px] w-full">
                  <Image
                    src={src}
                    alt={`Project image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index < 2}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default function MiddleSection({
  title,
  services,
  lengthOfProject,
  budget,
  description1,
  description2,
  images,
  highlghtImages,
}: MiddleSectionProps) {
  return (
    <React.Fragment>
      <div className="max-w-7xl min-h-[calc(100vh-100px)] relative mx-10">
        <motion.section
          className="w-screen max-w-[100vw] relative left-1/2 -translate-x-1/2 bg-white border-b border-black/6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          aria-label="Project details"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <ProjectMetaStat
                label="Services"
                value={metaValue(services)}
                showDivider
              />
              <ProjectMetaStat
                label="Length of project"
                value={metaValue(lengthOfProject)}
                showDivider
              />
              <ProjectMetaStat
                label="Budget"
                value={metaValue(budget)}
                showDivider={false}
                tabularFigures
              />
            </div>
          </div>
        </motion.section>

        <motion.div 
          className="my-16 md:my-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h1 className="md:text-6xl lg:text-7xl text-4xl font-light leading-tight tracking-tight text-brand-black">
            <span className="block uppercase">{title}</span>
          </h1>
        </motion.div>

        <div className="flex flex-col space-y-16 max-w-7xl mx-auto md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="hidden md:block md:col-span-1" />
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {description1?.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-brand-dark-gray font-light text-base md:text-lg leading-relaxed mb-6 md:max-w-[85%]"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:gap-8 gap-4 mb-8 md:mb-16">
            {(highlghtImages ?? [])
              .map((image, index) => ({ image, index }))
              .filter(({ image }) => getSanityImageUrl(image) != null)
              .map(({ image, index }, renderedIndex) => {
                const src = getSanityImageUrl(image) ?? "";
                return (
              <motion.div
                key={index}
                className={`col-span-1 flex ${
                  renderedIndex === 0 ? "justify-end" : "justify-start"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: renderedIndex * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div
                  className={`w-full md:w-4/5 ${
                    renderedIndex === 0 ? "mt-0 md:mt-0" : "mt-12 md:mt-32"
                  }`}
                >
                  <div
                    className={
                      renderedIndex === 0
                        ? "aspect-[4/5] relative"
                        : "relative aspect-[3/4]"
                    }
                  >
                    <Image
                      src={src}
                      alt={`Project highlight ${renderedIndex + 1}`}
                      fill
                      className="object-cover"
                      priority={renderedIndex === 0}
                    />
                  </div>
                </div>
              </motion.div>
                );
              })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {description2?.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-brand-dark-gray font-light text-base md:text-lg leading-relaxed mb-6 md:max-w-[85%]"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
            <div className="hidden md:block md:col-span-1" />
          </div>

          <motion.div 
            className="w-full pb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MobileImages images={images} />
            <DesktopCarousel images={images} />
          </motion.div>
        </div>
      </div>
    </React.Fragment>
  );
}
