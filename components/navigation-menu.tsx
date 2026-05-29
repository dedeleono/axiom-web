"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { serviceDetailHref } from "@/lib/service-path";
import { cn } from "@/lib/utils";

interface NavigationMenuProps {
  scrolled?: boolean;
}

const SERVICE_DROPDOWN = [
  { label: "Bathroom Remodel", slug: "bathroom-remodeling" as const },
  { label: "Kitchen Remodel", slug: "kitchen-remodeling" as const },
  { label: "Home Addition", slug: "home-addition" as const },
  { label: "New Construction", slug: "new-construction" as const },
  { label: "Outdoor Remodeling", slug: "outdoor-remodeling" as const },
] as const;

const NavigationMenu: React.FC<NavigationMenuProps> = ({ scrolled = true }) => {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesWrapRef = useRef<HTMLDivElement>(null);

  const linkTone = (active: boolean) =>
    cn(
      "text-xs font-medium transition-colors font-geist-mono tracking-widest uppercase",
      scrolled
        ? active
          ? "text-brand-orange"
          : "text-black hover:text-brand-orange"
        : active
          ? "text-brand-orange"
          : "text-white hover:text-white/70"
    );

  const isServiceSection =
    pathname === "/services" || pathname?.startsWith("/services/");

  useEffect(() => {
    if (!servicesOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [servicesOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      const el = servicesWrapRef.current;
      if (el && !el.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

  const simpleItems = [
    { label: "HOME", href: "/" },
    { label: "PORTFOLIO", href: "/projects" },
    { label: "FAQs", href: "/faqs" },
    { label: "CONTACT", href: "/contact" },
    { label: "BLOG", href: "/blog" },
  ] as const;

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-10">
        <Link href="/" className={linkTone(pathname === "/")}>
          HOME
        </Link>
        <Link href="/projects" className={linkTone(pathname === "/projects" || pathname?.startsWith("/projects/"))}>
          PORTFOLIO
        </Link>

        <div
          ref={servicesWrapRef}
          className="relative"
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <button
            type="button"
            className={cn(
              "flex items-center gap-1 text-xs font-medium transition-colors font-geist-mono tracking-widest uppercase outline-none",
              linkTone(isServiceSection)
            )}
            aria-expanded={servicesOpen}
            aria-haspopup="true"
            onClick={() => setServicesOpen((o) => !o)}
          >
            SERVICES
            <ChevronDown
              className={cn("h-3.5 w-3.5 shrink-0 transition-transform", servicesOpen && "rotate-180")}
              aria-hidden
            />
          </button>

          <div
            className={cn(
              "absolute left-1/2 top-full z-50 min-w-[220px] -translate-x-1/2 pt-2 transition-all duration-200",
              servicesOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible pointer-events-none -translate-y-1 opacity-0"
            )}
          >
            <ul
              aria-label="Services"
              className={cn(
                "border py-2 shadow-lg",
                scrolled ? "border-black/10 bg-white text-black" : "border-white/20 bg-[#1e1e1e] text-white"
              )}
            >
              {SERVICE_DROPDOWN.map((item) => {
                const href = serviceDetailHref(item.slug);
                const active = pathname === href;
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      tabIndex={servicesOpen ? 0 : -1}
                      className={cn(
                        "block px-5 py-2.5 text-[11px] font-medium tracking-widest transition-colors font-geist-mono uppercase",
                        scrolled
                          ? active
                            ? "bg-black/5 text-brand-orange"
                            : "hover:bg-black/5 hover:text-brand-orange"
                          : active
                            ? "bg-white/10 text-brand-orange"
                            : "hover:bg-white/10 hover:text-brand-orange"
                      )}
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {simpleItems.slice(2).map((item) => (
          <Link key={item.href} href={item.href} className={linkTone(pathname === item.href)}>
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
          <SheetContent className="flex h-[100dvh] max-h-[100dvh] flex-col border-none bg-[#1e1e1e] p-6">
            <nav className="flex min-h-0 flex-1 flex-col items-center overflow-hidden pt-14">
              {/* Full-height sheet + justify-evenly = airy spacing; scroll if SERVICES is expanded */}
              <div className="flex min-h-0 w-full max-w-sm flex-1 flex-col justify-evenly overflow-y-auto overscroll-contain">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="w-full py-1 text-center text-xl font-medium leading-tight text-white font-geist-mono hover:text-gray-300 sm:text-4xl"
                  >
                    HOME
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/projects"
                    className="w-full py-1 text-center text-xl font-medium leading-tight text-white font-geist-mono hover:text-gray-300 sm:text-4xl"
                  >
                    PORTFOLIO
                  </Link>
                </SheetClose>

                <div className="w-full py-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 text-xl font-medium leading-tight text-white font-geist-mono hover:text-gray-300 sm:text-4xl"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen((o) => !o)}
                  >
                    SERVICES
                    <ChevronDown
                      className={cn("h-7 w-7 shrink-0 transition-transform sm:h-8 sm:w-8", mobileServicesOpen && "rotate-180")}
                    />
                  </button>
                  <ul
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      mobileServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <li className="min-h-0 overflow-hidden ">
                      <ul className="mt-5 flex flex-col gap-5 border-t border-white/10 py-5">
                        {SERVICE_DROPDOWN.map((item) => (
                          <li key={item.slug}>
                            <SheetClose asChild>
                              <Link
                                href={serviceDetailHref(item.slug)}
                                className="block w-full py-1 text-center text-base font-medium leading-snug tracking-wide text-white/90 font-geist-mono hover:text-white sm:text-sm"
                              >
                                {item.label}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>

                <SheetClose asChild>
                  <Link
                    href="/faqs"
                    className="w-full py-1 text-center text-xl font-medium leading-tight text-white font-geist-mono hover:text-gray-300 sm:text-4xl"
                  >
                    FAQs
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="w-full py-1 text-center text-xl font-medium leading-tight text-white font-geist-mono hover:text-gray-300 sm:text-4xl"
                  >
                    CONTACT
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/blog"
                    className="w-full py-1 text-center text-xl font-medium leading-tight text-white font-geist-mono hover:text-gray-300 sm:text-4xl"
                  >
                    BLOG
                  </Link>
                </SheetClose>
              </div>

              <div className="mt-auto flex w-full shrink-0 justify-center border-t border-white/10 pt-8 pb-2">
                <Image src="/isotipo.svg" alt="Axiom Renovation logo" width={100} height={100} className="w-6" />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default NavigationMenu;
