import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InspirationCTA() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20 font-geist text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Get inspired by the fresh approach to crafting a home that’s uniquely yours
        </h2>
        <p className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
          Our innovative approach combines modern design with timeless craftsmanship to create spaces that are as unique as you are. From concept to completion, we bring your vision to life with attention to detail and a commitment to quality that exceeds expectations.
        </p>
        <Link href="/contact">
          <Button className="rounded-none bg-black px-8 py-6 text-lg text-white transition-all hover:scale-105 hover:bg-gray-800">
            Book A Free Consultation
          </Button>
        </Link>
      </div>
    </div>
  );
}
