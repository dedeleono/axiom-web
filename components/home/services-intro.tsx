"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
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

export default function ServicesIntro() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-24 md:py-32 font-geist">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-5xl md:text-6xl font-bold tracking-tight">{stat.value}</h3>
            <p className="text-xl font-bold uppercase tracking-wide">{stat.label}</p>
            <p className="text-brand-dark-gray font-light leading-relaxed">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
