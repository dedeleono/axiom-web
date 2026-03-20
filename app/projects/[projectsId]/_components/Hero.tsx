"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { ProjectData } from "@/lib/interfaces";
import { motion } from "framer-motion";

interface HeroProps {
  project: ProjectData;
}

export default function Hero({ project }: HeroProps) {
  return (
    <section className="w-full flex justify-center items-center overflow-visible">
      <motion.div 
        className="relative w-full h-[600px] md:h-[700px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {project.image && project.image.asset ? (
          <Image
            src={urlFor(project.image)?.url() ?? ""}
            alt={`${project.title} hero image`}
            fill
            className="object-cover md:object-center object-[30%_center]"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#18181a]" />
        )}
      </motion.div>
    </section>
  );
}
