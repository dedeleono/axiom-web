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
  const [enlargedImage, setEnlargedImage] = useState<number | null>(null);
  const [lastHovered, setLastHovered] = useState<number>(1);

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

  if (isLoading) {
    return (
      <div className="max-w-7xl min-h-[calc(100vh-100px)] relative mx-10 animate-pulse">
        <div className="bg-gray-200 h-full w-full" />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="max-w-7xl min-h-[calc(100vh+150px)] relative mx-10 mb-5 pb-10">
        <Button
          variant="ghost"
          className="text-black hover:bg-transparent hover:text-black p-0"
        >
          <span className="text-sm font-geist-mono">WHO WE ARE</span>
          <div className="w-2 h-2">
            <svg
              width="4"
              height="4"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-50 transform-gpu"
            >
              <path
                d="M6.26784 1.54193L6.22778 1.50188C6.22778 1.50188 6.25782 2.65332 5.01627 4.13517L0.871089 0L0 0.871089L4.14518 5.01627C2.66333 6.25782 1.5219 6.19775 1.51189 6.22778L1.55194 6.26784C6.38798 6.84856 8 8 8 8C8 8 6.84856 6.37797 6.26784 1.55194V1.54193Z"
                fill="#000000"
              />
            </svg>
          </div>
        </Button>

        <div className="mt-12 mb-16 font-geist">
          <h1 className="lg:text-5xl text-4xl font-bold leading-tight">
            <span className="block">CREATING INNOVATIVE,</span>
            <span className="block lg:text-center">ENDURING CULTURAL</span>
            <span className="block text-center">EXPERIENCES</span>
            <span className="block text-right">
              IN ICONIC <span className="mr-5">PROPERTIES</span>
            </span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:pt-10">
          <div className="order-2 md:order-1 md:w-1/4 md:flex hidden relative">
            <div className="relative aspect-[4/3] -translate-x-10 -translate-y-12">
              {whoWeAreData[0]?.img && (
                <Image
                  src={urlFor(whoWeAreData[0].img)?.url() ?? ""}
                  alt={whoWeAreData[0].img.imgAlt || "Modern office interior"}
                  className={`object-cover transition-all duration-500 hover:cursor-pointer ${
                    enlargedImage === 0 ||
                    (enlargedImage === null && lastHovered === 0)
                      ? "w-[800px] h-[500px]"
                      : "w-[300px] h-[200px]"
                  }`}
                  width={800}
                  height={500}
                  onMouseEnter={() => setEnlargedImage(0)}
                  onMouseLeave={() => {
                    setEnlargedImage(null);
                    setLastHovered(0);
                  }}
                />
              )}
            </div>
          </div>

          <div className="order-1 md:order-2 md:w-1/4 md:ml-auto font-geist md:min-h-[650px]">
            <div className="space-y-4 max-w-md pr-24 md:pr-0 mt-20">
              <p className="text-sm">
                We are a Bay Area organization dedicated to the development,
                construction, and renovation of innovative residential and
                commercial projects.
              </p>
              <p className="text-sm">
                We provide conceptual solutions and high-level renovations. We
                are known for constant innovation in design and construction,
                while maintaining high quality standards and being
                environmentally respectful.
              </p>
              <div className="pt-4">
                <Link href="/innovation">
                  <Button variant="outline" className="rounded-full px-6 border-black hover:bg-black hover:text-white transition-colors">
                    More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="order-3 md:w-1/4 md:flex hidden mb-32 relative">
            <div className="relative translate-x-10">
              {whoWeAreData[1]?.img && (
                <Image
                  src={urlFor(whoWeAreData[1].img)?.url() ?? ""}
                  alt={whoWeAreData[1].img.imgAlt || "Person walking up steps"}
                  className={`object-cover transition-all duration-500 hover:cursor-pointer ${
                    enlargedImage === 1 ||
                    (enlargedImage === null && lastHovered === 1)
                      ? "w-[800px] h-[500px]"
                      : "w-[300px] h-[200px]"
                  }`}
                  width={800}
                  height={500}
                  onMouseEnter={() => setEnlargedImage(1)}
                  onMouseLeave={() => {
                    setEnlargedImage(null);
                    setLastHovered(1);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="md:hidden flex justify-between mt-8 mb-8">
          <div className="w-[48%]">
            <div className="relative aspect-[4/3]">
              {whoWeAreData[0]?.img && (
                <Image
                  src={urlFor(whoWeAreData[0].img)?.url() ?? ""}
                  alt={whoWeAreData[0].img.imgAlt || "Modern office interior"}
                  className="object-cover w-full h-full transition-transform duration-350 hover:scale-[1.02] hover:cursor-pointer"
                  width={400}
                  height={300}
                  priority
                />
              )}
            </div>
          </div>
          <div className="w-[48%]">
            <div className="relative aspect-[4/6]">
              {whoWeAreData[1]?.img && (
                <Image
                  src={urlFor(whoWeAreData[1].img)?.url() ?? ""}
                  alt={whoWeAreData[1].img.imgAlt || "Person walking up steps"}
                  className="object-cover w-full h-full transition-transform duration-350 hover:scale-[1.02] hover:cursor-pointer"
                  width={400}
                  height={600}
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
