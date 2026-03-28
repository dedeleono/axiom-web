"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

interface TextCard {
  title: string;
  description: string;
  author: string;
}

interface WhyChooseUsData {
  heading: string;
  subheading: string;
  stat1: Stat;
  stat2: Stat;
  stat3: Stat;
  stat4: Stat;
  textCard: TextCard;
  image: SanityImage & { alt?: string };
}

export default function WhyChooseUsGrid() {
  const [data, setData] = useState<WhyChooseUsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch<WhyChooseUsData>(
          `*[_type == "whyChooseUs"][0]{
            heading,
            subheading,
            stat1,
            stat2,
            stat3,
            stat4,
            textCard,
            image{asset, alt, hotspot}
          }`
        );
        setData(result);
      } catch (error) {
        console.error("Error fetching Why Choose Us data:", error);
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

  const content = data || {
    heading: "AXIOM",
    subheading: "Why Choose Us",
    stat1: { value: "01", label: "Expert Guidance" },
    stat2: { value: "02", label: "Quality Craftsmanship" },
    stat3: { value: "03", label: "Timely Delivery" },
    stat4: { value: "Free consultation", label: "Start your project" },
    textCard: {
      title: "Building Lasting Success",
      description:
        "design is more than space—it's the art of living with meaning. Each project is a dialogue between clarity and feeling, where thoughtful details breathe life into interiors and create experiences that endure.",
      author: "",
    },
    image: null,
  };

  return (
    <div className="w-full bg-[#262626] text-white">
      <div className="mx-auto flex w-full max-w-full flex-col gap-0 lg:flex-row">
        <div className="relative z-10 -mt-8 grid w-full grid-cols-1 overflow-hidden rounded-t-4xl md:grid-cols-2 lg:w-[55%] lg:rounded-tl-4xl lg:rounded-tr-none">
          <div className="flex min-h-[300px] flex-col items-start justify-between border-b border-r border-[#3A3A3A] bg-[#222] p-8 pt-16 text-left transition-colors hover:bg-[#2A2A2A] md:min-h-[350px] md:p-12 md:pt-20 lg:p-16 lg:pt-24">
            <h3 className="mb-8 max-w-full text-4xl font-light text-brand-orange wrap-break-word text-pretty md:text-5xl">
              {content.stat1?.value}
            </h3>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#D1D1D1]">
                {content.stat1?.label}
              </h4>
              <p className="text-sm font-light leading-relaxed text-[#A1A1A1]">
                We craft designs that transcend trends, ensuring elegance and
                relevance for years to come.
              </p>
            </div>
          </div>

          <div className="flex min-h-[300px] flex-col items-start justify-between border-b border-r border-[#3A3A3A] bg-[#222] p-8 text-left transition-colors hover:bg-[#2A2A2A] md:min-h-[350px] md:border-r-0 md:p-12 md:pt-20 lg:border-r-0 lg:p-16 lg:pt-24">
            <h3 className="mb-8 max-w-full text-4xl font-light text-brand-orange wrap-break-word text-pretty md:text-5xl">
              {content.stat2?.value}
            </h3>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#D1D1D1]">
                {content.stat2?.label}
              </h4>
              <p className="text-sm font-light leading-relaxed text-[#A1A1A1]">
                We shape spaces with precision and harmony, balancing function
                and artistry in every detail.
              </p>
            </div>
          </div>

          <div className="flex min-h-[300px] flex-col items-start justify-between border-b border-r border-[#3A3A3A] bg-[#222] p-8 text-left transition-colors hover:bg-[#2A2A2A] md:min-h-[350px] md:border-b-0 md:p-12 lg:p-16">
            <h3 className="mb-8 max-w-full text-4xl font-light text-brand-orange wrap-break-word text-pretty md:text-5xl">
              {content.stat3?.value}
            </h3>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#D1D1D1]">
                {content.stat3?.label}
              </h4>
              <p className="text-sm font-light leading-relaxed text-[#A1A1A1]">
                We create interiors that breathe life, offering comfort,
                resonance, and belonging.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="flex min-h-[300px] flex-col items-start justify-between border-[#3A3A3A] bg-brand-orange p-8 text-left text-white transition-colors hover:bg-[#e04f1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:min-h-[350px] md:border-r-0 md:p-12 lg:border-t lg:border-r-0 lg:p-16"
            aria-label={[
              content.stat4?.value,
              content.stat4?.label?.trim(),
              "Contact",
            ]
              .filter(Boolean)
              .join(". ")}
          >
            <h3 className="mb-8 max-w-full text-4xl font-light wrap-break-word text-pretty md:text-5xl">
              {content.stat4?.value}
            </h3>
            {content.stat4?.label?.trim() ? (
              <p className="text-sm font-semibold uppercase tracking-widest text-white/90">
                {content.stat4.label}
              </p>
            ) : null}
          </Link>
        </div>

        <div className="flex w-full flex-col justify-between px-8 pb-16 pt-12 text-left lg:w-[45%] lg:px-24 lg:pb-0 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16 w-full lg:mb-24"
          >
            <h2 className="mb-8 text-4xl font-light tracking-tight md:text-5xl">
              <span className="mr-3 font-serif italic tracking-normal text-[#A48F7A]">
                At
              </span>
              {content.heading}
            </h2>
            <p className="max-w-lg text-sm font-light leading-relaxed text-[#D1D1D1] md:text-base">
              {content.textCard?.description}
            </p>
          </motion.div>

          <motion.div
            className="relative mt-auto h-[300px] w-full overflow-hidden md:h-[500px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {content.image ? (
              <Image
                src={urlFor(content.image)?.url() ?? ""}
                alt={content.image.alt || "Why Choose Us"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#3A3A3A] text-[#8A8A8A]">
                <span className="text-xs uppercase tracking-widest">
                  Image Placeholder
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
