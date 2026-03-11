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
      "It was a relief to work with such a dependable and trustworthy team. Amit kept every promise, from timelines to budget and quality. Their integrity and professionalism shone through every stage of our project.",
    author: "My Account",
    role: "July 10, 2024",
    rating: 5,
  },
  {
    quote:
      "What set them apart was their excellent communication. Ben kept us updated throughout the process, answering all our questions promptly and clearly. Their customer service is just as outstanding as their craftsmanship.",
    author: "Freddy Monhorn",
    role: "July 2, 2024",
    rating: 5,
  },
  {
    quote:
      "Choosing them for our bathroom remodel was the best decision we could have made. The process was incredibly smooth and stress-free, thanks to their organized and efficient team. The result? A stunning bathroom that feels like a spa retreat!",
    author: "Jorge Barragan Jr",
    role: "July 2, 2024",
    rating: 5,
  },
  {
    quote:
      "They exceeded my expectations with how quickly they completed our bathroom renovation. Amit and the team managed to do it with minimal disruption to our daily lives, which was a huge plus. The speed did not compromise the quality; everything was done perfectly.",
    author: "luis lee",
    role: "July 2, 2024",
    rating: 5,
  },
  {
    quote:
      "They brought innovative designs that transformed our space into something unique and highly functional. Their creative solutions made the most of our available space, enhancing both its utility and beauty.",
    author: "josiah foncannon",
    role: "July 2, 2024",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20 font-geist">
      <Button
        variant="ghost"
        className="text-black hover:bg-transparent hover:text-black p-0 mb-12 uppercase tracking-widest text-xs font-semibold"
      >
        What they say about us.
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
