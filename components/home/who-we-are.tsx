"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";

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
      <div className="max-w-7xl mx-auto px-8 py-20 font-geist">
        <div className="flex flex-col md:flex-row gap-16 mb-20">
          <div className="md:w-1/2 space-y-8 animate-pulse">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-12 w-3/4 bg-gray-200 rounded" />
            <div className="h-32 w-full bg-gray-200 rounded" />
            <div className="h-12 w-40 bg-gray-200 rounded" />
          </div>
          <div className="md:w-1/2 h-[600px] bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  // Fallback if no data is found (e.g. fresh Sanity instance)
  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto px-8 py-20 font-geist">
      <div className="flex flex-col md:flex-row gap-16 mb-20">
        {/* Left Column - Text Content */}
        <div className="md:w-1/2 space-y-8">
          <Button
            variant="ghost"
            className="text-black hover:bg-transparent hover:text-black p-0 mb-4 uppercase tracking-widest text-xs font-semibold"
          >
            About Us
          </Button>
          
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            {data.title}
          </h2>

          <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg whitespace-pre-wrap">
            {data.description}
          </div>

          <Link href={data.buttonLink || "/projects"}>
            <Button className="mt-4 rounded-full px-8 py-6 text-base bg-black text-[#f25e40] hover:text-white hover:bg-[#f25e40] transition-all cursor-pointer">
              {data.buttonText || "Our Portfolio"}
            </Button>
          </Link>

          <div className="pt-12">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">Years Experience</p>
            <div className="text-6xl font-bold">
              {data.yearsExperience} <span className="text-[#f25e40]">+</span>
            </div>
          </div>
        </div>

        {/* Right Column - Images */}
        <div className="md:w-1/2 relative h-[600px] md:h-auto">
           {data.img ? (
              <Image
                src={urlFor(data.img)?.url() ?? ""}
                alt={data.img.alt || "About Us Main Image"}
                className="object-cover rounded-lg w-full h-full shadow-lg"
                width={800}
                height={1000}
              />
           ) : (
             <div className="bg-gray-200 w-full h-full rounded-lg" />
           )}
           
           {/* Overlapping small image */}
           {data.secondaryImage && (
              <div className="absolute -bottom-12 -left-12 w-1/2 h-1/2 hidden md:block border-8 border-white rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={urlFor(data.secondaryImage)?.url() ?? ""}
                  alt={data.secondaryImage.alt || "About Us Detail Image"}
                  className="object-cover w-full h-full"
                  width={400}
                  height={500}
                />
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
