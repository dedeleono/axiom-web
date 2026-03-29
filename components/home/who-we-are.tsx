"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { motion } from "framer-motion";

interface WhoWeAreDocument {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  yearsExperience: string;
  img: SanityImage & { alt?: string };
  secondaryImage: SanityImage & { alt?: string };
}

export default function WhoWeAre() {
  const [data, setData] = useState<WhoWeAreDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch<WhoWeAreDocument>(
          `*[_type == "whoWeAre"][0]{
            title,
            description,
            buttonText,
            buttonLink,
            yearsExperience,
            img{asset, alt, hotspot},
            secondaryImage{asset, alt, hotspot}
          }`
        );
        setData(result);
      } catch (error) {
        console.error("Error fetching who we are data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full bg-[#f2f2f2] min-h-[600px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-brand-black rounded-full animate-spin" />
      </div>
    );
  }

  // Fallback if no data is found (e.g. fresh Sanity instance)
  if (!data) return null;

  return (
    <div className="w-full bg-[#EBEBEB] py-0 md:py-0">
      <div className="max-w-[100%] mx-auto flex flex-col md:flex-row min-h-[600px] md:min-h-[800px] gap-0">
        {/* Left Column - Text Content */}
        <motion.div 
          className="md:w-1/2 p-8 md:p-16 lg:p-32 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-brand-black">
            About Us
          </span>
          
          <h2 className="text-5xl md:text-7xl font-light leading-[1.1] tracking-tight text-brand-black mb-8">
            {data.title}
          </h2>

          <div className="space-y-6 text-[#4A4A4A] font-light leading-relaxed text-lg whitespace-pre-wrap max-w-xl">
            {data.description}
          </div>

          <Link href={data.buttonLink || "/projects"}>
          <Button className="mt-12 rounded-none px-12 py-8 text-xs tracking-[0.2em] font-semibold uppercase bg-brand-black text-white hover:bg-brand-orange transition-colors duration-300">
            {data.buttonText || "Our Portfolio"}
          </Button>
        </Link>

        <div className="mt-20 pt-8 border-t border-[#D1D1D1]">
          <p className="text-[#8A8A8A] uppercase tracking-widest text-xs mb-2">Years Experience</p>
          <div className="text-6xl md:text-7xl font-light text-brand-black">
            {data.yearsExperience} <span className="text-brand-orange text-5xl md:text-6xl">+</span>
          </div>
        </div>
      </motion.div>

      {/* Right Column - Images */}
      <motion.div 
        className="relative min-h-[500px] w-full overflow-hidden md:-mt-8 md:min-h-full md:w-1/2 rounded-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
           {data.img ? (
              <Image
                src={urlFor(data.img)?.url() ?? ""}
                alt={data.img.alt || "About Us Main Image"}
                className="object-cover w-full h-full"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
           ) : (
             <div className="bg-[#D1D1D1] w-full h-full" />
           )}
        </motion.div>
      </div>
    </div>
  );
}
