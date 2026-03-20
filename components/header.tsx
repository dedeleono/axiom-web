"use client";

import NavigationMenu from "./navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="flex relative z-50">
      <nav 
        className={`flex justify-between items-center w-full fixed top-0 left-0 right-0 p-6 transition-all duration-500 ease-in-out ${
          scrolled ? "bg-white py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <Link href="/" className="cursor-pointer flex items-center gap-3">
          <Image 
            src="/logo.webp" 
            alt="Axiom Renovation" 
            width={40} 
            height={40}
            className={`transition-all duration-300 ${!scrolled ? "brightness-0 invert" : ""}`}
          />
        </Link>
        <NavigationMenu scrolled={scrolled} />
      </nav>
    </header>
  );
}
