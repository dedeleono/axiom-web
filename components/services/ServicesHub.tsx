"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { serviceDetailHref } from "@/lib/service-path";

const SERVICE_ENTRIES = [
  {
    slug: "bathroom-remodeling" as const,
    title: "Bathroom Remodel",
    line: "Spa-like retreats, fixtures, and wet-area expertise.",
  },
  {
    slug: "kitchen-remodeling" as const,
    title: "Kitchen Remodel",
    line: "Layout, cabinetry, and finishes built for how you cook and gather.",
  },
  {
    slug: "home-addition" as const,
    title: "Home Addition & ADU",
    line: "Thoughtful square footage that feels native to your home.",
  },
] as const;

export default function ServicesHub() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-[95%] xl:max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 pb-24 md:pb-32 pt-4 md:pt-8">
        <motion.div
          className="max-w-3xl mb-16 md:mb-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray mb-6">
            Services
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-brand-black leading-[1.05] mb-8">
            Built around how you live.
          </h1>
          <p className="text-brand-dark-gray font-light text-lg md:text-xl leading-relaxed max-w-2xl">
            Choose a focus below—each page is a concise overview, process, and how we work with you.
            For a custom scope, we start with a conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SERVICE_ENTRIES.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={serviceDetailHref(item.slug)}
                className="group flex h-full min-h-[280px] flex-col border border-brand-light-gray bg-white p-8 transition-all duration-500 hover:border-brand-black/20 hover:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.12)] md:p-10 rounded-none"
              >
                <div className="flex justify-between items-start gap-4 mb-6">
                  <h2 className="text-2xl md:text-3xl font-light text-brand-black tracking-tight group-hover:text-brand-orange transition-colors duration-300">
                    {item.title}
                  </h2>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-brand-light-gray text-brand-black transition-all duration-300 group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white rounded-none">
                    <ArrowUpRight className="w-5 h-5" aria-hidden />
                  </span>
                </div>
                <p className="text-brand-dark-gray font-light leading-relaxed text-base mt-auto">
                  {item.line}
                </p>
                <span className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark-gray group-hover:text-brand-black transition-colors">
                  View details
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 md:mt-28 pt-12 border-t border-brand-light-gray"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-brand-dark-gray font-light max-w-xl">
            Not sure which path fits?{" "}
            <Link
              href="/contact"
              className="text-brand-black font-medium underline underline-offset-4 decoration-brand-orange/50 hover:decoration-brand-orange transition-colors"
            >
              Book a consultation
            </Link>{" "}
            and we&apos;ll map the right scope together.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
