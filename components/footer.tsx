"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import PhoneDialog from "./phone-dialog";
import { PhoneDialogHandle } from "./phone-dialog";
import { useRef } from "react";

export default function Footer() {
  const dialogRef = useRef<PhoneDialogHandle>(null);

  return (
    <footer className="px-8 py-8 text-sm text-left relative text-black">
      <div className="border-t border-black/70 flex flex-col md:grid md:grid-cols-5 gap-8">
        <div className="space-y-2 md:col-span-1 flex flex-col pt-8">
          <Link href="/" className="font-light font-geist-mono hover:text-gray-500 transition-colors">
            WHO WE ARE
          </Link>
          <Link href="/projects" className="font-light font-geist-mono hover:text-gray-500 transition-colors">
            PROJECTS
          </Link>
          <Link href="/innovation" className="font-light font-geist-mono hover:text-gray-500 transition-colors">
            INNOVATION
          </Link>
          <Link href="/contact" className="font-light font-geist-mono hover:text-gray-500 transition-colors">
            CONTACT
          </Link>
        </div>
        <div className="md:col-span-4 grid grid-cols-4 gap-4 md:border-none border-t border-black/70">
          <div className="col-span-2 md:border-l border-black/70 pl-10 py-8">
            <h3 className="font-light mb-4 font-geist-mono text-sm md:text-base">
              EXPERIENCE CENTER
            </h3>
            <p className="mb-4 text-gray-700 font-geist font-light text-xs md:text-sm">
              Bay Area, California
              <br />
              Serving the greater San Francisco region
            </p>
            <div className="gap-2 flex flex-row">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-transparent border-black/70 hover:border-white text-black hover:bg-[#f25e40] hover:text-white transition-colors cursor-pointer"
                onClick={() => dialogRef.current?.open()}
              >
                CALL
              </Button>
              <a
                href="mailto:info@axiomrenovation.com"
                className="inline-flex items-center justify-center rounded-full bg-transparent border border-black/70 hover:border-white text-black px-3 h-8 text-xs font-medium hover:bg-[#f25e40] hover:text-white transition-colors"
              >
                EMAIL
              </a>
            </div>
          </div>
          <div className="col-span-2 border-l border-black/70 pl-10 py-8">
            <h3 className="font-light mb-4 font-geist-mono text-sm md:text-base">
              SOCIAL
            </h3>
            <div className="flex space-x-4 mb-4">
              <Link
                href="https://www.facebook.com/axiomrenovationinc?_rdr"
                className="hover:opacity-80 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-4 h-4 object-contain"
                />
              </Link>
              <Link
                href="https://www.instagram.com/axiomrenovation/"
                className="hover:opacity-80 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/insta.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-4 h-4 object-contain"
                />
              </Link>
              
            </div>
            <p className="font-semibold text-xs font-geist-mono text-black">
              INFO@AXIOMRENOVATION.COM
            </p>
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-black/70">
        <div className="flex flex-row justify-between items-center font-geist text-gray-700 font-light text-xs">
          <p>&copy; {new Date().getFullYear()} Axiom Renovation</p>
          <Link href="/privacy-policy" className="hover:text-white hover:underline transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
      <PhoneDialog ref={dialogRef} />
    </footer>
  );
}
