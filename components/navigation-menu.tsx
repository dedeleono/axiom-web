"use client";

import React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NavigationMenu: React.FC = () => {
  const menuItems = [
    { label: "WHO WE ARE", href: "/" },
    { label: "PROJECTS", href: "/projects" },
    { label: "SERVICES", href: "/bathroom-remodeling" },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-sm font-medium text-black hover:text-gray-600 transition-colors font-geist-mono tracking-wide"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Trigger */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="text-xs w-auto py-2 px-3 rounded-full border-[#1e1e1e]"
            >
              MENU
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-[#1e1e1e] flex flex-col justify-between border-none">
            <nav className="flex flex-col space-y-8 w-full items-center justify-center grow">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-2xl font-medium text-white hover:text-gray-300 text-center w-full font-geist-mono"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-8 pt-8 w-full flex justify-center">
                <Image
                  src="/isotipo.svg"
                  alt="Axiom Renovation logo"
                  width={100}
                  height={100}
                  className="w-5"
                />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default NavigationMenu;
