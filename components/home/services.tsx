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
      <div className="w-full bg-[#1A1A1A] py-32 flex items-center justify-center min-h-[600px]">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Fallback if no services are defined in Sanity yet, to avoid empty section or errors
  if (services.length === 0) return null;

  return (
    <div className="w-full bg-brand-black py-24 md:py-32 font-geist">
      <div className="max-w-[100%] mx-auto px-0">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end px-8 md:px-16 lg:px-24">
          <div>
            <motion.h2 
              className="text-5xl md:text-7xl font-light tracking-tight text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Services
            </motion.h2>
            <motion.div 
              className="w-24 h-[1px] bg-brand-orange"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#3A3A3A]">
          {services.map((service, index) => (
          <Link href={service.link || "/contact"} key={index}>
            <motion.div 
              className="group relative block w-full overflow-hidden rounded-none min-h-[500px] md:min-h-[600px] cursor-pointer border-r last:border-r-0 border-b md:border-b-0 border-[#3A3A3A]"
              initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Background Images Container */}
                <div className="absolute inset-0 w-full h-full">
                  {service.defaultImage && (
                    <Image
                      src={urlFor(service.defaultImage)?.url() ?? ""}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />
                  )}
                {/* Deep dark gradient starting higher up for that moody editorial look */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-brand-black/60 opacity-80 group-hover:from-brand-black group-hover:via-brand-black/80 group-hover:to-brand-black/70 transition-all duration-500" /> 
              </div>

              {/* Content Container */}
              <div className="absolute inset-0 w-full h-full p-8 md:p-12 flex flex-col justify-end text-white z-10 transition-all duration-700 ease-in-out">
                {/* Title - Always visible */}
                <h3 className="text-3xl md:text-4xl font-light mb-4 text-white group-hover:text-brand-orange transition-colors duration-500">
                  {service.title}
                </h3>

                {/* Hover Content - Hidden by default, slides up and fades in */}
                <div className="overflow-hidden max-h-[0px] opacity-0 group-hover:max-h-[300px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <p className="text-white/90 text-base leading-relaxed mb-8 font-normal">
                    {service.description}
                  </p>
                  <span className="flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-white hover:text-brand-orange transition-colors">
                    Learn more <ArrowRight className="ml-3 w-4 h-4" />
                  </span>
                </div>
              </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center md:hidden">
          <Link href="/contact" className="inline-block">
            <Button className="rounded-none px-10 py-6 text-xs tracking-[0.2em] font-semibold uppercase border border-white bg-transparent text-white hover:bg-white hover:text-black transition-all">
              Start Your Project
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
