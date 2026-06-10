import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Thanks for reaching out to Axiom Renovation. We've received your message and will get back to you within one business day.",
  // Conversion page for Google Tag Manager — keep it out of search results.
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-5 py-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[min(760px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/[0.08] blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-2xl text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out">
            <div className="mx-auto mb-8 h-px w-12 bg-brand-orange" aria-hidden />
            <p className=" font-anton text-[13px] font-semibold uppercase tracking-widest text-white/60">
              Message received
            </p>
          </div>

          <h1 className="font-caveat mt-6 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-100 ease-out text-3xl font-semibold uppercase leading-[1.15] tracking-[0.04em] text-white sm:text-4xl md:text-5xl">
            Thank <span className="text-brand-orange">you</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-200 ease-out text-[15px] font-light leading-[1.7] text-white/75 md:text-base">
            Your request is on its way to our team. We&apos;ll review the
            details and get back to you within one business day.
          </p>

          <div className="mt-10 flex animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-300 ease-out flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 w-full items-center justify-center bg-white px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-950 transition-colors hover:bg-white/90 sm:w-auto"
            >
              Back to home
            </Link>
            <Link
              href="/projects"
              className="group inline-flex h-11 w-full items-center justify-center gap-2 border border-white/15 px-10 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:border-white/30 hover:text-brand-orange sm:w-auto"
            >
              Explore our work
              <ArrowUpRight
                className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
                aria-hidden
              />
            </Link>
          </div>

          <p className="mt-12 animate-in fade-in fill-mode-both duration-700 delay-500 ease-out text-xs font-light text-white/40">
            Need something right away? Call{" "}
            <a
              href="tel:+14087022022"
              className="text-white/70 transition-colors hover:text-brand-orange"
            >
              408-702-2022
            </a>
          </p>
        </div>
      </main>

      <section className="mask-overlap relative z-20 mt-auto bg-white pt-10 max-md:pt-8 max-md:shadow-[0_-16px_48px_-20px_rgba(0,0,0,0.14)]">
        <Footer />
      </section>
    </div>
  );
}
