"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

type PhilosophyData = {
  title: string;
  description: string;
  isValue: boolean;
};

const AnimatedLine: React.FC<{
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
  origin: "left" | "right";
}> = ({ scrollYProgress, start, end, origin }) => {
  const scaleX = useTransform(scrollYProgress, [start, end], [0, 1]);
  return (
    <motion.hr
      className="my-10 border-black"
      style={{
        scaleX,
        transformOrigin: origin,
      }}
    />
  );
};

export default function Philosophy() {
  const [philosophyData, setPhilosophyData] = useState<PhilosophyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch<PhilosophyData[]>(
          `*[_type == "philosophy"] | order(order asc){title, description, isValue}`
        );
        setPhilosophyData(data ?? []);
      } catch (error) {
        console.error("Philosophy fetch error:", error);
        setPhilosophyData([]);
      }
    };
    fetchData();
  }, []);

  const philosophyParsed: {
    mission: PhilosophyData | null;
    vision: PhilosophyData | null;
    values: PhilosophyData[];
  } = {
    mission: null,
    vision: null,
    values: [],
  };

  philosophyData.forEach((item) => {
    const titleLower = item.title?.toLowerCase() ?? "";
    if (titleLower === "mission") {
      philosophyParsed.mission = item;
    } else if (titleLower === "vision") {
      philosophyParsed.vision = item;
    } else {
      // All other documents (isValue: true OR custom titles like "Premium support") go to values
      philosophyParsed.values.push(item);
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineAnimations = [
    { start: 0.1, end: 0.23, origin: "left" as const },
    { start: 0.23, end: 0.35, origin: "left" as const },
    { start: 0.35, end: 0.5, origin: "left" as const },
  ];

  return (
    <React.Fragment>
      <div
        className="relative min-h-screen z-20 bg-white"
        ref={containerRef}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/isotipo.svg"
            alt="Decorative"
            width={400}
            height={400}
            className="object-cover object-center lg:object-left-center lg:ml-[-100px] lg:mt-10 mt-20"
            priority
          />
        </div>
        <div className="relative z-20 mx-4 lg:mx-8">
          <Button
            variant="ghost"
            className="text-black hover:bg-transparent hover:text-black p-0"
          >
            <span className="text-sm font-geist-mono">OUR PHILOSOPHY</span>
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
                  fill="#000000"
                />
              </svg>
            </div>
          </Button>
          <div className="space-y-12 mt-10">
            {philosophyParsed.mission && (
              <React.Fragment>
                <AnimatedLine
                  scrollYProgress={scrollYProgress}
                  start={lineAnimations[0].start}
                  end={lineAnimations[0].end}
                  origin={lineAnimations[0].origin}
                />
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                  <h3 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-0 lg:w-1/3 font-geist-mono">
                    {philosophyParsed.mission.title.toUpperCase()}
                  </h3>
                  <div className="lg:w-2/3">
                    <p className="text-sm leading-relaxed max-w-sm ml-20 font-geist">
                      {philosophyParsed.mission.description}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            )}

            {philosophyParsed.vision && (
              <React.Fragment>
                <AnimatedLine
                  scrollYProgress={scrollYProgress}
                  start={lineAnimations[1].start}
                  end={lineAnimations[1].end}
                  origin={lineAnimations[1].origin}
                />
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                  <h3 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-0 lg:w-1/3 font-geist-mono">
                    {philosophyParsed.vision.title.toUpperCase()}
                  </h3>
                  <div className="lg:w-2/3">
                    <p className="text-sm leading-relaxed max-w-sm ml-20 font-geist">
                      {philosophyParsed.vision.description}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            )}

            {philosophyParsed.values.length > 0 && (
              <React.Fragment>
                <AnimatedLine
                  scrollYProgress={scrollYProgress}
                  start={lineAnimations[2].start}
                  end={lineAnimations[2].end}
                  origin={lineAnimations[2].origin}
                />
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                  <h3 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-0 lg:w-1/3 font-geist-mono">
                    OUR VALUES
                  </h3>
                  <div className="lg:w-2/3">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full px-1 pl-20 font-geist"
                    >
                      {philosophyParsed.values.map((value, valueIndex) => (
                        <AccordionItem
                          value={`item-${valueIndex}`}
                          key={valueIndex}
                        >
                          <AccordionTrigger className="text-sm font-normal">
                            {value.title.toUpperCase()}
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col items-end">
                            <p className="w-full">{value.description}</p>
                            <div className="pr-8">
                              <Link href="/innovation">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-xs w-auto px-2 rounded-full border-[#1e1e1e]"
                                >
                                  Read More
                                </Button>
                              </Link>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
