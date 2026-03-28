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

function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
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
      className="block w-full min-h-[650px] md:min-h-[750px] border-r border-b border-[#3A3A3A] last:border-r-0 md:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <motion.div
        className="relative block h-full min-h-[650px] w-full cursor-pointer overflow-hidden rounded-none md:min-h-[750px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
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

        <div className="absolute inset-0 z-10 flex w-full flex-col justify-end p-8 text-white md:p-12">
          <motion.h3
            className="mb-3 text-3xl font-light md:mb-4 md:text-4xl"
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
      <div className="w-full bg-[#1A1A1A] py-32 flex items-center justify-center min-h-[600px]">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Fallback if no services are defined in Sanity yet, to avoid empty section or errors
  if (services.length === 0) return null;

  return (
    <div className="w-full bg-brand-black pt-24 md:pt-32 font-geist">
      <div className="max-w-[100%] mx-auto px-0">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end px-8 md:px-16 lg:px-24">
          <div>
            <motion.h2 
              className="text-5xl md:text-7xl font-light tracking-tight text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Services
            </motion.h2>
            <motion.div 
              className="w-24 h-[1px] bg-brand-orange"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#3A3A3A]">
          {services.map((service, index) => (
            <ServiceCard key={`${service.title}-${index}`} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
