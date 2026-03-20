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
        <motion.div 
          className="flex justify-start md:justify-between items-start md:items-center w-full py-8 md:py-12 flex-wrap gap-8 md:gap-5 border-b border-[#EBEBEB]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-dark-gray">
              Location
            </span>
            <span className="text-base md:text-lg text-brand-black font-light">{location}</span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-dark-gray">
              Year
            </span>
            <span className="text-base md:text-lg text-brand-black font-light">{year}</span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-dark-gray">
              Project
            </span>
            <span className="text-base md:text-lg text-brand-black font-light">{projectType}</span>
          </div>
        </motion.div>

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
            {highlghtImages?.map((image, index) => (
              <motion.div
                key={index}
                className={`col-span-1 flex ${
                  index === 0 ? "justify-end" : "justify-start"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className={`w-full md:w-4/5 ${index === 0 ? "mt-0 md:mt-0" : "mt-12 md:mt-32"}`}>
                  <div
                    className={
                      index === 0
                        ? "aspect-[4/5] relative"
                        : "relative aspect-[3/4]"
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
              </motion.div>
            ))}
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
