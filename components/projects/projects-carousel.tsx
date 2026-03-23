"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  services?: string;
  projectSlug: { current: string };
  image: SanityImage & { imgAlt?: string };
  highlightImages: (SanityImage & { imgAlt?: string })[];
  aspectRatio?: number;
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch<Project[]>(`
          *[_type == "project"] | order(order asc) {
            title,
            "services": coalesce(services, projectType, ""),
            projectSlug,
            image,
            highlightImages,
            "aspectRatio": image.asset->metadata.dimensions.aspectRatio
          }
        `);
        const withImages = (data ?? []).filter(
          (p): p is Project => p.image != null && p.image.asset != null
        );
        setProjects(withImages);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[600px] bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600 mb-4 font-light">No projects found.</p>
        <p className="text-sm text-gray-500 mb-8 max-w-md">
          We are currently updating our portfolio. Please check back soon or contact us for recent work samples.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[100%] mx-auto px-8 md:px-16 lg:px-24 py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
        {projects.map((project, index) => (
          <motion.div
            key={project.projectSlug.current}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: (index % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col"
          >
            {/* Header Info */}
            <div className="mb-6 flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-light text-brand-black leading-tight group-hover:text-brand-orange transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs text-brand-dark-gray font-medium leading-relaxed line-clamp-2">
                  {project.services?.trim() ? project.services : "—"}
                </p>
              </div>
            </div>

            {/* Image Card */}
            <Link 
              href={`/projects/${project.projectSlug.current}`}
              className="block relative w-full aspect-[4/5] overflow-hidden rounded-none bg-brand-light-gray mb-6"
            >
              <div className="absolute inset-0 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-[1.03]">
                <Image
                  src={
                    urlFor(project.image)
                      ?.width(800)
                      ?.height(1067)
                      ?.url() ?? ""
                  }
                  alt={project.image.imgAlt || project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
                
                {/* Hover Reveal Image */}
                {project.highlightImages?.[0] && (
                  <Image
                    src={
                      urlFor(project.highlightImages[0])
                        ?.width(800)
                        ?.height(1067)
                        ?.url() ?? ""
                    }
                    alt={`Highlight of ${project.title}`}
                    fill
                    className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                )}
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </Link>

            {/* Footer / CTA */}
            <div className="mt-auto pt-6 border-t border-[#EBEBEB] flex justify-between items-center group-hover:border-brand-black transition-colors duration-500">
              <span className="text-xs font-semibold tracking-widest text-brand-dark-gray group-hover:text-brand-black transition-colors duration-500 uppercase">
                View Project
              </span>
              <Link
                href={`/projects/${project.projectSlug.current}`}
                className="w-12 h-12 rounded-full border border-[#EBEBEB] flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition-all duration-500 text-brand-black"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
