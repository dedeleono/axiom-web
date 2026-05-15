"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlayCircle, Hammer, Ruler, PenTool, Home, ArrowUpRight } from "lucide-react";
import { innovationHeroBackgroundAssetRef } from "@/lib/innovation-hero";

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
  heroImage?: SanityImage & { imgAlt?: string };
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

export default function ServiceContent({ slug }: ServiceContentProps) {
  const [service, setService] = useState<ServiceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
          "heroImage": heroImage { asset->, hotspot, imgAlt },
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
            "new-construction": ["New Construction", "Custom Home Construction"],
            "outdoor-remodeling": ["Outdoor Remodeling", "Outdoor Remodel", "Outdoor Living"],
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

  const getFallbackIcon = (index: number, className = "h-10 w-10 text-brand-orange/80") => {
    const icons = [Hammer, Ruler, PenTool, Home];
    const Icon = icons[index % icons.length];
    return <Icon className={className} strokeWidth={1} />;
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

  const heroBgRef = innovationHeroBackgroundAssetRef({
    title: service.title,
    heroImage: service.heroImage ?? null,
    image: service.image,
    gallery: service.gallery,
  });

  const bodyGalleryImages: SanityImage[] = (() => {
    if (service.gallery && service.gallery.length > 0) {
      return service.gallery.filter((g) => g.asset?._ref !== heroBgRef);
    }
    return [];
  })();

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
        {/* Overview copy + offerings (hero image/title live in layout ServiceHero) */}
        <div
          className={`w-full pt-4 md:pt-10 ${
            service.aboutText || service.historyText ? "" : "pb-16 md:pb-24"
          }`}
        >
          <div className={containerClass}>
            <motion.div
              className="mx-auto w-full max-w-6xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {service.features && service.features.length > 0 ? (
                <div className="grid grid-cols-1 gap-12 border-t border-brand-light-gray pt-10 md:grid-cols-2 md:gap-x-14 lg:gap-x-20 md:items-start">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray mb-6">
                      Overview
                    </p>

                    {service.videoUrl && (
                      <div className="mb-8">
                        <Link href={service.videoUrl} target="_blank" rel="noopener noreferrer">
                          <Button
                            type="button"
                            variant="outline"
                            className="inline-flex items-center gap-2 rounded-none border-brand-light-gray bg-white px-5 py-3 text-xs font-semibold uppercase tracking-widest text-brand-black shadow-sm transition-colors hover:border-brand-orange hover:text-brand-orange"
                          >
                            <PlayCircle className="h-4 w-4 text-brand-orange" aria-hidden />
                            Watch video
                          </Button>
                        </Link>
                      </div>
                    )}

                    <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light tracking-tight text-brand-black leading-[1.1] mb-8">
                      {service.title}
                    </h2>

                    <div className="text-brand-dark-gray font-light text-lg md:text-xl leading-relaxed space-y-6">
                      {(service.description ?? "").split("\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <div
                    className="md:border-l md:border-brand-light-gray md:pl-10 lg:pl-14"
                    role="list"
                    aria-label={service.featuresTitle || "Service offerings"}
                  >
                    <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">
                      {service.featuresTitle || "What we offer"}
                    </p>
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                      {service.features.map((feature, idx) => {
                        const thumbUrl = feature.image ? urlFor(feature.image)?.url() : undefined;
                        return (
                          <li key={`${feature.title}-${idx}`} role="listitem" className="flex items-center gap-4">
                            {thumbUrl ? (
                              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-none border border-brand-light-gray bg-brand-light-gray/20">
                                <Image
                                  src={thumbUrl}
                                  alt=""
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              </div>
                            ) : (
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-brand-orange/35 bg-brand-orange/6">
                                {getFallbackIcon(idx, "h-5 w-5 text-brand-orange")}
                              </span>
                            )}
                            <span className="text-sm font-light leading-snug tracking-tight text-brand-black md:text-base">
                              {feature.title}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-10 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange transition-colors hover:text-brand-black"
                    >
                      Book a free consultation
                      <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray mb-6">
                    Overview
                  </p>

                  {service.videoUrl && (
                    <div className="mb-8">
                      <Link href={service.videoUrl} target="_blank" rel="noopener noreferrer">
                        <Button
                          type="button"
                          variant="outline"
                          className="inline-flex items-center gap-2 rounded-none border-brand-light-gray bg-white px-5 py-3 text-xs font-semibold uppercase tracking-widest text-brand-black shadow-sm transition-colors hover:border-brand-orange hover:text-brand-orange"
                        >
                          <PlayCircle className="h-4 w-4 text-brand-orange" aria-hidden />
                          Watch video
                        </Button>
                      </Link>
                    </div>
                  )}

                  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-brand-black leading-[1.1] mb-8 max-w-3xl">
                    {service.title}
                  </h2>

                  <div className="text-brand-dark-gray font-light text-lg md:text-xl leading-relaxed space-y-6 max-w-3xl">
                    {(service.description ?? "").split("\n").map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="mt-10 inline-flex items-center justify-center rounded-none border border-brand-black bg-brand-black px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-brand-orange hover:bg-brand-orange"
                  >
                    Book a free consultation
                  </Link>
                </>
              )}
            </motion.div>

            {bodyGalleryImages.length > 0 && (
              <motion.section
                className="mx-auto mt-16 w-full max-w-6xl md:mt-24 pt-12 border-t border-brand-light-gray"
                aria-label="Project gallery"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  {bodyGalleryImages.map((imgItem, idx) => {
                    const src = urlFor(imgItem)?.url() ?? "";
                    if (!src) return null;
                    const ref = imgItem.asset && "_ref" in imgItem.asset ? imgItem.asset._ref : String(idx);
                    return (
                      <div
                        key={`${ref}-${idx}`}
                        className="relative aspect-4/3 w-full overflow-hidden border border-brand-light-gray bg-brand-light-gray/20"
                      >
                        <Image
                          src={src}
                          alt={`${service.title} — project image ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            )}
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
                  className="inline-flex items-center justify-center rounded-none bg-brand-orange px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#e04f1e]"
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
