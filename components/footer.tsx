"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import PhoneDialog, { PhoneDialogHandle } from "./phone-dialog";
import { useRef } from "react";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react"; // Using Twitter icon for Tiktok fallback or generic

export default function Footer() {
  const dialogRef = useRef<PhoneDialogHandle>(null);

  const areas = [
    "Santa Clara County, CA", "Alameda County, CA", "Contra Costa County, CA",
    "San Francisco County, CA", "San Mateo County, CA", "Sonoma County, CA",
    "Solano County, CA", "Marin County, CA", "Napa County, CA",
    "San Jose, CA", "Sunnyvale, CA", "Mountain View, CA",
    "Milipitas, CA", "Palo Alto, CA", "Cupertino, CA",
    "Los Gatos, CA", "Los Altos, CA", "Saratoga, CA",
    "Oakland, CA", "Fremont, CA", "Berkeley, CA",
    "San Mateo, CA", "Daly City, CA", "Redwood City, CA",
    "Menlo Park, CA", "Atherton, CA", "Hillsborough, CA"
  ];

  return (
    <footer className="bg-white text-black pt-20 pb-10 border-t border-gray-200 font-geist">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand / Links */}
        <div className="space-y-6">
          <Link href="/" className="block">
            <h3 className="text-2xl font-bold font-geist-mono">Axiom Renovation</h3>
          </Link>
          <div className="flex flex-col space-y-2 text-sm text-gray-600">
             <Link href="/blogs" className="hover:text-black transition-colors">Newsroom & Article</Link>
             <Link href="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link>
          </div>
        </div>

        {/* Areas We Serve */}
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Areas We Serve</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-600">
            {areas.map((area, index) => (
              <span key={index} className="hover:text-black cursor-default">{area}</span>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
           <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Find us here!</h4>
           
           <div className="space-y-4 text-sm text-gray-600">
              <div>
                <p>4030 Moorpark Ave, San Jose, CA Suite 102</p>
                <p>408-702-2022</p>
                <p>office@axiom-renovation.com</p>
              </div>
              
              <div className="flex space-x-4">
                 <Link href="https://www.instagram.com/axiomrenovation/" target="_blank" className="hover:text-black"><Instagram className="w-5 h-5" /></Link>
                 <Link href="https://www.facebook.com/axiomrenovationinc" target="_blank" className="hover:text-black"><Facebook className="w-5 h-5" /></Link>
                 <Link href="https://www.youtube.com/channel/UC8W6hYToT7_TEv6P6xKMM4Q" target="_blank" className="hover:text-black"><Youtube className="w-5 h-5" /></Link>
                 {/* Tiktok icon placeholder */}
                 <Link href="https://www.tiktok.com/@axiomrenovation" target="_blank" className="hover:text-black"><span className="font-bold text-xs border border-current rounded px-1">Tk</span></Link>
              </div>
           </div>

           <div className="space-y-4 text-sm text-gray-600 border-t pt-4">
              <div>
                <p>17515 Ventura Blvd, Encino, CA 91316</p>
                <p>408-702-2022</p>
                <p>office@axiom-renovation.com</p>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
         <p>650-405-3956 All rights reserved @axiom renovation</p>
         <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-300 text-black hover:bg-black hover:text-white transition-colors"
                onClick={() => dialogRef.current?.open()}
            >
                Contact Us
            </Button>
            <Link href="https://api.whatsapp.com/send/?phone=14087022022" target="_blank" className="text-green-600 font-bold hover:underline">
               Whatsapp
            </Link>
         </div>
      </div>
      <PhoneDialog ref={dialogRef} />
    </footer>
  );
}
