"use client";

import { useState, useEffect, useCallback } from "react";
import { client } from "@/sanity/lib/client";
import type { Image as SanityImage } from "sanity";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Slide = {
  _id: string;
  title: string;
  subtitle?: string;
  image: SanityImage & { imgAlt?: string };
  imageUrl?: string;
  projectSlug: {
    current: string;
    _type: "slug";
  };
};

type ProjectsProps = {
  initialSlides?: Slide[];
};

type UsableSlide = Slide & { imageUrl: string };

const EMPTY_SLIDES: Slide[] = [];

function hasUsableProjectImage(slide: Slide): slide is UsableSlide {
  return Boolean(slide.image?.asset && slide.imageUrl);
}

export default function Projects({ initialSlides = EMPTY_SLIDES }: ProjectsProps) {
  const router = useRouter();
  const [slides, setSlides] = useState<UsableSlide[]>(() =>
    initialSlides.filter(hasUsableProjectImage)
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(
    !initialSlides.some(hasUsableProjectImage)
  );

  useEffect(() => {
    const validInitialSlides = initialSlides.filter(hasUsableProjectImage);
    if (validInitialSlides.length > 0) {
      setSlides(validInitialSlides);
      setIsLoading(false);
      return;
    }
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(order asc) {
          _id,
          title,
          subtitle,
          projectSlug,
          image { _type, asset, "imgAlt": imgAlt, hotspot },
          "imageUrl": image.asset->url
        }`;
        const fetchedSlides = await client.fetch<Slide[]>(query);
        const withImages = (fetchedSlides ?? []).filter(hasUsableProjectImage);
        setSlides(withImages);
      } catch (e) {
        console.error("Error fetching projects:", e);
        setSlides([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [initialSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % (slides.length || 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + (slides.length || 1)) % (slides.length || 1)
    );
  }, [slides.length]);

  const getNextSlideTitle = useCallback(() => {
    if (slides.length === 0) return "";
    const nextIndex = (currentSlide + 1) % slides.length;
    return slides[nextIndex]?.title || "";
  }, [currentSlide, slides]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (isLoading) {
    return (
      <div className="relative h-[70vh] w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="relative h-[70vh] w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-center p-8">
          <p className="text-lg mb-4">No projects yet.</p>
          <p className="text-sm opacity-80 mb-6">
            Add projects with a cover image in Sanity Studio to display them here.
          </p>
          <Link
            href="/studio"
            className="inline-block border border-white px-6 py-3 text-sm transition-colors hover:bg-white hover:text-black rounded-none"
          >
            Open Sanity Studio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-h-screen h-screen w-full overflow-hidden bg-black">
      <AnimatePresence initial={false} mode="wait">
        {slides.map(
          (slide, index) =>
            index === currentSlide &&
            slide.image?.asset && (
              <motion.div
                key={`slide-${slide._id}-${index}`}
                className="absolute inset-0 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority
                    fetchPriority="high"
                  />
                </div>
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />

                {/* Left side title - larger, wraps with indent */}
                <motion.div
                  className="absolute md:left-8 left-4 top-1/2 -translate-y-1/2 max-w-[85%] md:max-w-[60%]"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <h1
                    className="text-xl md:text-5xl font-bold text-white uppercase hover:opacity-80 cursor-pointer wrap-break-word indent-[-0.5em] ps-[0.5em]"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/projects/${slide.projectSlug?.current ?? ""}`);
                    }}
                  >
                    {slide.title}
                  </h1>
                </motion.div>

                {/* Right side content - always visible, wraps if needed */}
                <motion.div
                  onClick={nextSlide}
                  className="absolute right-8 top-1/2 -translate-y-1/2 min-w-[120px] max-w-[45%] flex flex-col items-end hover:cursor-pointer md:mr-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <div>
                    <motion.div
                      className="text-white text-sm font-medium text-right"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.4,
                      }}
                    >
                      {String(currentSlide + 1).padStart(2, "0")}
                    </motion.div>

                    <motion.hr
                      className="bg-white w-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5,
                      }}
                    />

                    <motion.div
                      className="flex flex-row flex-wrap items-center justify-end gap-2 md:gap-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.6,
                      }}
                    >
                      <motion.button
                        className="text-white"
                        whileHover={{ scale: 1.1, opacity: 1 }}
                        initial={{ opacity: 1 }}
                        aria-label="Next slide"
                      >
                        <svg
                          width="25"
                          height="15"
                          viewBox="0 0 36 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="cursor-pointer transform-gpu"
                        >
                          <path
                            d="M16.3936 0.371141L16.213 0.367601C16.213 0.367601 18.9255 2.94735 19.5875 9.09625L0.924852 8.75288L1.00185 12.6796L19.6875 13.046C19.2663 19.1736 16.606 21.5578 16.6529 21.6489L16.8334 21.6525C28.8542 12.3008 35.0624 11.3848 35.0624 11.3848C35.0624 11.3848 28.7905 10.2016 16.4166 0.39415L16.3936 0.371141Z"
                            fill="#FFFFFF"
                          />
                        </svg>
                      </motion.button>
                      <p className="text-white text-xs md:text-base font-medium text-right min-w-0 wrap-break-word text-balance">
                        {getNextSlideTitle()}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
}
