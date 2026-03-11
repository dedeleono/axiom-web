"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";

interface WhoWeAreData {
  img: SanityImage & { imgAlt?: string };
}

export default function WhoWeAre() {
  const [whoWeAreData, setWhoWeAreData] = useState<WhoWeAreData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch<WhoWeAreData[]>(
          `*[_type == "whoWeAre"]{
            img{
              asset,
              imgAlt
            }
          }`
        );
        setWhoWeAreData(data);
      } catch (error) {
        console.error("Error fetching who we are data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-20 font-geist">
      <div className="flex flex-col md:flex-row gap-16">
        {/* Left Column - Text Content */}
        <div className="md:w-1/2 space-y-8">
          <Button
            variant="ghost"
            className="text-black hover:bg-transparent hover:text-black p-0 mb-4 uppercase tracking-widest text-xs font-semibold"
          >
            About Us
          </Button>
          
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Custom Home Renovations
          </h2>

          <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
            <p>
              Welcome to Axiom Renovation, a licensed and insured full-service home remodeling contractor proudly serving the Bay Area. With a team of experienced professionals and a commitment to excellence, we bring a passion for transforming homes into dream living spaces. We prioritize quality and customer satisfaction, ensuring every project is handled with care and expertise.
            </p>
          </div>

          <Link href="/projects">
            <Button className="mt-4 rounded-full px-8 py-6 text-base bg-black text-white hover:bg-gray-800 transition-all">
              Our Portfolio
            </Button>
          </Link>

          <div className="pt-12">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">Years Experience</p>
            <div className="text-6xl font-bold">
              10 <span className="text-[#f25e40]">+</span>
            </div>
          </div>
        </div>

        {/* Right Column - Images */}
        <div className="md:w-1/2 relative h-[600px] md:h-auto">
           {whoWeAreData[0]?.img ? (
              <Image
                src={urlFor(whoWeAreData[0].img)?.url() ?? ""}
                alt={whoWeAreData[0].img.imgAlt || "About Us Image"}
                className="object-cover rounded-lg w-full h-full"
                width={800}
                height={1000}
              />
           ) : (
             <div className="bg-gray-200 w-full h-full rounded-lg animate-pulse" />
           )}
           
           {/* Overlapping small image if available, or just decorative element */}
           {whoWeAreData[1]?.img && (
              <div className="absolute -bottom-12 -left-12 w-1/2 h-1/2 hidden md:block border-8 border-white rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={urlFor(whoWeAreData[1].img)?.url() ?? ""}
                  alt={whoWeAreData[1].img.imgAlt || "Detail Image"}
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
