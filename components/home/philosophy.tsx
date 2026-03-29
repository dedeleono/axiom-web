"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { cn } from "@/lib/utils";

const PHILOSOPHY_QUERY = `*[_type == "philosophySection" && _id == "philosophySection"][0]{
  eyebrow,
  headline,
  paragraphOne,
  paragraphTwo,
  imageLeft{asset->, hotspot, imgAlt},
  imageRight{asset->, hotspot, imgAlt}
}`;

const FALLBACK = {
  eyebrow: "Philosophy",
  headline: "A beautiful room means a beautiful mind.",
  paragraphOne:
    "A beautifully designed room has the power to influence your state of mind. The colors, textures, and layout of your space can inspire calm, creativity, and focus. When your environment reflects your personality and preferences, it becomes more than just a room—it transforms into a sanctuary that nurtures your well-being and promotes clarity of thought.",
  paragraphTwo:
    "We craft spaces that bring harmony and elegance to your life. Each detail, from the lighting to the furnishings, is thoughtfully selected to create a room that resonates with your inner peace and joy. Because we believe a beautiful room doesn’t just enhance your surroundings—it enhances your mindset, helping you live and think your best every day.",
} as const;

interface PhilosophyImageField extends SanityImage {
  imgAlt?: string;
}

interface PhilosophyDoc {
  eyebrow?: string | null;
  headline?: string | null;
  paragraphOne?: string | null;
  paragraphTwo?: string | null;
  imageLeft?: PhilosophyImageField | null;
  imageRight?: PhilosophyImageField | null;
}

function PhilosophyFigure({
  image,
  className,
  sizes,
}: {
  image?: PhilosophyImageField | null;
  className?: string;
  sizes: string;
}) {
  const src = image ? urlFor(image)?.width(900).auto("format").url() : undefined;
  const alt =
    (image && "imgAlt" in image && typeof image.imgAlt === "string" && image.imgAlt) ||
    "Interior photography";

  if (!src) {
    return (
      <div
        className={cn("min-h-[280px] w-full rounded-none bg-brand-light-gray md:min-h-[360px]", className)}
        aria-hidden
      />
    );
  }

  return (
    <div className={cn("relative w-full overflow-hidden rounded-none shadow-[0_20px_60px_-24px_rgba(0,0,0,0.15)]", className)}>
      <div className="relative aspect-[3/4] w-full md:aspect-[4/5]">
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
    </div>
  );
}

export default function Philosophy() {
  const [data, setData] = useState<PhilosophyDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const doc = await client.fetch<PhilosophyDoc | null>(PHILOSOPHY_QUERY);
        if (!cancelled) setData(doc);
      } catch (e) {
        console.error("Philosophy section fetch error:", e);
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const eyebrow = data?.eyebrow?.trim() || FALLBACK.eyebrow;
  const headline = data?.headline?.trim() || FALLBACK.headline;
  const paragraphOne = data?.paragraphOne?.trim() || FALLBACK.paragraphOne;
  const paragraphTwo = data?.paragraphTwo?.trim() || FALLBACK.paragraphTwo;

  return (
    <div
      className="font-geist"
      style={{
        backgroundColor: "#fafafa",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cpath fill='none' stroke='%23e5e5e5' stroke-width='0.55' opacity='0.7' d='M0 80 Q40 55 80 80 T160 80 M0 40 Q50 15 100 40 T160 40 M0 120 Q45 95 90 120 T160 120'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="mx-auto max-w-[95%] px-8 py-24 md:px-16 md:py-32 lg:px-24 xl:max-w-screen-2xl">
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-light-gray border-t-brand-orange" />
          </div>
        ) : (
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <motion.div
              className="space-y-8 lg:col-span-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div>
                <Button
                  variant="ghost"
                  className="mb-5 h-auto p-0 text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange hover:bg-transparent hover:text-brand-black"
                >
                  {eyebrow}
                </Button>
                <h2 className="max-w-xl text-4xl font-light leading-[1.12] tracking-tight text-brand-black md:text-5xl lg:text-6xl">
                  {headline}
                </h2>
              </div>
              <div className="space-y-6 text-lg font-light leading-relaxed text-brand-dark-gray">
               
                <p>{paragraphTwo}</p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-3 md:gap-4 lg:col-span-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="w-1/2 shrink-0 pt-8 md:pt-14">
                <PhilosophyFigure
                  image={data?.imageLeft}
                  sizes="(max-width: 1024px) 42vw, 28vw"
                />
              </div>
              <div className="w-1/2 shrink-0 pb-10 md:pb-16">
                <PhilosophyFigure
                  image={data?.imageRight}
                  sizes="(max-width: 1024px) 42vw, 28vw"
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
