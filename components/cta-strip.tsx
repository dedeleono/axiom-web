import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTAStrip() {
  return (
    <div className="mx-auto max-w-[95%] px-8 py-16 font-geist md:px-16 md:py-20 lg:px-24 xl:max-w-screen-2xl">
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end md:gap-12">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            Get started
          </p>
          <h2 className="text-3xl font-light leading-[1.1] tracking-tight text-white md:text-4xl lg:text-5xl">
            Book a free consultation
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-white/90 md:text-lg">
            Let&apos;s talk about your project.
          </p>
        </div>

        <Button
          asChild
          className="group h-auto shrink-0 rounded-none border border-white bg-white px-10 py-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange shadow-none transition-colors hover:bg-transparent hover:text-white"
        >
          <Link href="/contact">
            Book a free consultation
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
