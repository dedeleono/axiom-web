"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Bath, ChefHat, Home, PaintBucket, Ruler, Sofa } from "lucide-react";
import Link from "next/link";
import React from "react";

const services = [
  {
    title: "Bathroom Remodeling",
    description:
      "Transform your bathroom into a luxurious oasis with our professional bathroom remodeling services.",
    icon: Bath,
    href: "/contact",
  },
  {
    title: "Kitchen Remodeling",
    description:
      "Transform your kitchen into a functional and stylish space with our professional kitchen remodeling services.",
    icon: ChefHat,
    href: "/contact",
  },
  {
    title: "Home Addition & ADU",
    description:
      "Expand your living space and increase the value of your home with our home addition and ADU services.",
    icon: Home, // Changed from Ruler to Home or similar if needed, keeping Home as general
    href: "/contact",
  },
];

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20 font-geist">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <Button
            variant="ghost"
            className="text-black hover:bg-transparent hover:text-black p-0 mb-4 uppercase tracking-widest text-xs font-semibold"
          >
            Services
          </Button>
          <h2 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
            We are the experts in good taste!
          </h2>
        </div>
        <Link href="/contact" className="hidden md:block">
          <Button className="rounded-full px-6 py-6 text-base group bg-black text-white hover:bg-gray-800 transition-all">
            Start Your Project
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Link href={service.href} key={index} className="group block h-full">
            <Card className="h-full border-none shadow-none bg-[#f9f9f9] transition-colors duration-300 group-hover:bg-[#f0f0f0] flex flex-col justify-between p-8">
              <div>
                <CardHeader className="p-0 mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm">
                    <service.icon className="w-8 h-8 text-black" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription className="text-lg text-gray-600 leading-relaxed font-light">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </div>
              <div className="mt-8 flex items-center text-sm font-medium text-black group-hover:underline decoration-1 underline-offset-4 transition-all">
                Learn more <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 md:hidden">
        <Link href="/contact" className="w-full block">
          <Button className="w-full rounded-full py-6 text-base bg-black text-white hover:bg-gray-800 transition-all">
            Start Your Project
          </Button>
        </Link>
      </div>
    </div>
  );
}
