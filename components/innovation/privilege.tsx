"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { motion, AnimatePresence } from "framer-motion";

interface InnovationData {
  title: string;
  icon: SanityImage;
  description: string;
  image: SanityImage;
}

export default function Privilege() {
  const [innovations, setInnovations] = useState<InnovationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInnovationIndex, setSelectedInnovationIndex] = useState(0);

  const iconVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const innovationsResult = await client.fetch<InnovationData[]>(
          `*[_type == "innovation"]{
            title,
            icon{
              asset->,
              hotspot
            },
            description,
            image{
              asset->,
              hotspot
            }
          }`
        );

        const orderMap: Record<string, number> = {
          Innovation: 0,
          "Branded Living": 1,
          "Life-style": 2,
          Construction: 3,
          Projects: 4,
        };

        const sortedInnovations = innovationsResult.sort((a, b) => {
          const orderA = orderMap[a.title] ?? 999;
          const orderB = orderMap[b.title] ?? 999;
          return orderA - orderB;
        });

        setInnovations(sortedInnovations);
      } catch (err) {
        console.error("Error fetching innovation data:", err);
        setError("Failed to load innovations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <React.Fragment>
      <div className="max-w-7xl pb-[5rem] relative mx-10">
        <div className="mt-12 mb-16">
          <h1 className="md:text-3xl text-2xl md:mr-[50%] mr-[25%] font-bold leading-tight md:text-nowrap">
            A privilege reserved for those who appreciate
            <br className="hidden md:block" /> true elegance. Welcome to a world
            where <br className="hidden md:block" /> luxury meets
            exclusivity—reserved <br className="hidden md:block" />
            just for you.
          </h1>
        </div>

        <hr className="border-t border-[#18181a] my-12" />

        <div className="flex flex-row flex-wrap justify-center items-start w-full gap-8 md:gap-16 md:mb-0 mb-8">
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center flex-1 min-w-[100px] max-w-[150px] cursor-pointer"
              onClick={() => setSelectedInnovationIndex(index)}
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {innovation.icon && (
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <Image
                    src={
                      urlFor(innovation.icon)
                        ?.auto("format")
                        ?.fit("max")
                        ?.url() ?? ""
                    }
                    alt={innovation.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 80px, 96px"
                  />
                </div>
              )}
              <motion.h3
                className={`mt-6 text-center font-medium text-lg ${
                  selectedInnovationIndex === index
                    ? "text-[#000000] border-b border-[#000000]"
                    : ""
                }`}
                animate={{
                  color:
                    selectedInnovationIndex === index ? "#000000" : "",
                  borderBottom:
                    selectedInnovationIndex === index
                      ? "1px solid #000000"
                      : "1px solid transparent",
                }}
                transition={{ duration: 0.3 }}
              >
                {innovation.title}
              </motion.h3>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedInnovationIndex}
          className="bg-[#18181a] grid grid-cols-1 md:grid-cols-2 md:pb-0 pb-16"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={contentVariants}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.div
            className="relative w-full h-[600px] bg-zinc-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {(() => {
              const selected = innovations[selectedInnovationIndex];
              const imageUrl =
                selected?.image != null
                  ? urlFor(selected.image)?.url() ?? ""
                  : "";
              return imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={selected?.title ?? "Innovation"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-sm">
                  No image
                </div>
              );
            })()}
          </motion.div>
          <motion.div
            className="flex flex-col items-center justify-center p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="text-white md:text-xl text-sm md:mr-0 md:px-5 mr-[45%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {(innovations[selectedInnovationIndex]?.description ?? "")
                .split("\n")
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-4 last:mb-0 font-geist text-base"
                  >
                    {paragraph}
                  </p>
                ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </React.Fragment>
  );
}
