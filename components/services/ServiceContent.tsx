"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight, PlayCircle, Hammer, Ruler, PenTool, Home, ArrowUpRight } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  image?: SanityImage;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ServiceData {
  slug: string;
  title: string;
  description: string;
  image: SanityImage;
  gallery?: SanityImage[];
  videoUrl?: string;
  aboutTitle?: string;
  aboutText?: string;
  featuresTitle?: string;
  features?: Feature[];
  processTitle?: string;
  process?: ProcessStep[];
  historyTitle?: string;
  historyText?: string;
}

interface ServiceContentProps {
  slug: string;
}

const containerClass =
  "max-w-[95%] xl:max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24";

const cardClass =
  "group flex flex-col h-full p-8 md:p-10 rounded-2xl border border-brand-light-gray bg-white hover:border-brand-black/20 hover:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.12)] transition-all duration-500";

export default function ServiceContent({ slug }: ServiceContentProps) {
  const [service, setService] = useState<ServiceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const contentVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectFields = `{
          "slug": slug.current,
          title,
          description,
          image{asset->, hotspot},
          gallery[]{asset->, hotspot},
          videoUrl,
          aboutTitle,
          aboutText,
          featuresTitle,
          features[]{title, description, image{asset->, hotspot}},
          processTitle,
          process[]{step, title, description},
          historyTitle,
          historyText
        }`;

        let result = await client.fetch<ServiceData | null>(
          `*[_type == "innovation" && defined(slug.current) && slug.current == $slug][0]${projectFields}`,
          { slug }
        );

        if (!result) {
          const titlesToTry: Record<string, string[]> = {
            "bathroom-remodeling": ["Bathroom Remodeling", "Bathroom Remodel"],
            "kitchen-remodeling": ["Kitchen Remodeling", "Kitchen Remodel"],
            "home-addition": ["Home Addition", "Home Additions", "ADU & Home Additions"],
          };
          const titles = titlesToTry[slug];
          if (titles) {
            for (const title of titles) {
              result = await client.fetch<ServiceData | null>(
                `*[_type == "innovation" && title == $title][0]${projectFields}`,
                { title }
              );
              if (result) {
                result = { ...result, slug };
                break;
              }
            }
          }
          if (!result) {
            const all = await client.fetch<ServiceData[]>(
              `*[_type == "innovation"]${projectFields}`
            );
            const normalized = (t: string) => t.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
            result = all?.find((s) => normalized(s.title).includes(slug) || slug.includes(normalized(s.title))) ?? null;
            if (result) result = { ...result, slug };
          }
        }
        setService(result);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("Failed to load service");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    setGalleryIndex(0);
  }, [slug]);

  const getFallbackIcon = (index: number) => {
    const icons = [Hammer, Ruler, PenTool, Home];
    const Icon = icons[index % icons.length];
    return <Icon className="w-10 h-10 text-brand-orange/80" strokeWidth={1} />;
  };

  if (isLoading) {
    return (
      <div className="min-h-[480px] flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-2 border-brand-light-gray border-t-brand-black rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-[480px] flex items-center justify-center bg-white text-brand-dark-gray px-8">
        {error ?? "Service not found"}
      </div>
    );
  }

  const nextGalleryImage = () => {
    if (service.gallery?.length) {
      setGalleryIndex((prev) => (prev + 1) % service.gallery!.length);
    }
  };

  const prevGalleryImage = () => {
    if (service.gallery?.length) {
      setGalleryIndex((prev) => (prev - 1 + service.gallery!.length) % service.gallery!.length);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slug}
        className="bg-white text-brand-black min-h-[600px] font-geist"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={contentVariants}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Intro — split: image full-bleed to the left on lg; copy stays in normal gutters */}
        <div
          className={`w-full pt-4 md:pt-10 ${
            service.aboutText || service.historyText ? "" : "pb-16 md:pb-24"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 lg:items-stretch">
            <motion.div
              className="relative w-full min-h-[420px] lg:min-h-[560px] lg:h-full overflow-hidden rounded-2xl border border-brand-light-gray bg-brand-light-gray/30 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.08)] mx-4 sm:mx-6 md:mx-8 lg:mx-0 lg:rounded-l-none lg:rounded-r-2xl lg:border-l-0 lg:shadow-[0_20px_60px_-28px_rgba(0,0,0,0.1)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {service.gallery && service.gallery.length > 0 ? (
                <div className="relative w-full h-full min-h-[420px] lg:min-h-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={galleryIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={urlFor(service.gallery[galleryIndex])?.url() ?? ""}
                        alt={`Gallery ${galleryIndex + 1}`}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                  {service.gallery.length > 1 && (
                    <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3 z-10">
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevGalleryImage();
                        }}
                        className="bg-white/90 hover:bg-white text-brand-black rounded-full border border-brand-light-gray shadow-sm"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <div className="flex gap-2 items-center px-2">
                        {service.gallery.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all ${idx === galleryIndex ? "bg-brand-orange w-6" : "bg-white/80 w-1.5"}`}
                          />
                        ))}
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextGalleryImage();
                        }}
                        className="bg-white/90 hover:bg-white text-brand-black rounded-full border border-brand-light-gray shadow-sm"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  )}
                </div>
              ) : service.image ? (
                <div className="relative w-full h-full min-h-[420px] lg:min-h-0">
                  <Image
                    src={urlFor(service.image)?.url() ?? ""}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-brand-dark-gray text-sm">
                  No image
                </div>
              )}

              {service.videoUrl && (
                <div className="absolute top-6 right-6 z-20">
                  <Link href={service.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      type="button"
                      className="bg-brand-orange hover:bg-[#e04f1e] text-white rounded-full px-6 py-5 flex items-center gap-2 text-xs tracking-widest uppercase font-semibold shadow-lg"
                    >
                      <PlayCircle className="w-5 h-5" />
                      Watch Video
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>

            <motion.div
              className="flex flex-col px-8 md:px-16 lg:pl-10 xl:pl-14 lg:pr-16 xl:pr-24 lg:py-2 lg:justify-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray mb-6">
                Overview
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-brand-black leading-[1.05] mb-8">
                {service.title}
              </h2>
              <div className="text-brand-dark-gray font-light text-lg md:text-xl leading-relaxed space-y-6 max-w-xl">
                {(service.description ?? "").split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex mt-10 items-center justify-center rounded-full border border-brand-black bg-brand-black px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-orange hover:border-brand-orange"
              >
                Book a free consultation
              </Link>
            </motion.div>
          </div>
        </div>

        {(service.aboutText || service.historyText) && (
          <div className={`${containerClass} pb-16 md:pb-24`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 mt-20 md:mt-28 pt-12 border-t border-brand-light-gray">
              {service.aboutText && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray mb-6">
                    {service.aboutTitle || "Our approach"}
                  </p>
                  <div className="text-brand-dark-gray font-light leading-relaxed space-y-5 text-base md:text-lg">
                    {service.aboutText.split("\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </motion.div>
              )}
              {service.historyText && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray mb-6">
                    {service.historyTitle || "Why choose us"}
                  </p>
                  <div className="text-brand-dark-gray font-light leading-relaxed space-y-5 text-base md:text-lg">
                    {service.historyText.split("\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {service.features && service.features.length > 0 && (
          <div className="border-t border-brand-light-gray bg-white py-16 md:py-24">
            <div className={containerClass}>
              <motion.div
                className="max-w-3xl mb-12 md:mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray mb-6">
                  Capabilities
                </p>
                <h3 className="text-3xl md:text-5xl font-light tracking-tight text-brand-black leading-[1.1]">
                  {service.featuresTitle || "What we offer"}
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: (idx % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className={cardClass}
                  >
                    {feature.image ? (
                      <div className="relative -mx-8 -mt-8 mb-6 aspect-[16/10] overflow-hidden rounded-t-2xl border-b border-brand-light-gray md:-mx-10 md:-mt-10">
                        <Image
                          src={urlFor(feature.image)?.url() ?? ""}
                          alt={feature.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center py-6 mb-2">{getFallbackIcon(idx)}</div>
                    )}
                    <div className="flex justify-between items-start gap-3 mb-4">
                      <h4 className="text-xl md:text-2xl font-light text-brand-black tracking-tight group-hover:text-brand-orange transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <span className="shrink-0 w-10 h-10 rounded-full border border-brand-light-gray flex items-center justify-center text-brand-black opacity-0 group-hover:opacity-100 group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" aria-hidden />
                      </span>
                    </div>
                    <p className="text-brand-dark-gray font-light leading-relaxed text-base">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {service.process && service.process.length > 0 && (
          <div className="mask-overlap bg-[#F5F5F5] relative z-10 pt-10 pb-20 md:pb-28">
            <div className={`${containerClass} py-16 md:py-20`}>
              <motion.div
                className="max-w-3xl mb-14 md:mb-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray mb-6">
                  Process
                </p>
                <h3 className="text-3xl md:text-5xl font-light tracking-tight text-brand-black leading-[1.1]">
                  {service.processTitle || "How we work"}
                </h3>
              </motion.div>

              {/* Editorial timeline — no card chrome; rhythm + dividers */}
              <div className="max-w-4xl">
                {service.process.map((step, idx) => (
                  <motion.div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-b border-black/[0.06] last:border-b-0 first:pt-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.2) }}
                  >
                    <div className="md:col-span-3 flex flex-row md:flex-col md:items-start justify-between md:justify-start gap-3 md:gap-4">
                      <span
                        className="text-5xl md:text-6xl lg:text-7xl font-light leading-none text-brand-light-gray tabular-nums select-none"
                        aria-hidden
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.28em] text-brand-orange md:max-w-[12rem]">
                        {step.step || `Step ${idx + 1}`}
                      </p>
                    </div>
                    <div className="md:col-span-9 md:pt-2">
                      <h4 className="text-xl md:text-3xl font-light text-brand-black tracking-tight mb-4 md:mb-5">
                        {step.title}
                      </h4>
                      <p className="text-brand-dark-gray font-light leading-relaxed text-base md:text-lg max-w-2xl">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-12 md:mt-16 pt-12 border-t border-black/[0.08]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-brand-orange px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#e04f1e]"
                >
                  Start your project
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
