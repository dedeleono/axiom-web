"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ContactForm, {
  type ContactFormFlow,
} from "@/components/contact-form";

export default function Contact() {
  const [flow, setFlow] = useState<ContactFormFlow | null>(null);

  return (
    <div
      className="
      relative w-full bg-black
      max-md:min-h-[100svh]
      md:h-screen md:max-h-screen md:overflow-hidden
    "
    >
      <motion.div
        className="
        relative z-0 flex min-h-[100svh] flex-col
        md:absolute md:inset-0 md:top-0 md:min-h-0 md:flex-none
      "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Full-bleed behind content + fixed header; content uses pt-* to clear nav */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <motion.div
            className="absolute inset-0 min-h-[280px]"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1.1 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Image
              src="/portfolio/santa-clara-adu.jpg"
              alt="Santa Clara ADU project - contact Axiom Renovation for Bay Area home remodeling"
              className="h-full min-h-[320px] w-full object-cover md:min-h-0"
              width={1920}
              height={1080}
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/42 to-black/38" />
        </div>

        <div
          className="
          relative z-10 mx-auto flex w-full max-w-full flex-1 flex-col gap-10
          px-5 pb-14 max-md:pt-[4.5rem] max-md:pb-[max(3rem,env(safe-area-inset-bottom))]
          md:mt-0 md:h-full md:min-h-0 md:flex-row md:items-center md:justify-between md:gap-10 md:px-16 md:py-12 md:pb-12 lg:gap-16
        "
        >
          <motion.div
            className="text-white w-full shrink-0 custom-range-style flex flex-col justify-center max-md:max-w-full max-md:font-geist md:w-[42%] lg:w-1/2 md:max-w-xl md:font-geist-mono"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h1 className="text-left text-[1.35rem] font-semibold uppercase leading-[1.2] tracking-[0.04em] sm:text-[1.5rem] md:ml-0 md:text-[2.2rem] lg:text-[2.75rem] md:leading-[1.12] md:tracking-tight">
              <span className="block max-md:tracking-[0.06em] md:ml-0.5">
                Crafting
              </span>
              <span className="mt-0.5 block text-white/90 md:mr-6 md:text-right">
                Tomorrow&apos;s
              </span>
              <span className="mt-1 block max-md:leading-tight max-md:ml-0 max-md:whitespace-normal ml-3 sm:ml-4 md:ml-0 lg:ml-3 md:text-nowrap">
                <span className="text-white">Spaces </span>
                <span className="text-brand-orange">Together</span>
              </span>
            </h1>
            <p className="mt-6 max-w-[34ch] text-[15px] font-light leading-[1.7] text-white/80 font-geist md:mt-10 md:max-w-md md:text-base md:text-white/85">
              Choose how you&apos;d like to reach us—walk through our guided
              consultation, or leave your details in a short form. We&apos;ll
              respond shortly.
            </p>
          </motion.div>

          <motion.div
            className="flex min-h-0 w-full flex-col md:flex-1 md:max-w-3xl lg:max-w-4xl"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="
                rounded-none border border-white/10
                max-md:rounded-2xl max-md:border-white/[0.12]
                bg-gradient-to-b from-white/6 via-black/45 to-black/50
                backdrop-blur-2xl
                shadow-[0_32px_90px_-28px_rgba(0,0,0,0.72),0_0_0_1px_rgba(242,86,35,0.07),inset_0_1px_0_0_rgba(255,255,255,0.05)]
                max-md:shadow-[0_24px_64px_-24px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                p-5 sm:p-8 md:p-10
                max-md:max-h-none
                md:max-h-[min(78vh,720px)] md:overflow-y-auto md:overflow-x-hidden
                [scrollbar-width:thin]
                [scrollbar-color:rgba(255,255,255,0.2)_transparent]
              "
            >
              {flow === null ? (
                <div className="w-full">
                  <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 md:mb-8">
                    Get in touch
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
                    <button
                      type="button"
                      onClick={() => setFlow("consultation")}
                      className="group relative flex min-h-[168px] flex-col justify-between overflow-hidden border border-brand-orange/28 bg-gradient-to-br from-brand-orange/12 via-brand-orange/5 to-transparent p-5 text-left transition-[border-color,background-color,box-shadow] duration-300 hover:border-brand-orange/42 hover:from-brand-orange/16 hover:shadow-[0_0_24px_-10px_rgba(242,86,35,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 sm:min-h-[200px] sm:p-6 md:min-h-[220px] md:p-8"
                    >
                      <div
                        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-brand-orange"
                        aria-hidden
                      />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange">
                          Interactive
                        </p>
                        <h2 className="mt-3 text-lg font-light leading-snug tracking-tight text-white font-geist sm:mt-4 sm:text-xl md:text-2xl">
                          Use our interactive system
                        </h2>
                        <p className="mt-2 text-sm font-light leading-relaxed text-white/65 md:mt-3">
                          Guided steps to tell us about your project and request
                          a consultation.
                        </p>
                      </div>
                      <span className="mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange/85 transition-colors group-hover:text-brand-orange md:mt-6">
                        Start
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFlow("general")}
                      className="group relative flex min-h-[168px] flex-col justify-between overflow-hidden border border-white/14 bg-white/4 p-5 text-left transition-[border-color,background-color] duration-300 hover:border-white/22 hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 sm:min-h-[200px] sm:p-6 md:min-h-[220px] md:p-8"
                    >
                      <div
                        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-white/25"
                        aria-hidden
                      />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                          Simple
                        </p>
                        <h2 className="mt-3 text-lg font-light leading-snug tracking-tight text-white font-geist sm:mt-4 sm:text-xl md:text-2xl">
                          Leave your information
                        </h2>
                        <p className="mt-2 text-sm font-light leading-relaxed text-white/65 md:mt-3">
                          Send a quick message—name, contact, and what you need.
                        </p>
                      </div>
                      <span className="mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors group-hover:text-brand-orange md:mt-6">
                        Continue
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <ContactForm flow={flow} onBack={() => setFlow(null)} />
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
