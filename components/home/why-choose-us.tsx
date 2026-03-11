import React from "react";
import { Button } from "@/components/ui/button";
import { Palette, MessageSquare, Wallet, HeartHandshake } from "lucide-react";

const features = [
  {
    title: "Professional Designer",
    description:
      "Collaborate with our skilled designers who bring creativity and expertise to every project. Together, we'll create a space that reflects your style and meets your needs.",
    icon: Palette,
  },
  {
    title: "Free Consultations",
    description:
      "Take advantage of our complimentary consultation to discuss your ideas, goals, and vision. We'll help you kickstart your remodeling journey with expert guidance.",
    icon: MessageSquare,
  },
  {
    title: "Base on your budget",
    description:
      "We provide customized remodeling plans that fit within your budget without compromising quality. Get the best results tailored to your financial needs and preferences.",
    icon: Wallet,
  },
  {
    title: "Premium support",
    description:
      "Experience dedicated, hands-on support throughout the entire remodeling process. From planning to final completion, we ensure a seamless and satisfying experience.",
    icon: HeartHandshake,
  },
];

export default function WhyChooseUs() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20 font-geist">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3">
          <Button
            variant="ghost"
            className="text-black hover:bg-transparent hover:text-black p-0 mb-4 uppercase tracking-widest text-xs font-semibold"
          >
            Why Choose Us
          </Button>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Inspire your space through art and design.
          </h2>
        </div>

        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {features.map((feature, index) => (
            <div key={index} className="space-y-4">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
