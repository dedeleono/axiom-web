"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight, PlayCircle, Hammer, Ruler, PenTool, Home } from "lucide-react";

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

export default function ServiceContent({ slug }: ServiceContentProps) {
  const [service, setService] = useState<ServiceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
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
    return <Icon className="w-12 h-12 text-[#f25e40] opacity-50" strokeWidth={1} />;
  };

  if (isLoading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-[#18181a]">
        <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-[#18181a] text-red-400">
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
        className="bg-[#18181a] text-white min-h-[600px] font-geist"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={contentVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <motion.div
            className="relative w-full h-[500px] md:h-auto md:min-h-[800px] bg-brand-black overflow-hidden group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {service.gallery && service.gallery.length > 0 ? (
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={galleryIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
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
                  <div className="absolute inset-x-0 bottom-8 flex justify-center gap-4 z-10">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevGalleryImage();
                      }}
                      className="bg-black/50 hover:bg-black text-white rounded-full"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <div className="flex gap-2 items-center">
                      {service.gallery.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${idx === galleryIndex ? "bg-white w-4" : "bg-white/50"}`}
                        />
                      ))}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextGalleryImage();
                      }}
                      className="bg-black/50 hover:bg-black text-white rounded-full"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>
                )}
              </div>
            ) : service.image ? (
              <Image
                src={urlFor(service.image)?.url() ?? ""}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-sm">
                No image
              </div>
            )}

            {service.videoUrl && (
              <div className="absolute top-8 right-8 z-20">
                <Link href={service.videoUrl} target="_blank">
                  <Button className="bg-brand-orange hover:bg-[#e04f1e] text-white rounded-full px-8 py-6 flex items-center gap-3 shadow-lg hover:scale-105 transition-transform text-xs tracking-widest uppercase font-semibold">
                    <PlayCircle className="w-5 h-5" />
                    Watch Video
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>

          <div className="flex flex-col p-8 md:p-16 space-y-12 bg-[#18181a]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
                {service.title}
              </h2>
              <div className="text-gray-300 md:text-lg text-base leading-relaxed space-y-4 font-light">
                {(service.description ?? "").split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <Link href="/contact" className="inline-block mt-10">
                <Button className="rounded-full px-10 py-7 text-lg bg-white text-black hover:bg-gray-200 transition-colors font-medium">
                  Book a Free Consultation
                </Button>
              </Link>
            </motion.div>

            {(service.aboutText || service.historyText) && (
              <motion.div
                className="space-y-10 pt-10 border-t border-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {service.aboutText && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#f25e40]">
                      {service.aboutTitle || "Our Approach"}
                    </h3>
                    <div className="text-base text-gray-400 leading-relaxed space-y-4 font-light">
                      {service.aboutText.split("\n").map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                )}
                {service.historyText && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#f25e40]">
                      {service.historyTitle || "Why Choose Us"}
                    </h3>
                    <div className="text-base text-gray-400 leading-relaxed space-y-4 font-light">
                      {service.historyText.split("\n").map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {service.features && service.features.length > 0 && (
          <div className="mask-overlap relative z-20 px-8 md:px-16 lg:px-24 py-24 md:py-32 bg-[#1A1A1A]">
            <div className="max-w-[95%] xl:max-w-screen-2xl mx-auto">
              <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-white border-l-[3px] border-brand-orange pl-8">
                {service.featuresTitle || "Services Offered"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
                {service.features.map((feature, idx) => {
                  const isLarge = idx === 0 || idx === 3;
                  return (
                    <motion.div
                      key={idx}
                      className={`relative overflow-hidden rounded-[1rem] bg-[#222] border border-[#3A3A3A] group ${isLarge ? "md:col-span-4" : "md:col-span-2"} hover:bg-[#2A2A2A] hover:border-[#4A4A4A] transition-colors duration-500`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: (idx % 3) * 0.15 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      <div className={`relative h-full flex ${isLarge ? "flex-col md:flex-row" : "flex-col"}`}>
                        <div
                          className={`relative overflow-hidden ${isLarge ? "md:w-1/2 h-64 md:h-auto" : "w-full h-56"} flex items-center justify-center bg-[#1A1A1A]`}
                        >
                          {feature.image ? (
                            <Image
                              src={urlFor(feature.image)?.url() ?? ""}
                              alt={feature.title}
                              fill
                              className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-4 p-8">
                              {getFallbackIcon(idx)}
                            </div>
                          )}
                        </div>
                        <div className={`p-8 md:p-12 relative flex flex-col justify-center ${isLarge ? "md:w-1/2" : "w-full"}`}>
                          <h4 className="text-2xl md:text-3xl font-light mb-6 text-white group-hover:text-brand-orange transition-colors flex items-center gap-4 leading-tight">
                            {feature.title}
                            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-orange">
                              →
                            </span>
                          </h4>
                          <p className="text-base text-[#D1D1D1] leading-relaxed font-light line-clamp-4">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {service.process && service.process.length > 0 && (
          <div className="mask-overlap relative z-10 px-8 md:px-16 lg:px-24 py-24 md:py-32 pb-40 bg-[#111]">
            <div className="max-w-[95%] xl:max-w-screen-2xl mx-auto">
              <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-20 text-white border-l-[3px] border-brand-orange pl-8">
                {service.processTitle || "Our Process"}
              </h3>
              <div className="relative border-l border-[#333] ml-4 md:ml-12 space-y-16">
                {service.process.map((step, idx) => (
                  <motion.div 
                    key={idx} 
                    className="relative pl-10 md:pl-16 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#333] group-hover:bg-brand-orange transition-colors duration-300" />
                    <div className="flex flex-col gap-2 items-start">
                      <div>
                        <small className="text-brand-orange font-semibold text-xs uppercase tracking-widest block mb-4">
                          {step.step || `Step ${idx + 1}`}
                        </small>
                        <h4 className="text-2xl md:text-3xl font-light text-white mb-4 group-hover:text-brand-orange transition-colors duration-300">
                          {step.title}
                        </h4>
                        <p className="text-[#D1D1D1] text-base leading-relaxed max-w-3xl font-light">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-24 text-left md:ml-12 pl-4 md:pl-16">
                <Link href="/contact">
                  <Button className="rounded-full px-12 py-8 text-sm tracking-widest uppercase font-semibold bg-brand-orange text-white hover:bg-[#e04f1e] transition-colors duration-300">
                    Start Your Project Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
