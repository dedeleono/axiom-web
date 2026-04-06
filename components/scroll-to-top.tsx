"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useScrollPastViewportFraction } from "@/lib/use-scroll-past-viewport-fraction";

export default function ScrollToTop() {
  const pathname = usePathname();
  const showScrollButton = useScrollPastViewportFraction(0.3);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /** Home desktop: scroll-up sits in the hero floating dock next to the CTA */
  const hideOnHomeDesktop = pathname === "/" && isDesktop;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showScrollButton || hideOnHomeDesktop) {
    return null;
  }

  return (
    <Button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 rounded-none border border-white/70 bg-zinc-900 p-3 text-white transition-colors hover:scale-105 hover:bg-white hover:text-black"
      size="icon"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
