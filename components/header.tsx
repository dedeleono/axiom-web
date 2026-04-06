"use client";

import NavigationMenu from "./navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  /** Light pages need dark link/logo at the top; bar stays transparent until the user scrolls. */
  const lightTop =
    pathname === "/blog" || (pathname != null && pathname.startsWith("/blog/"));
  const darkForeground = scrolled || lightTop;

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
            src="/logo.png" 
            alt="Axiom Renovation" 
            width={40} 
            height={40}
            className={`transition-all duration-300 ${!darkForeground ? "brightness-0 invert" : ""}`}
          />
        </Link>
        <NavigationMenu scrolled={darkForeground} />
      </nav>
    </header>
  );
}
