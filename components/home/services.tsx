"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { motion, useReducedMotion } from "framer-motion";
import { resolveServiceCardHref } from "@/lib/service-path";
import { cn } from "@/lib/utils";

/** One easing curve for all card hover motion so nothing fights. */
const CARD_EASE = [0.22, 1, 0.36, 1] as const;
const CARD_DURATION = 0.55;

interface ServiceData {
  title: string;
  description: string;
  defaultImage: SanityImage;
  hoverImage?: SanityImage;
  link: string;
}

function ServiceCard({
  service,
  index,
  featured,
  cellClassName,
  minHeightClassName,
}: {
  service: ServiceData;
  index: number;
  featured: boolean;
  cellClassName: string;
  minHeightClassName: string;
}) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const href = resolveServiceCardHref(service.title, service.link);

  const defaultSrc = service.defaultImage ? urlFor(service.defaultImage)?.url() : undefined;
  const hoverSrc = service.hoverImage ? urlFor(service.hoverImage)?.url() : undefined;
  const hasHoverImage = Boolean(hoverSrc);

  const tween = reduceMotion
    ? { duration: 0.01 }
    : { duration: CARD_DURATION, ease: CARD_EASE };

  return (
    <Link
      href={href}
      className={cn(
        "block w-full border-b border-[#3A3A3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black md:border-b-0 md:border-[#3A3A3A]",
        minHeightClassName,
        cellClassName
      )}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <motion.div
        className={cn(
          "relative block h-full w-full cursor-pointer overflow-hidden rounded-none",
          minHeightClassName
        )}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="absolute inset-0 w-full h-full">
          {defaultSrc ? (
            <Image
              src={defaultSrc}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={cn(
                "object-cover absolute inset-0",
                !reduceMotion && "transition-opacity duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                hasHoverImage && hovered ? "opacity-0" : "opacity-100"
              )}
              aria-hidden
            />
          ) : null}
          {hasHoverImage && hoverSrc ? (
            <Image
              src={hoverSrc}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={cn(
                "object-cover absolute inset-0",
                !reduceMotion && "transition-opacity duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                hovered ? "opacity-100" : "opacity-0"
              )}
              aria-hidden
            />
          ) : null}
          {/* Base wash — static so we are not interpolating gradient stops (that reads choppy). */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-brand-black via-brand-black/45 to-brand-black/65 opacity-80" />
          <motion.div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-brand-black via-brand-black/75 to-brand-black/80"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={tween}
          />
        </div>

        <div className="absolute inset-0 z-10 flex w-full flex-col justify-end p-6 text-white sm:p-8 md:p-10">
          <motion.h3
            className={cn(
              "mb-3 font-light md:mb-4",
              featured
                ? "text-2xl sm:text-3xl md:text-5xl"
                : "text-2xl sm:text-2xl md:text-3xl"
            )}
            initial={false}
            animate={{ color: hovered ? "#F25623" : "#ffffff" }}
            transition={tween}
          >
            {service.title}
          </motion.h3>

          {/* Smooth height: grid 0fr → 1fr (avoids max-height animation, which always feels wrong). */}
          <div
            className={cn(
              "grid min-h-0",
              !reduceMotion &&
                "transition-[grid-template-rows] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              hovered ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <motion.div
                initial={false}
                animate={{
                  y: reduceMotion ? 0 : hovered ? 0 : 10,
                  opacity: hovered ? 1 : 0,
                }}
                transition={{
                  ...tween,
                  delay: reduceMotion ? 0 : hovered ? 0.04 : 0,
                }}
                className="pt-1"
              >
                <p className="mb-6 text-base font-normal leading-relaxed text-white/90 md:mb-8">
                  {service.description}
                </p>
                <span className="flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  Learn more <ArrowRight className="ml-3 h-4 w-4" />
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Services() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch<ServiceData[]>(
          `*[_type == "service"] | order(order asc) {
            title,
            description,
            defaultImage{asset->, hotspot},
            hoverImage{asset->, hotspot},
            link
          }`
        );
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[280px] w-full items-center justify-center bg-[#1A1A1A] py-20 md:min-h-[600px] md:py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white md:h-12 md:w-12" />
      </div>
    );
  }

  // Fallback if no services are defined in Sanity yet, to avoid empty section or errors
  if (services.length === 0) return null;

  return (
    <div className="w-full bg-brand-black pt-12 font-geist sm:pt-24 md:pt-32">
      <div className="mx-auto max-w-full px-0">
        <div className="mb-8 flex flex-col items-center px-6 text-center sm:mb-16 sm:px-8 md:mb-24 md:flex-row md:justify-between md:items-end md:px-16 md:text-left lg:px-24">
          <div className="inline-block max-w-full md:block md:w-full md:max-w-none">
            <motion.h2
              className="mb-3 text-4xl font-light tracking-tight text-white sm:mb-4 sm:text-5xl md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Services
            </motion.h2>
            <motion.div
              className="h-px max-w-full bg-brand-orange md:hidden"
              initial={{ width: 0, opacity: 0.9 }}
              whileInView={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            />
            <motion.div
              className="hidden h-[1px] bg-brand-orange md:block"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
        
        {(() => {
          const total = services.length;
          // Bento layout — only kicks in once we have 4+ tiles. With 5 tiles:
          // Row 1 (taller): tiles 0 + 1, each col-span-3 on md.
          // Row 2 (shorter): tiles 2 + 3 + 4, each col-span-2 on md.
          // For 3 tiles we keep the legacy 1/3 row. Anything between (4) just wraps.
          const useBento = total >= 4;
          const getCellClassName = (idx: number) => {
            if (!useBento) return "md:border-r md:border-[#3A3A3A] md:last:border-r-0";
            // 5-tile bento on md (6-col grid): first two are 3-span (featured),
            // remaining three are 2-span. Extra tiles past index 4 fall back to 2-span.
            if (idx < 2) {
              return cn(
                "md:col-span-3 md:border-b md:border-[#3A3A3A]",
                idx === 0 ? "md:border-r" : ""
              );
            }
            return cn(
              "md:col-span-2",
              idx < total - 1 ? "md:border-r md:border-[#3A3A3A]" : ""
            );
          };
          const getMinHeight = (idx: number) => {
            if (!useBento) {
              return "min-h-[min(78vh,480px)] sm:min-h-[650px] md:min-h-[750px]";
            }
            return idx < 2
              ? "min-h-[min(78vh,480px)] sm:min-h-[600px] md:min-h-[640px]"
              : "min-h-[min(60vh,420px)] sm:min-h-[460px] md:min-h-[460px]";
          };
          return (
            <div
              className={cn(
                "grid grid-cols-1 gap-0 border-t border-[#3A3A3A]",
                useBento ? "md:grid-cols-6" : "md:grid-cols-3"
              )}
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={`${service.title}-${index}`}
                  service={service}
                  index={index}
                  featured={useBento ? index < 2 : true}
                  cellClassName={getCellClassName(index)}
                  minHeightClassName={getMinHeight(index)}
                />
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
