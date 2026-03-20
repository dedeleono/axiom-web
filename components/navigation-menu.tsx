"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavigationMenuProps {
  scrolled?: boolean;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ scrolled = true }) => {
  const menuItems = [
    { label: "ABOUT", href: "/" },
    { label: "PROJECTS", href: "/projects" },
    { label: "SERVICES", href: "/services" },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-10">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`text-xs font-medium transition-colors font-geist-mono tracking-widest uppercase ${
              scrolled ? "text-black hover:text-brand-orange" : "text-white hover:text-white/70"
            }`}
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
              className={`text-xs w-auto py-2 px-4 rounded-none border transition-colors ${
                scrolled 
                  ? "border-black text-black hover:bg-black hover:text-white" 
                  : "border-white text-white hover:bg-white hover:text-black bg-transparent"
              }`}
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
