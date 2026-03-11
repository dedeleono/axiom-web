import React from "react";
import { Button } from "@/components/ui/button";

export default function Philosophy() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20 font-geist">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3">
          <Button
            variant="ghost"
            className="text-black hover:bg-transparent hover:text-black p-0 mb-4 uppercase tracking-widest text-xs font-semibold"
          >
            Philosophy
          </Button>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            A beautiful room means a beautiful mind.
          </h2>
        </div>

        <div className="md:w-2/3 space-y-6 text-gray-600 font-light leading-relaxed text-lg">
          <p>
            A beautifully designed room has the power to influence your state of mind. The colors, textures, and layout of your space can inspire calm, creativity, and focus. When your environment reflects your personality and preferences, it becomes more than just a room—it transforms into a sanctuary that nurtures your well-being and promotes clarity of thought.
          </p>
          <p>
            We craft spaces that bring harmony and elegance to your life. Each detail, from the lighting to the furnishings, is thoughtfully selected to create a room that resonates with your inner peace and joy. Because we believe a beautiful room doesn’t just enhance your surroundings—it enhances your mindset, helping you live and think your best every day.
          </p>
        </div>
      </div>
    </div>
  );
}
