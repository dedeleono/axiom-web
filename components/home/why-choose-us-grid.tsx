"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { Button } from "../ui/button";
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

  // Use default/placeholder data if sanity document doesn't exist yet
  const content = data || {
    heading: "At AXIOM",
    subheading: "Why Choose Us",
    stat1: { value: "01", label: "Expert Guidance", description: "Our experienced team provides professional advice and personalized support for your renovation." },
    stat2: { value: "02", label: "Quality Craftsmanship", description: "We shape spaces with precision and harmony, balancing function and artistry in every detail." },
    stat3: { value: "03", label: "Timely Delivery", description: "We create interiors that breathe life, offering comfort and belonging on schedule." },
    stat4: { value: "Read More →", label: "Our Mission", description: "Each project reflects beauty, balance, and meaning, transforming spaces into experiences." },
    textCard: { 
      title: "Building Lasting Success", 
      description: "design is more than space—it's the art of living with meaning. Each project is a dialogue between clarity and feeling, where thoughtful details breathe life into interiors and create experiences that endure.",
      author: "" 
    },
    image: null
  };

  return (
    <div className="w-full bg-[#262626] text-white">
      <div className="w-full max-w-[100%] mx-auto flex flex-col lg:flex-row gap-0">
        
        {/* Left Column - 2x2 Grid */}
        <div className="w-full lg:w-[55%] grid grid-cols-1 md:grid-cols-2 overflow-hidden -mt-8 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-tl-[2rem] relative z-10">
          {/* Box 1 */}
          <div className="border-b border-r border-[#3A3A3A] bg-[#222] p-8 md:p-12 lg:p-16 flex flex-col justify-between aspect-square lg:aspect-auto hover:bg-[#2A2A2A] transition-colors">
            <h3 className="text-4xl md:text-5xl font-light md:text-right mb-8 text-brand-orange break-words">{content.stat1?.value}</h3>
            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-[#D1D1D1]">{content.stat1?.label}</h4>
              <p className="text-[#A1A1A1] font-light text-sm leading-relaxed">{content.stat1?.description || "We craft designs that transcend trends, ensuring elegance and relevance for years to come."}</p>
            </div>
          </div>
          
          {/* Box 2 */}
          <div className="border-b lg:border-r-0 border-r border-[#3A3A3A] bg-[#222] p-8 md:p-12 lg:p-16 flex flex-col justify-between aspect-square lg:aspect-auto hover:bg-[#2A2A2A] transition-colors">
            <h3 className="text-4xl md:text-5xl font-light md:text-right mb-8 text-brand-orange break-words">{content.stat2?.value}</h3>
            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-[#D1D1D1]">{content.stat2?.label}</h4>
              <p className="text-[#A1A1A1] font-light text-sm leading-relaxed">{content.stat2?.description || "We shape spaces with precision and harmony, balancing function and artistry in every detail."}</p>
            </div>
          </div>

          {/* Box 3 */}
          <div className="border-b md:border-b-0 border-r border-[#3A3A3A] bg-[#222] p-8 md:p-12 lg:p-16 flex flex-col justify-between aspect-square lg:aspect-auto hover:bg-[#2A2A2A] transition-colors">
            <h3 className="text-4xl md:text-5xl font-light md:text-right mb-8 text-brand-orange break-words">{content.stat3?.value}</h3>
            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-[#D1D1D1]">{content.stat3?.label}</h4>
              <p className="text-[#A1A1A1] font-light text-sm leading-relaxed">{content.stat3?.description || "We create interiors that breathe life, offering comfort, resonance, and belonging."}</p>
            </div>
          </div>

          {/* Box 4 (Accent) */}
          <div className="bg-brand-orange p-8 md:p-12 lg:p-16 flex flex-col justify-between text-white aspect-square lg:aspect-auto cursor-pointer hover:bg-[#e04f1e] transition-colors md:border-r lg:border-r-0 lg:border-t border-[#3A3A3A]">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase md:text-right mb-8 break-words">{content.stat4?.value}</h3>
            <div>
              <p className="text-brand-black/90 font-medium text-sm leading-relaxed">{content.stat4?.description || "Each project reflects beauty, balance, and meaning, transforming spaces into experiences that truly endure."}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Text & Image */}
        <div className="w-full lg:w-[45%] flex flex-col justify-between pt-12 lg:pt-24 px-8 md:px-16 lg:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
              <span className="italic font-serif tracking-normal mr-3 text-[#A48F7A]">At</span> 
              {content.heading}
            </h2>
            <p className="text-[#D1D1D1] font-light leading-relaxed text-sm md:text-base max-w-lg">
              {content.textCard?.description}
            </p>
          </motion.div>

          <motion.div 
            className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-none mt-auto"
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
              <div className="w-full h-full bg-[#3A3A3A] flex items-center justify-center text-[#8A8A8A]">
                 <span className="text-xs tracking-widest uppercase">Image Placeholder</span>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
