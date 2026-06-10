"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Smoothly animates its own height to match the content, so swapping
 * children of different sizes (form steps, success panels) doesn't make
 * the surrounding card jump.
 */
export default function AnimatedHeight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setHeight(el.offsetHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={false}
      animate={{ height }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div ref={innerRef}>{children}</div>
    </motion.div>
  );
}
