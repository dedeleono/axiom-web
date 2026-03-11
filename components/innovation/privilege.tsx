"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  image?: SanityImage;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface InnovationData {
  title: string;
  icon: SanityImage;
  description: string;
  image: SanityImage;
  gallery?: SanityImage[];
  videoUrl?: string;
  aboutTitle?: string;
  aboutText?: string;
  featuresTitle?: string;
  features?: Feature[];
  processTitle?: string;
  process?: ProcessStep[];
  historyTitle?: string;
  historyText?: string;
}

export default function Privilege() {
  const [innovations, setInnovations] = useState<InnovationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInnovationIndex, setSelectedInnovationIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

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
            },
            gallery[]{
              asset->,
              hotspot
            },
            videoUrl,
            aboutTitle,
            aboutText,
            featuresTitle,
            features[]{
              title,
              description,
              image{
                asset->,
                hotspot
              }
            },
            processTitle,
            process[]{
              step,
              title,
              description
            },
            historyTitle,
            historyText
          }`
        );

        const orderMap: Record<string, number> = {
          "Kitchen Remodeling": 0,
          "Bathroom Remodeling": 1,
          "Home Addition": 2,
          "Innovation": 3,
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

  // Reset gallery index when innovation changes
  useEffect(() => {
    setGalleryIndex(0);
  }, [selectedInnovationIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-20">{error}</div>;
  }

  const selected = innovations[selectedInnovationIndex];

  const nextGalleryImage = () => {
    if (selected?.gallery) {
      setGalleryIndex((prev) => (prev + 1) % selected.gallery!.length);
    }
  };

  const prevGalleryImage = () => {
    if (selected?.gallery) {
      setGalleryIndex((prev) => (prev - 1 + selected.gallery!.length) % selected.gallery!.length);
    }
  };

  return (
    <React.Fragment>
      <div className="max-w-7xl pb-12 relative mx-10 font-geist">
        <div className="mt-12 mb-16">
          <h1 className="md:text-3xl text-2xl md:mr-[50%] mr-[25%] font-bold leading-tight md:text-nowrap text-gray-900">
            A privilege reserved for those who appreciate
            <br className="hidden md:block" /> true elegance. Welcome to a world
            where <br className="hidden md:block" /> luxury meets
            exclusivity—reserved <br className="hidden md:block" />
            just for you.
          </h1>
        </div>

        <hr className="border-t border-gray-200 my-12" />

        <div className="flex flex-row flex-wrap justify-center items-start w-full gap-8 md:gap-16 md:mb-0 mb-8">
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center flex-1 min-w-[100px] max-w-[150px] cursor-pointer group"
              onClick={() => setSelectedInnovationIndex(index)}
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div
                 className={`relative w-20 h-20 md:w-24 md:h-24 p-4 rounded-full transition-all duration-300 ${
                    selectedInnovationIndex === index ? "bg-black shadow-xl scale-105" : "bg-gray-100 group-hover:bg-gray-200"
                 }`}
              >
                  {innovation.icon && (
                    <Image
                      src={
                        urlFor(innovation.icon)
                          ?.auto("format")
                          ?.fit("max")
                          ?.url() ?? ""
                      }
                      alt={innovation.title}
                      fill
                      className={`object-contain p-4 ${selectedInnovationIndex === index ? "invert" : ""}`}
                      sizes="(max-width: 768px) 80px, 96px"
                    />
                  )}
              </div>
              <motion.h3
                className={`mt-6 text-center font-medium text-lg transition-colors ${
                  selectedInnovationIndex === index
                    ? "text-black font-bold border-b-2 border-black pb-1"
                    : "text-gray-500 group-hover:text-black"
                }`}
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
          className="bg-[#18181a] text-white min-h-[600px] font-geist"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={contentVariants}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Top Section: Split View (Media Left, Content Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Media Column (Gallery/Video) */}
            <motion.div
              className="relative w-full h-[500px] md:h-auto md:min-h-[800px] bg-zinc-900 overflow-hidden group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
               {selected?.gallery && selected.gallery.length > 0 ? (
                  <div className="relative w-full h-full">
                     <AnimatePresence mode="wait">
                        <motion.div
                           key={galleryIndex}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.5 }}
                           className="absolute inset-0"
                        >
                           <Image
                              src={urlFor(selected.gallery[galleryIndex])?.url() ?? ""}
                              alt={`Gallery Image ${galleryIndex + 1}`}
                              fill
                              className="object-cover"
                              priority
                           />
                           {/* Overlay gradient for text legibility if needed, currently clean */}
                        </motion.div>
                     </AnimatePresence>
                     
                     {/* Gallery Controls */}
                     {selected.gallery.length > 1 && (
                        <div className="absolute inset-x-0 bottom-8 flex justify-center gap-4 z-10">
                           <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); prevGalleryImage(); }} className="bg-black/50 hover:bg-black text-white rounded-full">
                              <ChevronLeft className="w-6 h-6" />
                           </Button>
                           <div className="flex gap-2 items-center">
                              {selected.gallery.map((_, idx) => (
                                 <div 
                                    key={idx} 
                                    className={`w-2 h-2 rounded-full transition-all ${idx === galleryIndex ? "bg-white w-4" : "bg-white/50"}`} 
                                 />
                              ))}
                           </div>
                           <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); nextGalleryImage(); }} className="bg-black/50 hover:bg-black text-white rounded-full">
                              <ChevronRight className="w-6 h-6" />
                           </Button>
                        </div>
                     )}
                  </div>
               ) : selected?.image ? (
                  <Image
                    src={urlFor(selected.image)?.url() ?? ""}
                    alt={selected?.title ?? "Innovation"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
               ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-sm">
                    No image
                  </div>
               )}

               {selected?.videoUrl && (
                  <div className="absolute top-8 right-8 z-20">
                     <Link href={selected.videoUrl} target="_blank">
                        <Button className="bg-[#f25e40] hover:bg-[#d14024] text-white rounded-full px-6 py-6 flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
                           <PlayCircle className="w-6 h-6" />
                           Watch Video
                        </Button>
                     </Link>
                  </div>
               )}
            </motion.div>

            {/* Content Column */}
            <div className="flex flex-col p-8 md:p-16 space-y-12 bg-[#18181a]">
              {/* Main Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                 <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
                  {selected?.title}
                 </h2>
                <div className="text-gray-300 md:text-lg text-base leading-relaxed space-y-4 font-light">
                  {(selected?.description ?? "").split("\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                 <Link href="/contact" className="inline-block mt-10">
                    <Button className="rounded-full px-10 py-7 text-lg bg-white text-black hover:bg-gray-200 transition-colors font-medium">
                       Book a Free Consultation
                    </Button>
                 </Link>
              </motion.div>

               {/* About / History Sections */}
               {(selected?.aboutText || selected?.historyText) && (
                  <motion.div 
                    className="space-y-10 pt-10 border-t border-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                     {selected?.aboutText && (
                        <div>
                           <h3 className="text-2xl font-bold mb-4 text-[#f25e40]">
                              {selected.aboutTitle || "Our Approach"}
                           </h3>
                           <div className="text-base text-gray-400 leading-relaxed space-y-4 font-light">
                              {selected.aboutText.split("\n").map((p, i) => <p key={i}>{p}</p>)}
                           </div>
                        </div>
                     )}
                     {selected?.historyText && (
                        <div>
                           <h3 className="text-2xl font-bold mb-4 text-[#f25e40]">
                              {selected.historyTitle || "Why Choose Us"}
                           </h3>
                           <div className="text-base text-gray-400 leading-relaxed space-y-4 font-light">
                              {selected.historyText.split("\n").map((p, i) => <p key={i}>{p}</p>)}
                           </div>
                        </div>
                     )}
                  </motion.div>
               )}
            </div>
          </div>

          {/* Types of Jobs / Features Section */}
          {selected?.features && selected.features.length > 0 && (
             <div className="mask-overlap relative z-20 px-8 md:px-16 py-20 border-t border-gray-800 bg-[#121213]">
                <div className="max-w-7xl mx-auto">
                   <h3 className="text-3xl font-bold mb-12 text-white border-l-4 border-[#f25e40] pl-6">
                      {selected.featuresTitle || "Services Offered"}
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {selected.features.map((feature, idx) => (
                         <div key={idx} className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors group border border-white/5 hover:border-white/20">
                            {feature.image && (
                               <div className="relative h-48 w-full overflow-hidden">
                                  <Image
                                     src={urlFor(feature.image)?.url() ?? ""}
                                     alt={feature.title}
                                     fill
                                     className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                               </div>
                            )}
                            <div className="p-8">
                               <h4 className="text-xl font-bold mb-4 text-white group-hover:text-[#f25e40] transition-colors">{feature.title}</h4>
                               <p className="text-sm text-gray-400 leading-relaxed font-light">{feature.description}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          )}

          {/* Process Timeline Section */}
          {selected?.process && selected.process.length > 0 && (
             <div className="mask-overlap relative z-10 px-8 md:px-16 py-20 pb-40 border-t border-gray-800 bg-[#0a0a0b]">
                <div className="max-w-7xl mx-auto">
                   <h3 className="text-3xl font-bold mb-16 text-white border-l-4 border-[#f25e40] pl-6">
                      {selected.processTitle || "Our Process"}
                   </h3>
                   <div className="relative border-l-2 border-gray-800 ml-4 md:ml-12 space-y-12">
                      {selected.process.map((step, idx) => (
                         <div key={idx} className="relative pl-8 md:pl-12 group">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-600 border-4 border-[#0a0a0b] group-hover:bg-[#f25e40] transition-colors" />
                            
                            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                               <span className="text-[#f25e40] font-bold text-sm uppercase tracking-widest mt-1 min-w-[80px]">
                                  {step.step || `Step ${idx + 1}`}
                               </span>
                               <div>
                                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#f25e40] transition-colors">
                                     {step.title}
                                  </h4>
                                  <p className="text-gray-400 leading-relaxed max-w-2xl font-light">
                                     {step.description}
                                  </p>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                   <div className="mt-16 text-center">
                      <Link href="/contact">
                         <Button className="rounded-full px-12 py-8 text-lg bg-[#f25e40] text-white hover:bg-[#d14024] transition-all shadow-lg hover:shadow-orange-900/20 transform hover:-translate-y-1">
                            Start Your Project Today
                         </Button>
                      </Link>
                   </div>
                </div>
             </div>
          )}
        </motion.div>
      </AnimatePresence>
    </React.Fragment>
  );
}
