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

const GOOGLE_REVIEW_COUNT = 14;

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={24} height={24} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

const testimonials = [
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
  {
    quote:
      "The craftsmanship of Axiom Renovation is truly exceptional. Every corner of our newly remodeled home speaks to the quality of their work and the care they put into every detail.",
    author: "Bradon Blake",
    role: "July 2, 2024",
    rating: 5,
  },
  {
    quote:
      "I was impressed by how they worked within our budget to deliver a high-quality renovation. Ben offered various options and helped us prioritize what mattered most without compromising on results.",
    author: "Travis machac",
    role: "June 27, 2024",
    rating: 5,
  },
  {
    quote:
      "The attention to detail that the team showed during our kitchen overhaul was phenomenal. Every little aspect was considered, and the finished space exceeded what we had imagined.",
    author: "Natalie Buxton",
    role: "June 21, 2024",
    rating: 5,
  },
  {
    quote:
      "The expertise they brought to our project was top-notch. Their team provided valuable advice on design choices and materials, and communication was clear from start to finish.",
    author: "Reuben Johnson",
    role: "June 20, 2024",
    rating: 5,
  },
  {
    quote:
      "Working with them was like a dream come true. They understood our vision for the kitchen from the get-go and delivered a space that feels both beautiful and functional for our family.",
    author: "jake ruldolp",
    role: "June 7, 2024",
    rating: 5,
  },
  {
    quote:
      "It was a relief to work with such a dependable and trustworthy team. Amit kept every promise, from timelines to budget and quality. Their integrity and professionalism shone through every stage of our project.",
    author: "My Account",
    role: "July 10, 2024",
    rating: 5,
  },
] as const;

export default function Testimonials() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-24 pb-28 font-geist md:py-32 md:pb-36">
      <Button
        variant="ghost"
        className="mb-16 p-0 text-xs font-semibold uppercase tracking-widest text-brand-black hover:bg-transparent hover:text-brand-black"
      >
        What they say about us.
      </Button>

      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <aside className="lg:col-span-4">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-black">Excellent</p>
          <div className="my-3 flex space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-6 w-6 fill-brand-orange text-brand-orange" aria-hidden />
            ))}
          </div>
          <p className="mb-6 text-base text-brand-dark-gray">
            Based on{" "}
            <span className="font-semibold text-brand-black">{GOOGLE_REVIEW_COUNT} reviews</span> on
            Google
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Axiom+Renovation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brand-dark-gray hover:text-brand-black"
          >
            <GoogleMark className="h-7 w-7 shrink-0" />
            <span>View on Google</span>
          </a>
        </aside>

        <div className="relative lg:col-span-8">
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
                  <div className="flex h-full min-h-[300px] flex-col justify-between rounded-none bg-brand-light-gray p-8">
                    <div>
                      <div className="mb-6 flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-brand-orange text-brand-orange"
                          />
                        ))}
                      </div>
                      <p className="mb-8 text-lg font-light leading-relaxed">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-brand-black">{testimonial.author}</p>
                      <p className="text-sm text-brand-dark-gray">{testimonial.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex justify-end gap-2 lg:absolute lg:-top-16 lg:right-0 lg:mt-0">
              <CarouselPrevious className="relative left-0 top-0 h-10 w-10 translate-y-0 border-brand-black text-brand-black hover:bg-brand-black hover:text-white" />
              <CarouselNext className="relative right-0 top-0 h-10 w-10 translate-y-0 border-brand-black text-brand-black hover:bg-brand-black hover:text-white" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
