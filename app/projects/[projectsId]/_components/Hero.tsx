"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { ProjectData } from "@/lib/interfaces";

interface HeroProps {
  project: ProjectData;
}

export default function Hero({ project }: HeroProps) {
  return (
    <section className="w-full flex justify-center items-center overflow-visible">
      {project.image && project.image.asset && (
        <Image
          src={urlFor(project.image)?.url() ?? ""}
          alt={`${project.title} hero image`}
          width={1200}
          height={600}
          className="w-full md:h-[500px] h-[700px] rounded-md object-cover md:object-center object-[30%_center]"
          priority
        />
      )}
    </section>
  );
}
