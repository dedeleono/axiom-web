"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import React from "react";

// Placeholder data - in a real app, this would likely come from Sanity
const testimonials = [
  {
    quote:
      "Axiom transformed our outdated kitchen into a modern masterpiece. The attention to detail and craftsmanship were exceptional. They truly turned our ideas into a timeless space.",
    author: "Sarah Jenkins",
    role: "Homeowner, San Francisco",
    rating: 5,
  },
  {
    quote:
      "Professional, creative, and reliable. The team at Axiom guided us through every step of our home addition. We couldn't be happier with the result.",
    author: "Michael & Jessica Chen",
    role: "Homeowners, Palo Alto",
    rating: 5,
  },
  {
    quote:
      "Their philosophy of 'innovative, enduring cultural experiences' really shines through in their work. It's not just a renovation; it's a lifestyle upgrade.",
    author: "David Thompson",
    role: "Real Estate Developer",
    rating: 5,
  },
  {
    quote:
      "We were impressed by their transparency and project management. No surprises, just quality work delivered on time.",
    author: "Emily Rodriguez",
    role: "Homeowner, Marin County",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20 font-geist">
      <Button
        variant="ghost"
        className="text-black hover:bg-transparent hover:text-black p-0 mb-12"
      >
        <span className="text-sm font-geist-mono">TESTIMONIALS</span>
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

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full p-8 bg-[#f9f9f9] rounded-2xl flex flex-col justify-between min-h-[300px]">
                  <div>
                    <div className="flex space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-black text-black"
                        />
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed mb-8 font-light">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute -top-16 right-0 flex gap-2">
            <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-10 w-10 border-black hover:bg-black hover:text-white" />
            <CarouselNext className="relative right-0 top-0 translate-y-0 h-10 w-10 border-black hover:bg-black hover:text-white" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
