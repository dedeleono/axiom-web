"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceData {
  title: string;
  description: string;
  defaultImage: SanityImage;
  hoverImage: SanityImage;
  link: string;
}

export default function Services() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch<ServiceData[]>(
          `*[_type == "service"] | order(order asc) {
            title,
            description,
            defaultImage{asset, hotspot},
            hoverImage{asset, hotspot},
            link
          }`
        );
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-20 font-geist mb-20 flex justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  // Fallback if no services are defined in Sanity yet, to avoid empty section or errors
  if (services.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-8 py-20 font-geist mb-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <Button
            variant="ghost"
            className="text-black hover:bg-transparent hover:text-black p-0 mb-4 uppercase tracking-widest text-xs font-semibold"
          >
            Services
          </Button>
          <h2 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
            We are the experts in good taste!
          </h2>
        </div>
        <Link href="/contact" className="hidden md:block">
          <Button className="rounded-full px-6 py-6 text-base group bg-black text-white hover:bg-gray-800 transition-all">
            Start Your Project
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[500px]">
        {services.map((service, index) => (
          <Link href={service.link || "/contact"} key={index} className="group relative block h-full w-full overflow-hidden rounded-2xl">
            {/* Background Images Container */}
            <div className="absolute inset-0 w-full h-full">
              {/* Default Image - Visible by default, fades out on hover */}
              <div className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out group-hover:opacity-0">
                {service.defaultImage && (
                  <Image
                    src={urlFor(service.defaultImage)?.url() ?? ""}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                )}
                {/* Overlay for default state text readability if needed, or keeping it clean as per request */}
                <div className="absolute inset-0 bg-black/10" /> 
              </div>

              {/* Hover Image - Hidden by default, fades in on hover */}
              <div className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                {service.hoverImage && (
                  <Image
                    src={urlFor(service.hoverImage)?.url() ?? ""}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                )}
                {/* Darker overlay on hover for text readability */}
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </div>

            {/* Content Container */}
            <div className="relative h-full w-full p-8 flex flex-col justify-end text-white z-10">
              {/* Title - Always visible */}
              <h3 className="text-3xl font-bold mb-4 drop-shadow-md transform transition-transform duration-500 group-hover:-translate-y-2">
                {service.title}
              </h3>

              {/* Hover Content - Hidden by default, slides up and fades in */}
              <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                <p className="text-gray-200 text-sm leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
                <div className="flex items-center text-sm font-medium hover:underline underline-offset-4">
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 md:hidden">
        <Link href="/contact" className="w-full block">
          <Button className="w-full rounded-full py-6 text-base bg-black text-white hover:bg-gray-800 transition-all">
            Start Your Project
          </Button>
        </Link>
      </div>
    </div>
  );
}
