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
    title: "Custom Home Renovations",
    description:
      "Transform your existing space into the home of your dreams with our full-service renovation expertise.",
    icon: Home,
    href: "/contact",
  },
  {
    title: "Kitchen Remodeling",
    description:
      "Create a culinary masterpiece with custom cabinetry, premium countertops, and innovative layouts.",
    icon: ChefHat,
    href: "/contact",
  },
  {
    title: "Bathroom Remodeling",
    description:
      "Design your personal spa retreat with high-end fixtures, custom tile work, and modern amenities.",
    icon: Bath,
    href: "/contact",
  },
  {
    title: "Home Additions & ADU",
    description:
      "Expand your living space with seamless additions and functional Accessory Dwelling Units.",
    icon: Ruler,
    href: "/contact",
  },
  {
    title: "Interior Design",
    description:
      "Our design team works with you to curate finishes, furniture, and lighting that reflect your style.",
    icon: PaintBucket,
    href: "/contact",
  },
  {
    title: "Living Spaces",
    description:
      "Elevate your daily living with custom entertainment centers, libraries, and outdoor living areas.",
    icon: Sofa,
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
            className="text-black hover:bg-transparent hover:text-black p-0 mb-4"
          >
            <span className="text-sm font-geist-mono">OUR SERVICES</span>
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
          <h2 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
            Comprehensive Design & Build Solutions
          </h2>
        </div>
        <Link href="/contact" className="hidden md:block">
          <Button className="rounded-full px-6 py-6 text-base group">
            Start Your Project
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Link href={service.href} key={index} className="group">
            <Card className="h-full border-none shadow-none bg-[#f9f9f9] transition-colors duration-300 group-hover:bg-[#f0f0f0]">
              <CardHeader>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <service.icon className="w-6 h-6 text-black" strokeWidth={1.5} />
                </div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 leading-relaxed">
                  {service.description}
                </CardDescription>
                <div className="mt-6 flex items-center text-sm font-medium opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 md:hidden">
        <Link href="/contact" className="w-full block">
          <Button className="w-full rounded-full py-6 text-base">
            Start Your Project
          </Button>
        </Link>
      </div>
    </div>
  );
}
