"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type HomeStat = {
  value: string;
  label: string;
  description: string;
};

const stats: HomeStat[] = [
  {
    value: "30+",
    label: "Years of Experience",
    description: "Serving the Bay Area with excellence",
  },
  {
    value: "25+",
    label: "Areas Served",
    description: "Covering the entire Bay Area",
  },
  {
    value: "4000+",
    label: "Projects Completed",
    description: "Successful renovations delivered",
  },
];

function HomeStatColumn({
  stat,
  showDivider,
}: {
  stat: HomeStat;
  showDivider: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 md:gap-2.5 px-5 sm:px-6 py-6 sm:py-7 md:py-9 text-center min-w-0",
        "border-b border-[#EBEBEB] last:border-b-0 md:border-b-0",
        showDivider &&
          "md:relative md:after:absolute md:after:right-0 md:after:top-[15%] md:after:bottom-[15%] md:after:w-px md:after:bg-[#E8E8E8]"
      )}
    >
      <p className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.625rem] font-semibold tracking-tight text-brand-black leading-none">
        {stat.value}
      </p>
      <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-brand-black max-w-[16rem] leading-snug">
        {stat.label}
      </p>
      <p className="text-xs sm:text-sm font-light text-brand-dark-gray/80 max-w-68 leading-snug">
        {stat.description}
      </p>
    </div>
  );
}

export default function ServicesIntro() {
  return (
    <div className="w-full font-geist py-8 md:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <HomeStatColumn
                stat={stat}
                showDivider={index < stats.length - 1}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}