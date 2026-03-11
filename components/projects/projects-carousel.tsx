"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import AutoplayPlugin from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Project {
  title: string;
  location: string;
  projectSlug: { current: string };
  image: SanityImage & { imgAlt?: string };
  highlightImages: (SanityImage & { imgAlt?: string })[];
  aspectRatio?: number;
}

export default function ProjectsCarousel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch<Project[]>(`
          *[_type == "project"] | order(order asc) {
            title,
            location,
            projectSlug,
            image,
            highlightImages,
            "aspectRatio": image.asset->metadata.dimensions.aspectRatio
          }
        `);
        const withImages = (data ?? []).filter(
          (p): p is Project => p.image != null && p.image.asset != null
        );
        setProjects(withImages.reverse());
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const autoplayOptions = {
    delay: 4000,
    stopOnInteraction: false,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };

  const plugins = [AutoplayPlugin(autoplayOptions)];

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 animate-pulse">
        <div className="h-[600px] bg-gray-200 rounded-lg" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-lg text-gray-600 mb-4">No projects yet.</p>
        <p className="text-sm text-gray-500 mb-6">
          Add projects with cover images in Sanity Studio to display them here.
        </p>
        <a
          href="/studio"
          className="inline-block px-6 py-3 border border-gray-900 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
        >
          Open Sanity Studio
        </a>
      </div>
    );
  }

  return (
    <div className="relative py-20">
      <div className="hidden lg:block">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
            dragFree: true,
          }}
          plugins={plugins}
          className="pl-[5vw]"
        >
          <CarouselContent className="-ml-4">
            {[...projects, ...projects, ...projects].map((project, index) => {
              const baseWidth = project.aspectRatio
                ? project.aspectRatio * 600
                : 600;
              const aspectRatioModifier = Math.max(
                Math.min(baseWidth / 600, 1.3),
                0.8
              );
              const finalWidth = 30 * aspectRatioModifier;

              return (
                <CarouselItem
                  key={`${project.projectSlug.current}-${index}`}
                  className="pl-4"
                  style={{
                    flex: `0 0 ${finalWidth}vw`,
                    maxWidth: `${finalWidth}vw`,
                  }}
                >
                  <motion.div
                    className="group cursor-pointer p-4 rounded-xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                  >
                    <Link href={`/projects/${project.projectSlug.current}`}>
                      <div className="space-y-2 mb-4">
                        <h3 className="text-2xl font-medium text-gray-900">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 tracking-wide">
                          {project.location}
                        </p>
                      </div>

                      <div
                        className="relative overflow-hidden"
                        style={{
                          height: project.aspectRatio
                            ? `${600 / project.aspectRatio}px`
                            : "600px",
                        }}
                      >
                        <Image
                          src={
                            urlFor(project.image)
                              ?.width(Math.round(baseWidth))
                              ?.height(600)
                              ?.url() ?? ""
                          }
                          alt={
                            project.image.imgAlt || project.title
                          }
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          priority={index < 3}
                        />

                        {project.highlightImages?.[0] && (
                          <Image
                            src={
                              urlFor(project.highlightImages[0])
                                ?.width(600)
                                ?.height(800)
                                ?.url() ?? ""
                            }
                            alt={`Highlight of ${project.title}`}
                            fill
                            className="object-cover opacity-0 transition-all duration-700 group-hover:opacity-100"
                            priority={index < 3}
                          />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </Link>

                    <div className="mt-6 flex justify-end">
                      <Link
                        className={cn(
                          "relative overflow-hidden text-sm font-medium",
                          "text-gray-900 border border-black",
                          "py-3 px-8 rounded-full uppercase tracking-wider",
                          "transition-all duration-300 ease-out",
                          "hover:bg-black hover:text-white",
                          "group-hover:scale-105"
                        )}
                        href={`/projects/${project.projectSlug.current}`}
                      >
                        MORE
                      </Link>
                    </div>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="md:hidden space-y-16">
        {projects.map((project, index) => (
          <motion.div
            key={project.projectSlug.current}
            className="space-y-6 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600">{project.location}</p>
            </div>

            <div className="relative h-[500px] overflow-hidden">
              <Image
                src={
                  urlFor(project.image)
                    ?.width(400)
                    ?.height(500)
                    ?.url() ?? ""
                }
                alt={project.image.imgAlt || project.title}
                fill
                className="object-cover"
                priority={index < 2}
              />
            </div>

            <div className="flex justify-end">
              <Link
                className="text-sm font-medium text-gray-900 border border-black py-2 px-5 rounded-full uppercase"
                href={`/projects/${project.projectSlug.current}`}
              >
                More
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
