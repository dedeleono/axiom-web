"use client";

import React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NavigationMenu: React.FC = () => {
  return (
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
        <nav className="flex flex-col space-y-8 w-full items-center justify-center flex-grow">
          {["WHO WE ARE", "PROJECTS", "INNOVATION", "CONTACT"].map(
            (item, index) => (
              <Link
                key={index}
                href={
                  index === 0
                    ? "/"
                    : `/${item.toLowerCase().replace(/\s+/g, "-")}`
                }
                className="md:text-2xl text-lg font-medium text-white hover:text-gray-300 text-center w-full font-geist-mono"
              >
                {item}
              </Link>
            )
          )}
          <div className="mt-8 pt-8 w-full flex justify-center">
            <Image
              src="/isotipo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="w-5"
            />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationMenu;
