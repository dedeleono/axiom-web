"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import PhoneDialog, { PhoneDialogHandle } from "./phone-dialog";
import { useRef } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const dialogRef = useRef<PhoneDialogHandle>(null);

  const sitemapLinks = [
    { href: "/", label: "Home" },
    { href: "/services/bathroom-remodeling", label: "Bathroom remodeling" },
    { href: "/services/kitchen-remodeling", label: "Kitchen remodeling" },
    { href: "/services/home-addition", label: "Home addition & ADU" },
    { href: "/projects", label: "Portfolio" },
    { href: "/faqs", label: "FAQs" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy policy" },
  ] as const;

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
    <footer className="border-t border-brand-light-gray bg-white pb-8 pt-12 font-geist text-brand-black md:pb-10 md:pt-20">
      <div className="mx-auto mb-10 grid max-w-7xl grid-cols-1 gap-8 px-5 md:mb-16 md:grid-cols-2 md:gap-12 md:px-8 xl:grid-cols-5">
        {/* Brand / Links */}
        <div className="space-y-6 xl:col-span-1">
          <Link href="/" className="block">
            <h3 className="text-2xl font-bold font-geist-mono">Axiom Renovation</h3>
          </Link>
          <div className="flex flex-col space-y-2 text-sm text-brand-dark-gray">
            <Link href="/blog" className="transition-colors hover:text-brand-black">
              Newsroom &amp; Article
            </Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-brand-black">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Sitemap */}
        <div className="xl:col-span-1">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-black md:mb-6">
            Sitemap
          </h4>
          <nav
            className="flex flex-col space-y-1 text-sm text-brand-dark-gray md:space-y-2"
            aria-label="Sitemap"
          >
            {sitemapLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="transition-colors hover:text-brand-black">
                {label}
              </Link>
            ))}
            <Link
              href="/sitemap.xml"
              className="pt-2 text-xs text-brand-dark-gray/90 transition-colors hover:text-brand-black"
            >
              XML sitemap
            </Link>
          </nav>
        </div>

        {/* Areas We Serve */}
        <div className="md:col-span-2 xl:col-span-2">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-black md:mb-6">
            Areas We Serve
          </h4>
          <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-[11px] leading-snug text-brand-dark-gray sm:text-xs md:grid-cols-3 md:gap-x-4 md:gap-y-2 md:text-sm">
            {areas.map((area, index) => (
              <span key={index} className="hover:text-brand-black cursor-default">{area}</span>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-8 md:col-span-2 xl:col-span-1">
           <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-brand-black">Find us here!</h4>
           
           <div className="space-y-4 text-sm text-brand-dark-gray">
              <div>
                <p>4030 Moorpark Ave, San Jose, CA Suite 102</p>
                <p>408-702-2022</p>
                <p>office@axiom-renovation.com</p>
              </div>
              
              <div className="flex space-x-4">
                 <Link href="https://www.instagram.com/axiomrenovation/" target="_blank" className="hover:text-brand-orange text-brand-black"><Instagram className="w-5 h-5" /></Link>
                 <Link href="https://www.facebook.com/axiomrenovationinc" target="_blank" className="hover:text-brand-orange text-brand-black"><Facebook className="w-5 h-5" /></Link>
                 <Link href="https://www.youtube.com/channel/UC8W6hYToT7_TEv6P6xKMM4Q" target="_blank" className="hover:text-brand-orange text-brand-black"><Youtube className="w-5 h-5" /></Link>
                 {/* Tiktok icon placeholder */}
                 <Link href="https://www.tiktok.com/@axiomrenovation" target="_blank" className="text-brand-black hover:text-brand-orange"><span className="border border-current px-1 text-xs font-bold rounded-none">Tk</span></Link>
              </div>
           </div>

           <div className="space-y-4 text-sm text-brand-dark-gray border-t border-brand-light-gray pt-4">
              <div>
                <p>17515 Ventura Blvd, Encino, CA 91316</p>
                <p>408-702-2022</p>
                <p>office@axiom-renovation.com</p>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-brand-light-gray flex flex-col md:flex-row justify-between items-center text-xs text-brand-dark-gray">
         <p>650-405-3956 All rights reserved @axiom renovation</p>
         <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button
                variant="outline"
                size="sm"
                className="border-brand-light-gray text-brand-black transition-colors hover:bg-brand-black hover:text-white rounded-none"
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
