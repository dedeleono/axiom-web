"use client";

import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageObject } from "@/lib/interfaces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface MiddleSectionProps {
  title: string;
  location: string;
  year: string;
  description1: string;
  description2?: string;
  images?: SanityImageObject[];
  highlghtImages: SanityImageObject[];
  projectType: string;
}

const MobileImages = ({ images }: { images?: SanityImageObject[] }) => {
  const validImages = images?.filter((img) => urlFor(img)?.url()) ?? [];
  if (validImages.length === 0) return null;
  return (
    <div className="flex flex-col gap-4 md:hidden">
      {validImages.map((image, index) => {
        const src = urlFor(image)?.url() ?? "";
        if (!src) return null;
        return (
          <div key={index} className="relative h-[300px] w-full">
            <Image
              src={src}
              alt={`Project image ${index + 1}`}
              fill
              className="object-cover rounded-sm"
              priority={index < 2}
            />
          </div>
        );
      })}
    </div>
  );
};

const DesktopCarousel = ({ images }: { images?: SanityImageObject[] }) => {
  const validImages = images?.filter((img) => urlFor(img)?.url()) ?? [];
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
            const src = urlFor(image)?.url() ?? "";
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
  location,
  year,
  description1,
  description2,
  images,
  highlghtImages,
  projectType,
}: MiddleSectionProps) {
  return (
    <React.Fragment>
      <div className="max-w-7xl min-h-[calc(100vh-100px)] relative mx-10">
        <div className="flex justify-between items-center w-full py-4 flex-wrap gap-5">
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm font-medium flex flex-col items-start text-gray-500">
              Location
              <span className="text-base text-black">{location}</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm font-medium flex flex-col items-start text-gray-500">
              Year
              <span className="text-base text-black">{year}</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm font-medium flex flex-col items-start text-gray-500">
              Project
              <span className="text-base text-black">{projectType}</span>
            </div>
          </div>
        </div>

        <div className="my-16 pt-10">
          <h1 className="md:text-5xl text-3xl font-bold leading-tight">
            <span className="block uppercase">{title}</span>
          </h1>
        </div>

        <div className="flex flex-col space-y-16 max-w-7xl mx-auto md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="hidden md:block md:col-span-1" />
            <div className="col-span-1">
              {description1?.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 md:-translate-x-2 md:max-w-[75%] pl-20 md:pl-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:gap-5 gap-3">
            {highlghtImages?.map((image, index) => (
              <div
                key={index}
                className={`col-span-1 flex ${
                  index === 0 ? "justify-end" : "justify-start"
                }`}
              >
                <div className="w-full md:w-2/3 md:mb-40 mb-28 mt-10">
                  <div
                    className={
                      index === 0
                        ? "aspect-square relative"
                        : "relative h-[250px] md:h-[475px]"
                    }
                  >
                    <Image
                      src={urlFor(image)?.url() ?? ""}
                      alt={`Project highlight ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="col-span-1">
              {description2?.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed mb-4 md:max-w-[65%] pr-28 text-sm md:text-base md:pr-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="hidden md:block md:col-span-1" />
          </div>

          <div className="w-full pb-20">
            <MobileImages images={images} />
            <DesktopCarousel images={images} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
