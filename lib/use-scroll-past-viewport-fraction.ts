"use client";

import { useEffect, useState } from "react";

/** True when `scrollY` exceeds `fraction` × viewport height (default 30%). */
export function useScrollPastViewportFraction(fraction = 0.3): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPast(window.scrollY > window.innerHeight * fraction);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fraction]);

  return past;
}
