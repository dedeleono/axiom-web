"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Award {
  title: string;
  subtitle: string;
  description1: string;
  description2?: string;
  refProject: {
    title: string;
    projectSlug: {
      current: string;
      _type: "slug";
    };
  };
  awardImage: SanityImage & { imgAlt?: string };
  logoImage: SanityImage & { imgAlt?: string };
}

export default function Awards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const router = useRouter();

  useEffect(() => {
    client
      .fetch<Award[]>(
        `*[_type == "award"]{
          title,
          subtitle,
          description1,
          description2,
          refProject->{
            title,
            projectSlug
          },
          awardImage{
            asset,
            imgAlt
          },
          logoImage{
            asset,
            imgAlt
          }
        }`
      )
      .then((data) => setAwards(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="bg-black text-white min-h-screen p-8 lg:p-16">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent hover:text-black p-0 mb-8"
        >
          <span className="text-sm font-geist-mono">AWARDS</span>
          <div className="w-2 h-2">
            <svg
              width="4"
              height="4"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-50 transform-gpu"
            >
              <path
                d="M6.26784 1.54193L6.22778 1.50188C6.22778 1.50188 6.25782 2.65332 5.01627 4.13517L0.871089 0L0 0.871089L4.14518 5.01627C2.66333 6.25782 1.5219 6.19775 1.51189 6.22778L1.55194 6.26784C6.38798 6.84856 8 8 8 8C8 8 6.84856 6.37797 6.26784 1.55194V1.54193Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </Button>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="-ml-0">
            {awards.map((award, index) => (
              <CarouselItem key={index} className="pl-0">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h1 className="text-2xl md:text-5xl font-bold mb-4 font-geist-mono">
                      {award.title || ""}
                    </h1>
                    <div className="flex items-center w-full justify-between">
                      <p className="text-lg lg:text-xl mb-4 font-geist">
                        {award.subtitle || ""}
                      </p>
                      <svg
                        width="24"
                        height="15"
                        viewBox="0 0 36 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => api?.scrollNext()}
                        className="cursor-pointer hover:opacity-75 transition-opacity md:hidden block scale-[1.2] transform-gpu"
                      >
                        <path
                          d="M16.3936 0.371141L16.213 0.367601C16.213 0.367601 18.9255 2.94735 19.5875 9.09625L0.924852 8.75288L1.00185 12.6796L19.6875 13.046C19.2663 19.1736 16.606 21.5578 16.6529 21.6489L16.8334 21.6525C28.8542 12.3008 35.0624 11.3848 35.0624 11.3848C35.0624 11.3848 28.7905 10.2016 16.4166 0.39415L16.3936 0.371141Z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-6 md:w-[85%] w-[60%] ml-auto md:ml-14">
                    <p className="text-xs md:text-sm md:pr-[35%] font-geist">
                      {award.description1 || ""}
                    </p>
                    <p className="text-xs md:text-sm md:pr-[35%] font-geist">
                      {award.description2 || ""}
                    </p>
                    <div className="flex items-center space-x-4 justify-between">
                      {award.refProject?.projectSlug?.current && (
                        <Button
                          variant="outline"
                          className="border-white bg-transparent text-white rounded-none"
                          onClick={() => {
                            router.push(
                              `/projects/${award.refProject.projectSlug.current}`
                            );
                          }}
                        >
                          MORE
                        </Button>
                      )}
                      <svg
                        width="25"
                        height="15"
                        viewBox="0 0 36 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => api?.scrollNext()}
                        className="cursor-pointer hover:opacity-75 transition-opacity hidden md:block transform-gpu"
                      >
                        <path
                          d="M16.3936 0.371141L16.213 0.367601C16.213 0.367601 18.9255 2.94735 19.5875 9.09625L0.924852 8.75288L1.00185 12.6796L19.6875 13.046C19.2663 19.1736 16.606 21.5578 16.6529 21.6489L16.8334 21.6525C28.8542 12.3008 35.0624 11.3848 35.0624 11.3848C35.0624 11.3848 28.7905 10.2016 16.4166 0.39415L16.3936 0.371141Z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    </div>
                    <div className="pt-4">
                      <div
                        className="relative w-full aspect-video overflow-hidden group cursor-pointer"
                        onClick={() => {
                          if (award.refProject?.projectSlug?.current) {
                            router.push(
                              `/projects/${award.refProject.projectSlug.current}`
                            );
                          }
                        }}
                      >
                        {award.awardImage?.asset && (
                          <>
                            <Image
                              src={
                                urlFor(award.awardImage)
                                  ?.width(1920)
                                  ?.height(1080)
                                  ?.fit("fill")
                                  ?.url() ?? ""
                              }
                              alt={
                                award.awardImage.imgAlt ||
                                `Award image ${index + 1}`
                              }
                              fill
                              sizes="(max-width: 1920px) 100vw, 1080px"
                              className="object-contain transition-opacity duration-300 group-hover:opacity-0"
                              priority={index === currentIndex}
                              quality={100}
                            />
                            {award.logoImage?.asset && (
                              <Image
                                src={
                                  urlFor(award.logoImage)
                                    ?.width(1920)
                                    ?.height(1080)
                                    ?.fit("fill")
                                    ?.url() ?? ""
                                }
                                alt={
                                  award.logoImage.imgAlt ||
                                  `Award logo ${index + 1}`
                                }
                                fill
                                sizes="(max-width: 1920px) 100vw, 1080px"
                                className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                priority={index === currentIndex}
                                quality={100}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
