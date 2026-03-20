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
      <div className="max-w-7xl mx-auto px-8 py-24 md:py-32 min-h-[600px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-light-gray border-t-brand-black rounded-full animate-spin" />
      </div>
    );
  }

  // Use default/placeholder data if sanity document doesn't exist yet to match the design immediately
  const content = data || {
    heading: "Why Choose us",
    subheading: "Expert team, proven strategies, personalized approach, and dedicated support to help your business thrive and grow.",
    stat1: { value: "95%", label: "Client Satisfaction" },
    stat2: { value: "120+", label: "Campaigns Delivered" },
    stat3: { value: "24/7", label: "Support Available" },
    stat4: { value: "50%", label: "Engagement Growth" },
    textCard: { 
      title: "Building Lasting Success", 
      description: '"Your success is our mission — we don\'t just deliver results, we build lasting partnerships."',
      author: "James Albarn" 
    },
    image: null
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-24 md:py-32 font-geist">
      
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-end mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div>
          <Button
            variant="ghost"
            className="text-brand-black hover:bg-transparent hover:text-brand-black p-0 mb-4 uppercase tracking-widest text-xs font-semibold"
          >
            {content.subheading}
          </Button>
          <h2 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight tracking-tight text-brand-black">
            {content.heading}
          </h2>
        </div>

      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-auto lg:h-[500px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Left Column Group (Spans 3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-8 h-full">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            {/* Blue Box */}
            <div className="bg-brand-orange rounded-3xl p-8 flex flex-col justify-between text-white relative overflow-hidden group">
               <div className="relative z-10">
                  <h3 className="text-5xl font-bold mb-2">{content.stat1?.value}</h3>
               </div>
               <p className="text-sm font-medium relative z-10 border-t border-white/20 pt-4 mt-auto">
                 {content.stat1?.label}
               </p>
               {/* Decorative circle */}
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700" />
            </div>

            {/* White Box (Top) */}
            <div className="bg-brand-light-gray rounded-3xl p-8 flex flex-col justify-between text-brand-black group transition-colors">
              <h3 className="text-5xl font-bold mb-2 text-brand-orange">{content.stat2?.value}</h3>
               <p className="text-sm font-medium border-t border-brand-dark-gray/20 pt-4 mt-auto">
                 {content.stat2?.label}
               </p>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
            {/* White Box (Bottom Left) */}
            <div className="bg-brand-light-gray rounded-3xl p-8 flex flex-col justify-between text-brand-black transition-colors">
              <h3 className="text-4xl font-bold mb-2 text-brand-orange">{content.stat3?.value}</h3>
               <p className="text-xs font-medium border-t border-brand-dark-gray/20 pt-4 mt-auto">
                 {content.stat3?.label}
               </p>
            </div>

            {/* Text Card (Middle) */}
            <div className="bg-brand-light-gray rounded-3xl p-8 flex flex-col justify-between text-brand-black transition-colors">
               <div>
                  <h4 className="font-bold mb-3 text-sm">{content.textCard?.title}</h4>
                  <p className="text-xs text-brand-dark-gray leading-relaxed italic">
                    {content.textCard?.description}
                  </p>
               </div>
               <p className="text-xs font-bold mt-4 pt-4 border-t border-brand-dark-gray/20">
                 {content.textCard?.author}
               </p>
            </div>

            {/* Green Box */}
            <div className="bg-brand-black rounded-3xl p-8 flex flex-col justify-between text-white group overflow-hidden relative">
               <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2 text-brand-orange">{content.stat4?.value}</h3>
               </div>
               <p className="text-xs font-medium border-t border-white/10 pt-4 mt-auto relative z-10">
                 {content.stat4?.label}
               </p>
               {/* Decorative circle */}
               
            </div>
          </div>
        </div>

        {/* Right Column (Image) - Spans 1 col, Full Height */}
        <div className="lg:col-span-1 h-[300px] lg:h-full relative rounded-3xl overflow-hidden group">
          {content.image ? (
            <Image
              src={urlFor(content.image)?.url() ?? ""}
              alt={content.image.alt || "Why Choose Us"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-brand-light-gray flex items-center justify-center text-brand-dark-gray">
               <span className="text-sm">Image Placeholder</span>
            </div>
          )}
          {/* Overlay elements from design if needed, keeping clean for now */}
        </div>
      </motion.div>
    </div>
  );
}
