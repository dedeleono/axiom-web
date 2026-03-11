"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.3;
      const shouldShow = window.scrollY > scrollThreshold;
      setShowScrollButton(shouldShow);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return showScrollButton ? (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 border border-white/70 rounded-none p-3 z-50 bg-zinc-900 text-white hover:bg-white hover:text-black hover:scale-105 transition-colors"
      size="icon"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  ) : null;
}
