"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import type { Image as SanityImage } from "sanity";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  faqs: FaqItem[] | null;
}

interface FaqPageDoc {
  heroImage?: (SanityImage & { imgAlt?: string }) | null;
  heroText?: string | null;
  heroDescription?: string | null;
  eyebrow?: string | null;
  headline?: string | null;
  intro?: string | null;
  categories?: FaqCategory[] | null;
}

const FAQ_QUERY = `*[_type == "faqPage" && _id == "faqPage"][0]{
  heroImage{asset->, hotspot, imgAlt},
  heroText,
  heroDescription,
  eyebrow,
  headline,
  intro,
  categories[]{
    title,
    faqs[]{ question, answer }
  }
}`;

function FaqHero({
  heroImage,
  heroText,
  heroDescription,
}: {
  heroImage?: FaqPageDoc["heroImage"];
  heroText?: string | null;
  heroDescription?: string | null;
}) {
  const src = heroImage ? urlFor(heroImage)?.url() : undefined;
  const alt = (heroImage && "imgAlt" in heroImage && heroImage.imgAlt) || "FAQs";

  return (
    <section className="flex w-full justify-center overflow-visible">
      <div className="relative h-[600px] w-full md:h-[700px]">
        {src ? (
          <Image
            src={src}
            alt={typeof alt === "string" ? alt : "FAQs"}
            fill
            className="object-cover object-[30%_center] md:object-center"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-[#18181a]" />
        )}

        {(heroText?.trim() || heroDescription?.trim()) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
            <motion.div
              className="z-10 mx-auto w-full max-w-screen-2xl px-8 font-geist-mono md:px-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {heroText?.trim() ? (
                <h1 className="mb-6 max-w-4xl text-left text-4xl font-light uppercase leading-tight tracking-tight md:text-6xl">
                  {heroText.trim()}
                </h1>
              ) : null}
              {heroDescription?.trim() ? (
                <p className="w-full max-w-2xl text-left font-geist text-base font-light md:text-lg md:w-1/2">
                  {heroDescription.trim()}
                </p>
              ) : null}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

function FaqAccordionList({ categories }: { categories: FaqCategory[] }) {
  return (
    <>
      {categories.map((category, categoryIndex) => {
        const faqs = (category.faqs ?? []).filter((f) => f.question?.trim() && f.answer?.trim());
        if (faqs.length === 0) return null;
        return (
          <div key={`${category.title}-${categoryIndex}`} className="mb-14 last:mb-0 md:mb-16">
            <h2 className="mb-6 text-xl font-light tracking-tight text-brand-black md:text-2xl">
              {category.title}
            </h2>
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {faqs.map((faq, faqIndex) => (
                <AccordionItem
                  key={`${categoryIndex}-${faqIndex}`}
                  value={`${categoryIndex}-${faqIndex}`}
                  className="rounded-2xl border border-brand-light-gray bg-white px-5 data-[state=open]:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.08)] md:px-8"
                >
                  <AccordionTrigger
                    chevron
                    className="py-5 text-left text-sm font-medium text-brand-black hover:no-underline data-[state=open]:text-brand-orange md:text-base"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-brand-dark-gray md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        );
      })}
    </>
  );
}

export function FAQSection({ layout = "section" }: { layout?: "page" | "section" }) {
  const [data, setData] = useState<FaqPageDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const doc = await client.fetch<FaqPageDoc | null>(FAQ_QUERY);
        if (!cancelled) setData(doc);
      } catch (e) {
        console.error("FAQ fetch error:", e);
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = (data?.categories ?? []).filter(
    (c) => c.title?.trim() && (c.faqs?.length ?? 0) > 0
  );

  if (layout === "section") {
    if (loading) {
      return (
        <section className="flex min-h-[240px] items-center justify-center bg-white py-20 font-geist">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-light-gray border-t-brand-orange" />
        </section>
      );
    }
    if (categories.length === 0) return null;
    return (
      <section className="bg-white py-20 font-geist">
        <div className="container mx-auto max-w-4xl px-4">
          <FaqAccordionList categories={categories} />
        </div>
      </section>
    );
  }

  /* layout === "page": Services-style hero + mask-overlap, then FAQ body */
  if (loading) {
    return (
      <>
        <section className="h-[600px] w-full animate-pulse bg-gray-200 md:h-[700px]" />
        <section className="mask-overlap relative z-20 bg-white pt-10">
          <div className="flex min-h-[320px] items-center justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-light-gray border-t-brand-orange" />
          </div>
        </section>
      </>
    );
  }

  const eyebrow = data?.eyebrow?.trim() || "FAQs";
  const headline = data?.headline?.trim() || "Answers to common questions.";
  const intro = data?.intro?.trim();

  const innerBody =
    categories.length === 0 ? (
      <p className="text-brand-dark-gray font-light">FAQ content is not set up yet in the CMS.</p>
    ) : (
      <>
        <motion.div
          className="mb-14 max-w-3xl md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">{eyebrow}</p>
          <h1 className="mb-8 text-4xl font-light leading-[1.05] tracking-tight text-brand-black md:text-6xl lg:text-7xl">
            {headline}
          </h1>
          {intro ? (
            <p className="max-w-2xl text-lg font-light leading-relaxed text-brand-dark-gray md:text-xl">{intro}</p>
          ) : null}
        </motion.div>
        <div className="max-w-3xl">
          <FaqAccordionList categories={categories} />
        </div>
      </>
    );

  return (
    <>
      <FaqHero heroImage={data?.heroImage} heroText={data?.heroText} heroDescription={data?.heroDescription} />
      <section className={cn("mask-overlap relative z-20 bg-white pt-10")}>
        <div className="mx-auto w-full max-w-[95%] px-8 pb-24 pt-4 font-geist md:px-16 md:pt-8 lg:px-24 xl:max-w-screen-2xl">
          {innerBody}
        </div>
      </section>
    </>
  );
}
